# Obsidian Role Playing Game Manager

Role Playing Game Manager (RPG Manager or RPGM) is an [Obsidian](https://obsidian.md) plugin that helps you outline and manage your Tabletop Role Playing Game (TTRPG) campaigns.

---

Warning: In the upcoming 3.4 Release of RPG-Manager, we will no longer be supporting database updates for version 2.x and earlier releases. You must be on version 3.0 or later in order to successfully update to 3.4.

For example: If you are on version 2.3 and decide to update to version 3.4, your data will not transfer through to the updated database. RPG-Manager will work, but you will need to re-enter all of your RPG-Manager data.

**Therefore, please update to v3.0 before updating to 3.4**!

---

> You've come to the library in search of knowledge. You want to know how something works. The tomes you need, you cannot find them. A quiet 'ahem' and
> there stands a librarian with a knowing look on their face. A flick of their wrists and in outstratched palms are the tomes you have been looking for.
>
> As you reach for the one of texts, the librarian _tsks_. "Ah. Your kind are so predictable. They always go for that one first. Good luck."
>
> **[Tome of the Reader: A Reference on Using RPG Manager in Traditional Word and Image Form](https://github.com/carlonicora/obsidian-rpg-manager/wiki/Beginner's-Guide)**
>
> **[Tome of the Watcher: A Follow-Along Guide on Using RPG Manager in Audio and Video](https://www.youtube.com/playlist?list=PLAO6liEcd6-0iJXIKznSfkBenDxgmFR2h)**

---

## Introduction

RPG Manager helps you create the plot of a story or campaign, organizing, and referencing elements where they are used. The plugin revolves around three main types of features:

- **Plotting**: When you develop the rough sequence of events in the story or campaign.
- **Running**: When you run play within the story such as when you are actively playing a session.
- **Elements**: The individual pieces that may be present in your story, including non-player-characters (NPCs), locations, items, and governments.

## Goals

The **Primary Goal** of RPG Manager is to lower the time needed to write a story, increase the quality of writing produced by narrowing focus, and to increase the quality of the sessions you run for your players. It accomplishes this by incorporating a combination of **And, But, Therefore** (ABT) and **Story Circle**(SC) Frameworks in the plugin to balance **Dramatic Action** with **Physical Action**.

These additions are optional features and can be disabled.

The **Secondary Goal** of RPG Manager is to provide a story or campaign management system framework within Obsidian that is, at its core, system agnostic. It is intended to work for authors of all genres, DnD, Genesys, Stars without Numbers, Vampire: The Masquerade, Warhammer, Warcraft, and more. If RPG Manager cannot support it, we **[want to know about it](https://github.com/carlonicora/obsidian-rpg-manager/issues)** so we can correct it.

## Features

| Story-building         | Quality of Life                    | Extensibility                                                                                    |
| :---------------------- | :---------------------------------- | :------------------------------------------------------------------------------------------------ |
| Auto-connected Modules | Image Gallery                      | **[Fantasy-Calendar](https://github.com/fantasycalendar/obsidian-fantasy-calendar)** Integration |
| ABT and SC Outliner    | Relationship Linking               | API (Coming Soon)                                                                                                 |
| Scene Analyzer         | Autolinking within Campaign (v3.3) |                                                                               |
| Plot Wizard (v3.3)     | Drag and Drop Scenes (Coming Soon) |                                                                                                  |


## Installing RPG Manager from Obsidian

**`RPG Manager`** can be found by name in the Obsidian Community plugins directory, which is located in Obsidian's Community plugins settings. You may be prompted to **`Turn on Community Plugins`**. Turning on community plugins is required to utilize any Obsidian third-party plugins.

Once you click on RPG Manager in the directory, you will be given the option to install the plugin via the **`Install`** button. Once Installed. The Install button will change to **`Enable`**. Clicking **Enable** will activate the plugin. You are now ready to start plotting.

**Note**: The first time you install, and occassionally when you update, you may be prompted by the plugin to update the data structure. This is the plugin indexing and optimizing it's internal databases. It is always recommended to ensure you have a recent back-up of your vault before allowing it to proceed with indexing.

### Updating RPG Manager from Obsidian

To check for plugin updates, return to the Obsidian Community plugins settings and click **`Check for updates`**. If there are any updates, the **Check for updates** button will change to **`Update`**. Clicking **Update** will download and apply the update.

It is recommend to reload or restart Obsidian after installing updates.

## Installing and Updating RPG Manager from Github

1. Click on the [**Latest Releases Link**](https://github.com/carlonicora/obsidian-rpg-manager/releases/latest) or navigate to **Releases** on the sidebar to the right.
2. Download the source code in zip format. You may choose to use tar.gz if your extractor supports it.
3. Extract the rpg-manager folder from the zip or tar.gz to your vault's plugin folder, which is usually found in **`<vault>/.obsidian/plugins/`**.
 a. On some devices, the **`.obsidian`** folder may be hidden by default.
    b. **Windows Users**: Follow [**this support document by Microsoft**](https://support.microsoft.com/en-us/windows/view-hidden-files-and-folders-in-windows-97fbc472-c603-9d90-91d0-1166d1d9f4b5) to reveal hidden files.
 c. **MacOSX Users**: The default keybinding to reveal hidden folders is **`Command+Shift+Dot`**. You may need to hit this keybinding every time you need to access **`.obsidian`**.
 d. \***Nix Users**: Refer to your distribution specific instructions on how to access hidden folders and files.
4. Reload or Restart Obsidian.
5. Navigate to the Community Plugins section in Obsidian's Settings. You may be prompted to **`Turn on Community Plugins`**. Turning on community plugins is required to utilize any Obsidian third-party plugins.
6. If you have turned on community plugins, enable the RPG Manager plugin by clicking the indented button. It will slide right to indicate enabled. The plugin may perform it's index as reported above.
7. You are now ready to start plotting.

## Contributors

My most humble thanks go to everyone who is helping RPG Manager becoming a better plugin.

<a href="https://github.com/sigrunixia">
  <img src="https://github.com/sigrunixia.png?size=50">
</a>
<a href="https://github.com/SlRvb">
  <img src="https://github.com/SlRvb.png?size=50">
</a>
<a href="https://github.com/x1101">
  <img src="https://github.com/x1101.png?size=50">
</a>

[We are always looking for help. Join us!](https://github.com/carlonicora/obsidian-rpg-manager/issues/151)
