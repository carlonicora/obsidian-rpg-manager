[RPG Manager Documentation](../../index.md) >
RPG Manager Data Code Block

# RPG Manager Data Code Block

RPG Manager uses a standalone code block to contain all its data for each Obsidian Note. The code block in 
itself does not display any information, but it is used to build the `component` metadata during the initialisation
of the plugin.

The data contained in the code block are component-specific, and they are read by the plugin to display them through
the [RpgManager code block](../views/index.md).

## Component Specific Data Code Blocks

RPG Manager has one data code block for each of its components. The code block automatically realise in what type
of component you currently are and presets the required data during its creation. You can find the specifications 
for each component type below:

- [Campaign](campaign/index.md)
- [Adventure](adventure/index.md)
- [Act](act/index.md)
- [Scene](scene/index.md)
- [Session](session/index.md)
- [Subplot](subplot/index.md)
- [Character](character/index.md)
- [Non-player character](non-player-character/index.md)
- [Clue](clue/index.md)
- [Event](event/index.md)
- [Faction](faction/index.md)
- [Location](location/index.md)
- [Music](music/index.md)
