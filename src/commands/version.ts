// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node

// Vendor
import * as pkgDir from 'pkg-dir';

// Project
const pkg = require( `${pkgDir.sync( __dirname )}/package.json` ); // NOTE: `package.json` must be imported via CommonJS `require()`.

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
export default function version( ARGS, utils ) {
	return new Promise( ( resolve, reject ) => {
		console.log( pkg.version );
		resolve( pkg.version );
	} );
}
