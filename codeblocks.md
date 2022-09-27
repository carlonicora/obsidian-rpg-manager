# Codeblocks Specifications for Rpg Manager

RPG Manager uses codeblocks to display components information and relationships. Each type of component have one or 
more codeblocks you can use. The codeblocks are automatically generated when you create a new component, but you can
add them manually to existing notes or edit them for additional information

Every valid RPG Manager codeblock starts with \`\`\`RpgManager

## Campaign Codeblocks

### Navigation Codeblock

The `campaignNavigation` codeblock displays the information about the campaign and the 
[ABT Plot Structure](https://github.com/carlonicora/RAW/blob/master/StorytellingGuide.md#abt) (_Optional_).

To show the ABT Plot Structure you have to edit the codeblock, adding the infomation in the abt part.

```RpgManager
campaignNavigation
abt:
  need: ""
  and: ""
  but: ""
  therefore: ""
```

### Relationship Codeblock

The `campaign` codeblock lists the relationships in the campaign:
- Subplots
- Adventures
- Acts
- Sessions
- Events
- Player Characters
- Non Player Characters

```RpgManager
campaign
```

## Adventure Codeblocks

### Navigation Codeblock

The `adventureNavigation` codeblock displays the information about the adventure and the
[ABT Plot Structure](https://github.com/carlonicora/RAW/blob/master/StorytellingGuide.md#abt) (_Optional_).

To show the ABT Plot Structure you have to edit the codeblock, adding the infomation in the abt part.

```RpgManager
adventureNavigation
abt:
  need: ""
  and: ""
  but: ""
  therefore: ""
```

### Relationship Codeblock

The `adventure` codeblock lists the relationships in the adventure:
- Acts

```RpgManager
adventure
```

## Act Codeblocks

### Navigation Codeblock

The `actNavigation` codeblock displays the information about the act and the
[ABT Plot Structure](https://github.com/carlonicora/RAW/blob/master/StorytellingGuide.md#abt) (_Optional_) and the 
[Story Circle Plot structure](https://github.com/carlonicora/RAW/blob/master/StorytellingGuide.md#story-circle) 
(_Optional_).

To show the ABT or Story Circle Plot Structure you have to edit the codeblock, adding the infomation in the abt or 
storycircle part.

```RpgManager
campaignNavigation
abt:
  need: ""
  and: ""
  but: ""
  therefore: ""
storycircle:
  you: ""
  need: ""
  go: ""
  search: ""
  find: ""
  take: ""
  return: ""
  change: ""
```

### Relationship Codeblock

The `act` codeblock lists the relationships in the act:
- Scenes
- Player Characters
- Non Player Characters
- Clues
- Locations
- Factions

```RpgManager
act
```

## Scene Codeblocks

### Navigation Codeblock

The `sceneNavigation` codeblock displays the information about the scene and allows to specify two additional set
of information:
- Trigger: what triggers the scene
- Action: what are the actions expected from the player characters

```RpgManager
sceneNavigation
trigger: ""
action: ""
```

### Relationship Codeblock

The `scene` codeblock lists the relationships in the scene:
- Musics
- Player Characters
- Non Player Characters
- Clues
- Locations
- Factions
- Events

```RpgManager
scene
```

## Session Codeblocks

The `sessionNavigation` codeblock displays the information about the session

### Navigation Codeblock

```RpgManager
sessionNavigation
```

### Relationship Codeblock

The `session` codeblock lists the relationships contained in the scenes played during the session:
- Subplots
- Musics
- Player Characters
- Non Player Characters
- Clues
- Locations
- Factions
- Events

```RpgManager
session
```

## Subplot Codeblock

The `subplot` codeblock displays the information about the subplot and the
[ABT Plot Structure](https://github.com/carlonicora/RAW/blob/master/StorytellingGuide.md#abt) (_Optional_).

To show the ABT Plot Structure you have to edit the codeblock, adding the infomation in the abt part.

It also shows the relationships of the subplot:
- Non Player Characters
- Clues
- Factions
- Events

```RpgManager
subplot
abt:
  need: ""
  and: ""
  but: ""
  therefore: ""
```

## Player Character Codeblock

The `pc` codeblock displays the information about a player character and its relationships:
- Non Player Characters
- Player Characters
- Factions
- Locations

```RpgManager
pc
```

## Non Player Character Codeblock

The `npc` codeblock displays the information about a non player character and its relationships:
- Subplots
- Player Characters
- Non Player Characters
- Factions
- Locations
- Event
- Clurs

```RpgManager
npc
```

## Location Codeblock

The `location` codeblock displays the information about a location and its relationships of the location:
- Player Characters
- Non Player Characters
- Locations
- Event
- Clurs

```RpgManager
location
```

## Faction Codeblock

The `faction` codeblock displays the information about a faction and its relationships:
- Subplots
- Player Characters
- Non Player Characters
- Locations

```RpgManager
faction
```

## Event Codeblocks

The `event` codeblock displays the information about an event and its relationships:
- Subplots
- Player Characters
- Non Player Characters
- Clues
- Locations

```RpgManager
event
```

## Clue Codeblocks

The `clue` codeblock displays the information about a clue and its relationships:
- Subplots
- Player Characters
- Non Player Characters
- Clues
- Locations
- Events

```RpgManager
clue
```


## Music Codeblocks

The `music` codeblock displays the information about a song or playlist and its relationships:
- Musics
- Scenes

```RpgManager
music
```
