// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

// Vendor
import * as moment from 'moment';
import * as pkgDir from 'pkg-dir';
import * as merge from 'merge';

// Project
import Debugger from '../debugger';
import { UtilsStore, UtilsInstance } from '../interfaces';

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
const root = pkgDir.sync( __dirname );

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
export default class Utils implements UtilsInstance {
	goalistDirName: any;
	goalistDirRoot: any;
	goalistDirPath: any;

	constructor( opts? ) {
		opts = ( opts && typeof opts === 'object' ) ? opts : {};

		/// TODO: Gross...
		this.goalistDirName = ( opts.path && typeof opts.path === 'string' ) ? path.parse( opts.path ).name : '.goalist';
		this.goalistDirRoot = ( opts.path && typeof opts.path === 'string' ) ? path.parse( opts.path ).dir : os.homedir();
		this.goalistDirPath = ( opts.path && typeof opts.path === 'string' ) ? opts.path : `${this.goalistDirRoot}/${this.goalistDirName}`;
	}

	getGoalistDirName() {
		return this.goalistDirName;
	}

	getGoalistDirPath() {
		return this.goalistDirPath;
	}

	readGoalistDir() {
		return fs.readdirSync( this.getGoalistDirPath(), 'utf8' );
	}

	getDirPath() {
		return `${this.getGoalistDirPath()}/logs`;
	}

	getLogPath( identifier = 'active' ) {
		let output;
		let dirPath = this.getDirPath();

		switch ( identifier ) {
			case 'archive':
				output = `${dirPath}/goalist_archive.log`;
				break;
			default:
				output = `${dirPath}/goalist_active.log`;
		}

		return output;
	}

	readActiveLog() {
		try {
			return this.readLog( this.getLogPath( 'active' ) );
		} catch ( err ) {
			console.log( 'Whoops, unable to get log file for current day!' ); /// TODO

			/// TODO[@jrmykolyn]: Consider only logging error message if program is running in 'verbose' mode.
			console.log( err.message );

			return null;
		}
	}

	readArchiveLog() {
		try {
			return this.readLog( this.getLogPath( 'archive' ) );
		} catch ( err ) {
			console.log( 'Whoops, unable to get log file for current day!' ); /// TODO

			/// TODO[@jrmykolyn]: Consider only logging error message if program is running in 'verbose' mode.
			console.log( err.message );

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

	readLog( path, options? ) {
		path = ( path && typeof path === 'string' ) ? path : null;
		options = ( options && typeof options === 'object' ) ? options : {};

		if ( !path ) {
			console.log( 'Received invalid argument for `path`' );
			return;
		}

		try {
			return JSON.parse( fs.readFileSync( path, 'utf8' ) );
		} catch ( err ) {
			console.log( err.message );
			return null;
		}
	}

	/// TODO:
	// - Change `target` to something... better.
	// - Revisit.
	writeLog( target, data, options ) {
		target = ( target && typeof target === 'string' ) ? target : null;
		data = ( typeof data !== 'undefined' && data !== null ) ? data : null;
		options = ( options && typeof options === 'object' ) ? options : {};

		let resolvedPath;

		switch ( target ) {
			case 'active':
			case 'archive':
				resolvedPath = this.getLogPath( target );
				break;
			default:
				resolvedPath = target;
		}

		if ( !resolvedPath ) {
			console.log( 'Whoops, a missing or invalid value was provided for the following argument: `target`' );
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
		return JSON.parse( fs.readFileSync( `${root}/data/goalist.log`, 'utf8' ) );
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

	getOrCreateLog( identifier = 'active' ) {
		/// TODO
		try {
			return fs.readFileSync( `${this.getLogPath( identifier )}`, 'utf8' );
		} catch ( err ) {
			// Fetch template.
			let template = this.getLogTemplate();

			// Write data to file system.
			return fs.writeFileSync( `${this.getLogPath( identifier )}`, JSON.stringify( template ), 'utf8' );
		}
	}
}
