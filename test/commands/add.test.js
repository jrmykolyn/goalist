// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Vendor
const test = require('ava');
const sinon = require('sinon');

// Project
const { default: add } = require('../../dist/commands/add');

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
let config;
let log;
let timestamp;

// --------------------------------------------------
// DECLARE TESTS
// --------------------------------------------------
test.beforeEach(() => {
  timestamp = 1;

  log = {
    goals: {},
  };

  config = {
    debugger: {
      log: () => null
    },
    utils: {
      generateId: () => 1,
      getLog: () => log,
      writeLog: () => null,
      getTimestamp: () => timestamp,
    },
  };
} );

test( 'it should return a Promise', ( t ) => {
  const result = add( [ 'foo' ], {}, config );

  t.is( result instanceof Promise, true );
} );

test( 'resolve with the new goal', ( t ) => {
  const title = 'foo';

  return add( [ title ], {}, config )
    .then( ( goal ) => {
      t.is( goal.title, 'foo' );
      t.true( 'id' in goal );
      t.is( goal.createdAt, timestamp );
      t.is( goal.updatedAt, timestamp );
    } );
} );

test( 'should write the new goal data to disk', ( t ) => {
  const id = 1;
  const title = 'foo';
  const goal = { id, title, category: '', description: '', complete: false, active: true };
  const generateId = config.utils.generateId = sinon.spy( () => id );
  const writeLog = config.utils.writeLog = sinon.spy();

	return add( [ title ], { tags: 'foo, bar, baz' }, config ).then((goal) => {
		t.is(
			writeLog.calledWith(
				'active',
				JSON.stringify( { goals: { [id]: Object.assign({}, goal, { tags: [ 'foo', 'bar', 'baz' ] } ) } } )
			),
			true
		);
	});
} );

test( 'it should reject if no "title" is provided', ( t ) => {
  return add( [], {}, config )
    .then( () => null )
    .catch( () => t.pass() );
} );
