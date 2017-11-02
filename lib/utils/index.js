// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
const fs = require( 'fs' );
const os = require( 'os' );

// Vendor
const moment = require( 'moment' );
const pkgDir = require( 'pkg-dir' );

// Project
const Debugger = require( '../debugger' );

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
const root = pkgDir.sync( __dirname );

// NOTE:
// - `self` used as 'stand in' for static/class variables, which throw runtime errors.
/// TODO:
// - Update class definition to use class variables.
const self = {};

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
class Utils {
	constructor( opts ) {
		if ( !self.ref ) {
			/// TODO: Log message.
			this.goalistDir = opts.goalistDir;
			self.ref = this;
		}

		return self.ref;
	}

	getGoalistDirName() {
		return this.goalistDir || '.goalist';
	}

	getGoalistDirPath() {
		return `${os.homedir()}/${this.getGoalistDirName()}`;
	}

	readGoalistDir() {
		return fs.readdirSync( this.getGoalistDirPath(), 'utf8' );
	}

	getDirPath() {
		return `${this.getGoalistDirPath()}/logs`;
	}

	getTodayHandle() {
		let d = new Date();

		// NOTE: Take into account UTC offset when calculating 'today'.
		let today = new Date( d.getTime() - ( d.getTimezoneOffset() * 60 * 1000 ) );

		let year = today.getFullYear();
		let month = ( today.getUTCMonth() + 1 );
		let day = today.getUTCDate();

		// Ensure that `month` identifier is always two characters (eg. '09'). Required for sorting purposes.
		month = ( month >= 10 ) ? month : '0' + month;

		let todayDirName = `${year}-${month}-${day}`;

		return todayDirName;
	}

	getTodayLogName() {
		return `goalist_${this.getTodayHandle()}.log`;
	}

	getTodayLogPath() {
		return `${this.getDirPath()}/${this.getTodayLogName()}`;
	}

	readTodayLog() {
		try {
			return this.readLog( this.getTodayLogPath() );
		} catch ( err ) {
			console.log( 'Whoops, unable to get log file for current day!' );

			/// TODO[@jrmykolyn]: Consider only logging error message if program is running in 'verbose' mode.
			console.log( err.message );

			return null;
		}
	}

	getLatestLogName() {
		try {
			let logs = this.getLogNames();

			if ( !logs || !Array.isArray( logs ) || !logs.length ) {
				throw new Error( 'Failed to fetch log files.' );
			}

			let latestLog = logs.filter( ( log ) => {
				return log.substring( 0, 1 ) !== '.'; /// TODO[@jrmykolyn]: Filter by regex/pattern match.
			} )
			.sort()
			.reverse()[ 0 ];

			if ( !latestLog ) {
				throw new Error( 'Failed to extract latest log file from collection' );
			}

			return latestLog;
		} catch ( err ) {
			return null;
		}
	}

	getLatestLogPath() {
		let dirPath = this.getDirPath();
		let latestLog = this.getLatestLogName();

		return ( dirPath && latestLog ) ? `${dirPath}/${latestLog}` : null;
	}

	readLatestLog() {
		try {
			return this.readLog( this.getLatestLogPath() );
		} catch ( err ) {
			return null;
		}
	}

	getLogName( identifier ) {
		identifier = ( identifier && typeof identifier === 'string' ) ? identifier : null;

		if ( !identifier ) {
			Debugger.log( 'Received invalid argument for `identifier`' );
			return null;
		}

		return `goalist_${identifier}.log`;
	}

	getLogPath( identifier ) {
		let logName = this.getLogName( identifier );
		let dirPath = this.getDirPath( identifier );

		return ( logName && dirPath ) ? `${dirPath}/${logName}` : null;
	}

	/// TODO: Consolidate with `readLog()`.
	getLog( identifier ) {
		try {
			return this.readLog( this.getLogPath( identifier ) );
		} catch ( err ) {
			return null;
		}
	}

	/// TODO: Update method name and references: `getLogNames()`.
	getLogNames() {
	 	try {
			return fs.readdirSync( this.getDirPath(), 'utf8' );
	 	} catch ( err ) {
			return null;
	 	}
	}

	readLog( path, options ) {
		path = ( path && typeof path === 'string' ) ? path : null;
		options = ( options && typeof options === 'object' ) ? options : {};

		if ( !path ) {
			console.log( 'Received invalid argument for `path`' ); /// TEMP
			return;
		}

		try {
			return JSON.parse( fs.readFileSync( path ), 'utf8' ); /// TEMP
		} catch ( err ) {
			console.log( err.message );
			return null;
		}
	}

	writeLog( target, data, options ) {
		target = ( target && typeof target === 'string' ) ? target : null;
		data = ( typeof data !== 'undefined' && data !== null ) ? data : null;
		options = ( options && typeof options === 'object' ) ? options : {};

		let resolvedPath = ( target === 'today' ) ? this.getTodayLogPath() : null;

		if ( !resolvedPath ) {
			console.log( 'Whoops, `writeLog()` ony accepts the following value(s) for the `path` argument: "today"' ); /// TEMP
			return;
		}

		try {
			fs.writeFileSync( resolvedPath, data, 'utf8' );

			return true;
		} catch ( err ) {
			return false;
		}
	}

	getLogTemplate() {
		return JSON.parse( fs.readFileSync( `${root}/data/goalist.log` ) );
	}

	getOrCreateGoalistDir() {
		// Create `goalist` directory if it doesn't exist.
		try {
			return fs.readdirSync( `${this.getGoalistDirPath()}` );
		} catch ( err ) {
			return fs.mkdirSync( `${this.getGoalistDirPath()}` );
		}
	}

	getOrCreateLogsDir() {
		// Create `logs` directory if it doesn't exist.
		try {
			return fs.readdirSync( `${this.getDirPath()}` );
		} catch ( err ) {
			return fs.mkdirSync( `${this.getDirPath()}` );
		}
	}

	getOrCreateTodayLog() {
		// Create log file for current day if it doesn't exist.
		try {
			return fs.readFileSync( `${this.getTodayLogPath()}`, 'utf8' );
		} catch ( err ) {
			// Fetch: template; latest log data.
			let template = this.getLogTemplate();
			let latestLog = this.readLatestLog();
			let latestGoals = ( latestLog && latestLog.goals ) ? latestLog.goals : {};

			// Remove any goals which are not 'incomplete'.
			for ( let key in latestGoals ) {
				let goal = latestGoals[ key ];

				if ( goal.status !== 'incomplete' ) {
					delete latestGoals[ key ];
				}
			}

			// Update template with additional 'goals'.
			template.goals = Object.assign( template.goals, latestGoals );

			// Write data to file system.
			return fs.writeFileSync( `${this.getTodayLogPath()}`, JSON.stringify( template ), 'utf8' );
		}
	}

}

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = Utils;
