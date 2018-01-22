// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
const fs = require( 'fs' );

// Vendor
const test = require( 'ava' );
const del = require( 'del' );

// Project
const Goalist = require( '../dist' );
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
	t.true( !!Goalist );
} );

test( 'Is a function.', ( t ) => {
	t.true( typeof Goalist === 'function' );
} );

test( 'Can be instantiated.', ( t ) => {
	t.true( new Goalist() instanceof Goalist );
} );

test( 'Exposes the `run()` instance method.', ( t ) => {
	let goalist = new Goalist();

	t.is( typeof goalist.run, 'function' );
} );

test( 'Rejects if `#run()` is invoked with 0 arguments.', ( t ) => {
	let goalist = new Goalist();

	return goalist.run()
		.then( () => { t.fail(); } )
		.catch( () => { t.pass(); } );
} );

test( 'Rejects if `#run()` is invoked with an invalid command.', ( t ) => {
	let goalist = new Goalist();

	return goalist.run( 'INVALID_COMMAND' )
		.then( () => { t.fail(); } )
		.catch( () => { t.pass(); } );
} );


test( 'Resolves if `#run()` is invoked with a valid command.', ( t ) => {
	let goalist = new Goalist();

	/// TODO: Ensure that this test does not require an `.goalist/` folder within the user's home directory to pass.
	return goalist.run( 'list' )
		.then( () => { t.pass(); } )
		.catch( () => { t.fail(); } );
} );

test( '`#run()` accepts an array of input data.', ( t ) => {
	let goalist = new Goalist( { utilsOpts: { path: setupOpts.goalistDir } } );

	return goalist.run( 'add', [ 'My new goal.' ] )
		.then( ( data ) => {
			/// TODO: Ensure that new goal was added correctly.
			t.pass();
		} )
		.catch( () => {
			t.fail();
		} );
} );

test( '`#run()` accepts a string of input data.', ( t ) => {
	let goalist = new Goalist( { utilsOpts: { path: setupOpts.goalistDir } } );

	return goalist.run( 'add', 'My other new goal.' )
		.then( ( data ) => {
			/// TODO: Ensure that new goal was added correctly.
			t.pass();
		} )
		.catch( () => {
			t.fail();
		} );
} );

test.todo( '`#run()` coerces invalid input into the correct format.' );

test.todo( '`#run()` applies valid arguments.' );

test.todo( '`#run()` ignores invalid arguments.' );

test( 'Allows `Utils` to be configured at instantiation.', ( t ) => {
	let goalist = new Goalist( { utilsOpts: { path: setupOpts.goalistDir } } );

	return goalist.run( 'list', [] )
		.then( ( data ) => {
			t.pass();
		} )
		.catch( ( err ) => {
			t.fail();
		} );
} );

test( '"add" correctly adds new goal data to "active" goals.', async ( t ) => {
	let goalist = new Goalist( { utilsOpts: { path: setupOpts.goalistDir } } );

	let newGoalTitle = 'This goal was added via a test.';

	let goal = await goalist.run( 'add', [ newGoalTitle ] );

	t.is( goal.title, newGoalTitle );
} );

test( '"archive" correctly archives/activates goal data.', async  ( t ) => {
	t.plan( 4 );

	let goalist = new Goalist( { utilsOpts: { path: setupOpts.goalistDir } } );

	// Create new goal.
	let newGoalTitle = 'This goal will be archived.';
	let goal = await goalist.run( 'add', [ newGoalTitle ] );

	// Archive new goal.
	// Get 'active' and 'archived' goal data.
	let archivedGoals = await goalist.run( 'archive', [ goal.id ] );
	let activeGoals = await goalist.run( 'list' );

	// Assert that new goal:
	// - is present in 'archived' goal data.
	// - is not present in 'active' goal data.
	// NOTE: Goal data keys must be coerced from strings to integers.
	t.true( Object.keys( archivedGoals.goals ).map( ( k ) => { return +k; } ).includes( goal.id ) );
	t.true( !Object.keys( activeGoals.goals ).map( ( k ) => { return +k; } ).includes( goal.id ) );

	// 'Activate' new goal.
	// Refresh references to 'active' and 'archived' goal data.
	activeGoals = await goalist.run( 'archive', [ goal.id ], { active: true } );
	archivedGoals = await goalist.run( 'list', [], { archive: true } );

	/// Following 'activation', sssert that new goal:
	// - is present in 'active' goal data.
	// - is not present in 'archived' goal data.
	t.true( Object.keys( activeGoals.goals ).map( ( k ) => { return +k; } ).includes( goal.id ) );
	t.true( !Object.keys( archivedGoals.goals ).map( ( k ) => { return +k; } ).includes( goal.id ) );
} );

test( '"backup" correctly creates backups of "active" goal data.', async ( t ) => {
	let goalist = new Goalist( { utilsOpts: { path: setupOpts.goalistDir } } );

	// Create backup of 'active' goals.
	let result = await goalist.run( 'backup' );

	// Read contents of 'bak/', get name of backup file.
	let files = fs.readdirSync( `${setupOpts.goalistDir}/bak`, 'utf8' );
	let file = files.filter( ( file ) => { return file.includes( 'active' ) && file.includes( '.bak' ) } )[ 0 ];

	// Read in/parse backup file.
	let bakData = JSON.parse( fs.readFileSync( `${setupOpts.goalistDir}/bak/${file}`, 'utf8' ) );

	// Test.
	// NOTE: ID corresponds to goal created during setup.
	t.true( !!bakData.goals[ '1234567890' ] );
} );

test( '"complete" correctly sets a given goal to "complete".', async ( t ) => {
	let goalist = new Goalist( { utilsOpts: { path: setupOpts.goalistDir } } );

	// Create a new goal.
	let goal = await goalist.run( 'add', [ 'This goal is initially incomplete.' ] );

	// Ensure new goal is not complete by default.
	t.false( goal.complete );

	// Set new goal to complete.
	let updatedGoal = await goalist.run( 'complete', [ goal.id ] );

	// Assert new goal is complete.
	t.true( updatedGoal.complete );
} );
