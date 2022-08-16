# Role Playing Game Manager Obsidian Plugin 

Obsidian Role Playing Game Manager is an Obsidian plugin that helps you plot and manage your tabletop role playing game 
campaigns. It uses [Obsidian Dataview](https://github.com/blacksmithgu/obsidian-dataview) to reference information 
from different notes inside your vault to simplify the creation and run of complex campaigns.

The plugin works well in conjunction with a 
[structured plotting style](https://github.com/carlonicora/RAW/blob/master/StorytellingGuide.md).

The plugin collects data and Frontmatter metadata from the notes and organise them into easy-to access references in 
form of tables and links.

## TL;DR

1. Use the `Rpg Manager` commands to create a new outline or element
2. Add the information in the Frontmatter metadata 
3. See everything linking together 
4. Navigate your campaign easily
5. **Send feedback**

![](RpgManager.gif)

## Plotting Logic

The plotting style used in this plugin is based on a series of `outlines` and  `elements` that helps the creation of a 
storyline.

A plot is the blueprint of how the story should go, but it is never written in stone, as the actions of the player 
characters define the resulting story.

This style is _setting agnostic_, which means that can be used with any tabletop role playing game, and _rules light_,
which means that it does not (yet) extend into stats or dice rolling. It is a tool to plot stories.

### Outlines

Outlines are the plots of a Campaign, Adventure, Session or Scene. You can read more 
[here](https://github.com/carlonicora/RAW/blob/master/StorytellingGuide.md).

| Element                  | Codeblocks                     | Description                                                                                                                                                                                                           |
|--------------------------|--------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Campaign**             | `campaign`                     | The overarching story plot for a series of `Adventures`                                                                                                                                                               |
| **Adventure**            | `adventure`                    | A single, self contain storyarc divided in `Sessions`                                                                                                                                                                 |
| **Session**              | `session` + `sessionNavigator` | A single session of a role playing game containing a series of `Scenes`                                                                                                                                               |
| **Scene**                | `scene` + `sceneNavigator`     | A part of a `Session` in which the player characters are expected to do something                                                                                                                                     |

### Elements

Elements are other information related to the campaign, which are not in a plot (Player Characters, Non Player 
Characters, Factions, Locations, Events, Clues)

| Element                  | Codeblock                      | Description                                                                                                                                                                                                           |
|--------------------------|--------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Player Character**     | `pc`                           | The record sheet of a player character                                                                                                                                                                                |
| **Non Player Character** | `npc`                          | The record sheet of a non-playing character                                                                                                                                                                           |
| **Faction**              | `faction`                      | A group of player and non-player characters                                                                                                                                                                           |
| **Location**             | `location`                     | A physical location in the game                                                                                                                                                                                       |
| **Event**                | `event`                        | Something that happened in the game. This is something that happened **without the player characters** and it is used to give more details to the storyteller and to simplify the creation of investigative campaigns |
| **Clue**                 | `clue`                         | An object or a detail the player character can encounter in the game that will help them understand something and advance the game                                                                                    |
| **Note**                 | `note`                         | A note, usually associated to a `Session`, that helps the storyteller to keep track of the player characters' decisions                                                                                               |

## Usage

### Frontmatter Metadata

A complete readme on the required structure of the Frontmatter metadata is available [here](frontmatter.md). As 
Frontmatter metadata can be quite temperamental if you you write them incorrectly. Please make sure to familiarise 
yourself on how to correctly write them and check their validity using the Reading View in Obsidian.

### Frontmatter Examples

For more examples of the Frontmatter metadata to be used in each [element](#elements), please refer to the 
[Frontmatter Metadata Documentation](frontmatter.md).

### RpgManager Codeblock

To start using RpgManager, please [install and activate it](#installation) in your Obsidian vault and then use a 
`RpgManager` codeblock with the name of the type of [element](#elements) you want to use.

Example of a session codeblock
```
```RpgManager
session
```

### RpgManager Available Codeblock Functions

RpgManager supports the creation of different views. These views are associated to the page element, and they feed from 
the Frontmatter metadata in the page. The available functions are:

| Function            | Description                                                                                                                                    |
|---------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| `campaign`          | Lists the adventures, sessions and characters for the campaign                                                                                 |
| `adventure`         | Lists the adventure sessions                                                                                                                   |
| `sessionNavigation` | Displays the session navigator                                                                                                                 |
| `session`           | Lists the session scenes                                                                                                                       |
| `sceneNavigation`   | Displays the session navigator                                                                                                                 |
| `scene`             | Displays the scene navigator and lists the characters, locations and clues for the scene                                                       |
| `sceneNavigation`   | Displays the scene navigator and lists the scene goal and player characters expected action                                                    |
| `npc`               | Displays the non player character information and lists the list of factions, characters, events, clues and locations related to the character |
| `pc`                | Displays the player character information and lists the list of factions, characters and locations related to the character                    |
| `clue`              | Displays the clue information and lists the characters, locations and events related to the clue                                               |
| `event`             | Displays the event information and lists the characters, clues and locations related to the event                                              |
| `location`          | Displays the location information and lists the characters, clues and events related to the location                                           |
| `faction`           | Displays the faction information and lists the characters and locations related to the faction                                                 |
| `timeline`          | Displays a timeline of every event, session and character date in the campaign                                                                 |
| `notes`             | Currently does not display any specific type of information (_under development_)                                                              |

example
```
```RpgManager
campaign
```

### Images

Rpg Manager automatically includes images in the `Attachment` folder. To display an image in an element, the image must 
have the same name of the note. Supported files extensions are `.jpg`, `.jpeg`, `.png` and `.webp`. 

### Templates

Using Rpg Manager Commands (`Create a new...`) you have access to pre-designed templates which contains the correct 
frontmatter and codeblocks for each `outline` and `element`.

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
