// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Vendor
const test = require( 'ava' );
const sinon = require( 'sinon' );

// Project
const { default: Debugger } = require( '../dist/debugger' );

// --------------------------------------------------
// DECLARE TESTS
// --------------------------------------------------
let d;
let log;

test.beforeEach(() => {
	d = new Debugger();
	log = sinon.stub(global.console, 'log');
});

test.afterEach(() => {
	log.restore();
});

test('it should be importable', (t) => {
	t.is(typeof Debugger, 'function');
});

test('it should be constructable', (t) => {
	t.true(d instanceof Debugger);
});


['silent', 'normal', 'verbose'].forEach((mode) => {
	test(`it should correctly set the mode to: ${mode}`, (t) => {
		const myDebugger = new Debugger({ mode });

		t.is(myDebugger.mode, mode);
	});
});

test('it should set the mode to "silent" if the provided mode is invalid', (t) => {
  const mode = 'foo';

	const myDebugger = new Debugger({ mode });

	t.is(myDebugger.mode, 'silent');
});

test('it should allow the mode to be set via `setMode()`', (t) => {
	t.plan(2);

	const mode = 'foo';

	const result = d.setMode(mode)

	t.is(d.mode, mode);
	t.is(result, mode);
});

test('it should return the mode on getMode()', (t) => {
	const mode = 'foo';
	d.mode = mode;

	t.is(d.getMode(), mode);
});

test('log(): It should print the message to stdout when running in "verbose" mode', (t) => {
	const msg = 'foo';
	d.mode = 'verbose';

	d.log(msg);

	t.true(log.calledWithExactly(msg));
});

test('log(): It should not print the message to stdout when running in "silent" mode', (t) => {
  const msg = 'foo';
  d.mode = 'silent';

  d.log(msg);

  t.is(log.callCount, 0);
});

test('log(): It should override the internal mode when invoked with options', (t) => {
  const msg = 'foo';
  const normalMode = 'normal';
  const verboseMode = 'verbose';
  d.mode = 'silent';

  d.log(msg, { mode: normalMode });
  d.log(msg, { mode: verboseMode });

  t.is(log.args[0][0], msg);
  t.is(log.args[1][0], msg);
});
