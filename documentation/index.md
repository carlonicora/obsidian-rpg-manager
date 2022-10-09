# RPG Manager Documentation

Obsidian Role Playing Game Manager is an Obsidian plugin that helps you plot and manage your tabletop role playing game
campaigns. It uses the Obsidian Notes to store, correlate and display additional information to make the plotting
and running of role playing game campaign organised and simple. RPG Manager identifies certain Obsidian Notes in your
vault as `components`, creating a database of metadata that are used to help Storytellers in the creation and
run of their campaigns.

## Table of Content
- [What is a RPG Manager Component?](#what-is-a-rpg-manager-component)
- [How RPG Manager identifies its components](#how-rpg-manager-identifies-its-components)
- [What are the types of RPG Manager Components?](#what-are-the-types-of-rpg-manager-components)
- [Frontmatter metadata](#frontmatter-metadata)
- [Types of code blocks](#types-of-code-blocks)
- [RpgManagerData code block](#rpgmanagerdata-code-block)
- [RpgManager code block](#rpgmanager-code-block)
- [Relationships](#relationships)
- [Plots](#plots)
- [Scene Analyser](#scene-analyser)

## What is a RPG Manager Component?

A `component` is an Obsidian Note that RPG Manager identifies as part of a campaign. These Obsidian Notes store
certain metadata that are relevant for the type of the component or for forming relationships between `components`.

## How RPG Manager identifies its components

RPG Manager uses a single [tag](frontmatter/tag.md) in the Frontmatter to identify an Obsidian Note as a `component`.

## What are the types of RPG Manager Components?

There are 12 different types of `components` in RPG Manger, some of them are used to plot a campaign, some are simple
element of a campaign and one is use to run the games. You can read more in the [component section](components/index.md)

## Frontmatter metadata

RPG Manager uses a minimal set of metadata that are saved inside the Obsidian Note Frontmatter. These metadata are used
to identify an Obsidian Note as a `component`. You can read more in the [frontmatter section](frontmatter/index.md).

## Types of code blocks

There are two types of code blocks used inside each `component`. The first is the [RpgManagerData](data/index.md) code 
block, which is used to store the metadata and relationships relevant to the `component`. The second is the 
[RpgManger](views/index.md) code block, which is used to display the correct information in each `component`.

## RpgManagerData code block

The `RpgManagerData` code block stores all the information and relationship relevant to the `component` in the Obsidian 
Note. The content of this blocks are normally managed entirely by RPG Manager, and can be visible in each `component`
through the d20 icon. An in-depth explanation of each key of the data code blocks is available in the 
[data section](data/index.md).

## RpgManager code block

Each component shows a different set of information. RPG Manager automatically prepares a set of views for each type
of `component`; however, you can edit or add more `RpgManager` code blocks to suit your need. To dig deeper in how
the `RpgManager` code blocks work, you can refer to the [views section](views/index.md)

## Relationships

One of the key element in RPG Manager is the ability to put two `component` in relationship one with the other. There 
are various types of possible relationships, and while they are managed transparently most of the times (_especially if 
you manage them through the provided Relationship Manager_), you can [read more about Relationships](relationships/index.md)
directly in their documentation.

## Plots

## Scene Analyser
