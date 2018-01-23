[![Build Status](https://travis-ci.org/jrmykolyn/goalist.svg?branch=master)](https://travis-ci.org/jrmykolyn/goalist)
[![Coverage Status](https://coveralls.io/repos/github/jrmykolyn/goalist/badge.svg?branch=master)](https://coveralls.io/github/jrmykolyn/goalist?branch=master)

# Goalist

## Table of Contents
- [About](#about)
- [Installation](#installation)
	- Overview
	- CLI
	- Import
- [Setup](#setup)
- [Usage](#usage)
	- Overview
	- CLI
	- Import
- [Documentation](#documentation)

## About
Goalist is a tool for managing daily goals. Goalist can be run directly from the command line, or imported by a dependent script.

## Installation

### Overview

Goalist can be installed in multiple ways depending on the use case. To interact with Goalist's CLI, follow the 'CLI' installation instructions. To use the Goalist module within a dependent script, follow the 'Import' installation instructions.

### CLI

To install Goalist globally, run the command below:

```
npm install -g goalist
```

### Import

To install Goalist as a dependency within a node/npm project, run the command below:

```
npm install --save goalist
```

## Setup
Goalist does not require any additional configuration.

## Usage

### Overview

The Goalist module may used/accessed in either of the following ways:

- via import by/within a dependent script;
- via CLI.

Documentation for both modes is provided below.

### CLI

When installed globally, Goalist exposes the `gl` command. Running `gl` from the command line will display the help menu. In order to interact with the core functionality of the Goalist package, a selection of subcommands are exposed. Each subcommand can be invoked using its full name (eg. `add`), or via a single character alias (eg. `a`). See below for the full list commands.

Please note:
- The help menu can *also* be accessed by invoking `gl` with the `--help` flag (eg. `gl --help`).
- The current version can be accessed by invoking `gl` with the `--version` flag (eg. `gl --version`).
- Goalist can be run in 'silent' mode by invoking `gl {{ COMMAND }}` with the `--silent` flag (eg. `gl add "My new goal." --silent`). This suppresses all output.
- Goalist can be run in 'verbose' mode by invoking `gl {{ COMMAND }}` with the `--verbose` flag (eg. `gl list --verbose`). This displays additional information about the internals of a given command, and may be useful for debugging purposes.

### `add` / `a`
This command is used to add a new goal to the log file for the current.

```
gl add "This is the title of the goal."
```

### `archive` / `ar`
This command is used to archive/deactivate a given goal.

```
gl archive {{ ID }}
```

Executing the command above will result in the following:
- Target goal is moved from the 'active' log file to the 'archive' file.
- Target goal will have its `active` key/property set to `false`.

When invoked with the `--active` flag, this command will perform the reverse operation.

```
gl archive {{ ID }} --active
```

Executing the command above will result in the following:
- Target goal is moved from the 'archive' log file to the 'active' file.
- Target goal will have its `active` key/property set to `true`.

### `backup` / `b`
This command is used to created a backup of the 'active' log file.

```
gl backup
```

When invoked with the `--archive` file, an 'archive' log file backup is created instead.

```
gl backup --archive
```

### `complete` / `c`
This command is used to set the status of a specific goal to 'complete'.

```
gl complete {{ ID }}

// Please note: this is equivalent to invoking: gl update {{ ID }} --complete=true
```

This command can also be used to set the status of a goal to 'incomplete'.

```
gl complete {{ ID }} --false

// Please note: this is equivalent to invoking: gl update {{ ID }} --complete=false
```

### `list` / `l`
This command is used to list all goals present in the 'active' log file. This command is especially useful for goal IDs, which are required by the `update` subcommand. By default, only the ID and title for each goal will be displayed.

```
gl list
```

When invoked with the `--archive` flag, this command will display the contents of the 'archive' log file.

```
gl list --archive
```

To display **all** of the data for a given goal, invoke the `list` command with the `--all` flag/argument.

```
gl list --all
gl list --archive --all
```

To display specific properties , the `list` command may be invoked with the `--show` flag. When provided with a series of comma delimited strings, `--show` flag displays the corresponding properties (in addition to the ID and title).

```
gl list --show=title,complete

// title: My New Goal
// complete: true
```

### `progress` / `p`
This command is used to display progress information relating to the 'active' log file (eg. total number of goals, number of completed goals, etc.).

```
gl progress
```

### `remove` / `r`
This command is used to remove a specific goal within the 'active' log file.

```
gl remove {{ ID }}
```

If invoked with the `--archive` flag, this command will attempt to remove the target goal from the 'archive' log file.

```
gl remove {{ ID }} --archive
```

### `update` / `u`
This command is used to update a specific goal within the 'active' log file.

```
gl update {{ ID }} --title="This is the new title of the goal."
```

### Import

When installed locally, Goalist can be imported into a dependent script.

```
const Goalist = require( 'goalist' );
```

After Goalist has been imported, create a new instance as follows:

```
let goalist = new Goalist();
```

By default, Goalist will write to/read from a hidden `.goalist` folder within the the current user's home directory. This behavior can be overridden by providing an object with a key of `utilsOpts` at instantiation time.

```
let goalist = new Goalist( {
	utilsOpts: {
		path: '/path/to/custom/goalist/dir',
	},
} );
```

By default, Goalist does not log any information to stdout. However, this behavior can be enabled by providing an object with a key of `debuggerOpts` at instantiation time.

```
let goalist = new Goalist( {
	debuggerOpts: {
		mode: 'verbose', // Valid values are: 'verbose'; 'normal'; 'silent'.
	},
} );
```

Goalist exposes the `#run()` instance method, which is used to execute individual subcommands.

```
goalist.run( 'list' ); // Execute the 'list' subcommand.
```

`#run()` returns a Promise, which will resolve or reject depending on whether the operation was successful. To access the data returned by the `#run()` method, invoke the `.then( ... )` on the value returned by `#run()`.

```
goalist.run( 'list' )
	.then( ( data ) => {
		// Do something with the data returned by 'list' here.
	} )
	.catch( ( err ) => {
		// Handle potential errors here.
	} );
```

Some of the Goalist subcommands require additional information in order to function properly (this is generally the case if the subcommand operates on a specific goal). These can be provided by invoking the `#run()` command with a second argument.

```
goalist.run( 'complete', [ '1516126195749' ] ); // Mark the goal with id '1516126195749' as complete.
```

Additional options can be provided by invoking `#run()` with a third argument.

```
goalist.run( 'update', [ '1516126195749' ], { title: 'My cool new title.' } ); // Update the title property of the goal with id '1516126195749'.
```

For cases where the options object is required but the array of supplementary information is not, provide an empty array or null value as the second argument.

```
goalist.run( 'list', [], { archive: true } ); // List all of the 'archived' goals.

goalist.run( 'backup', null, { archive: true } ); // Create a backup of the 'archived' goals file.
```

## Documentation
Currently, Goalist does not include any external documentation.

For an overview of the project's evolution, please consult the CHANGELOG.
