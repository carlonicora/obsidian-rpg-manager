# Frontmatter Specifications for Rpg Manager

## Introduction

One of the things to remember about Frontmatter metadata is that it is a [YAML](https://en.wikipedia.org/wiki/YAML) 
code, and it must follow some specific rules.
- Tabs are NOT allowed in YAML. You should use space for indention.
- Though the amount of space doesn't matter as long as the child node indentation is more than the parent, it is a good 
practice to keep the same number of spaces.
- There must be space between different elements of YAML (explained later).
- YAML is case-sensitive.

## Frontmatter specifications for RPG Manager

RPG Manager uses the frontmatter metadata to store the tag that identifies a component in the system. When you generate 
a component through the Obsidian Command panel, RPG Manager automatically sets the correct tag.

Please note, the tag is used to identify and manage the components in the system. it is advisable **NOT** to edit them 
manually. You can change the structure of all the tags of a specific kind from the settings.

### Structure of a RPG Manager Tag

Every tag is composed by a part that identifies the type of component and by a part that uniquely identify a plot and 
that defines its hierarchical status. Each type of plot component has a different tag structure, while every element
use the same type of structure.


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


### Additional frontmatter metadata

RPG Manager stores all its metadata inside its first [codeblock](codeblocks.md) in every component. The only additional 
metadata stored inside the frontmatter is relative to the type of Role Playing Game Setting, that is stored in the 
frontmatter of each Campaign.

Currently some additional settings are being developed, but only the `Agnostic` type is fully supported.
