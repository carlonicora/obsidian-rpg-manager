# Role Playing Game Manager

[![it](https://img.shields.io/badge/lang-it-green.svg)](https://github.com/Jackson98Tomphson/rpgm-4-1-13/blob/507a08bb5b6f690f635c7d54ba1604a67d048d66/README.it.md)

RPG Manager is an Obsidian plugin to simplify the creation and running of role playing game campaings. The plugin is system-agnostic, which means you can use it if you are running a D&D, Call of Chtulhu or any other TTRPG.

## Table of Contents

- [1. Introduction](#1-introduction)
  - [1.1. Overview of the Plugin](#11-overview-of-the-plugin)
  - [1.2. Key Features](#12-key-features)
  - [1.3. Target Audience (Plotters, Sandboxers, Lazy GMs)](#13-target-audience-plotters-sandboxers-lazy-gms)
  - [1.4. Getting Started](#14-getting-started)
  - [1.5. Upgrade your vault from v3](#15-upgrade-your-vault-from-v3)
- [2. Installation](#2-installation)
  - [2.1. Setting up your first Campaign](#21-setting-up-your-first-campaign)
  - [2.2. User Interface](#22-user-interface)
- [3. Overview of Elements](#3-overview-of-elements)
  - [3.1. Creating and Editing Elements](#31-creating-and-editing-elements)
  - [3.2 Relationships](#32-relationships)
  - [3.3 Elements](#33-elements)
    - [3.3.1. Campaign](#331-campaign)
    - [3.3.2. Adventures](#332-adventures)
    - [3.3.3. Chapters](#333-chapters)
    - [3.3.4. Events](#334-events)
    - [3.3.5. Locations](#335-locations)
    - [3.3.6. Clues](#336-clues)
    - [3.3.7. Non-player characters](#337-non-player-characters)
    - [3.3.8. Factions](#338-factions)
    - [3.3.9. Objects](#339-objects)
    - [3.3.10. Monsters](#3310-monsters)
    - [3.3.11. Subplots](#3311-subplots)
    - [3.3.12. Player characters](#3312-player-characters)
    - [3.3.13. Sessions](#3313-sessions)
    - [3.3.14. Scenes](#3314-scenes)
  - [3.4. Custom Attributes](#34-custom-attributes)
  - [3.5. Tasks](#35-tasks)
  - [3.6. Element Templates](#36-element-templates)
  - [3.7. Global Assets](#37-global-assets)
- [4. Creating a World](#4-creating-a-world)
  - [4.1. What Type of Storyteller Are You?](#41-what-type-of-storyteller-are-you)
  - [4.2. For Every Storyteller You Are](#42-for-every-storyteller-you-are)
    - [4.2.1. Creating Rounded Non-Player Characters](#421-creating-rounded-non-player-characters)
    - [4.2.2. Developing Adventures and Chapters](#422-developing-adventures-and-chapters)
  - [4.3. For Plotters](#43-for-plotters)
    - [4.3.1. Using the Story Circle](#431-using-the-story-circle)
  - [4.4. For Sandboxers](#44-for-sandboxers)
    - [4.4.1. Creating Open Worlds](#441-creating-open-worlds)
    - [4.4.2. Developing Events, Locations, and Clues](#442-developing-events-locations-and-clues)
- [6. ChatGPT Integration](#6-chatgpt-integration)
  - [6.1. Privacy Concerns](#61-privacy-concerns)
  - [6.2. Costs Implications](#62-costs-implications)
  - [6.3. Non-player characters generation](#63-non-player-characters-generation)
  - [6.4. How to Activate ChatGPT](#64-how-to-activate-chatgpt)
- [5. Running a Campaign](#5-running-a-campaign)
  - [5.1. Prepping for a Session](#51-prepping-for-a-session)
  - [5.2. Taking Notes during Sessions](#52-taking-notes-during-sessions)
  - [5.3. Managing Scenes](#53-managing-scenes)
- [7. Contributing](#7-contributing)
  - [7.1. Code Contribution](#71-code-contributions)
  - [7.2. Bug Reporting](#72-bug-reporting)
  - [7.3. Documentation](#73-documentation)
  - [7.4. Other ways to help](#74-other-ways-to-help)
  - [7.5. Community](#75-community)
- [8. Frequently Asked Questions](#8-frequently-asked-questions)

## 1. Introduction

Welcome to RPG Manager, the Obsidian plugin designed to be the ultimate sidekick for Storytellers and Game Masters (GMs) preparing and running their campaigns. Are you tired of having your campaign notes scattered across multiple platforms and notebooks? RPG Manager was born out of the need for a central repository for all those brilliant ideas, notes, plotlines, and player character decisions that make up the tapestry of your game.

**Why RPG Manager?** The beauty of RPG Manager lies in its simplicity and flexibility. It allows you to easily create relationships between various elements of your campaign, forming a web of information that aids in both the plotting and running of the game. Additionally, it is a system-agnostic tool, which means it can be used with any Tabletop Role-Playing Game (TTRPG) system, providing a versatile platform for managing campaigns without being tied to a specific rule set. However, this does mean that it may not cover every single detail of every system out there, so approach RPG Manager with an open mind and a spirit of adventure!

**Advantages of RPG Manager** include centralized information, relationships between elements, system-agnostic design, and overall efficiency in preparing campaigns. By providing a central location for all your ideas, notes, and information, and allowing you to create a web of relationships between various campaign elements, RPG Manager helps you craft compelling narratives while keeping track of all the essential details.

So, embark on your storytelling journey with RPG Manager as your trusted companion. Embrace the possibilities it offers, and let it help you create unforgettable adventures.

### 1.1. Overview of the Plugin

RPG Manager is a plugin for Obsidian, designed to sit comfortably on top of it, like a well-worn wizard's hat. It associates metadata with the Obsidian notes and provides a user-friendly interface to navigate through the information. This is not just any metadata; it's the kind that helps manage the relationships between notes, a crucial aspect for any Storyteller/GM trying to weave a coherent narrative.

The **user interface** of RPG Manager is an HTML UI that organizes the metadata and displays it inside the Obsidian note. This means you don't have to flip back and forth between different applications or windows; everything you need is right there in your Obsidian note.

The **metadata** is stored inside a code block in Obsidian, rather than in the front matter. This decision was made because the front matter does not handle the amount of information needed in a clean way and takes away a lot of space at the top of the note in Obsidian. However, you don't have to worry about the nitty-gritty details of formatting or syntax, as all the metadata are read and written through the UI. This means less time wrestling with code and more time crafting your epic tales.

### 1.2. Key Features

RPG Manager boasts a range of features designed to make your storytelling journey as smooth as a bard's charm. Here's a quick rundown of what you can expect:

1. **Centralized Information**: Gather all your campaign ideas, notes, and information in one place, ensuring nothing gets lost in the chaos of creation.
2. **User-Friendly Interface**: An HTML UI embedded within your Obsidian notes to help you navigate and manage metadata without the need to juggle multiple applications or windows.
3. **Metadata Management**: Store and manage the relationships between notes with metadata, crucial for weaving a coherent narrative. The metadata is stored inside a code block in Obsidian, minimizing clutter and maximizing efficiency.
4. **Relationships Between Notes/Elements**: Manage the relationships between various campaign elements effortlessly, creating a web of information that aids in both plotting and running of the game.
5. **System-Agnostic Design**: Designed to work with any TTRPG system, providing a versatile platform for managing campaigns without being tied to a specific rule set.
6. **Elements**: Everything in RPG Manager is an "Element", whether it is a campaign, adventure, chapter, event, location, clue, non-player character, faction, object, monster, subplot, player character, session, or scene. This helps in organizing and structuring your campaign in a more coherent and logical manner.

Remember, this is just a taste of what RPG Manager has to offer. As you dive deeper into this documentation, you'll discover how each feature can be tailored to suit your unique storytelling style.

### 1.3. Target Audience (Plotters, Sandboxers, Lazy GMs)

RPG Manager is designed to be a versatile tool that can adapt to different storytelling styles. Whether you are a Plotter, Sandboxed, or a Lazy GM, this plugin has something for you.

1. **Plotters**: For those who like to meticulously plan their stories, RPG Manager offers a structured approach to organize and manage each element of your campaign, from the overarching narrative down to individual scenes and clues.
2. **Sandboxers**: If you prefer creating open worlds and letting your players roam freely, RPG Manager helps in organizing events, locations, and clues, thus aiding in creating a coherent background for your player characters to interact with.
3. **Lazy GMs**: Even if you don't prep much and prefer to jot down a few notes and bullet points before each session, RPG Manager can help in centralizing your ideas and notes, ensuring that you can quickly find what you need during the game.

Tips for All GMs

- Different GMs will use the plugin in different ways, using each element type's attributes or simply skipping them. Take some time to understand how each element and feature works and decide if it suits your style.
- While RPG Manager offers a structured approach, it is designed to be flexible and adaptable. Don't be afraid to use it in a way that works best for you, even if that means not using certain features.
- Remember, the goal of RPG Manager is to make your life as a Storyteller/GM easier and more organized, not to impose a rigid structure on your creative process.

### 1.4. Getting Started

Embarking on a new adventure with RPG Manager is as exciting as rolling a natural 20! To get started, all you need is an open mind and a willingness to explore the plugin's features to see how they align with your storytelling style.

- **Step 1: Create a Campaign**: The Campaign is the main container for all other elements in RPG Manager. Each Obsidian Vault can contain multiple campaigns, but each element (adventures, chapters, events, etc.) is available to one campaign only. So, start by creating a new campaign.
- **Open Mind Approach**: As you begin to explore the plugin, keep an open mind. Try out different features, see how the elements interact with each other, and determine if RPG Manager suits your GM style. It's essential to understand that while RPG Manager offers a structured and organized approach, it is flexible enough to adapt to different styles.

Common Pitfalls

- **One-size-fits-all Mentality**: RPG Manager is designed to be flexible and adaptable. Don't assume that you must use every feature or element. Use what works for you and your campaign.
- **Overwhelmed by Choices**: There are many elements and features available in RPG Manager. Don't feel pressured to understand or use everything right away. Take your time, explore at your own pace, and gradually incorporate the features that suit your needs.

**Resources**

While there are no tutorials or guides available at the moment, we are working on creating video tutorials to help you get the most out of RPG Manager. Stay tuned!

### 1.5. Upgrade your vault from v3

If you are already using RPG Manager and you update it to version 4, the plugin will not work. You have two options: use BRAT to revert to v3.4.5 or upgrade your vault.

Upgrading your vault is always a complicated matter, as the way you structured your data can be different from the way other storytellers have. For this reason, before upgrading your vault, **create a backup copy of it**!

**Important**: if the upgrade process gets stuck, check the Inspector Console for errors, and look for help either on [Discord](https://discord.com/channels/686053708261228577/1022806716343144518) or on [Github](https://github.com/carlonicora/obsidian-rpg-manager/issues).

## 2. Installation

Installing RPG Manager is as easy as slaying a level 1 goblin! Follow the steps below to get started:

- **Already Installed**: If you are reading this documentation from inside Obsidian, congratulations! You have already installed the RPG Manager plugin, and you are ready to embark on your storytelling journey.
- **Installation Steps**: If you haven't installed the plugin yet, follow these simple steps:
  - Open Obsidian settings.
  - Navigate to "Community Plugins".
  - Turn off "Restricted Mode" if needed.
  - Search for the "RPG Manager" plugin.
  - Once found, click "Install" and then "Activate".

And voila! You are now ready to dive into the world of RPG Manager. There is no initial setup required, so you can start creating campaigns right away!

### 2.1. Setting up your first Campaign

Creating your first campaign with RPG Manager is a piece of cake! Here are two ways to do it:

- **Command Palette**:
  - Open the command palette by pressing **Ctrl + P** (Windows) or **Cmd + P** (Mac).
  - Search for RPG Manager: create new Campaign.
  - Select the command from the list.
- **Side Panel**:
  - Click on the d20 icon on the left sidebar.
  - In the right panel, click "Create New... Campaign".

Once you create the campaign, the note containing the campaign will automatically open. That's it! You have successfully created your first campaign. Now, let the adventure begin!

### 2.2. User Interface

The User Interface (UI) of RPG Manager is designed to be intuitive and user-friendly. It is shown directly in the Obsidian note and helps users add/edit any details and see all the relevant information, attributes, and relationships of the elements.

**Main Note**: In the main note, you will find all the editable attributes of an element. The type of an element is shown underneath its name.

**Option Panel**: On the right-hand side, the option panel provides additional functionalities. The option panel can be opened by clicking on the d20 icon on the left hand-side of Obsidian, or by clicking the "Options" link in the UI. The functionalities include:

- Adding New Attributes: You can add new attributes to an element.
- Creating Relationships: Establish relationships with other elements.
- Additional Functionalities: Depending on the element type, there might be other functionalities such as Gallery Management or the creation wizard.

**Visual Indications**: The UI uses the colors of the installed theme in Obsidian. Currently, the UI is not customizable, but it will adapt to the colors of your chosen theme.

## 3. Overview of Elements

In RPG Manager, everything is considered as an "Element." An element is a fundamental building block that represents various components of your RPG campaign, such as campaigns, adventures, characters, locations, events, etc. There are different types of elements, each serving a specific purpose and having its own set of attributes and functionalities.

All elements share some common properties:

- **Description**: A text field where you can describe the element in detail.
- **Gallery**: A section where you can add a collection of images related to the element.
- **Relationships**: Links that connect an element to other elements in your campaign.

Some elements have a **hierarchical structure**. This means that they can contain child elements, and these children can be positioned in a specific order. For instance, a 'Campaign' can contain multiple 'Adventures' and 'Sessions,' and these can be organized in a particular sequence. Similarly, an 'Adventure' can contain multiple 'Chapters,' and a 'Session' can contain multiple 'Scenes.'

Understanding the concept of elements is fundamental to using RPG Manager effectively. As you get more familiar with the different types of elements and how they relate to each other, you will be able to create, edit, and manage your campaigns with ease and efficiency.

### 3.1. Creating and Editing Elements

Creating and editing elements in RPG Manager is a breeze. Whether you are adding a new character, item, or event, the process is straightforward and intuitive.

Creating New Elements:

To create a new element, you can use either the command palette or the side panel.

- **Command Palette**:
  - Open the command palette by pressing **Ctrl + P** (Windows) or **Cmd + P** (Mac).
  - Search for RPG Manager: create new ..., replacing the ellipsis with the type of element you wish to create (e.g., Adventure, Event, Location, etc.).
  - Select the command from the list.
- **Side Panel**:
  - Click on the d20 icon on the left sidebar.
  - In the right panel, click Create New... followed by the type of element you wish to create.

Remember, every element type, apart from a campaign, should belong to a campaign.

To edit the information of existing element, simply navigate to the element in the Obsidian note and follow the User Interface (UI) to make the necessary changes. The UI is designed to be user-friendly and intuitive, making it easy to edit the attributes and relationships of each element.

Now that you know how to create and edit elements, you are well on your way to becoming an RPG Manager pro!

### 3.2 Relationships

In RPG Manager, every element can contain links to other elements. These links become **relationships** between elements, forming the backbone of how information is linked to one another, which is crucial in building a campaign. Relationships can contain a description to better explain the connection between elements.

Relationships can be of different types:

- **Bidirectional**: This occurs when the relationship between A and B is visible and relevant for both A and B.
- **Unidirectional**: A relationship of this type is visible and important only in the element that defines it. If A is unidirectionally related to B, B will not see the same relationship. This is often needed to specify relationships between non-player characters.
- **Parent**: Defines a relationship in which one of the elements is the parent of another. For example, Location A can contain Location B; in this case, the relationship has a parent type.
- **Child**: The opposite of a Parent relationship.

By establishing relationships between elements, the storyteller can create a complex web of interconnected information that can be easily navigated and understood, facilitating the development and management of the campaign.

### 3.3 Elements

#### 3.3.1. Campaign

The campaign is the cornerstone of RPG Manager, the main element a storyteller can create, and all its other elements will form the central repository of information for it.

**Attributes**

- **Description**: A text field where you can describe the overall theme, setting, and plot of your campaign. This is the only required attribute.
- **Story Circle**: A space to develop your campaign's narrative using the story circle method. This is optional and particularly useful for plotters.
- **Child Adventures**: A list of adventures that are part of the campaign. These are automatically created when you create one or more adventures.
- **Child Sessions**: A list of sessions that are part of the campaign. These are automatically created when you create one or more sessions.

**Notes**:

- Campaigns are always standalone and cannot be linked or associated with other campaigns.
- The campaign does not show all the relationships to other elements, as they are children and not relationships.

In the next sections, we will delve deeper into other elements and how they relate to and support the campaign.

#### 3.3.2. Adventures

An adventure is a significant component of a campaign, encompassing a series of events or challenges that have a distinct beginning and conclusion. For instance, in the well-known Call of Cthulhu campaign, "Masks of Nyarlathotep," all events transpiring in New York could be classified as a single adventure. Each adventure comprises multiple chapters, which help in structuring the narrative in a more organized manner.

An adventure serves as a pivotal building block within a campaign, functioning as a coherent narrative unit with a specific beginning and end. It normally encompasses a series of events, locations od challenges that can be grouped together in a single narrative. For example, in the famed "Masks of Nyarlathotep" campaign for Call of Cthulhu, everything that happens in New York could be considered a single adventure. An adventure can be further organized into multiple chapters to streamline the storytelling process.

**Attributes**

- **Description**: A text field where you can describe the overall theme, setting, and plot of your adventure. This is the only required attribute.
- **Story Circle**: A space to develop your adventure's narrative using the story circle method. This is optional and particularly useful for plotters.
- **Major Clues**: A list of significant clues and the narrative paths they could potentially lead to.
- **Child Chapters**: A list of chapters that form part of the adventure. These are automatically generated when you create one or more chapters within the adventure.
- **Kishōtenketsu**: A plot tool to structure and develop your narrative using a classic Chinese, Korean and Japanese style.
- **Conflict**: A tool to describe conflicts that help to drive the narrative. They helps storytellers set up conflicts that are useful to identify unstructured plots to move the story forward.

**Notes**:

- Each adventure can only belong to one campaign.
- Adventures may consist of multiple chapters, which can be organized in a specific order to align with the story's progression.

#### 3.3.3. Chapters

A chapter is a more focused and manageable segment of an adventure, a building block of an adventure. It typically focusses on a specific event or location that the player characters may encounter, and all the relationships and interactions they may have within that context. It serves as a segment of the narrative that leads to one or more destinations, which could be subsequent adventures or chapters. By breaking down an adventure into chapters, it becomes easier to manage the narrative flow, develop intricate relationships, and create immersive experiences for the players.

**Attributes**

- **Description**: A text field where you can describe the overall theme, setting, and plot of your chapter. This is the only required attribute.
- **Story Circle**: A space to develop your chapter's narrative using the story circle method. This is optional and particularly useful for plotters.
- **Major Clues**: A list of major clues and where they lead.
- **Kishōtenketsu**: A plot tool to structure and develop your narrative using a classic Chinese, Korean and Japanese style.
- **Conflict**: A tool to describe conflicts that help to drive the narrative. They helps storytellers set up conflicts that are useful to identify unstructured plots to move the story forward.

**Notes**

- A chapter can only belong to one adventure.
- Chapters are the most granular level of organization within an adventure, and cannot be subdivided into sub-chapters.

#### 3.3.4. Events

An event is a significant occurrence or happening in the narrative, something in which the player characters may become involved. It contains a description and leverages relationships to ensure they give information to the player characters. Events are crucial narrative elements that help to propel the story forward and create engaging experiences for the player characters.

**Attributes**

- **Description**: A text field where you can describe the details of the event, such as what happens, who is involved, and any other pertinent information. This is a required attribute.
- **Date**: The in-game date when the event occurs. This helps in maintaining the timeline of the narrative.

**Notes**

- An event does not normally "lead" anywhere, but may contain relationships to clues and locations that do.
- While there is no strict hierarchy or structure in events, they play a crucial role in the narrative and should be carefully crafted by the storytellers to ensure they are engaging and meaningful.

Events, while not unique in terms of metadata, are logically distinct narrative elements. Storytellers should consider them as proper events and craft their descriptions accordingly to create engaging and impactful moments in the narrative.

#### 3.3.5. Locations

Locations represent the physical places within the game world where events occur and characters interact. They serve as the backdrop for the narrative and play a crucial role in setting the scene and immersing the players in the game world.

**Attributes**

- **Description**: A text field where you can describe the setting, notable features, and any other relevant details about the location. This is a required attribute.
- **Address**: A text field where you can provide the physical address or any other identifier for the location. This is an optional field and can be customized to suit the GM's needs. For example, it could be a real-world address, coordinates on a map, or a description of a fictional or fantasy location.

**Notes**

- Locations can be related to any other elements, including events, NPCs, and clues.
- A location can be defined as a child of another location through relationships, but there is no strict hierarchy or structure that needs to be maintained.

#### 3.3.6. Clues

Clues are pieces of information that propel the plot forward. A clue should describe what the information is and how it can be found. This information is typically part of the clue's description. The relationships of a clue would usually be an event, a location, or a non-player character where the clue can be found and where it leads. However, any element can be related to any other element in RPG Manager, so a clue can also be related to adventures, campaigns, sessions, or any other elements as needed.

**Attributes**

- **Description**: This is a text field where the storyteller/GM writes the details of the clue, what the information is, and how it can be found. This is the only required attribute for a clue.

**Notes**:

- A clue can have as many relationships as needed, indicating where it can be found and where it leads. It all depends on the description the GM writes.
- A clue can lead to multiple different locations, events, or non-player characters, or any combination thereof, depending on the GM's narrative.

#### 3.3.7. Non-player characters

Non-player characters (NPCs) are the lifeblood of any campaign. They are the individuals that populate the world, providing context, challenges, and support to the player characters. Their presence contributes significantly to the atmosphere and narrative of the campaign.

NPCs are multifaceted, having a range of attributes that define their role, personality, and journey throughout the campaign. While only the description is mandatory, the RPG Manager offers a comprehensive list of attributes that can be customized to create a well-rounded character:

**Attributes**

- **Description**: A detailed overview of the NPC, encompassing physical appearance, personality traits, and other notable characteristics.
- Type: Defines the importance of the NPC in the narrative as Main, Supporting, or Extra.
- **Occupation**: A brief overview of the NPC's profession or role within the society.
- **Character Arc**: Describes the trajectory of the NPC's development throughout the campaign, whether it is a Positive, Disillusionment, Fall, Corruption, or Flat arc.
- **Beliefs**: The core values and principles that guide the NPC's actions and decisions.
- **Ghost**: A significant event from the NPC's past that has shaped their beliefs and worldview. It can be a positive or negative turning point that has led them to perceive the world in a certain way.
- **Lie**: A misconception that the NPC holds about themselves or the world around them.
- **Need**: The underlying desire or requirement that drives the NPC, even if they are not consciously aware of it.
- **Strengths**: The positive traits that empower the NPC and contribute to their success.
- **Weaknesses**: The negative traits that hinder the NPC and create challenges for them.
- **Behaviour**: The typical manner in which the NPC acts or responds to situations.
- **Want**: The goals that the NPC actively pursues, even if they do not align with their true needs. This attribute influences their behavior and interactions with others.
- **Stake**: A measure of the NPC's investment in their occupation, wants, and behaviors, on a scale from 1 to 10. It indicates the level of effort the NPC is willing to exert to achieve their goals.
- **Opposition**: The forces or obstacles that stand in the way of the NPC achieving their wants.

While the RPG Manager provides a structured approach to creating NPCs, it also offers the flexibility for storytellers and GMs to customize the attributes to suit their needs. Not all attributes are necessary for every NPC, and the storyteller can select only those that are relevant to their character and narrative.

Additionally, the RPG Manager features a Wizard that assists storytellers in creating NPCs by guiding them through the process in order of importance. This tool streamlines the creation process and ensures that key attributes are considered.

Ultimately, NPCs play a pivotal role in shaping the narrative and interactions within a campaign. Their characteristics, desires, and challenges can drive the plot forward, create conflicts, and enrich the world-building process. Therefore, it is essential for storytellers and GMs to carefully craft their NPCs, considering the impact they will have on the overall narrative and the experiences of the player characters.

#### 3.3.8. Factions

Factions represent organized groups of non-player characters that share common goals, philosophies, or interests. They play a crucial role in shaping the world of the campaign and often serve as allies, enemies, or sources of intrigue for the player characters.

**Attributes**

- **Description**: A detailed text field describing the faction's history, goals, notable members, and any other relevant information.
- **Philosophy**: This outlines the beliefs and values that guide the faction's actions and decisions.
- **Faction Structure**: A text field describing the internal organization of the faction, including its leadership, divisions, and any special roles or titles.

In RPG Manager, a non-player character's affiliation with a faction is defined through relationships. A non-player character can belong to multiple factions, and a faction can have relationships with other factions or elements, allowing for a complex web of alliances and rivalries.

**Notes**

- A non-player character can belong to multiple factions, which allows for intricate relationships and potential conflicts of interest.
- Factions can have relationships with other factions or elements, enabling the creation of a network of alliances, rivalries, and other interactions that can add depth and complexity to the campaign.
- The Philosophy attribute outlines the guiding principles and values of the faction, which can influence its actions, decisions, and relationships with other elements in the campaign.

Factions are a vital element in RPG Manager as they influence the actions of non-player characters and can have a significant impact on the campaign's narrative and dynamics. By thoughtfully defining a faction's attributes and relationships, storytellers can create a rich tapestry of interactions that add depth and complexity to their campaign.

#### 3.3.9. Objects

Objects are items of importance within the campaign. While their role and significance can vary widely depending on the GM's narrative, they are essential tools for enriching the storyline and providing depth to the campaign world.

**Attributes**

- **Description**: This is the only attribute of an object. It is a text field where the GM can describe the object, its appearance, its significance, and any other relevant information.

**Notes**

- Objects can have relationships with any other elements in the campaign, such as locations, events, non-player characters, etc. This flexibility allows the GM to weave objects into the narrative in a way that suits the storyline best.
- The role and importance of objects can vary significantly from one campaign to another. While some objects might be pivotal to the plot, others might serve a more decorative or atmospheric purpose.

In conclusion, objects, while seemingly simple, are a versatile element that can be employed in various ways to enhance the storytelling and the immersive experience of the RPG.

#### 3.3.10. Monsters

Monsters are creatures that player characters may encounter during their adventures. They can be creatures of myth, products of magic, or beings from another dimension. Regardless of their origin, monsters add an element of danger and unpredictability to the campaign.

**Attributes**

- **Description**: This is the only attribute of a monster. It is a text field where the GM can describe the monster's appearance, abilities, behaviors, and any other relevant information.

**Notes**

- Similar to objects, monsters can have relationships with any other elements in the campaign, such as locations, events, non-player characters, etc. This interconnectedness allows the GM to integrate monsters into the narrative seamlessly and in a way that enhances the overall storyline.
- The role and importance of monsters can vary greatly from one campaign to another. Some monsters might be central to the plot, serving as key antagonists or challenges that the player characters must overcome. Others might be more peripheral, serving as obstacles or atmospheric elements that add flavor to the campaign world.

In summary, monsters, while potentially fearsome, are a crucial element in shaping the narrative and the challenges that player characters face during their adventures.

#### 3.3.11. Subplots

Subplots are additional narratives that supplement the main plot of the campaign. While the main plot drives the overarching narrative, subplots add depth, complexity, and richness to the world and its characters. They can vary in scope and scale, and can be generic, affecting the world at large, or specific, tied to a particular non-player character (NPC) or player character (PC).

**Attributes**

- **Description**: A text field to describe the subplot's theme, setting, and narrative. This is the only required attribute.
- **Story Circle**: A space to develop the subplot's narrative using the story circle method. This helps in structuring the narrative and ensuring it has a logical flow.

**Notes**:

- Subplots are flexible and can be linked to multiple NPCs or PCs, depending on the storyteller's needs.
- They can also be interconnected with other subplots through relationships, creating a network of narratives that enrich the campaign.

Subplots are an essential tool for the storyteller, providing a way to create a multifaceted narrative that engages players on multiple levels. Whether it's a personal journey of an NPC, a side quest that the PCs undertake, or a larger event that affects the world, subplots help in creating a dynamic and immersive storytelling experience.

#### 3.3.12. Player characters

Player characters are the avatars of the players in the game world, serving as a crucial reference for the storyteller. While they are generally created and developed by the players themselves, the RPG Manager provides a space for the storyteller to record key aspects of each player character that are essential for the narrative.

**Attributes**

- **Description**: A text field where you can describe the character's appearance, personality, background, or any other relevant information.
- **Beliefs**: The core beliefs that drive the character's actions and decisions.
- **Lie**: A misconception that the character holds about themselves, others, or the world around them.
- **Need**: What the character truly needs, which may be unknown to them.
- **Want**: What the character thinks they want, which may not necessarily align with their true needs.
- **Strengths**: The positive traits of the character that will aid them in their journey.
- **Weaknesses**: The negative traits of the character that may hinder them or create conflict.

Each of the attributes, apart from the description, is optional and can be filled out according to the needs of the storyteller and the player. It is important to note that the RPG Manager is designed to be a tool for the storyteller, and while it provides a space to record these aspects of player characters, it is not a replacement for the character sheets or other tools used by the players themselves.

**Notes**

- The attributes listed above are just a guide, and the storyteller and players may choose to include other information that is relevant to their campaign.
- Relationships between player characters and other elements in the campaign, such as NPCs, locations, and events, can be recorded and managed through the RPG Manager. This facilitates a comprehensive understanding of the interconnections within the narrative and assists in campaign planning and execution.

In summary, the player characters section in the RPG Manager serves as a useful reference for the storyteller, allowing them to have a quick overview of the key aspects of each player character and understand their place within the broader narrative.

#### 3.3.13. Sessions

You've been there, right? The session is about to start, and you've got some scribbled notes on a napkin, or maybe you've meticulously planned every single detail down to the NPC's favorite type of cheese. Regardless, you know that once the game starts, all your plans could go down the drain because, let's face it, players are chaos incarnate. That's where RPG Manager's `Sessions` feature comes in. Think of it as your digital napkin, only way cooler and less likely to be used to wipe up spilled soda.

So, why does RPG Manager have sessions? Simple. Sessions are where the rubber meets the road. It's where you, the GM, plot out the session and track what the player characters do during it. Whether you're a Plotter who meticulously plans out the narrative, a Sandboxed who creates an open world with Events, Locations, and Clues, or a Lazy GM who preps just a few notes and bullet points before each session, you're going to need to keep track of what the hell is happening.

**Attributes**:

- **Description**: A brief summary of what went down. Did the player characters burn down the village (again), or did they actually save the day?
- **Session Date**: When did this madness occur? Keeping track of dates is crucial for managing the timeline of your campaign.
- **Story Circle**: For the Plotters out there, this is your narrative tool to craft a session with a cohesive structure and captivating arcs.
- **List of Scenes**: Automatically populated when scenes are created for the session. It helps organize the various encounters or events within the session.
- **Kishōtenketsu**: A plot tool to structure and develop your narrative using a classic Chinese, Korean and Japanese style.
- **Conflict**: A tool to describe conflicts that help to drive the narrative. They helps storytellers set up conflicts that are useful to identify unstructured plots to move the story forward.

Okay, let's address the elephant in the room. Why use the Sessions feature? Well, it's not just a note-taking tool. It’s a way to strategically plan and record the chaos. With it, you can take notes during the session, track player characters' actions, and know how to progress the campaign. And let's not forget the best part; it facilitates the creation of relationships between Sessions and any other element in the game. So, a session can be linked to specific NPCs, locations, events, and other elements, helping you manage the intricate network of relationships and narratives that make up the campaign. It’s like having a super-organized, digital assistant that doesn’t judge you for letting the player characters fight a dragon way above their level.

In a nutshell, the Sessions feature in RPG Manager is your best friend for session planning and tracking. It's adaptable, it's organized, and most importantly, it's got your back when your players decide to go off the rails... which, let's be honest, is every session.

#### 3.3.14. Scenes

In the world of tabletop RPGs, a scene is a fundamental unit of gameplay. It represents a specific moment in the game when the player characters are required to perform an active action. This can range from engaging in combat with a fearsome dragon to making a crucial decision that could alter the course of their adventure. The key purpose of a scene is to facilitate active participation and decision-making by the player characters, thereby driving the narrative forward.

**Attributes**

- **Description**: This is a brief outline of what the GM anticipates the player characters will do during the scene. It is crucial to note that this is merely a guideline, as the actions of the player characters may deviate from what is expected. For example, the GM might anticipate that the player characters will engage in combat with a group of bandits, but the players might choose a different approach, such as negotiation or stealth.
- **Story Circle Stage**: If the session has a story circle, this attribute will indicate at which stage of the story circle the scene should occur (you, need, go, search, find, take, return, change).
- **Type**: This is the type of action expected during the scene. It can be one of the following: Action, Combat, Decision, Encounter, Exposition, Investigation, Preparation, Recap, Social Combat. It is important to select the most appropriate type for the scene as it sets the tone and expectation for the player characters.
- **Date**: This is the in-game date when the scene is expected to occur. This helps maintain the consistency of the game world's timeline.
- **Is Exciting**: This attribute indicates whether the scene includes external elements, such as non-player characters, natural disasters, traps, etc., that trigger an exciting moment.

Scenes are an essential tool for the GM, as they help structure the session and provide a roadmap for the narrative. However, it is important to remember that scenes are not set in stone and may evolve organically based on the decisions and actions of the player characters. The key is to facilitate active engagement and participation from the players, thereby creating a dynamic and memorable gaming experience.

### 3.4. Custom Attributes

Custom Attributes in RPG Manager are user-defined fields that you can create to add specific details to various elements of your game that are not covered by the default attributes. For example, if you are running a campaign with a magic system that involves "Mana Points," which is not a default attribute in RPG Manager, you can create a custom attribute for it. Custom Attributes provide a way to customize and extend the RPG Manager to better suit the specific needs of your game, helping you to create a more immersive and detailed world for your players based on your specific needs.

Custom Attributes can be associated with various elements. This means you can create an attribute like "Political Affiliation" for non-player characters, "Weather" for scenes, or "Morale" for player characters, making your game world more detailed and tailored to your narrative.

The type of data a custom attribute can hold includes Text, Number, Option (a dropdown list of predefined options), Checkbox, Long Text, and Date. This wide range of data types allows you to create attributes that can hold different kinds of information, making your game management more flexible and detailed.

You can access this feature through the options menu by clicking on the "Custom Attributes" link. This will open a Modal form where you can define your own attributes. Each custom attribute must have a name, a type (e.g., Text, Number, Option, Checkbox, Long Text, Date), and, if the type is 'Option,' a list of options that will appear in a dropdown menu. Additionally, you need to specify which element type(s) the custom attribute should be associated with.

Creating Custom Attributes allows you to add specific details to the elements of your game that are not covered by the default attributes provided by RPG Manager. This gives you the flexibility to customize your game according to your needs and preferences, making your storytelling more detailed and engaging.

### 3.5. Tasks

Tasks are essentially a to-do list for each element in your RPG Manager. Whether it's a non-player character, a scene, a session, or any other element, you can assign a list of tasks to it. These tasks represent things that need to be done or accomplished within the context of that element. For example, a task for a non-player character could be "Player characters should discover their secret." If you think this task could be discovered in a scene or a session, you can assign it to those specific elements as well. This helps maintain consistency throughout your campaign and ensures that important plot points or character developments are not overlooked.

**Creating a Task**
Creating a task is straightforward. When you are in the context of a specific element, you can add a task to it. This means you can't create a task independently; it has to be associated with an element right from the start. Each task can be assigned to one or more elements, making it a versatile tool to keep track of important objectives or plot developments across different parts of your campaign.

**Tracking Progress**
RPG Manager allows you to easily track the progress of each task. You can view all the open tasks for a particular campaign, and in each element, you can see all the tasks that have already been completed. This helps you stay organized and ensures that you don't lose track of important objectives as your campaign progresses.

**Editing and Deleting Tasks**
Tasks can be edited or deleted after they have been created and assigned. This provides flexibility in case you need to make changes or adjustments as your campaign develops.

**Limitations**
There is no limit to the number of tasks that can be created or assigned to an element. This means you can create as many tasks as you need to fully flesh out your campaign and ensure that all important objectives are accounted for.

Overall, tasks are a powerful tool in RPG Manager that helps you stay organized and ensure that important plot points, character developments, and objectives are not overlooked throughout your campaign.

### 3.6. Element Templates

In RPG Manager, an element template is an Obsidian note that contains a special code block, `RpgManager5`, which is used by the application to render its user interface (UI). This allows Storytellers/GMs to customize their notes by adding any information, text, or other code blocks they need, while still having the RPG Manager UI integrated into the note.

Creating a template is a two-step process:

1. **Define the Template Location:** In the RPG Manager settings, specify the folder where your templates are stored. This is where RPG Manager will look for your templates.

2. **Create the Template:** A template is an Obsidian note that contains the \`\`\`RpgManager5\`\`\` code block where you want the RPG Manager UI to appear. You can add any other content you want to the note, but it can only contain one \`\`\`RpgManager5\`\`\` code block.

### 3.7. Global Assets

In version 4 you can create elements that are not part of a single campaing. These assets (events, locations, clues, non-player characters, factions, objects, monsters, subplots and player-characters) can be used in anyone of your campaigns. Just add a relationship and you are good to go, writing once, reusing many times!

## 4. Creating a World

Creating a world is more than just outlining a plot; it’s about constructing a living, breathing environment in which your story can unfold. The RPG Manager facilitates this by allowing you to create and interrelate various elements that are crucial for worldbuilding.

**Interconnectedness**: By creating relationships between different elements - for example, linking an NPC to a faction or a location to an event - you're essentially constructing the fabric of your world. This interconnectedness helps to create a dynamic, coherent setting in which each element influences others. For instance, an NPC's actions might be influenced by their affiliation to a faction, which in turn might be in conflict with another faction over control of a specific location.

**Consistency**: As your world grows, it can be challenging to keep track of all the details. The RPG Manager helps maintain consistency by providing a structured way to organize and relate various elements. For example, by linking a subplot to a specific NPC or player character, you can easily track how that subplot progresses as the character interacts with other elements in the world.

**Depth**: Creating relationships between elements also adds depth to your world. For example, a location is not just a physical place; it's also a setting for events, a home for NPCs, and perhaps a base for a faction. By establishing these relationships, you give the location a history and a purpose that can enrich your narrative.

**Dynamics**: Relationships between elements also create dynamics that can drive your narrative. For example, the relationship between an NPC and a faction might change over time, influencing the NPC's actions and decisions. These dynamics can create unexpected twists and turns in your story, keeping your players engaged.

### 4.1. What Type of Storyteller Are You?

Understanding your style as a storyteller is crucial for effectively using the RPG Manager. Generally, storytellers can be categorized into three main types:

1. **Plotters**: These are storytellers who like to plan their stories in detail. They create intricate plots with well-defined story arcs, character development, and a clear beginning, middle, and end. They often use tools like the story circle to craft compelling narratives.

   _Example_: If you enjoy creating detailed outlines for each session, developing extensive backstories for your NPCs, and knowing exactly how each subplot will unfold, you are probably a plotter.

   _How RPG Manager Helps_: The RPG Manager is designed to help plotters organize their thoughts and ideas, create detailed relationships between elements, and develop compelling story arcs.

2. **Sandboxers**: These are storytellers who prefer to create open worlds where the players can explore and create their own stories. They focus on creating a detailed setting with various events, locations, and clues that the players can interact with.

   _Example_: If you prefer to create a detailed world with various locations, events, and NPCs, but leave it up to the players to decide how they want to interact with these elements, you are probably a sandboxer.

   _How RPG Manager Helps_: The RPG Manager helps sandboxers by providing a structured way to organize and interrelate various elements of their world, making it easier to manage the open-world setting.

3. **Lazy GMs**: These are storytellers who prefer to do minimal preparation before each session. They often have a rough idea of how the session will unfold but prefer to improvise and adapt to the players' actions during the game.

   _Example_: If you prefer to do minimal preparation before each session, often jotting down just a few bullet points or key ideas, you are probably a lazy GM.

   _How RPG Manager Helps_: The RPG Manager helps lazy GMs by providing a way to quickly and easily create and organize the essential elements needed for each session, making it easier to improvise during the game.

No matter what type of storyteller you are, the RPG Manager is designed to help you create and manage your world with ease.

### 4.2. For Every Storyteller You Are

Whether you're a Plotter, a Sandboxed, or a Lazy GM, RPG Manager has something for everyone. This section will help you understand how to use the tool, no matter what your storytelling style is.

#### 4.2.1. Creating Rounded Non-Player Characters

Non-Player Characters (NPCs) are the lifeblood of your world. They are the ones your players interact with, the ones who give out quests, the ones who stand in their way, and the ones who help them on their journey. Creating rounded NPCs is essential to build a three-dimensional world that feels alive and immersive.

A rounded NPC is not just a collection of stats and attributes; they have their own desires, fears, and motivations. They have a past that influences their present actions and a future they aspire to. These NPCs are not just passive elements waiting for the player characters (PCs) to interact with them; they have their own goals and can take actions independently of the PCs.

RPG Manager helps you create rounded NPCs by guiding you through the process of defining their personality, goals, and relationships with other elements of the campaign. This ensures that your NPCs are not just cardboard cutouts but feel like real, living beings that contribute to the richness of your world.

Do not be daunted by the many attributes available in RPG Manager; you can use as many or as few as you wish. The tool is designed to be flexible and adapt to your style of storytelling.

By creating rounded NPCs, you not only enhance the realism and depth of your world, but you also create opportunities for more engaging and dynamic storytelling. These NPCs can drive the plot forward, create conflicts and resolutions, and provide a deeper emotional connection for your players.

#### 4.2.2. Developing Adventures and Chapters

Adventures and Chapters are the building blocks of your campaign. An adventure is a single, self-contained storyline that can be part of a larger campaign, while a chapter is a smaller section of an adventure, or a standalone mini-adventure in its own right.

Developing well-structured adventures and chapters is crucial for maintaining a logical and engaging narrative.

- **Adventures**: An adventure is a series of events and challenges that the player characters (PCs) must navigate. It usually has a clear beginning, middle, and end, with a defined goal or objective that the PCs are trying to achieve. Each adventure is composed of multiple chapters, events, and encounters that the PCs will experience as they progress towards their goal.

- **Chapters**: A chapter is a smaller, more focused section of an adventure. It could be a single encounter, a series of related events, or a specific location that the PCs must navigate. Chapters help to break down the adventure into manageable chunks, making it easier for the storyteller to plan and execute.

The key to developing engaging adventures and chapters is to create a logical flow of events that guide the PCs from one challenge to the next, while also allowing room for unexpected twists and turns. It is important to strike a balance between guiding the PCs along a predetermined path and allowing them the freedom to make their own decisions and explore the world at their own pace.

RPG Manager helps you develop well-structured adventures and chapters by providing a framework to organize your ideas and create a logical flow of events. You can define the relationships between different elements of your campaign, such as how an event in one chapter might trigger a reaction in another, or how a decision made by the PCs in one adventure might have consequences in the next.

### 4.3. For Plotters

If you are a Plotter, you enjoy creating detailed plans and well-structured narratives for your gaming sessions. You find satisfaction in developing intricate storylines, with carefully thought-out plots, subplots, and character arcs. You appreciate the value of a well-crafted narrative and believe that a good story is the foundation of an engaging gaming experience.

RPG Manager is designed with you in mind. It provides the tools and structure necessary to organize your ideas, develop your narrative, and plan your sessions in detail. From creating well-rounded non-player characters to developing intricate subplots, RPG Manager provides a comprehensive platform to manage all aspects of your campaign.

As a Plotter, you will find that RPG Manager streamlines your planning process, making it easier to keep track of all the moving parts of your campaign and ensuring that you are well-prepared for each gaming session.

#### 4.3.1. Using the Story Circle

For Plotters who love crafting well-structured narratives, the Story Circle is a particularly useful tool. It's a framework adapted from Dan Harmon's approach to storytelling, designed to create a satisfying, complete story. The Story Circle consists of eight stages: You, Need, Go, Search, Find, Take, Return, and Change.
With RPG Manager, you can implement the Story Circle at various levels of granularity:

- **Campaigns**: At the campaign level, the Story Circle can help you outline the overarching narrative of your campaign, providing a high-level view of major milestones, turning points, and character arcs.

- **Adventures**: For each adventure within the campaign, you can apply the Story Circle to create a well-rounded, self-contained narrative arc. This ensures that each adventure contributes meaningfully to the campaign while standing as an engaging story in its own right.

- **Chapters**: If you break your adventures into chapters, the Story Circle can help you maintain a sense of pacing and dramatic tension throughout each adventure. It's a way of ensuring that every chapter moves the story forward and contributes to the characters' development.

- **Sessions**: Even on a session-by-session basis, the Story Circle can provide valuable structure. As a Plotter, you can use it to sketch out the expected flow of a single gaming session, planning moments of tension, discovery, conflict, and resolution that will keep your players engaged.

So, whether you're crafting the grand tale of a world-saving quest or planning out a single session's escapade, the Story Circle offers a valuable framework for developing compelling narratives. RPG Manager's functionality allows you to incorporate this directly into your planning, making it an indispensable tool for the Plotter GM.

### 4.4. For Sandboxers

Sandboxers thrive on flexibility and improvisation. They create an open world, filled with events, locations, and clues, and then set their players loose to explore and interact with that world as they see fit. The narrative emerges organically from the players' choices and actions.

With RPG Manager, Sandboxers can create a detailed and immersive world for their players. The players' choices and actions will determine the course of the narrative, making for a dynamic and engaging gaming experience.

So, if you're a Sandboxer who loves creating detailed, open worlds for your players to explore, RPG Manager offers the tools and flexibility you need to craft your narrative.

#### 4.4.1. Creating Open Worlds

Creating an open world involves much more than just sketching out a map with a few cities and points of interest. It's about creating a dynamic and interactive environment that your players can explore and affect through their actions. With RPG Manager, the process of creating such a world is simplified, but still offers the depth and complexity that your world deserves.

- **Integrating Elements**: Use the different elements in RPG Manager, like locations, events, clues, non-player characters, factions, and objects, to create a world full of life and intrigue. Each of these elements will help you to create a world that is rich in detail and full of possibilities.

- **Relationships**: Define the relationships between the different elements in your world. This could be the relationship between two non-player characters, between a faction and a location, or between a clue and an event. By defining these relationships, you create a network of interconnected elements that make your world feel cohesive and real.

- **Reactivity**: Your world should react to the actions of the player characters. RPG Manager helps you to keep track of the decisions that your players make and the consequences of those decisions. This will help you to create a world that feels dynamic and responsive.

Remember, creating an open world is not just about creating a large space for your players to explore, but about creating a world that feels alive and interconnected. With RPG Manager, you have all the tools you need to create such a world.

#### 4.4.2. Developing Events, Locations, and Clues

RPG Manager is your trusted companion in this creative endeavor. It enables you to populate your world with various elements, all interconnected and ripe for exploration:

- **Events**: Define significant happenings that populate your world. These can be historical events that shaped the world, ongoing conflicts that create tension, or potential future events that the players can influence.

- **Locations**: Craft detailed locations that your players can explore. RPG Manager allows you to define not only the physical characteristics of a location but also its inhabitants, its history, and its significance to the world.

- **Clues**: Develop a series of clues that can guide your players through the world. These clues can take many forms – an ancient artifact, a cryptic prophecy, a rumor overheard in a tavern – and can be linked to various events, locations, and non-player characters.

By developing these elements, you can create a rich tapestry for your players to interact with.

## 5. Running a Campaign

Once you have created your world, developed your adventures, and populated your game with well-rounded non-player characters, the next step is to actually run the campaign. This is where all of your hard work and preparation come into play. Running a campaign involves orchestrating the sessions, managing the player characters, and navigating the storylines as they unfold.

RPG Manager is not just a tool for preparation, but also an invaluable companion for the actual gameplay. It will help you keep track of everything that happens during a session, from the actions of the player characters to the progress of the storyline. It's also an excellent tool for improvisation, providing you with quick access to all the necessary information and making it easier to adapt to unexpected twists and turns.

As the storyteller, you are the guide for your players as they navigate through the world you have created. It's your responsibility to ensure that the campaign runs smoothly and that everyone has a good time. This section will provide you with tips and guidelines on how to effectively run a campaign using RPG Manager.

### 5.1. Prepping for a Session

Prepping for a session is an essential task for any storyteller, regardless of their style. How you approach this task will vary depending on whether you are a plotter, a sandboxer, or a lazy GM. RPG Manager is flexible enough to cater to all these styles, helping you to prepare in the way that suits you best.

- **For Plotters**: If you are a plotter, you probably like to have a well-structured plan for your sessions. RPG Manager can help you outline your session using the story circle, making sure that you have a coherent narrative with a clear beginning, middle, and end. You can plan out the scenes, define the key moments, and prepare the necessary non-player characters, locations, and events.

- **For Sandboxers**: As a sandboxer, you prefer to create an open world and let your players roam freely. Your prep work will mostly involve creating the world, its inhabitants, and the various plot hooks that the players can choose to pursue. RPG Manager helps you keep track of all these elements, making it easy to access the necessary information during the game and to adapt to the decisions of your players.

- **For Lazy GMs**: If you are a lazy GM, you probably prefer to do minimal prep and improvise as much as possible during the game. RPG Manager can still be a valuable tool for you, as it allows you to quickly jot down notes, create bullet points for the key moments of the session, and have quick access to the essential information about your world.

No matter your style, prepping for a session is crucial to ensure that the game runs smoothly and that your players have a memorable experience. RPG Manager is designed to assist you in this task, making your prep work easier and more efficient.

### 5.2. Taking Notes during Sessions

Taking notes during a session is crucial to keep track of what happens, especially because the decisions made and the events that unfold can have lasting effects on the campaign. RPG Manager facilitates this process by allowing you to easily document the progress of the game, even while in the heat of the moment.

- **Keeping Track**: During the game, many things will happen that you need to remember for future sessions. This can include character decisions, unexpected plot twists, or new non-player character introductions. With RPG Manager, you can easily note down all these important details, ensuring that you don't forget anything crucial.

- **Flexibility**: Whether you prefer to take detailed notes or just jot down the key points, RPG Manager is flexible enough to accommodate your style. You can write as much or as little as you want, and you can organize your notes in a way that makes sense to you.

- **Accessibility**: RPG Manager makes it easy to access your notes during the game. With just a few clicks, you can pull up the information you need, whether it's a non-player character's backstory, a location's description, or the details of a past event.

Taking notes during a session helps you maintain continuity in your campaign and ensures that you don't forget any important details. RPG Manager is designed to make this process as easy and efficient as possible, allowing you to focus on running the game and creating a memorable experience for your players.

### 5.3. Managing Scenes

Managing scenes is a fundamental aspect of running a session as it involves orchestrating the events that your players will engage with. RPG Manager assists you in organizing and managing these scenes, ensuring that your sessions run smoothly and are engaging for your players.

**Scene Organization**

With RPG Manager, you can organize your scenes in the order you expect them to occur. However, the tool is flexible enough to allow quick adjustments in case your players take an unexpected route. This way, you can ensure that you're always prepared, no matter what your players decide to do.

**Scene Attributes**

Each scene in RPG Manager can have several attributes, such as the description, the story circle stage, the type of scene (e.g., Action, Combat, Decision, etc.), the in-game date, and whether or not the scene is exciting. This allows you to have a clear picture of what each scene entails and how it fits into the overall narrative of your session.

**Dynamic Scenes**

Sometimes, your players will do something unexpected, and you'll need to create a new scene on the fly. RPG Manager allows you to quickly add new scenes during the session, ensuring that you can adapt to your players' decisions and keep the game flowing smoothly.

**Easy Access**

During the session, you'll need to access information quickly. RPG Manager makes it easy to navigate between scenes, access the necessary details, and make any required adjustments. This ensures that you can focus on narrating the story and engaging with your players, rather than scrambling to find the information you need.

**Optional Scene Creation**

It's worth noting that the creation of scenes in RPG Manager is entirely optional. The tool is designed to be as flexible as possible to accommodate different styles of play. Whether you prefer to meticulously plan each scene or create them on the fly, RPG Manager supports your preferred approach to storytelling.

## 6. ChatGPT Integration

Imagine having a creative assistant that not only helps you save time in generating non-player characters but also serves as a sparring partner, providing ideas that align with your campaign's description. Sounds like a dream, right? Well, with RPG Manager's ChatGPT integration, this dream becomes a reality!

ChatGPT can serve as your creative companion, generating entire non-player characters from just a few details, or assisting you step-by-step, suggesting parts of the non-player characters as if working shoulder to shoulder with you. The better and more descriptive your campaign is, the more the generated non-player characters will fit right in.

In this section, we will cover privacy concerns, cost implications, how to generate non-player characters with ChatGPT, and how to activate the ChatGPT integration. Let's dive in!

### 6.1. Privacy Concerns

When using the ChatGPT integration for non-player characters generation, the campaign description and the non-player characters information are sent to OpenAI servers. The data protection measures implemented by OpenAI ensure that the data is handled securely. However, it is important to be aware that this information is being transmitted and processed externally.

### 6.2. Costs Implications

Utilizing the ChatGPT API has an associated cost, which is calculated based on the number of tokens sent in each message. Each message exchanged with the ChatGPT API consumes tokens, and therefore, incurs a cost. It is important to be mindful of this, as frequent use of the ChatGPT integration will result in higher costs.

### 6.3. Non-player characters generation

The ChatGPT integration can assist in generating attributes for non-player characters, with the exception of the description attribute. This is done via the wizard, which proposes generations for each attribute during the creation process.

### 6.4. How to activate ChatGPT

To activate ChatGPT in RPG Manager, you will need an OpenAI API key. Follow these steps to obtain your key:

1. **Sign Up for an OpenAI Account:** Visit the OpenAI website and sign up for an account by clicking on the 'Sign Up' button and following the prompts.
2. **Generate API Key:** Once you have created your account and logged in, navigate to the 'API' section in your OpenAI account dashboard. Here, you will find the option to generate a new API key. Follow the on-screen instructions to create your key.
3. **Enter API Key in RPG Manager:** Open RPG Manager and navigate to the settings section. Input your newly generated OpenAI API key into the designated field.

## 7. Contributing

RPG Manager is an open-source project, and we welcome contributions of all kinds - from code contributions, bug reports, to documentation and any other help you can provide.

### 7.1. Code Contributions

If you are a developer and want to contribute to the codebase, please feel free to submit a pull request on our [GitHub repository](https://github.com/carlonicora/obsidian-rpg-manager/). We appreciate contributions that improve the functionality, usability, and overall quality of RPG Manager.

### 7.2. Bug Reporting

If you encounter any bugs or issues while using RPG Manager, please [submit a bug report on our GitHub issues page](https://github.com/carlonicora/obsidian-rpg-manager/issues). Be sure to provide as much detail as possible about the issue, including the steps to reproduce it, so that our developers can address it promptly.

### 7.3. Documentation:

Good documentation is crucial for any software project. If you have a knack for writing and want to help improve the RPG Manager documentation, please consider contributing to our documentation repository. Whether it's fixing typos, clarifying existing content, or creating new content, every contribution is valuable.

### 7.4. Other Ways to Help:

If you want to contribute in other ways, here are a few suggestions:

- Spread the word about RPG Manager to your friends and social media networks.
- Provide feedback on the application's features and usability.
- Create tutorials or guides that help new users get started with RPG Manager.

### 7.5. Community

Being an open-source project, RPG Manager thrives on the support and contributions of its community. Whether you are a developer, a storyteller, or just someone who wants to help out, we appreciate your support and encourage you to get involved. [Join us on the support thread on Discord](https://discord.com/channels/686053708261228577/1022806716343144518)!

## 8. Frequently Asked Questions

- **Can I help?**

  Of course you can. RPG Manager is open source, and you can propose new features or solve pesky bugs.

- **I have a criticism...**

  We truly appreciate all feedback and criticisms as they are crucial in enhancing RPG Manager. Nevertheless, we kindly ask that your feedback is constructive and respectful. It is quite straightforward to point out something that doesn't work or isn't good, but it is infinitely more helpful to provide suggestions for improvement. Keep in mind, RPG Manager is a community project. Therefore, it's up to all of us to contribute and make it the best it can be. Together, we can build something extraordinary! If you have any suggestions or feedback, please share them on [Github Issues](https://github.com/carlonicora/obsidian-rpg-manager/issues). Remember, there are two types of criticisms: constructive ones that help create a better world, and destructive ones made by those who enjoy undermining the efforts of creators working hard to release an open-source project. We obviously prefer the former!
