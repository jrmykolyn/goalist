// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Vendor
const test = require('ava');
const sinon = require('sinon');

// Project
const { default: progress } = require('../../dist/commands/progress');

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
let config;
let log;
let goal1;
let goal2;

// --------------------------------------------------
// DECLARE TESTS
// --------------------------------------------------
test.beforeEach(() => {
  goal1 = { complete: true, active: true };
  goal2 = { complete: true, active: false };
  log = {
    goals: {
      '1': goal1,
      '2': goal2,
    },
  };
  config = {
    debugger: {
      log: () => null
    },
    utils: {
      getComplete: () => [],
      getLog: () => log,
    },
  };
} );

test( 'It should return a Promise', ( t ) => {
  t.is( progress( [], {}, config ) instanceof Promise, true );
} );

test( 'It should resolve with an object of "active" goal data', ( t ) => {
  const log = { goals: { '1': goal1 } };
  config.utils.getLog = sinon.stub().withArgs( 'active' ).returns( log );

  return progress( [], {}, config )
    .then( ( data ) => {
      t.deepEqual( data, { type: 'active', total: 1, complete: 0, incomplete: 1 } );
    } );
} );

test( 'It should resolve with an object of "archive" goal data', ( t ) => {
  const log = { goals: { '2': goal2 } };
  config.utils.getLog = sinon.stub().withArgs( 'archive' ).returns( log );

  return progress( [], { archive: true }, config )
    .then( ( data ) => {
      t.deepEqual( data, { type: 'archive', total: 1, complete: 0, incomplete: 1 } );
    } );
} );
