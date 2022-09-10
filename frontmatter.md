# Frontmatter Specifications for Rpg Manager

## Introduction

One of the things to remember about Frontmatter metadata is that it is a [YAML](https://en.wikipedia.org/wiki/YAML) 
code, and it must follow some specific rules.
- Tabs are NOT allowed in YAML. You should use space for indention.
- Though the amount of space doesn't matter as long as the child node indentation is more than the parent, it is a good 
practice to keep the same number of spaces.
- There must be space between different elements of YAML (explained later).
- YAML is case-sensitive.

_PS: In the examples provided, I referece "Stranger Things". Spoilers for Season 1! Be warned :)_

## YAML Value Types

The Frontmatter metadata used by the [Rpg Manager Plugin](https://github.com/carlonicora/obsidian-rpg-manager) can be
of various types. Listed below you will find the types useable and their explanation. 

### Number

Number values are the simplest elements you can use and denotes a numeric value.

example
```yaml
---
number: 1
---
```

### Text

Text values are the second simplest elements you can use and denotes a string. It is adviseable to specify the value inside double 
quotes to avoid errors in YAML. If you need to use a double quote symbol in your text, just escape it adding a back 
slash (\) before the double quote.

You can also use a text value without double quotes if it does not contain any special character. 

example
```yaml
---
text: "This is the \"text\" as it appears"
another-text: another
---
```

### Boolean

Another simple value is a boolean value, which identifies a true/false case. It's as simple as writing the value as 
`true` or `false`.

example
```yaml
---
bool-value: true
do-i-like-to-write-documentation: false
---
```

### Array

Arrays are list of vaues. The most notable type of arrays you can use is the `tags` key that is used in Obsidian. 
Array values can be [numbers](#number) or [text](#text). The values can be written either inside square brackets or one 
element per line after the key definition prepended by a space and a dash sign.

example
```yaml
---
array: [1, text, "another longer text"]
another-array: 
 - 1
 - text
 - "another longer text"
---
```

### Object

The values of an object is a list `key: value` pair. You should write every value in a new line and use the notation 
for the specific type iindented with a single space.

example
```yaml
---
object:  
 number: 1
 text: text
 another-text: "another longer text"
---
```

### Date

Dates should be expressed in the form `yyyy-mm-dd`, or in the format `yyyy-mm-ddThh:mm` for date and time

example
```yaml
date: 2022-08-01
date-and-time: 2022-08-01T15:30
```

### Relationship

Relationships are particular notations used inside the 
[Rpg Manager Plugin](https://github.com/carlonicora/obsidian-rpg-manager) and are [object](#object) types that must be 
written with particular attention. The keys used should be the name of the note you want to create a relationship to 
and the values are the [text](#text) that specify the relationships.


example
```yaml
---
relationships:
 My Note Title: "This is the specification on how the current note is related to the \"My Note Title\""
 Another Note: "This is how this note is related to [[Another Note]]"
---
```

[Rpg Manager Plugin](https://github.com/carlonicora/obsidian-rpg-manager) uses various types of relationships 
(characters, locations, factions, events, clues). They must be contained inside an [object](#object) called 
`relationships`.

example
```yaml
---
relationships: 
 locations: 
  A Location: "This is how this note relates to 'A Location'"
 factions:
  Jedi: "This is how the current note is related to the [[Jedi]] faction"
---
```

#### An important note about the Relationship Keys

It is important to keep in mind that the Frontmatter metadata format **does not** accept an Obsidian link 
("[[Link here]]") as a valid value for a key. To simplify the way of writing a new relationship is suggested to use the 
link autocompletion in Obsidian, and then remove the double opening and closing square brackets.

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

| Key           | Type                | Required/Optional                                           | Description                                                        |
|---------------|---------------------|-------------------------------------------------------------|--------------------------------------------------------------------|
| alias         | [array](#array)     | **Required**                                                | The aliases of the current session                                 |
| tags          | [array](#array)     | **Required**                                                | The tags associated to the session. The tag `session` is required. |
| synopsis      | [text](#text)       | **Required**                                                | The short description of the session                               |
| dates.session | [date](#date)       | _Optional_                                                  | The **in-game** date when the event of the session happen          |
| dates.irl     | [date](#date)       | _Optional_                                                  | The **in-real-life** date in which the session is scheduled        |
| completed     | [boolean](#boolean) | _Optional_                                                  | Identifies if the session is fully written                         |

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
tags: [faction]
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
tags: [location, geolocation/usa/indiana/hawkins/byers-house]
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
tags: [event]
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
tags: [clue]
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
