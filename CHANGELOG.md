# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
### Added
- Add `getYesterday*()` methods to `utils` module.

### Changed
- Updated program to merge 'incomplete' tasks from previous day into new log file.
- Updated `add` subcommand to validate presence of `title`.
- Updated `update` subcommand to valid arguments, log errors.

## [0.1.0] - 2017-09-13
### Added
- Completed first pass of `goalist` program. Added support for the following commands: `add`; `list`; `update`.
- Added `README.md`, `CHANGELOG.md`, and `TODO.md` files.
