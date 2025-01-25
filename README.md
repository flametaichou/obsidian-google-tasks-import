## Google Tasks Import Plugin

This is a plugin for [Obsidian](https://obsidian.md) that enables to import exported [Google Tasks](https://tasks.google.com/) data using a [obsidian-kanban](https://github.com/mgmeyers/obsidian-kanban) format.

### Requirements
Tested only on version `1.7.7`, but I think it must work on the older versions.

### Usage
1. Backup your Vault or create a new one for data safety reasons
1. Place the plugin files in the `.obsidian/plugins/google-tasks-import` Vault folder
2. Go to Obsidian Settings and enable the plugin
3. Open [Google Takeout](https://takeout.google.com/) and select only Google Tasks files
4. Download and unzip the takeout archive
5. Open "Google Tasks Import" modal in Obsidian, specify the path to the `Tasks.json` file in the unzipped archive and a the path to the destination folder
6. Wait for the completion

## TODO
*To be honest, I created this plugin for one-time use. Plugin did its job well, but there are still some things that need to be implemented.*

- Add styles to the file input
- Specify dates in `DataWriteOptions`
- Show a loader during the importing
- Make "Kanban plugin things" optional
- Turn on eslint