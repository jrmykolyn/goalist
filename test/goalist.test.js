// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
const fs = require( 'fs' );

// Vendor
const test = require( 'ava' );
const del = require( 'del' );

// Project
const pkg = require( '../package' );

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
// NOTE: Make sure that import path is relative to process dir. (eg. root).
let importPath = `${process.cwd()}/${pkg.main}`;

const setupOpts = {
	goalistDir: `${__dirname}/temp_${parseInt( Math.random() * new Date().getTime() )}`,
	logsDirName: 'logs',
	logIdentifier: '1989-12-29',
	logName: 'goalist_active.log',
	logData: {
		goals: {
			'1234567890': {
				id: '1234567890',
				title: 'My Cool Goal.'
			},
		},
	},
};

// --------------------------------------------------
// DECLARE TESTS: SETUP AND TEARDOWN
// --------------------------------------------------
test.before( () => {
	let {
		goalistDir,
		logsDirName,
		logName,
		logData,
	} = setupOpts;

	fs.mkdirSync( goalistDir );
	fs.mkdirSync( `${goalistDir}/${logsDirName}` );

	fs.writeFileSync( `${goalistDir}/${logsDirName}/${logName}`, JSON.stringify( logData ), 'utf8' );
} );

test.after.always( () => {
	del.sync( setupOpts.goalistDir );
} );

// --------------------------------------------------
// DECLARE TESTS
// --------------------------------------------------
test( 'Is importable.', ( t ) => {
	try {
		const Goalist = require( importPath );

		t.pass();
	} catch ( err ) {
		t.fail();
	}
} );

test( 'Is a function.', ( t ) => {
	const Goalist = require( importPath );

	t.is( typeof Goalist, 'function' );
} );

test( 'Can be instantiated.', ( t ) => {
	const Goalist = require( importPath );

	let goalist = new Goalist();

	t.is( goalist instanceof Goalist, true );
} );

test( 'Exposes the `run()` instance method.', ( t ) => {
	const Goalist = require( importPath );

	let goalist = new Goalist();

	t.is( typeof goalist.run, 'function' );
} );

test( 'Allows `Utils` to be configured at instantiation.', ( t ) => {
	const Goalist = require( importPath );

	let goalist = new Goalist();

	return goalist.run( 'list', [], { utilsOpts: { path: setupOpts.goalistDir } } )
		.then( ( data ) => {
			t.pass();
		} )
		.catch( ( err ) => {
			t.fail();
		} );
} )
