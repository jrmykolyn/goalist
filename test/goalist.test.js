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
	logs: [
		{
			name: 'goalist_active.log',
			data: {
				goals: {
					'1234567890': {
						id: '1234567890',
						title: 'My cool goal.',
						active: true,
						complete: false,
					},
					'0987654321': {
						id: '0987654321',
						title: 'My complete goal.',
						active: true,
						complete: true,
					},
				},
			}
		},
		{
			name: 'goalist_archive.log',
			data: {
				goals: {
					'0000000000': {
						id: '0000000000',
						title: 'My archived goal.',
						active: false,
						complete: true,
					},
					'1111111111': {
						id: '1111111111',
						title: 'My goal to be removed.',
						active: false,
						complete: true,
					},
				},
			}
		}
	],
};

// --------------------------------------------------
// DECLARE TESTS: SETUP AND TEARDOWN
// --------------------------------------------------
test.before( () => {
	let { goalistDir, logsDirName } = setupOpts;

	fs.mkdirSync( goalistDir );
	fs.mkdirSync( `${goalistDir}/${logsDirName}` );

	setupOpts.logs.forEach( ( log ) => {
		fs.writeFileSync( `${goalistDir}/${logsDirName}/${log.name}`, JSON.stringify( log.data ), 'utf8' );
	} );
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

test( '"add" rejects if not invoked with a "title"', async ( t ) => {
	let goalist = new Goalist( { utilsOpts: { path: setupOpts.goalistDir } } );

	await t.throws( goalist.run( 'add' ) );
} );

test( '"archive" correctly archives/activates goal data.', async  ( t ) => {
	t.plan( 4 );

	let goalist = new Goalist( { utilsOpts: { path: setupOpts.goalistDir } } );

	// Create new goal.
	let newGoalTitle = 'This goal will be archived.';
	let goal = await goalist.run( 'add', [ newGoalTitle ] );

	// Archive new goal, get 'active' and 'archived' goal data.
	let archivedGoals = await goalist.run( 'archive', [ goal.id ] );
	let activeGoals = await goalist.run( 'list' );

	// Assert that new goal:
	// - is present in 'archived' goal data.
	// - is not present in 'active' goal data.
	// NOTE: Goal data keys must be coerced from strings to integers.
	t.true( Object.keys( archivedGoals.goals ).map( ( k ) => { return +k; } ).includes( goal.id ) );
	t.true( !Object.keys( activeGoals.goals ).map( ( k ) => { return +k; } ).includes( goal.id ) );

	// 'Activate' new goal, refresh references to 'active' and 'archived' goal data.
	activeGoals = await goalist.run( 'archive', [ goal.id ], { active: true } );
	archivedGoals = await goalist.run( 'list', [], { archive: true } );

	/// Following 'activation', assert that new goal:
	// - is present in 'active' goal data.
	// - is not present in 'archived' goal data.
	t.true( Object.keys( activeGoals.goals ).map( ( k ) => { return +k; } ).includes( goal.id ) );
	t.true( !Object.keys( archivedGoals.goals ).map( ( k ) => { return +k; } ).includes( goal.id ) );
} );

test( '"archive" rejects when invoked with a missing or invalid identifier.', async ( t ) => {
	t.plan( 2 );

	let goalist = new Goalist( { utilsOpts: { path: setupOpts.goalistDir } } );

	await t.throws( goalist.run( 'archive' ) );
	await t.throws( goalist.run( 'archive', [ 'NOT_A_REAL_ID' ] ) );
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

test( '"complete" rejects when invoked with a missing or invalid identifier.', async ( t ) => {
	t.plan( 2 );

	let goalist = new Goalist( { utilsOpts: { path: setupOpts.goalistDir } } );

	await t.throws( goalist.run( 'complete' ) );
	await t.throws( goalist.run( 'complete', [ 'NOT_A_REAL_ID' ] ) );
} );

test( '"list" correctly lists "active" goal data.', async ( t ) => {
	let goalist = new Goalist( { utilsOpts: { path: setupOpts.goalistDir } } );

	// Get 'active' goal data.
	let activeGoals = await goalist.run( 'list' );

	// Exract initial goal (added via `setupOpts`) from 'active' goal data.
	let goal = Object.keys( activeGoals.goals )
		.map( ( k ) => {
			return activeGoals.goals[ k ];
		} )
		.filter( ( goal ) => {
			return goal.id === '1234567890';
		} )[ 0 ];

	// Test.
	t.truthy( goal );
} );

test.todo( '"list" correctly lists "archived" goal data.' );

test( '"progress correctly returns an object of data relating to the "active" goals.', async ( t ) => {
	t.plan( 4 );

	let goalist = new Goalist( { utilsOpts: { path: setupOpts.goalistDir } } );

	let progress = await goalist.run( 'progress' );

	t.true( progress.type === 'active' );
	t.true( progress.total !== undefined );
	t.true( progress.complete !== undefined );
	t.true( progress.incomplete !== undefined );
} );

test( '"remove" rejects when invoked with a missing or invalid identifier.', async ( t ) => {
	t.plan( 2 );

	let goalist = new Goalist( { utilsOpts: { path: setupOpts.goalistDir } } );

	await t.throws( goalist.run( 'remove' ) );
	await t.throws( goalist.run( 'remove', [ 'NOT_A_REAL_ID' ] ) );
} );

test( '"remove" correctly removes a goal from the "active" goals.', async ( t ) => {
	let goalist = new Goalist( { utilsOpts: { path: setupOpts.goalistDir } } );

	// Create new goal, add to 'active' goals, and get all 'active' goal data.
	let newGoalTitle = 'This goal will be removed';
	let goal = await goalist.run( 'add', [ newGoalTitle ] );
	let activeGoals = await goalist.run( 'list' );

	// Ensure that new goal is present in 'active' goals data.
	t.true( activeGoals.goals[ goal.id ] !== undefined );

	// Remove new goal.
	let result = await goalist.run( 'remove', [ goal.id ] );

	// Update 'active' goal data ref.
	activeGoals = await goalist.run( 'list' );

	// Ensure that new goal is not present in 'active' goals data.
	t.false( activeGoals.goals[ goal.id ] !== undefined );
} );

test( '"remove" correctly removes a goal from the "archived" goals.', async ( t ) => {
	let goalist = new Goalist( { utilsOpts: { path: setupOpts.goalistDir } } );

	// Set target goal id.
	// NOTE: id provided by `setupOpts`.
	let id = '1111111111';

	// Get 'archived' goal data.
	let archivedGoalData = await goalist.run( 'list', [], { archive: true } );

	t.true( archivedGoalData.goals[ id ] !== undefined );

	// Remove goal.
	let result = await goalist.run( 'remove', [ '1111111111' ], { archive: true } );

	// Update 'active' goal data ref.
	archivedGoalData = await goalist.run( 'list', [], { archive: true } );

	// Ensure that goal is not present in 'archived' goals data.
	t.false( archivedGoalData.goals[ id ] !== undefined );
} );

test( '"update" correctly updates the target goal.', async ( t ) => {
	t.plan( 2 );

	let goalist = new Goalist( { utilsOpts: { path: setupOpts.goalistDir } } );

	// Create new goal, test title.
	let newGoalTitle = 'This title will be updated';
	let goal = await goalist.run( 'add', [ newGoalTitle ] );
	t.is( goal.title, newGoalTitle );

	// Update existing goal, ensure that new title has been correctly applied.
	let updatedGoalTitle = 'This title has been updated';
	let { payload: updatedGoal } = await goalist.run( 'update', [ goal.id ], { title: updatedGoalTitle } );

	t.is( updatedGoal.title, updatedGoalTitle );
} );

test( '"update" rejects when invoked with a missing or invalid identifier.', async ( t ) => {
	t.plan( 2 );

	let goalist = new Goalist( { utilsOpts: { path: setupOpts.goalistDir } } );

	await t.throws( goalist.run( 'update' ) );
	await t.throws( goalist.run( 'update', [ 'NOT_A_REAL_ID' ] ) );
} );
