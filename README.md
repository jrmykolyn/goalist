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
`goalist` exposes the `gl` command, which can be run from the command line. `goalist` also ships with a selection of subcommands. See below for details.

### `add`
This command is used to add a new goal to the log file for the current.

```
gl add "This is the title of the goal."
```

### `list`
This command is used to list all goals present in the log file for the current day. This command is especially useful for goal IDs, which are required by the `update` subcommand.

```
gl list
```

### `update`
This command is used to update a specific goal within the log file for the current day.

```
gl update {{ ID }} --title="This is the new title of the goal."
```

### `progress`
This command is used to display progress-related information for the current day (eg. total number of goals, number of completed goals, etc.).

```
gl progress
```


## Documentation
Currently, Goalist does not include any external documentation.

For an overview of the project's evolution, please consult the CHANGELOG.
