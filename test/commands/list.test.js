// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Vendor
const test = require('ava');
const sinon = require('sinon');

// Project
const { default: list } = require('../../dist/commands/list');

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
let config;
let id;
let title;
let description;
let complete;
let active;

// --------------------------------------------------
// DECLARE TESTS
// --------------------------------------------------
test.beforeEach(() => {
  id = 'TEST_ID';
  title = 'TEST_TITLE';
  description = 'TEST_DESCRIPTION';
  complete = 'TEST_COMPLETE';
  active = 'TEST_ACTIVE';

  config = {
    debugger: {
      log: () => null
    },
    utils: {
      getLog: () => ( { goals: {} } ),
    },
  };
} );

test( 'it should return a Promise', ( t ) => {
  const result = list( [ 'foo' ], {}, config );

  t.is( result instanceof Promise, true );
} );

test( 'resolve with the log', ( t ) => {
  const log = { goals: {} };
  const getLog = config.utils.getLog = sinon.spy( () => log );

  return list( [], {}, config ).then( ( data ) => {
    t.is( data, log );
  } );
} );

test( 'it should extract the "archive" log', ( t ) => {
  const getLog = config.utils.getLog = sinon.spy( () => ( { goals: {} } ) );

  list( [], { archive: true }, config );

  t.is( getLog.calledWith( 'archive' ), true);
} );

test( 'it should extract the "active" log', ( t ) => {
  const getLog = config.utils.getLog = sinon.spy( () => ( { goals: {} } ) );

  list( [], {}, config );

  t.is( getLog.calledWith( 'active' ), true );
} );

test( 'should display the "id" and "title" data for each goal', ( t ) => {
  const goal = { id, title };
  const getLog = config.utils.getLog = sinon.spy( () => ( { goals: { [id]: goal } } ) );
  const log = config.debugger.log = sinon.spy();

  list( [], {}, config );

  t.is( log.args[0][0].includes( id ), true );
  t.is( log.args[1][0].includes( title ), true );
} );

test( 'should display the supplementary data for each goal when the "show" argument is provided', ( t ) => {
  const goal = { id, title, description };
  const getLog = config.utils.getLog = sinon.spy( () => ( { goals: { [id]: goal } } ) );
  const log = config.debugger.log = sinon.spy();

  list( [], { show: 'description' }, config );

  t.is( log.args[0][0].includes( id ), true );
  t.is( log.args[1][0].includes( title ), true );
  t.is( log.args[2][0].includes( description ), true );
} );

test( 'should display all of the data for each goal when the "all" argument is provided', ( t ) => {
  const goal = { id, title, description, complete, active };
  const getLog = config.utils.getLog = sinon.spy( () => ( { goals: { [ id ]: goal } } ) );
  const log = config.debugger.log = sinon.spy();

  list( [], { all: true }, config );

  t.is( log.args[0][0].includes( id ), true );
  t.is( log.args[1][0].includes( title ), true );
  t.is( log.args[2][0].includes( description ), true );
  t.is( log.args[3][0].includes( complete ), true );
  t.is( log.args[4][0].includes( active ), true );
} );

test( 'it should allow goals to be filtered by category', ( t ) => {
  const title1 = 'Goal 1';
  const title2 = 'Goal 2';
  const category1 = 'Foo';
  const category2 = 'Bar';
  const goal1 = { title: title1, category: category1 };
  const goal2 = { title: title2, category: category2 };
  const getLog = config.utils.getLog = sinon.spy( () => ( { goals: { '1': goal1, '2': goal2 } } ) );
  const log = config.debugger.log = sinon.spy();

  list( [], { category: category1 }, config );

  // Flatten `log()` arugments into a 1-dimensional array.
  const args = log.args.reduce( ( acc, args ) => [...acc, ...args], [] );
  t.is(args.some( ( arg ) => arg.includes( title1 ) ), true);
  t.is(args.every( ( arg ) => !arg.includes( title2 ) ), true);
} );