# Role Playing Game Manager Obsidian Plugin 

Obsidian Role Playing Game Manager is an Obsidian plugin that helps you plot and manage your tabletop role playing game 
campaigns. The plugin revolves around three main **components**: **Plotting**, **Running** and the **Elements** of a 
Campaign.

RPG Manager helps you creating the plot of a campaign, organising and referencing elements where they are used.

_Do you have a non-player character that is involved in a scene? The relationship will be automatically presented in an 
easy-to-reach table which will allow you to works smart_.

The **goal** of RPG Manager is to lower the time needed to write a plot and to increase the quality of the sessions you 
run for your players.

> If you are new to RPG Manager, I would suggest you to skim through the [data structure](#data-structure) and their 
> [hierarchy](#hierarchy-of-plots) and to read more about the various [components](#components) RPG Manager supports. 
> Once you know these, using this plugin will be a breeze.

Creating a new plot or element is as easy as opening the Obsidian Commands and look for the RPG Manager options to 
create a new element or add the frontmatter and codeblocks to an existing note. You can also use the ribbon icon to 
open a handy tool. 

## Table of Contents
1. **[Data Structure](#data-structure)**
2. **[Hierarchy of Plots](#hierarchy-of-plots)**
3. **[Creating new Components](#creating-new-components)**
4. **[Relationships between Components](#relationships-between-components)**
5. **[Frontmatter keys](#frontmatter-keys)**
6. **[Code blocks](#code-blocks)** 
6. **[Tutorials and help](#tutorials-and-help)**
7. **[Templates](#templates)**
8. **[Change Log](ChangeLog.md)**
9. **[Contributing to RPG Manager](#contributing)**

## Data Structure

Each component has a structure that helps writing and keeping track of campaigns. The structure is as follow:

**Plots**
- Campaign
  - Adventures
    - Acts
      - Scenes

| Plot          | Description                                                                |
|---------------|----------------------------------------------------------------------------|
| **Campaign**  | The overarching plot of the story                                          |
| **Adventure** | A self contained story arc focusing on the player characters               |
| **Act**       | The part of the story that is centred on a specific moment of an adventure |
| **Scene**     | A short encounter, or a location, that the player characters plays         |


**Elements**

Every element MUST refer to a campaign they belong to

| Element                  | Descripton                                                           |
|--------------------------|----------------------------------------------------------------------|
| **Subplot**              | A side plot to the main campaing, used to organise events and clues  |
| **Player Character**     | A character of a player                                              |
| **Non Player Character** | A character managed by the storyteller                               |
| **Event**                | An event which happened without the player characters                |
| **Clue**                 | An item that can provide information to the player characters        |
| **Faction**              | A group of characters                                                |
| **Location**             | A place in your world                                                |
| **Music**                | A specific song or playlist to associate to scenes                   |

**Running elements**

Every running element MUST refer to a campaign they belong to

| Element     | Descripton                                                                    |
|-------------|-------------------------------------------------------------------------------|
| **Session** | An `real life` game session, used to group together multiple plotted `scenes` |

### How a component is identified by RPG Manager

RPG Manager uses tags to uniquely identify a plot or to relate an element to a campaign. When using the Obsidian Command
tool to create new plots and elements, RPG Manager will take care of automatically create these tags for you.

RPG Manager uses default tags, but you can change them in the settings

| Component                | Default Tag    | Required id(s)                               |
|--------------------------|----------------|----------------------------------------------|
| **Campaign**             | rpgm/campaign  | {campaignId}                                 |   
| **Adventure**            | rpgm/adventure | {campaignId}/{adventureId}                   |
| **Act**                  | rpgm/act       | {campaignId}/{adventureId}/{actId}           |
| **Scene**                | rpgm/scene     | {campaignId}/{adventureId}/{actId}/{sceneId} |
| **Session**              | rpgm/session   | {campaignId}                                 |
| **Subplot**              | rpgm/subplot   | {campaignId}                                 |
| **Player Character**     | rpgm/pc        | {campaignId}                                 |
| **Non Player Character** | rpgm/npc       | {campaignId}                                 |
| **Event**                | rpgm/event     | {campaignId}                                 |
| **Clue**                 | rpgm/clue      | {campaignId}                                 |
| **Faction**              | rpgm/faction   | {campaignId}                                 |
| **Location**             | rpgm/location  | {campaignId}                                 |
| **Music**                | rpgm/music     | {campaignId}                                 |

**Be aware of editing these tags**: they contain numeric identifiers which allow RPG Manager to work.

## Hierarchy of Plots

RPG Manager follows a structured approach to plotting.

Each **campaign** have many adventures; every **adventure** is composed by three or four acts and evey **act** can contain multiple 
**scenes**.

### A note about plotting

RPG Manager was built with two plotting techniques in mind: 
[ABT](https://github.com/carlonicora/RAW/blob/master/StorytellingGuide.md#abt) and 
[Story Circle](https://github.com/carlonicora/RAW/blob/master/StorytellingGuide.md#story-circle). These two plotting styles are
very similar and I found them to be very effective to write consistent plots. They are, though, not required from the 
plugin. You can use the style you like.

## Creating new components

To create new plots and elements, you just need to open the Obsidian Command pane and search for the RPG Manager 
options. For each type of plot or element you will find two options:
- Create
- Fill

When you **create** a new plot or element, RPG Manager will create a new obsidian note. If you **fill** a pre-existing 
note, RPG Manager will add required information to the currently open note.

In either cases, a guided form will help you creating your new plot or element and will fill all the relevant 
frontmatter information and codeblocks.

You can also create new components from the RPG Manager view reachable from the d20 ribbon icon

## Relationships between Components

RPG Manager uses markdown links to create relationships between plots and elements. It knows the type of any specific 
plot and element and presents them in easy-to read tables. If you want to specify the description of a relationship,
you can add the markdown link in the frontmatter of a note followed by the description in the following way:

```
---
[[link to a plot or an element]]: "Description" 
---
```

## Frontmatter keys

RPG Manager uses a series of frontmatter keys in each plot or element. Every key is **optional**. For details on 
frontmatter keys for each component, please refer to the [frontmatter document](frontmatter.md).

## Code Blocks

Every component uses one or more RpgManager codeblocks, which are automatically added to the notes to dynamically 
display the information and relationship for the current note. For details on codeblocks and their options, please 
refer to the [codeblock documentation](codeblocks.md).

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

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=U7NBNN7ZQA2J6)
