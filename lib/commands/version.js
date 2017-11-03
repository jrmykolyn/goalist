// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node

// Vendor
const pkgDir = require( 'pkg-dir' );

// Project
const pkg = require( `${pkgDir.sync( __dirname )}/package.json` );

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
function version( ARGS, utils ) {
	return new Promise( ( resolve, reject ) => {
		console.log( pkg.version );
		resolve( pkg.version );
	} );
}

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = version;
