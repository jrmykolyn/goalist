[![Build Status](https://travis-ci.org/jrmykolyn/goalist.svg?branch=master)](https://travis-ci.org/jrmykolyn/goalist)
[![Coverage Status](https://coveralls.io/repos/github/jrmykolyn/goalist/badge.svg?branch=master)](https://coveralls.io/github/jrmykolyn/goalist?branch=master)

# Goalist

## Table of Contents
- [About](#about)
- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
- [Documentation](#documentation)

## About
Goalist is a command line tool for managing daily goals.

## Installation
`npm install -g goalist`

## Setup
Goalist does not require any additional configuration.

## Usage
`goalist` exposes the `gl` command, which can be run from the command line. `goalist` also ships with a selection of subcommands. Each subcommand can be invoked using its full name (eg. `add`), or via a single character alias (eg. `a`). See below for the full list commands.

A help menu can be accessed by invoking `goalist` with the `--help` flag (eg. `goalist --help`).

The current version can be accessed by invoking `goalist` with the `--help` flag (eg. `goalist --version`).

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

### `update` / `u`
This command is used to update a specific goal within the 'active' log file.

```
gl update {{ ID }} --title="This is the new title of the goal."
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

### `remove` / `r`
This command is used to remove a specific goal within the 'active' log file.

```
gl remove {{ ID }}
```

If invoked with the `--archive` flag, this command will attempt to remove the target goal from the 'archive' log file.

```
gl remove {{ ID }} --archive
```

### `progress` / `p`
This command is used to display progress information relating to the 'active' log file (eg. total number of goals, number of completed goals, etc.).

```
gl progress
```

## Documentation
Currently, Goalist does not include any external documentation.

For an overview of the project's evolution, please consult the CHANGELOG.
