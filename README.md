[![Build Status](https://travis-ci.org/jrmykolyn/goalist.svg?branch=master)](https://travis-ci.org/jrmykolyn/goalist)

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

### `add` / `a`
This command is used to add a new goal to the log file for the current.

```
gl add "This is the title of the goal."
```

### `list` / `l`
This command is used to list all goals present in the log file for the current day. This command is especially useful for goal IDs, which are required by the `update` subcommand.

```
gl list
```

`list` may be invoked with the `--only` flag/argument. When provided with a series of comma delimited strings, `--only` limits the output of `list` to the the strings provided. Please note that the ID for each goal will always be displayed.

```
gl list --only=title,status

// Identifer: 1234567890
// Title: My New Goal
// Status: Incomplete
```

### `update` / `u`
This command is used to update a specific goal within the log file for the current day.

```
gl update {{ ID }} --title="This is the new title of the goal."
```

### `complete` / `c`
This command is used to set the status of a specific goal to 'complete'.

```
gl complete {{ ID }}

// Please note: this is equivalent to invoking: gl update {{ ID }} --status="complete"
```

This command can also be used to set the status of a goal to 'incomplete'.

```
gl complete {{ ID }} --false

// Please note: this is equivalent to invoking: gl update {{ ID }} --status="incomplete"
```

### `remove` / `r`
This command is use to remove a specific goal within the log file for the current day.

```
gl remove {{ ID }}
```

### `progress` / `p`
This command is used to display progress-related information for the current day (eg. total number of goals, number of completed goals, etc.).

```
gl progress
```


## Documentation
Currently, Goalist does not include any external documentation.

For an overview of the project's evolution, please consult the CHANGELOG.
