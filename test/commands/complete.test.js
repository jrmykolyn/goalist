// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Vendor
const test = require('ava');
const sinon = require('sinon');

// Project
const { default: complete } = require('../../dist/commands/complete');

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
let config;
let getLog;
let getTimestamp;
let goal;
let id;
let log;
let timestamp;
let writeLog;

// --------------------------------------------------
// DECLARE TESTS
// --------------------------------------------------
test.beforeEach(() => {
  id = 1;
  timestamp = 1;
  goal = { id };
  getLog = sinon.stub();
  getTimestamp = () => timestamp;
  writeLog = () => null;
  log = { goals: { [ id ]: goal } };
  config = {
    utils: {
      getLog,
      getTimestamp,
      writeLog,
    },
  };
} );

test( 'it should return a Promise', ( t ) => {
  const result = complete( [ id ], {}, config );
  getLog.withArgs('active').returns(log);

  t.is( result instanceof Promise, true );
} );

test( 'it should mark the target goal as "complete"', ( t ) => {
  goal.complete = false;
  getLog.withArgs('active').returns(log);

  return complete( [ id ], {}, config )
    .then( ( { complete } ) => {
      t.true( complete );
    } );
} );

test( 'it should mark the target goal as "incomplete"', ( t ) => {
  goal.complete = true;
  getLog.withArgs('active').returns(log);

  return complete( [ id ], { false: true }, config )
    .then( ( { complete } ) => {
      t.false( complete );
    } );
} );

test( 'it should mark the target archived goal as "complete"', ( t ) => {
  getLog.withArgs('archive').returns(log);
  goal.complete = false;

  return complete( [ id ], { archive: true }, config )
    .then( ( { complete } ) => {
      t.true( complete );
    } );
} );


test( 'it should mark the target archived goal as "incomplete"', ( t ) => {
  getLog.withArgs('archive').returns(log);
  goal.complete = true;

  return complete( [ id ], { archive: true, false: true }, config )
    .then( ( { complete } ) => {
      t.false( complete );
    } );
} );

test( 'it should update the `updatedAt` timestamp for the target goal' , ( t ) => {
  const config = { utils: { getLog, getTimestamp, writeLog } };
  getLog.withArgs('active').returns(log);

  return complete( [ id ], {}, config )
    .then( ( { updatedAt } ) => {
      t.is( updatedAt, timestamp );
    } );
} );
