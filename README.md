# Role Playing Game Manager Obsidian Plugin 

Obsidian Role Playing Game Manager is an Obsidian plugin that helps you plot and manage your tabletop role playing game 
campaigns.

The plugin works well in conjunction with a
[structured plotting style](https://github.com/carlonicora/RAW/blob/master/StorytellingGuide.md).

The plugin collects data and Frontmatter metadata from the notes and organise them into easy-to access references in
form of tables and links.

### Update notes

#### version 1.1 (2022-09-12)

Templating added. Please refer to the [templating](#templates) section in this document.

#### version 1.0 (2022-09-10)

From version `1.0` RPG Manager does not require the Dataview plugin any longer

## Data Structure

The plugin organises the notes in `Outlines` and `Elements`. Each of them has a structure that helps writing and keeping
track of a campaign. The structure is as follow:

- Campaign (_Outline_)
  - Adventures (_Outline_)
    - Sessions (_Outline_)
      - Scenes (_Outline_)
  - Player Characters (_Element_)
  - Non Player Characters (_Element_)
  - Events (_Element_)
  - Clues (_Element_)
  - Factions (_Element_)
  - Locations (_Element_)
  - Timelines (_Element_)
  - Notes (_Element_)

## TL;DR

1. Use the `Rpg Manager` **commands** to create a new outline or element or to fill an existing note with the correct 
frontmatter and codeblocks.
2. Add the information in the Frontmatter metadata 
3. See everything linking together 
4. Navigate your campaign easily
5. **Send feedback**

[Watch a tutorial on how to use RPG Manager](https://youtu.be/NLvzfOWI4aE)

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

| Element                  | Codeblocks                          | Description                                                                       |
|--------------------------|-------------------------------------|-----------------------------------------------------------------------------------|
| **Campaign**             | `campaign` + `campaignNavigation`   | The overarching story plot for a series of `Adventures`                           |
| **Adventure**            | `adventure` + `adventureNavigation` | A single, self contain storyarc divided in `Sessions`                             |
| **Session**              | `session` + `sessionNavigation`     | A single session of a role playing game containing a series of `Scenes`           |
| **Scene**                | `scene` + `sceneNavigation`         | A part of a `Session` in which the player characters are expected to do something |

### Elements

Elements are other information related to the campaign, which are not in a plot (Player Characters, Non Player 
Characters, Factions, Locations, Events, Clues)

| Element                  | Codeblock  | Description                                                                                                                                                                                                           |
|--------------------------|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Player Character**     | `pc`       | The record sheet of a player character                                                                                                                                                                                |
| **Non Player Character** | `npc`      | The record sheet of a non-playing character                                                                                                                                                                           |
| **Faction**              | `faction`  | A group of player and non-player characters                                                                                                                                                                           |
| **Location**             | `location` | A physical location in the game                                                                                                                                                                                       |
| **Event**                | `event`    | Something that happened in the game. This is something that happened **without the player characters** and it is used to give more details to the storyteller and to simplify the creation of investigative campaigns |
| **Clue**                 | `clue`     | An object or a detail the player character can encounter in the game that will help them understand something and advance the game                                                                                    |
| **Note**                 | `note`     | A note, usually associated to a `Session`, that helps the storyteller to keep track of the player characters' decisions                                                                                               |
| **Timeline**             | `timeline` | A list of elements organised by dates (_if you use dates in your campaign_)                                                                                                                                           |

## Usage

### Frontmatter Metadata

A complete readme on the required structure of the Frontmatter metadata is available [here](frontmatter.md).

### Frontmatter Examples

For more examples of the Frontmatter metadata to be used in each [element](#elements), please refer to the 
[Frontmatter Metadata Documentation](frontmatter.md).

### RpgManager Codeblock

RpgManager uses codeblocks to parse information. You can add one or more codeblocks in a page to display the relevant 
information.

Example of a session codeblock
```
```RpgManager
session
```

### RpgManager Available Codeblock Functions

RpgManager supports the creation of different views. These views are associated to the page element, and they feed from 
the Frontmatter metadata in the page. The available functions are:

| Function              | Description                                                                                                                                    |
|-----------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| `campaignNavigation`  | Displays the banner of the campaign                                                                                                            |
| `campaign`            | Lists the adventures, sessions and characters for the campaign                                                                                 |
| `adventureNavigation` | Displays the breadcrumb and the header                                                                                                         |
| `adventure`           | Lists the adventure sessions                                                                                                                   |
| `sessionNavigation`   | Displays the session navigator                                                                                                                 |
| `session`             | Lists the session scenes                                                                                                                       |
| `sessionNavigation`   | Displays the breadcrumb and the header                                                                                                         |
| `sceneNavigation`     | Displays the breadcrumb and the header                                                                                                         |
| `scene`               | Displays the scene navigator and lists the characters, locations and clues for the scene                                                       |
| `npc`                 | Displays the non player character information and lists the list of factions, characters, events, clues and locations related to the character |
| `pc`                  | Displays the player character information and lists the list of factions, characters and locations related to the character                    |
| `clue`                | Displays the clue information and lists the characters, locations and events related to the clue                                               |
| `event`               | Displays the event information and lists the characters, clues and locations related to the event                                              |
| `location`            | Displays the location information and lists the characters, clues and events related to the location                                           |
| `faction`             | Displays the faction information and lists the characters and locations related to the faction                                                 |
| `timeline`            | Displays a timeline of every event, session and character date in the campaign                                                                 |
| `notes`               | Currently does not display any specific type of information (_under development_)                                                              |

example
```
```RpgManager
campaign
```

### Images

Rpg Manager automatically includes images in the `Attachment` folder. To display an image in an element, the image must 
have the same name of the note. Supported files extensions are `.jpg`, `.jpeg`, `.png` and `.webp`. 

### Templates

Rpg Manager comes with the ability to create outline and elements thrugh Obsidian Commands (`Create a new...` and 
`Fill with...`). The created outlines and elements contains the correct frontmatter and codeblocs, but users can decide 
to add a template to their outline and elements. There are three types of templates available:
- Internal Templates
- Custom Templates
  - Outline-specific and Element-specific custom templates
  - Generic custom templates

#### Internal templates

These templates are hard-coded and always available.

#### Custom Templates

To use custom templates, please open RPG Manager Settings in Obsidian and specify the folder where your templates 
reside.

In the template folder you specified, just add new notes with your templates. The templates can contain both 
frontmatter and content. Please note, the frontmatter MUST be a valid frontmatter for the template to work. The 
frontmatter in the template will be merged with the frontmatter generated by RPG Manager, while the content of the 
template will be placed between or after the RPG Manager codeblocks.

##### Outline-specific and Element-specific custom templates

To create a template that works only with a specific type of RPG Manager outline or element, you just need to add one tag in your template. The tag is:

```yaml
rpgm/template/{type}
```

Where the `type` identifies the type of outline or element.

| Outline or Element Type | tag                                 |
|-------------------------|-------------------------------------|
| Campaign                | `rpgm/template/campaign`            |
| Adventure               | `rpgm/template/adventure`           |
| Session                 | `rpgm/template/session`             |
| Scene                   | `rpgm/template/scene`               |
| Player Character        | `rpgm/template/character`           |
| Non Player character    | `rpgm/template/nonplayercharacter`  |
| Clue                    | `rpgm/template/clue`                |
| Event                   | `rpgm/template/event`               |
| Faction                 | `rpgm/template/faction`             |
| Location                | `rpgm/template/location`            |
| Note                    | `rpgm/template/note`                |
| Timeline                | `rpgm/template/timeline`            |

##### Generic custom templates

Generic templates are templates that can be used with every type of RPG Manager outlines and elements. To make a 
template generic, do NOT add the outline-specific or element-specific template tag as described 
[above](#outline-specific-and-element-specific-custom-templates) 

## Contributing

Contributions via bug reports, bug fixes, documentation, and general improvements are always welcome. For more major 
feature work, make an issue about the feature idea / reach out to me so we can judge feasibility and how best to 
implement it.

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=U7NBNN7ZQA2J6)
