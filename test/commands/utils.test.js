// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Vendor
const test = require('ava');
const sinon = require('sinon');

// Project
const { default: makeCommand } = require('../../dist/commands/utils');

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
const noop = () => null;

// --------------------------------------------------
// DECLARE TESTS
// --------------------------------------------------
test( 'It should return a new "command" function', ( t ) => {
  t.is( typeof makeCommand( noop ) === 'function', true );
} );

test( 'It should return "function" that returns a Promise', ( t ) => {
  t.is( makeCommand( noop )() instanceof Promise, true );
} );

test( 'It should invoke each validator with `input`, `args`, and `config`', ( t ) => {
  const validatorA = sinon.spy();
  const validatorB = sinon.spy();
  const input = 'foo';
  const args = 'bar';
  const config = 'baz';

  return makeCommand( noop, [ validatorA, validatorB ] )( input, args, config )
    .then( () => {
      t.is( validatorA.calledWithExactly( input, args, config ), true );
      t.is( validatorB.calledWithExactly( input, args, config ), true );
    } );
} );

test( 'It should invoke the provided command with `input`, `args`, and `config`', ( t ) => {
  const command = sinon.spy();
  const input = 'foo';
  const args = 'bar';
  const config = 'baz';

  return makeCommand( command )( input, args, config )
    .then( () => {
      t.is( command.calledWithExactly( input, args, config ), true );
    } );
} );

test( 'It should propagate validation errors', ( t ) => {
  const errorMsg = 'Whoops, something went wrong!';
  const validator = () => { throw new Error( errorMsg ) };

  t.throws( () => makeCommand( noop, [ validator ] )() );
} );

test( 'It should propagate command errors', ( t ) => {
  const errorMsg = 'Whoops, something went wrong!';
  const command = () => { throw new Error( errorMsg ) };

  return makeCommand( command, [] )()
    .then( noop )
    .catch( ( err ) => {
      t.is( err instanceof Error, true );
      t.is( err.message === errorMsg, true );
    });
} );
