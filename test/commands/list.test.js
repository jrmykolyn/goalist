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
let title2;
let category;
let category2;
let description;
let complete;
let active;

// --------------------------------------------------
// DECLARE TESTS
// --------------------------------------------------
test.beforeEach(() => {
  id = 'TEST_ID';
  title = 'TEST_TITLE';
  title2 = 'TEST_TITLE_2';
  category = 'Foo';
  category2 = 'Bar';
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

  return list( [], { archive: true }, config ).
    then( () => {
      t.is( getLog.calledWith( 'archive' ), true);
    } );
} );

test( 'it should extract the "active" log', ( t ) => {
  const getLog = config.utils.getLog = sinon.spy( () => ( { goals: {} } ) );

  return list( [], {}, config )
    .then( () => {
      t.is( getLog.calledWith( 'active' ), true );
    } );
} );

test( 'should display the "id" and "title" data for each goal', ( t ) => {
  const goal = { id, title };
  const getLog = config.utils.getLog = sinon.spy( () => ( { goals: { [id]: goal } } ) );
  const log = config.debugger.log = sinon.spy();

  return list( [], {}, config )
    .then( () => {
      t.is( log.args[0][0].includes( id ), true );
      t.is( log.args[1][0].includes( title ), true );
    } );
} );

test( 'should display the supplementary data for each goal when the "show" argument is provided', ( t ) => {
  const goal = { id, title, description };
  const getLog = config.utils.getLog = sinon.spy( () => ( { goals: { [id]: goal } } ) );
  const log = config.debugger.log = sinon.spy();

  return list( [], { show: 'description' }, config )
    .then( () => {
      t.is( log.args[0][0].includes( id ), true );
      t.is( log.args[1][0].includes( title ), true );
      t.is( log.args[2][0].includes( description ), true );
    } );
} );

test( 'should display all of the data for each goal when the "all" argument is provided', ( t ) => {
  const goal = { id, title, description, complete, active };
  const getLog = config.utils.getLog = sinon.spy( () => ( { goals: { [ id ]: goal } } ) );
  const log = config.debugger.log = sinon.spy();

  return list( [], { all: true }, config )
    .then( () => {
      t.is( log.args[0][0].includes( id ), true );
      t.is( log.args[1][0].includes( title ), true );
      t.is( log.args[2][0].includes( description ), true );
      t.is( log.args[3][0].includes( complete ), true );
      t.is( log.args[4][0].includes( active ), true );
    } );
} );

test( 'it should allow goals to be filtered by category', ( t ) => {
  const goal1 = { title, category };
  const goal2 = { title: title2, category: category2 };
  const getLog = config.utils.getLog = sinon.spy( () => ( { goals: { '1': goal1, '2': goal2 } } ) );
  const log = config.debugger.log = sinon.spy();

  return list( [], { category }, config )
    .then( () => {
      // Flatten `log()` arugments into a 1-dimensional array.
      const args = log.args.reduce( ( acc, args ) => [...acc, ...args], [] );
      t.is(args.some( ( arg ) => arg.includes( title ) ), true);
      t.is(args.every( ( arg ) => !arg.includes( title2 ) ), true);
    } );
} );

test( 'it should allow goals to be filtered by tag', ( t ) => {
  const goal1 = { title, tags: [ 'foo', 'bar' ] };
  const goal2 = { title: title2, tags: [ 'baz', 'quux' ] };
  const getLog = config.utils.getLog = sinon.spy( () => ( { goals: { '1': goal1, '2': goal2 } } ) );
  const log = config.debugger.log = sinon.spy();

  return list( [], { tags: 'foo,bar' }, config )
    .then( () => {
      // Flatten `log()` arugments into a 1-dimensional array.
      const args = log.args.reduce( ( acc, args ) => [...acc, ...args], [] );
      t.is(args.some( ( arg ) => arg.includes( title ) ), true);
      t.is(args.every( ( arg ) => !arg.includes( title2 ) ), true);
    } );
} );

test( 'it should allow goals to be filtered by category or tag', ( t ) => {
  const goal1 = { title, tags: [ 'foo', 'bar' ] };
  const goal2 = { title: title2, category: 'baz' };
  const getLog = config.utils.getLog = sinon.spy( () => ( { goals: { '1': goal1, '2': goal2 } } ) );
  const log = config.debugger.log = sinon.spy();

  return list( [], { tags: 'foo,bar', category: 'baz' }, config )
    .then( () => {
      // Flatten `log()` arugments into a 1-dimensional array.
      const args = log.args.reduce( ( acc, args ) => [...acc, ...args], [] );
      t.is(args.some( ( arg ) => arg.includes( title ) ), true);
      t.is(args.some( ( arg ) => arg.includes( title2 ) ), true);
    } );
} );
