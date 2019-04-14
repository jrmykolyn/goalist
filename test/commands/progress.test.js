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

test( 'It should display information about the state of the "active" goals', ( t ) => {
  const activeLog = { goals: { '1': goal1 } };
  const log = config.debugger.log = sinon.spy();
  config.utils.getLog = sinon.spy( () => activeLog );
  config.utils.getComplete = sinon.stub().withArgs( activeLog ).returns( [ goal1 ] );

  progress( [], {}, config );

  t.is( log.callCount, 4);
  t.is( log.args[0][0].includes( 'OVERVIEW' ), true );
  t.is( log.args[1][0].includes( '1' ), true );
  t.is( log.args[2][0].includes( '1' ), true );
  t.is( log.args[3][0].includes( '0' ), true );
} );

test( 'It should visualize the "active" goal progress as a bar chart when in CLI mode', ( t ) => {
  const log = { goals: { '1': goal1 } };
  const barHorizontal = config.utils.barHorizontal = sinon.spy();
  config.utils.getLog = sinon.stub().withArgs( 'active' ).returns( log );
  config.utils.getComplete = () => [ goal1 ];
  config.cli = true;
  config.debugger.getMode = () => null;

  progress( [], {}, config );

  t.is( barHorizontal.calledWithExactly( { 'Complete': 1, 'Incomplete': 0 }, { labels: true } ), true );
} );

test( 'It should resolve with an object of "archive" goal data', ( t ) => {
  const log = { goals: { '2': goal2 } };
  config.utils.getLog = sinon.stub().withArgs( 'archive' ).returns( log );

  return progress( [], { archive: true }, config )
    .then( ( data ) => {
      t.deepEqual( data, { type: 'archive', total: 1, complete: 0, incomplete: 1 } );
    } );
} );

test( 'It should display information about the state of the "archive" goals', ( t ) => {
  const archiveLog = { goals: { '2': goal2 } };
  const log = config.debugger.log = sinon.spy();
  config.utils.getLog = sinon.stub().withArgs( 'archive' ).returns( archiveLog );
  config.utils.getComplete = sinon.stub().withArgs( archiveLog ).returns( [ goal1 ] );

  progress( [], {}, config );

  t.is( log.callCount, 4);
  t.is( log.args[0][0].includes( 'OVERVIEW' ), true );
  t.is( log.args[1][0].includes( '1' ), true );
  t.is( log.args[2][0].includes( '1' ), true );
  t.is( log.args[3][0].includes( '0' ), true );
} );

test( 'It should visualize the "archive" goal progress as a bar chart when in CLI mode', ( t ) => {
  const log = { goals: { '2': goal2 } };
  const barHorizontal = config.utils.barHorizontal = sinon.spy();
  config.utils.getLog = sinon.stub().withArgs( 'archive' ).returns( log );
  config.utils.getComplete = () => [ goal2 ];
  config.cli = true;
  config.debugger.getMode = () => null;

  progress( [], { archive: true }, config );

  t.is( barHorizontal.calledWithExactly( { 'Complete': 1, 'Incomplete': 0 }, { labels: true } ), true );
} );
