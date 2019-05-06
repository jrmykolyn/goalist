# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## [0.16.0] - 2019-05-05
### Added
- Added 'logger' functions for the following commands:
  - `add`;
  - `archive`;
  - `backup`;
  - `complete`;
  - `list`;
  - `progress`;
  - `remove`;
  - `update`;

### Changed
- Decoupled validation and logic in the following commands:
  - `add`;
  - `archive`;
  - `backup`;
  - `complete`;
  - `list`;
  - `progress`;
  - `remove`;
  - `update`;
- Updated `add` command to set 'createdAt' and 'updatedAt' properties.
- Updated `complete` command to set 'updatedAt' property.
- Updated `update` command to set 'updatedAt' property.
- Updated return values for the following commands:
  - `backup`;
  - `update`;

## [0.15.0] - 2019-04-17
### Added
- Added support for `tags` data point on goal records.
  - `gl add "Do the needful" --tags foo,bar,baz`
- Added support for filtering goals by tag.
  - `gl list --tags foo`

### Changed
- Updated CLI to display success message.

## [0.14.1] - 2019-04-14

### Fixed
- Fixed issue where 'progress' command could not display 'archive' goals.
- Fixed issue where attempting to display non-existent goal data as a bar chart would throw an error.

## [0.14.0] - 2019-04-12
### Added
- Added `generateId()` method to `utils`.
- Added `build` to `package.json`.

### Changed
- Improved `README.md`.
- Increased test coverage for 'add' command.
- Updated `add` command to support 'category' property.
- Updated `list` command to support filtering goals by 'category'.

### Removed
- Removed `TODO.md`.

## [0.13.1] - 2018-01-25
### Added
- Added support for setting 'complete' state of archived goals (eg. `gl complete {{ ID }} --archive`).

## [0.13.0] - 2018-01-23
### Added
- Added `backup` subcommand.
- Added support for `remove {{ ID }} --archive` (eg. remove goal directly from 'archive' log file).
- Added support for 'silent' and 'verbose' modes (eg. `Debugger` configuration).
- Added support for `Utils` configuration via `Goalist` constructor.
- Added `Subcommands` section to `README.md`.
- Added `tslint.json`.
- Added the follow development dependencies: `tslint`; `gulp-tslint`; `tslint-eslint-rules`.

### Changed
- Updated `Goalist` class definition: removed `COMMAND`, `INPUT`, and `ARGS` parameters; replaced with `options` object;
- Updated 'import' usage: Goalist now runs in 'silent' mode by default.
- Updated CLI entryoint logic: remove call to `#preflight()` method; simplify Promise chain; ensure that `COMMAND` is captured as a string.
- Updated `#run()` instance method: validate arguments; set default values; ensure that files/folder exist or are created at invocation time.
- Updated `add` command: now returns individual `goal` object; now rejects with an error.
- Updated `archive` command: now rejects with an error.
- Updated `complete` command: now returns individual `goal` object; now rejects with an error.
- Updated `progress` command: now returns a 'progress data' object; only displays bar chart when running in non-silent CLI mode.
- Updated `remove` command: now rejects with an error.
- Updated `update` command: now returns individual `goal` object; now rejects with an error.
- Updated `Goalist` tests.
- Updated Gulp file: added typescript linting tasks.
- Updated `README.md` file: added documentation for non-CLI usage.

### Fixed
- Fixed typos and incorrect documentation in `README.md`

### Removed
- Removed `#preflight()` instance method.

