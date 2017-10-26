# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

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
