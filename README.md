# Obsidian Role Playing Game Manager 

Obsidian Role Playing Game Manager is an Obsidian plugin that helps you plot and manage your tabletop role playing game 
campaigns. It uses [Obsidian Dataview](https://github.com/blacksmithgu/obsidian-dataview) to reference information 
from different notes inside your vault to simplify the creation and run of complex campaigns.

The plugin works well in conjunction with a [structured plotting style](https://github.com/carlonicora/RAW/blob/master/StorytellingGuide.md) and with some [available templates]().

The plugin collects data and Frontmatter metadata from the notes and organise them into easy-to access references in 
form of tables and links.

## Plotting Logic

The plotting style used in this plugin is based on a series of `elements` that helps the creation of storylines.

A plot is the blueprint of how the story should go, but it is never written in stone, as the actions of the player 
characters define the resulting story.

This style is _setting agnostic_, which means that can be used with any tabletop role playing game, and _rules light_,
which means that it does not (yet) extend into stats or dice rolling. It is a tool to plot stories.

### Elements

| Element| Codeblock| Description |
|---|---|---|
|**Campaign**| `campaign` | The overarching story plot for a series of `Adventures`               |
|**Adventure**| `adventure` | A single, self contain storyarc divided in `Sessions`                 |
|**Session**| `session` + `sessionNavigator` | A single session of a role playing game containing a series of `Scenes` |
|**Scene**| `scene` | A part of a `Session` in which the player characters are expected to do something|
|**Player Character**| `pc` | The record sheet of a player character|
|**Non Player Character**| `npc` | The record sheet of a non-playing character|
|**Faction**| `faction` | A group of player and non-player characters|
|**Location**| `location` | A physical location in the game|
|**Event**| `event` | Something that happened in the game. This is something that happened **without the player characters** and it is used to give more details to the storyteller and to simplify the creation of investigative campaigns|
|**Clue**| `clue` | An object or a detail the player character can encounter in the game that will help them understand something and advance the game|
|**Note**| `note` | A note, usually associated to a `Session`, that helps the storyteller to keep track of the player characters' decisions|

## Usage

### Frontmatter Metadata

A complete readme on the required structure of the Frontmatter metadata is available [here](frontmatter.md). As 
Frontmatter metadata can be quite temperamental if you you write them incorrectly, please make sure to familiareise 
yourself on how to correctly write them and check their validity using the Reading View in Obsidian.

### Frontmatter Examples

For more examples of the Frontmatter metadata to be used in each [element](#elements), please refer to the 
[Frontmatter Metadata Documentation](frontmatter.md).

### Frontmatter Metadata: pro and con

This plugin heavily uses Frontmatter metadata. The metadata are used to criscross information from various sources and 
display them when they are needed. While this works flawlessly, links between notes are not automatically managed in 
Obsidian. This means that using this plugin "_as-is_" won't generate the correct Graph View in Obsidian. This is a 
tradeoff which can be a deal-breaker for some of you. Unfortunately this is something that can't be solved at the 
moment.

The decision to use Frontmatter information for the relationships has been made to provide a platform to simplify the 
plotting and running of campaigns. We have decided to prioritise the usage of metadata over links in the body of a note, 
and hence the usage of Graph View, to display information where they matter during the running of the game.

One possible solution to the cons of having the relationships in the Frontmatter is to copy the links in the body of a 
note. 

RpgManager includes the elements included in the body of the note in the list of elements; however, they do not have 
any specific metadata information associated to them.

### RpgManager Codeblock

To start using RpgManager, please [install and activate it](#installation) in your Obsidian vault and then use a 
`RpgManager` codeblock with the name of the type of [element](#elements) you want to use.

Example of a session codeblock
```
```RpgManager
session
```

### RpgManager Available Functions

RpgManager supports the creation of different views. These views are associated to the page element, and they feed from 
the Frontmatter metadata in the page. The available functions are:

| Function             | Description                                                                                                                                    |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| `campaign`           | Lists the adventures, sessions and characters for the campaign                                                                                 |
| `adventure`          | Lists the adventure sessions                                                                                                                   |
| `sessionNavigation`  | Displays the session navigator                                                                                                                 |
| `session`            | Lists the session scenes                                                                                                                       |
| `scene`              | Displays the scene navigator and lists the characters, locations and clues for the scene                                                       |
| `npc`                | Displays the non player character information and lists the list of factions, characters, events, clues and locations related to the character |
| `pc`                 | Displays the player character information and lists the list of factions, characters and locations related to the character                    |
| `clue`               | Displays the clue information and lists the characters, locations and events related to the clue                                               |
| `event`              | Displays the event information and lists the characters, clues and locations related to the event                                              |
| `location`           | Displays the location information and lists the characters, clues and events related to the location                                           |
| `faction`            | Displays the faction information and lists the characters and locations related to the faction                                                 |
| `timeline`           | Displays a timeline of every event, session and character date in the campaign                                                                 |
| `notes`              | Currently does not display any specific type of information (_under development_)                                                              |

example
```
```RpgManager
campaign
```

### Images

Rpg Manager automatically includes images in the `Attachment` folder. To display an image in an element, the image must 
have the same name of the note. Supported files extensions are `.jpg`, `.jpeg` and `.png`. 

### Templates

We have created a set of templates, one for each of the [elements](#elements), you can download and use to simplify 
your life. Each templates comes with the correct Frontmatter metadata, but it is completely customiseable. To use the 
templates, just download them from the [github repository](https://github.com/carlonicora/obsidian-rpgmanager-templates) 
and import them in your `template` folder in Obsidian.

The templates are simple obsidian templates and don't require any additional plugin. To use them, please make sure you
enable the plugin "Templates" in the "Core Plugins" in your Obsidian vault.

## Installation

### Requirements

This plugin makes use of [Obsidian Dataview](https://github.com/blacksmithgu/obsidian-dataview) to organise the 
information. Please make sure you have the dataview community plugin installed.

### Manually installing the plugin

Go to the [releases]() and download the latest `main.js`, `manifest.json` and `styles.css` files. Create a folder 
called `obsidian-rpg-manager` inside .obsidian/plugins and place both files in it.

### Compatibility

This plugin has been tested on both MacOS and iOS. The relationships and the images are correctly loaded. If you find 
any issue on other platforms, please get in touch.

### Contributing
Contributions via bug reports, bug fixes, documentation, and general improvements are always welcome. For more major 
feature work, make an issue about the feature idea / reach out to me so we can judge feasibility and how best to 
implement it.

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=U7NBNN7ZQA2J6)
