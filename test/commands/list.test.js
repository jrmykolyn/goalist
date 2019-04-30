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

test( 'resolve with an array of goal objects', ( t ) => {
  const goal = { id: 1 };
  const log = { goals: { '1': goal } };
  const getLog = config.utils.getLog = sinon.spy( () => log );

  return list( [], {}, config ).then( ( data ) => {
    t.deepEqual( data, [ goal ] );
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

test( 'should return goals with "id" and "title" properties by default', ( t ) => {
  const goal = { id, title };
  const getLog = config.utils.getLog = sinon.spy( () => ( { goals: { [ id ]: goal } } ) );

  return list( [], {}, config )
    .then( ( [ goal ] ) => {
      t.true( 'id' in goal );
      t.true( 'title' in goal );
    } );
} );

test( 'should return goals with supplementary properties when the "show" argument is provided', ( t ) => {
  const goal = { id, title, description };
  const getLog = config.utils.getLog = sinon.spy( () => ( { goals: { [ id ]: goal } } ) );

  return list( [], { show: 'description' }, config )
    .then( ( [ goal ] ) => {
      t.true( 'id' in goal );
      t.true( 'title' in goal );
      t.true( 'description' in goal );
    } );
} );

test( 'should display all of the data for each goal when the "all" argument is provided', ( t ) => {
  const goal = { id, title, description, complete, active };
  const getLog = config.utils.getLog = sinon.spy( () => ( { goals: { [ id ]: goal } } ) );

  return list( [], { all: true }, config )
    .then( ( [ goal ] ) => {
      t.true( 'id' in goal );
      t.true( 'title' in goal );
      t.true( 'description' in goal );
      t.true( 'complete' in goal );
      t.true( 'active' in goal );
    } );
} );

test( 'it should allow goals to be filtered by category', ( t ) => {
  const goal1 = { title, category };
  const goal2 = { title: title2, category: category2 };
  const getLog = config.utils.getLog = sinon.spy( () => ( { goals: { '1': goal1, '2': goal2 } } ) );

  return list( [], { category }, config )
    .then( ( [ goal ] ) => {
      t.is( goal, goal1 );
    } );
} );

test( 'it should allow goals to be filtered by tag', ( t ) => {
  const goal1 = { title, tags: [ 'foo', 'bar' ] };
  const goal2 = { title: title2, tags: [ 'baz', 'quux' ] };
  const getLog = config.utils.getLog = sinon.spy( () => ( { goals: { '1': goal1, '2': goal2 } } ) );

  return list( [], { tags: 'foo,bar' }, config )
    .then( ( [ goal ] ) => {
      t.is( goal, goal1 );
    } );
} );

test( 'it should allow goals to be filtered by category or tag', ( t ) => {
  const goal1 = { title, tags: [ 'foo', 'bar' ] };
  const goal2 = { title: title2, category: 'baz' };
  const getLog = config.utils.getLog = sinon.spy( () => ( { goals: { '1': goal1, '2': goal2 } } ) );
  const log = config.debugger.log = sinon.spy();

  return list( [], { tags: 'foo,bar', category: 'baz' }, config )
    .then( ( goals ) => {
      t.deepEqual( goals, [ goal1, goal2 ] );
    } );
} );
