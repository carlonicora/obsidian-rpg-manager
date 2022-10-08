@TODO: Update README.md
@TODO: Update frontmatter.md
@TODO: Update codeblocks.md
@TODO: Update PlotsAndElements.md
@TODO: Update ChangeLog.md

# Role Playing Game Manager Obsidian Plugin 

Obsidian Role Playing Game Manager is an Obsidian plugin that helps you plot and manage your tabletop role playing game 
campaigns. The plugin revolves around three main types of components: 
- **Plotting** (_when you plan your campaign_)
- **Running** (_when you run play campaign_)
- **Elements** (_the npcs, locations, etc... present in your plots_)

RPG Manager helps you creating the plot of a campaign, organising and referencing elements where they are used.

The **goal** of RPG Manager is to lower the time needed to write a plot and to increase the quality of the sessions you 
run for your players.

> If you are new to RPG Manager, I would suggest you to skim through the [data structure](#data-structure) and their 
> [hierarchy](#hierarchy-of-plots) and to read more about the various [components](#components) RPG Manager supports. 
> Once you know these, using this plugin will be a breeze.

Creating a new plot or element is as easy as opening the **Obsidian Commands** and look for the RPG Manager options to 
create a new element or add the frontmatter and codeblocks to an existing note. You can also use the ribbon icon to 
open a handy tool.

## Table of Contents
1. **[Data Structure](#data-structure)**
2. **[Hierarchy of Plots](#hierarchy-of-plots)**
3. **[Creating new Components](#creating-new-components)**
4. **[Relationships between Components](#relationships-between-components)**
5. **[Frontmatter keys](#frontmatter-keys)**
6. **[Code blocks](#code-blocks)** 
7. **[Plot Structures](#plot-structures)**
8. **[Scene Analyser](#scene-analyser)**
9. **[Tutorials and help](#tutorials-and-help)**
10. **[Templates](#templates)**
11. **[Change Log](ChangeLog.md)**
12. **[Contributing to RPG Manager](#contributing)**

## Data Structure

Each component has a structure that helps writing and keeping track of campaigns. The structure is as follow:

### Plots

> **Campaign** > **Adventures** > **Acts** > **Scenes**

Please note that this hierarchical structure is not modifiable. It is designed to help you write your campaings
splitting them in smaller and more manageable chunks

| Plot          | Description                                                               |
|---------------|---------------------------------------------------------------------------|
| **Campaign**  | The overarching plot of the story                                         |
| **Adventure** | A self contained story arc focusing on the player characters              |
| **Act**       | The part of a story that is centred on a specific moment in an adventure  |
| **Scene**     | A short encounter, or a location, that the player characters play         |


### Elements

> Every element **MUST** refer to a campaign they belong through its tags

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

### Running elements

> Every running element **MUST** refer to a campaign they belong to

| Element     | Descripton                                                                    |
|-------------|-------------------------------------------------------------------------------|
| **Session** | An `real life` game session, used to group together multiple plotted `scenes` |

### How a component is identified by RPG Manager

RPG Manager uses tags to uniquely identify a plot or to relate an element to a campaign. When using the Obsidian Command
tool to create new plots and elements, RPG Manager will take care of automatically create these tags for you.

RPG Manager uses default tags, but you can change them in the settings.

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

> Be aware of manually editing these tags: they contain numeric identifiers which allow RPG Manager to work.

## Hierarchy of Plots

RPG Manager follows a structured approach to plotting.

> Each **campaign** have many adventures; every **adventure** is composed by three or four acts and evey **act** can 
> contain multiple **scenes**.

### A note about plotting

RPG Manager was built with two plotting techniques in mind: 
[ABT](https://github.com/carlonicora/RAW/blob/master/StorytellingGuide.md#abt) and 
[Story Circle](https://github.com/carlonicora/RAW/blob/master/StorytellingGuide.md#story-circle). These two plotting 
styles are very similar and I found them to be very effective to write consistent plots. They are, though, not 
required from the plugin. You can use the style you like.

## Creating new components

To create new plots and elements, you just need to open the Obsidian Command pane and search for the RPG Manager 
options. For each type of plot or element you will find two options:
- Create
- Fill

When you **create** a new plot or element, RPG Manager will create a new obsidian note. If you **fill** a pre-existing 
note, RPG Manager will add required information to the currently open note.

In either cases, a guided form will help you creating your new plot or element and will fill all the relevant 
frontmatter information and codeblocks.

You can also create new components from the RPG Manager view reachable from the d20 ribbon icon.

New components can be created as an empty shell with only the frontmatter and codeblocks, using a default template 
(_default option_), or using your own templates. To use your own templates you must identify the folder that contains
your templates and select the corresponding template during the component creation. The frontmatter of your template
will be merged with the frontmatter generated by RPG Manager, while the content of your notes will be added after the 
first codeblock of the component.

## Relationships between Components

RPG Manager uses markdown links and custom link definitions to create relationships between components. 
As it knows the type of any specific component, RPG Manager presents them in easy-to read tables grouped by type. 

Please note, for describing a relationship between two component, we will use the term `component` for the component in
which the relationship is created (_a location, for example_), and the terms `related` for the component which is defined
by the relationship (_the clue in the location, for example_).

The description of a relationship is relevant and available only for the `component`. In any other case, the synopsis
of the `related` is used.

### Creating and Describing Relationships

#### Creating Relationships

There are two ways for creating a relationship. The first is to add a link to another note, it is as simple as that. 
RPG Manager will read the changes in your file and will create a [biunivocal relationship](#biunivocal-relationships)
between the `component` and the `related`.
The second way is through the use of the `Relationship Manager` which can be found in every header of every component.
By clicking the link, RPG Manager will open a modal window that will show you all the components your `component` can be
related do, and allow you to create and edit these relationships. From here you can also decide the type of 
relationship. These relationships are created in the first codeblock of your `component`. For more information about it,
please refer to the [codeblock documentation](codeblocks.md).

#### Describing Relationships

Every relationship can carry a specific description to specify the relationship between the `component` and the 
`related`. This information is stored in the codeblock, and can be modified by editing the codeblock itself. For ease of
use, every relationship that can specify its description shows a link to edit the description which will open the 
codeblock and position the cursor directly on top of the description of the relationship in queston.

### Types of Relationships

> There are 3 types of relationships you can create:
> - **Univocal**
> - **Biunivocal**
> - **Child**

#### Univocal Relationships

Univocal relationships are those who are relevant only for the `component` you are creating. They are seen only by the 
`component` and not by the `related`. An example of a univocal relationship is the one between a non-player
character and another one. The relationship is relevant only for the `component` and the description (_if present_) 
is specifically written for the `component`

#### Biunivocal Relationships

Biunivocal relationships are the most common type of relationships in RPG Manager. They are created in the `component`
but they are shown in the `related` as well.

#### Child Relationships

Child relationships are special type of relationships that creates a hierarchical list of components. The relationship
is visible in both the `component` and the `related`, but they are shown in different lists.

### Exceptions

Please keep in mind that plots have limited access to relationships, as they are generally managed as hierarchical
relationships.

## Frontmatter keys

RPG Manager uses a series of frontmatter keys in each plot or element. For details on frontmatter keys, please refer to 
the [frontmatter document](frontmatter.md).

## Code Blocks

Every component uses one or more RpgManager codeblocks, which are automatically added to the notes to dynamically 
display the information and relationship for the current note. For details on codeblocks and their options, please 
refer to the [codeblock documentation](codeblocks.md).

### A note on images

If you add an image with the same name of a plot or element, this will be used as the note image.

## Plot Structures

RPG Manager allows the use of two specific plot structures to simplify the plotting of campaigns, adventures and acts. 
These are the [ABT](https://github.com/carlonicora/RAW/blob/master/StorytellingGuide.md#abt) and
[Story Circle](https://github.com/carlonicora/RAW/blob/master/StorytellingGuide.md#story-circle). These two supports to 
writing plots are available by switching on the functionality in the settings of RPG Manager.

THe ABT and Story Circle plot contents can be found in the first codeblock of [Plot Components](#plots). By adding 
text in the codeblock, the structures will be visible in the headers of the plots.

## Scene Analyser

From `v3.0`, RPG Manager comes with a tool called `Scene Analyser`. This is a tool that analyses the scene you wrote and
creates a report on your acts and sessions. This report tells you if there are problems with the group of scenes making 
up an act or a scene and is an important tool to provide feedback you can use to tweak your sessions to make them more
balanced. The Analyser keep into consideration the duration of your past scenes during runtime thanks to a timer, and 
estimate the running time of an act or a session when you create their scenes.

To use the `Scene Analyser`, you should activate this function from RPG Manager Settings. Please note, the analyser 
bases its analysis on a set of information provided during the creation of the scenes. The type of scenes and a flag
that identifies if something happens to the player characters from an external source are two of the information that
are kept into consideration during the analysis.

You can set the information required by the `Scene Analyser` in the scene, session or act components. 

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
