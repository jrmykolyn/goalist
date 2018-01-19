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
				title: 'My cool goal.'
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

test( 'Rejects if `#run()` is invoked with 0 arguments.', ( t ) => {
	const Goalist = require( importPath );

	let goalist = new Goalist();

	return goalist.run()
		.then( () => {
			t.fail();
		} )
		.catch( () => {
			t.pass();
		} );
} );

test( 'Rejects if `#run()` is invoked with an invalid command.', ( t ) => {
	const Goalist = require( importPath );

	let goalist = new Goalist();

	return goalist.run( 'INVALID_COMMAND' )
		.then( () => {
			t.fail();
		} )
		.catch( () => {
			t.pass();
		} );
} );


test( 'Resolves if `#run()` is invoked with a valid command.', ( t ) => {
	const Goalist = require( importPath );

	let goalist = new Goalist();

	/// TODO: Ensure that this test does not require an `.goalist/` folder within the user's home directory to pass.
	return goalist.run( 'list' )
		.then( () => {
			t.pass();
		} )
		.catch( () => {
			t.fail();
		} );
} );

test( '`#run()` accepts an array of input data.', ( t ) => {
	const Goalist = require( importPath );

	let goalist = new Goalist();

	return goalist.run( 'add', [ 'My new goal.' ], { utilsOpts: { path: setupOpts.goalistDir } } )
		.then( ( data ) => {
			/// TODO: Ensure that new goal was added correctly.
			t.pass();
		} )
		.catch( () => {
			t.fail();
		} );
} );

test( '`#run()` accepts a string of input data.', ( t ) => {
	const Goalist = require( importPath );

	let goalist = new Goalist();

	return goalist.run( 'add', 'My other new goal.', { utilsOpts: { path: setupOpts.goalistDir } } )
		.then( ( data ) => {
			/// TODO: Ensure that new goal was added correctly.
			t.pass();
		} )
		.catch( () => {
			t.fail();
		} );
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
} );
