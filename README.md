# react-file-explorer
Customizable and responsive file explorer component for React applications.

# Getting Started
## Installing
```
npm install --save react-file-explorer
```

## Demo
[React File Explorer](http://react-file-explorer.surge.sh/)

## Properties

| Name | Type | Default | Required | Description |
| ---- | ---- | ------- | -------- | ----------- |
| data | array | [] | yes | The array of objects representing files and folders to be listed. See dedicated paragraph [here](#data) |
| showHistory | boolean | true | no | Whether or not to show navigable history |
| rootLabel | string | 'Home' | no | Text to be shown as history root |
| onViewModeChange | function | () | no | Callback fired after the view mode changes |
| onSortModeChange | function | () | no | Callback fired after the sort mode changes |
| sortableByName | boolean | true | no | Whether or not show 'Sort by name' option in menu |
| sortableBySize | boolean | true | no | Whether or not show 'Sort by size' option in menu |
| sortableByType | boolean | true | no | Whether or not show 'Sort by type' option in menu |
| sortableByLastEdit | boolean | true | no | Whether or not show 'Sort by last edit' option in menu |
| onRename | function | (id, name) | no | Callback fired after a rename operation |
| onDelete | function | (id) | no | Callback fired after a delete operation |

## Data
Data is an array of objects representing the entire structure of files and folders.

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| id | string or number | yes | Object identifier, must be unique |
| name | string | yes | Name to be shown |
| children | array | no | Weather is a file or a folder |

**NOTE**: An empty children array means that the object is an empty folder.

## Style
You can add your custom style with both CSS and styled-components.

Those are the list of classes that you should override in order to customize the component.

#### File Explorer
.container

#### History
.history
.history-level

#### Menu
.menu
.first-level
.nested-level

#### Item
.node
.icon
.filename
.renaming-form
.renaming-form-input

**IMPORTANT**: In order to override existing style, sometimes you need to use the !important keyword.
