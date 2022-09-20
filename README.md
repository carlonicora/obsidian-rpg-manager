# Role Playing Game Manager Obsidian Plugin 

Obsidian Role Playing Game Manager is an Obsidian plugin that helps you plot and manage your tabletop role playing game 
campaigns. The plugin revolves around three main points:Plots, Elements and in-game organisation (_coming in 
version 2_).

RPG Manager helps you creating the plot of a campaign, organising and referencing elements where they are used.

_Do you have a non-player character that is involved in a scene? The relationship will be automatically presented in an 
easy-to-reach table which will allow you to works smart_.

The **goal** of RPG Manager is to lower the time needed to write a plot and to increase the quality of the sessions you 
run for your players.

> If you are new to RPG Manager, I would suggest you to skim through the [data structure](#data-structure) and their 
> [hierarchy](#hierarchy-of-plots) and to read more about the various [plots and elements](#plots-and-elements) RPG 
> Manager supports. Once you know these, using this plugin will be a breeze.

Creating a new plot or element is as easy as opening the Obsidian Commands and look for the RPG Manager options to 
create a new element or add the frontmatter and codeblocks to an existing note.

## Table of Contents
1. **[Data Structure](#data-structure)**
2. **[Hierarchy of Plots](#hierarchy-of-plots)**
3. **[Creating new Plots and Elements](#creating-new-plots-and-elements)**
4. **[Relationships between elements](#relationships-between-elements)**
5. **[Frontmatter keys](#frontmatter-keys)**
6. **[Tutorials and help](#tutorials-and-help)**
7. **[Templates](#templates)**
8. **[Change Log](#change-log)**
9. **[Contributing to RPG Manager](#contributing)**

## Data Structure

The plugin organises the Obsidian notes in `Plots` and `Elements`. Each of them has a structure that helps writing and 
keeping track of campaigns. The structure is as follow:

**Plots**
- Campaign
  - Adventures
    - Sessions (_WARNING: this will be renamed to `Acts` in v2_)
      - Scenes

| Plot              | Description                                                                |
|-------------------|----------------------------------------------------------------------------|
| **Campaign**      | The overarching plot of the story                                          |
| **Adventure**     | A self contained story arc focusing on the player characters               |
| **Session (Act)** | The part of the story that is centred on a specific moment of an adventure |
| **Scene**         | A short encounter, or a location, that the player characters plays         |

Every element MUST refer to a campaign they belong to

| Element                  | Descripton                                                     |
|--------------------------|----------------------------------------------------------------|
| **Player Character**     | A character of a player                                        |
| **Non Player Character** | A character managed by the storyteller                         |
| **Event**                | An event which happened without the player characters          |
| **Clue**                 | An item that can provide information to the player characters  |
| **Faction**              | A group of characters                                          |
| **Location**             | A place in your world                                          |
| **Music**                | A specific song or playlist to associate to scenes             |

### How a plot or an element is identified by RPG Manager

RPG Manager uses tags to uniquely identify a plot or to relate an element to a campaign. When using the Obsidian Command
tool to create new plots and elements, RPG Manager will take care of automatically create these tags for you.

**Be aware of editing these tags**: they contain numeric identifiers which allow RPG Manager to work.

## Hierarchy of Plots

RPG Manager follows a structured approach to plotting.

Each **campaign** have many adventures; every **adventure** is composed by three or four acts and evey **act** can contain multiple 
**scenes**.

### A note about plotting

RPG Manager was built with two plotting techniques in mind: 
[ABT](https://github.com/carlonicora/RAW/blob/master/StorytellingGuide.md#abt) and 
[Story Circle](https://github.com/carlonicora/RAW/blob/master/StorytellingGuide.md#abt). These two plotting styles are
very similar and I found them to be very effective to write consistent plots. They are, though, not required from the 
plugin. You can use the style you like.

## Creating new plots and elements

To create new plots and elements, you just need to open the Obsidian Command pane and search for the RPG Manager 
options. For each type of plot or element you will find two options:
- Create
- Fill

When you **create** a new plot or element, RPG Manager will create a new obsidian note. If you **fill** a pre-existing 
note, RPG Manager will add required information to the currently open note.

In either cases, a guided form will help you creating your new plot or element and will fill all the relevant 
frontmatter information and codeblocks.

## Relationships between elements

RPG Manager uses markdown links to create relationships between plots and elements. It knows the type of any specific 
plot and element and presents them in easy-to read tables. If you want to specify the description of a relationship,
you can add the markdown link in the frontmatter of a note followed by the description in the following way:

```
---
[[link to a plot or an element]]: "Description" 
---
```

## Frontmatter keys

RPG Manager uses a series of frontmatter keys in each plot or element. Every key is **optional**.

Each dates (excluding the `in real-life` ones) refers to the in-game calendar inside the campaign. Supported dates are 
only  valid Gregorian calendar dates. The `in-real-life` dates and times refers to real-life dates. 

| Key           | Used in                                    | Description                                                                                                                                |
|---------------|--------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| synopsis      | every plot and element                     | The short description of a plot or element                                                                                                 |
| image         | every plot and element                     | A URL to an image to be used as thubnail for the plot or element                                                                           |
| settings      | `campaign`                                 | The type of role playing game setting to use. RPG Manager is setting-agnostic, but settings for Vampire The Masquerade are in the pipeline |
| dates.current | `campaign`                                 | The date the player characters are playing in your campaign.                                                                               |
| dates.session | `session`                                  | The date the player characters are or have played.                                                                                         |
| dates.irl     | `session`                                  | The real-life date in which the session has been played                                                                                    |
| times.start   | `scene`                                    | The real-life date and time (in YYYY-MM-DD`T`HH:MM format) in which a scene started                                                        |
| times.end     | `scene`                                    | The real-lide date and time (in YYYY-MM-DD`T`HH:MM format) in which a scene ended                                                          |
| pronoun       | `player character`, `non player character` | The pronoun of the character. It accepts `t` (_them/they_), `s` (_she/her?) or `h` (_he/him_)                                              |
| dates.dob     | `player character`, `non player character` | The date of birth of the character.                                                                                                        |
| dates.death   | `player character`, `non player character` | The date of death of the character.                                                                                                        |
| goals         | `non player character`                     | The goals of a non player character                                                                                                        |
| dates.found   | `clue`                                     | The date in which a clue/information has been found by the player character.                                                               |
| dates.event   | `event`                                    | The date in which an event took place                                                                                                      |
| address       | `location`                                 | The address of a location                                                                                                                  |
| url           | `music`                                    | The link to the song or playlist.                                                                                                          |

### A note on images

If you add an image with the same name of a plot or element, this will be used as the note image.

## Tutorials and Help

- [Watch a tutorial on how to use RPG Manager](https://youtu.be/NLvzfOWI4aE)
- [Watch an example of world building and campaign creation](https://youtu.be/die8QGKtk5A)


## Templates

RPG Manager comes with the ability to create plots and elements with specific templates. The plugin comes with some 
intermal templates, but you can specify your own templates when you create a new plot or element.

To use custom templates, please open RPG Manager Settings in Obsidian and specify the folder where your templates 
reside. Your templates can contain both frontmatter and content. Please note, the frontmatter MUST be a valid 
frontmatter for the template to work. The frontmatter in the template will be merged with the frontmatter generated by 
RPG Manager, while the content of the template will be placed between or after the RPG Manager codeblocks.

## Change Log

### Version 1.2: Relationships Update
_2022-09-19_

- Relationships updated
- New `image` frontmatter element added

**Relationships**
Version 1.2 updated the way RPG Manager handles relationships between elements. All the links in a note are now automatically read as a relationships between elements.
If you want to specify a description in the relationship, you can add the link in the frontmatter.
In the frontmatter, the old structure has been replaced with a simple list of links with their description. Each link can be written as a markdown link, without the need to remove the brackets any longer.

```
---
[[Link to another element]]: "Relationship details"
---
```

The frontmatters have been automatically upgraded in all your notes to reflect this change.

**New image frontmatter element**
A new frontmatter element (`image`) has been added to the frontmatter. it accepts a valid url to an image, and instead of using a local image, RPG Manager will show the image of the `image` frontmatter.
If a local image exists in the vault, that will be used and the `image` frontmatter will be ignored.

### version 1.2
_2022-09-12_

`Music` element added.

### version 1.1
_2022-09-12_

Templating added. Please refer to the [templating](#templates) section in this document.

### version 1.0
_2022-09-10_

From version `1.0` RPG Manager does not require the Dataview plugin any longer

## Contributing

Contributions via bug reports, bug fixes, documentation, and general improvements are always welcome. For more major 
feature work, make an issue about the feature idea / reach out to me so we can judge feasibility and how best to 
implement it.

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=U7NBNN7ZQA2J6)
