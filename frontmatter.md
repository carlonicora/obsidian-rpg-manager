# Frontmatter Specifications for Rpg Manager

## Introduction

One of the things to remember about Frontmatter metadata is that it is a [YAML](https://en.wikipedia.org/wiki/YAML) 
code, and it must follow some specific rules.
- Tabs are NOT allowed in YAML. You should use space for indention.
- Though the amount of space doesn't matter as long as the child node indentation is more than the parent, it is a good 
practice to keep the same number of spaces.
- There must be space between different elements of YAML (explained later).
- YAML is case-sensitive.

## Frontmatter metadata for each element in RpgManager

### Campaigns

| Key           | Type            | Required/Optional | Description                                                                                               |
|---------------|-----------------|-------------------|-----------------------------------------------------------------------------------------------------------|
| alias         | [array](#array) | **Required**      | The aliases of the current campaign                                                                       |
| tags          | [array](#array) | **Required**      | The tags associated to the campaign. The tag `campaign` is required.                                      |
| settings      | [text](#text)   | _Optional_        | Identifies the game-specific settins. Currently supported are `Agnostic` (anything), `Raw` and `Vampire`  |
| dates.current | [date](#date)   | _Optional_        | The current **in-game** date                                                                              |

full example
```yaml
---
alias: ["Stranger Things"]
tags: [rpgm/outline/campaign/1]
settings: Agnostic
dates:
  current: 1984-05-20
---
```

### Adventures

| Key           | Type                | Required/Optional | Description                                                            |
|---------------|---------------------|-------------------|------------------------------------------------------------------------|
| alias         | [array](#array)     | **Required**      | The aliases of the current adventure                                   |
| tags          | [array](#array)     | **Required**      | The tags associated to the adventure. The tag `adventure` is required. |
| synopsis      | [text](#text)       | **Required**      | The short description of the adventure                                 |
| completed     | [boolean](#boolean) | _Optional_        | Identifies if the advenure is fully written                            |

full example
```yaml
---
alias: []
tags: [rpgm/outline/adventure/1/1]
synopsis: "The player characters will need to recover the [[Blue Pendant]] from the [[Upside Down]] to be able to find where the [[Demogorgon]]"
completed: false
---
```

### Sessions

| Key                   | Type                           | Required/Optional  | Description                                                        |
|-----------------------|--------------------------------|--------------------|--------------------------------------------------------------------|
| alias                 | [array](#array)                | **Required**       | The aliases of the current session                                 |
| tags                  | [array](#array)                | **Required**       | The tags associated to the session. The tag `session` is required. |
| synopsis              | [text](#text)                  | **Required**       | The short description of the session                               |
| relationships.musics  | [relationship](#relationship)  | _Optional_         | The songs of playlist to be played during the session              |
| dates.session         | [date](#date)                  | _Optional_         | The **in-game** date when the event of the session happen          |
| dates.irl             | [date](#date)                  | _Optional_         | The **in-real-life** date in which the session is scheduled        |
| completed             | [boolean](#boolean)            | _Optional_         | Identifies if the session is fully written                         |

full example
```yaml
---
alias: []
tags: [rpgm/outline/session/1/1/1]
synopsis: "**BUT** they will realise there is a [[Demagorgon]] waiting for them in the [[Upside Down]]"
dates:
  session: 1984-03-21
  irl: 2022-08-01
completed: true
---
```

### Scenes

| Key                      | Type                          | Required/Optional | Description                                                           |
|--------------------------|-------------------------------|-------------------|-----------------------------------------------------------------------|
| alias                    | [array](#array)               | **Required**      | The aliases of the current scene                                      |
| tags                     | [array](#array)               | **Required**      | The tags associated to the scene. The tag `scene` is required.        |
| synopsis                 | [text](#text)                 | **Required**      | The goal of the scene                                                 |
| action                   | [text](#text)                 | **Required**      | The action the player characters are expected to perform in the scene |
| relationships.clues      | [relationship](#relationship) | _Optional_        | The clues that can be found in the scene                              |
| relationships.characters | [relationship](#relationship) | _Optional_        | The characters that can be found in the scene                         |
| relationships.locations  | [relationship](#relationship) | _Optional_        | The locations the scene happens in or is related to                   |
| relationships.musics     | [relationship](#relationship) | _Optional_        | The songs of playlist to be played during the scene                   |
| time.start               | [date](#date)                 | _Optional_        | The **in-real-life** time the scene starts                            |
| time.end                 | [date](#date)                 | _Optional_        | The **in-real-life** time the scene ends                              |
| completed                | [boolean](#boolean)           | _Optional_        | Identifies if the scene is fully written                              |

full example
```yaml
---
alias: []
tags: [rpgm/outline/scene/1/2/5/12]
synopsis: ""
action: ""
relationships: 
  clues: 
    Demogorgon Print: "On the ground, the player characters will find the print of a [[Demogorgon]]"
  locations:
    Upside Down: ""
time:
  start: 2022-08-01T22:30
  end: 2022-08-01T22-45
---
```

### Player Characters

| Key                      | Type                           | Required/Optional | Description                                                                      |
|--------------------------|--------------------------------|-------------------|----------------------------------------------------------------------------------|
| alias                    | [array](#array)                | **Required**      | The aliases of the current player character                                      |
| tags                     | [array](#array)                | **Required**      | The tags associated to the player character. The tag `character/pc` is required. |
| dates.dob                | [date](#date)                  | _Optional_        | The **in-game** date of birth of the player character                            |
| dates.death              | [date](#date)                  | _Optional_        | The **in-game** date of death of the player character                            |
| relationships.characters | [relationship](#relationship)  | _Optional_        | The type of membership the current player character has with other characters    |
| relationships.factions   | [relationship](#relationship)  | _Optional_        | The type of membership the current player character has with factions            |
| relationships.locations  | [relationship](#relationship)  | _Optional_        | The relationship the current player character has with locations                 |
| completed                | [boolean](#boolean)            | _Optional_        | Identifies if the session is fully written                                       |

full example
```yaml
---
alias: [Eleven]
tags: [rpgm/element/character/pc/1]
dates:
  dob: 197-01-01
  death:
relationships:
  characters: 
  factions:
  locations:
    Hawkins: "I live in Hawkins, Indiana"
completed: false
---
```

### Non Player Characters

| Key                      | Type                           | Required/Optional | Description                                                                                     |
|--------------------------|--------------------------------|------------------|-------------------------------------------------------------------------------------------------|
| alias                    | [array](#array)                | **Required**     | The aliases of the current non player character                                                 |
| tags                     | [array](#array)                | **Required**     | The tags associated to the non player character. The tag `character/npc` is required.           |
| synopsis                 | [text](#text)                  | **Required**     | The short description of the non player character                                               |
| goals                    | [text](#text)                  | _Optional_       | The short description of the goals of the  non player character                                 |
| dates.dob                | [date](#date)                  | _Optional_       | The **in-game** date of birth of the non player character                                       |
| dates.death              | [date](#date)                  | _Optional_       | The **in-game** date of death of the non player character                                       |
| relationships.characters | [relationship](#relationship)  | _Optional_       | The description of the relation the current non player character has with non player characters |
| relationships.factions   | [relationship](#relationship)  | _Optional_       | The type of membership the current non player character has with factions                       |
| relationships.locations  | [relationship](#relationship)  | _Optional_       | The relationship the current non player character has with locations                            |
| completed                | [boolean](#boolean)            | _Optional_       | Identifies if the non player character is fully written                                         |

full example
```yaml
---
alias: [Mike, Wheeler]
tags: [rpgm/element/character/npc/1]
synopsis: "The leader of the [[Party]] and main character in the hunt to free [[Will Byers]]."
dates:
  dob: 1971-04-07
  death:
relationships:
  characters:
    Eleven: "She is my best friend, and maybe something more"
    Lucas Sinclair: "One of my tribe"
    Dustin Henderson: "Crazy dustin! I love him!"
    Will Byers: "My best friend in the whole world"
  factions:
    Party: "game master"
    students: "student"
    AV Club: "member"
  locations:
    Hawkins: "I live in Hawkins, Indiana"
completed: false
---
```

### Factions

| Key                     | Type                          | Required/Optional | Description                                                        |
|-------------------------|-------------------------------|-------------------|--------------------------------------------------------------------|
| alias                   | [array](#array)               | **Required**      | The aliases of the current faction                                 |
| tags                    | [array](#array)               | **Required**      | The tags associated to the faction. The tag `faction` is required. |
| synopsis                | [text](#text)                 | **Required**      | The short description of the faction                               |
| relationships.locations | [relationship](#relationship) | _Optional_        | The relationship the current faction has with locations            |
| completed               | [boolean](#boolean)           | _Optional_        | Identifies if the faction is fully written                         |

full example
```yaml
---
alias: ["Dungeons & Dragons"]
tags: [rpgm/element/faction/1]
synopsis: "The party is a group of four people who are tasked with finding [[Will Byers]]"
relationships:
  locations:
    Hawkins: "The member of the party lives in Hawkins"
completed: false
---
```

### Locations

| Key                      | Type                           | Required/Optional | Description                                                                           |
|--------------------------|--------------------------------|-------------------|---------------------------------------------------------------------------------------|
| alias                    | [array](#array)                | **Required**      | The aliases of the current location                                                   |
| tags                     | [array](#array)                | **Required**      | The tags associated to the location. The tag `location` is required.                  |
| synopsis                 | [text](#text)                  | **Required**      | The short description of the location                                                 |
| address                  | [text](#text)                  | _Optional_        | The physical address of the location                                                  |
| relationships.locations  | [relationship](#relationship)  | _Optional_        | The locations that are part of the current location (for example the parts of a city) |
| completed                | [boolean](#boolean)            | _Optional_        | Identifies if the location is fully written                                           |

full example
```yaml
---
alias: ["Will's House", "The Scary House"]
tags: [rpgm/element/location/1]
synopsis: "The house of [[Will Byers]] and the place from where he disappeared"
address: "573 Hawkins High, Hawkins, IN"
relationships:
  locations:
    Will Bedroom: "The bedroom of [[Will Byers]]"
completed: false
---
```

### Events

| Key                      | Type                           | Required/Optional | Description                                                    |
|--------------------------|--------------------------------|-------------------|----------------------------------------------------------------|
| alias                    | [array](#array)                | **Required**      | The aliases of the current event                               |
| tags                     | [array](#array)                | **Required**      | The tags associated to the event. The tag `event` is required. |
| synopsis                 | [text](#text)                  | **Required**      | The short description of the event                             |
| dates.event              | [date](#date)                  | **Required**      | The **in-game** date of when the event happened or will happen |
| relationships.clues      | [relationship](#relationship)  | _Optional_        | The clues created by the current event                         |
| relationships.characters | [relationship](#relationship)  | _Optional_        | The non player characters involved in the current event        |
| relationships.locations  | [relationship](#relationship)  | _Optional_        | The locations in which the current event happened              |
| completed                | [boolean](#boolean)            | _Optional_        | Identifies if the event is fully written                       |

full example
```yaml
---
alias: ["Will's Disappearance"]
tags: [rpgm/element/event/1]
synopsis: "The disappearance of [[Will Byers]] and its fall in the [[Upside Down]]"
dates:
  event: 1983-11-06
relationships:
  clues:
    Byers House: "[[Will Byers]] was in [[Byers House]] when he was captured by the [[Demogorgon]] and brought to the [[Upside Down]]"
  characters:
    Demogorgon: "Kidnapped [[Will Byers]]"
    Will Byers: "Was kidnapped by the [[Demogorgon]]"
  locations:
    Byers House: "[[Will Byers]] disappeared while in [[Byers House|his house]]"
completed: true
---
```

### Clues

| Key                       | Type                           | Required/Optional | Description                                                                   |
|---------------------------|--------------------------------|-------------------|-------------------------------------------------------------------------------|
| alias                     | [array](#array)                | **Required**      | The aliases of the current clue                                               |
| tags                      | [array](#array)                | **Required**      | The tags associated to the clue. The tag `clue` is required.                  |
| synopsis                  | [text](#text)                  | **Required**      | The short description of the clue                                             |
| dates.found               | [date](#date)                  | **Required**      | The **in-game** date of when the clue was discovered by the player characters |
| relationships.characters  | [relationship](#relationship)  | _Optional_        | The non player characters in the know of the current clue                     |
| relationships.locations   | [relationship](#relationship)  | _Optional_        | The locations in which the current clue can be found                          |
| completed                 | [boolean](#boolean)            | _Optional_        | Identifies if the clue is fully written                                       |

full example
```yaml
---
alias: ["Christmas Lights", "Fairy Lights"]
tags: [rpgm/element/clue/1]
synopsis: "The fairy lights bought by [[Joyce Byers]] to communicate with [[Will Byers]]"
dates:
  found: 1983-11-05
relationships:
  characters:
    Joyce Byers: "[[Joyce Byers|Joyce]] bought the [[Christmas Lights]]"
    Jonathan Byers: "Knows his [[Joyce Byers|mother]] has the lights"
  locations:
    Byers House: "[[Joyce Byers]] keeps the [[Christmas Lights]] in [[Byers House|her house]]"
---
```

### Music

| Key                     | Type                           | Required/Optional | Description                                          |
|-------------------------|--------------------------------|-------------------|------------------------------------------------------|
| alias                   | [array](#array)                | **Required**      | The aliases of the current song or playlist          |
| tags                    | [array](#array)                | **Required**      | The tags associated to the music.                    |
| synopsis                | [text](#text)                  | **Required**      | The short description of the song or playlist        |
| relationships.musics    | [relationship](#relationship)  | _Optional_        | The child songs of playlist of a specific playlist   |
| completed               | [boolean](#boolean)            | _Optional_        | Identifies if the clue is fully written              |


full example
```yaml
---
alias: [unease]
tags: [rpgm/element/music/1]
synopsis: "The music to play during moments in which the player character should start feeling something is coming up"
url: "https://www.youtube.com/watch?v=NLvzfOWI4aE"
relationships:
  musics:
---
```