## [0.12.0] - 2018-01-12
### Added
- Added [`chalk`](https://www.npmjs.com/package/chalk) to deps.
- Added support for `list --all` (display all goal properties).
- Added support for `list --show` (replaces `list --only`).

### Changed
- Updated `list` command documentation.
- Removed support for `list --only`.

## [0.11.2] - 2018-01-11
### Added
- Added 'keywords' field to `package.json`.

### Changed
- Remove 'version' from 'help' menu.

## [0.11.1] - 2018-01-11
### Changed
- Updated `README.md`.
- Removed `version` command.

## [0.11.0] - 2018-01-11
### Changed
- Updated input signature of `Goalist` constructor: from `( [ COMMAND, ARGS ] )`; to `( [ COMMAND, INPUT, ARGS ] )`.
- Updated input signature of command functions: from `( ARGS, utils )`; to `( INPUT, ARGS, utils )`.
- Replaced `minimist` with `meow`.
- Removed `minimist` from deps.

## [0.10.2] - 2018-01-10
### Added
- Added tests for 'Goalist'.

### Changed
- Fixed issue where 'main' field in `package.json` file pointed to CLI script.

## [0.10.1] - 2018-01-09
### Changed
- Transpiled TypeScript.

## [0.10.0] - 2018-01-09
### Added
- Added support for 'help' menu (accessed via `--help`).
- Added [`meow`](http://npmjs.com/package/meow) to development dependencies.

### Changed
- Updated 'update' command to display output when 1+ properties are successfully updated.

## [0.9.0] - 2018-01-05
### Changed
- Updated shape of 'goal' data: changed 'status' to 'complete'.
- Updated `Utils` module: added new helper methods; built out tests.
- Updated `README.md`.

## [0.8.0] - 2018-01-02
### Added
-  Added `archive` subcommand.

### Changed
- Updated shape of 'goal' data: added `active` property.
- Updated structure/contents of `logs/` directory: replaced 'daily' log files with 'active'/'archive' logs.
- Updated `list` subcommand: added support for `--archvive` flag; removed feature where `Identifier` key/value is always logged out.
- Updated `Utils` module: removed old/unused methods; refactored existing methods.
- Updated `README.md`.
- Removed old/unused tests.

## [0.7.1] - 2018-01-02
### Changed
- Fixed incorrect output path in `gulpfile.js`: changed from `./lib` to `./dist`.
- Updated `TODO.md`.

## [0.7.0] - 2017-11-22
### Added
- Adding the following dependencies: `merge`;
- Added the following development dependencies: `gulp`; `gulp-typescript`; `typescript`; `@types/node`; `@types/object-assign`.

### Changed
- Converted package internals to `TypeScript` (`src/`).
- Renamed `lib/` to `dist/`.

## [0.6.1] - 2017-11-20
### Added
- Added [TravisCI](https://travis-ci.org/) integration and badge.
- Added [Coveralls](https://coveralls.io) integration and badge.

### Changed
- Bumped [Bar Horizontal](https://github.com/icyflame/bar-horizontal) module to [0.4.0](https://github.com/icyflame/bar-horizontal/releases/tag/v0.4.0).

## [0.6.0] - 2017-11-03
### Added
- Built out remaining tests for `Utils` module.
- Completed first pass of `Debugger` module.

### Changed
- Converted 'utils' and 'goalist' methods into `Utils`/`Goalist` classes.
- Moved setup logic into 'Goalist' module.
- Updated 'command' scripts to receive `Utils` module instance at invocation time.
- Completed misc. updates to program initialization logic (ie. `/index.js`).

## [0.5.0] - 2017-10-26
### Added
- Added [ava](https://github.com/avajs/ava) testing framework to project. Test suite can be run by invoking `npm run test` or `npm run test:verbose`.
- Started implementing tests for `utils` module.
- New log files now include any 'incomplete' goals present within the most recent log.

### Changed
- Updated program to read/write logs from/to `.goalist/logs/`. Previously, each log had a corresponding directory (eh. `.goalist/2017-01-01/goatlist_2017-01-01.log`, etc.).
- Various refactoring: removed `getYesterday*()` methods; added `readLog()`, etc.

## [0.4.0] - 2017-10-21
### Added
- Added `complete` subcommand.
- Added single character aliases for each existing subcommand.

### Changed
- Updated `add` subcommand: display message on success.

## [0.3.0] - 2017-10-18
### Added
- Added `remove` subcommand.

### Changed
- Updated `list` subcommand to accept `--only` flag/argument. See `README` file for usage details.

## [0.2.0] - 2017-10-17
### Added
- Added `progress` subcommand.
- Added `getYesterday*()` methods to `utils` module.

### Changed
- Updated program to merge 'incomplete' tasks from previous day into new log file.
- Updated `add` subcommand to validate presence of `title`.
- Updated `update` subcommand to valid arguments, log errors.
- Updated `utils` methods to print errors if log files cannot be read.

## [0.1.0] - 2017-09-13
### Added
- Completed first pass of `goalist` program. Added support for the following commands: `add`; `list`; `update`.
- Added `README.md`, `CHANGELOG.md`, and `TODO.md` files.
