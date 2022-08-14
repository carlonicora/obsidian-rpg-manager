# Frontmatter Specifications for Rpg Manager

## Introduction

One fo the things to remember about Frontmatter metadata is that it is a [YAML](https://en.wikipedia.org/wiki/YAML) 
code, and it must follow some specific rules.
- Tabs are NOT allowed in YAML. You should use space for indention.
- Though the amount of space doesn't matter as long as the child node indentation is more than the parent, it is a good 
practice to keep the same number of spaces.
- There must be space between different elements of YAML (explained later).
- YAML is case-sensitive.

PS: In the examples provided, I referece "Stranger Things". Spoilers for Season 1! Be warned :)

## Element Types

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

## Keys Used By Rpg Manager

The following list identifies all the keys used in 
[Rpg Manager Plugin](https://github.com/carlonicora/obsidian-rpg-manager). Every [element](README.md#elements) must or 
can contain different keys. This list specifies the keys while they required or optional use in each element is 
specified [below](#frontmatter-metadata-for-each-element-in-rpgmanager).

### alias

- Type: [text](#text) or [array](#array)

(_Obsidian default_) Identifies the aliases for the current note. It is heavily used in simplifying the name of a 
character, where normally the name of the note is the full name, while in the alias the first name can be written to 
simplify the writing.

example
```yaml
---
alias: [Name, "Another Name", "Sometimes I use an alias that makes me remeber of the element"]
---
```

### tags

- Type:[array](#array) 

(_Obsidian default_) Identifies the tags of a specific note. 
[Rpg Manager Plugin](https://github.com/carlonicora/obsidian-rpg-manager) **requires** each note to contain the tag of 
the type of the [element](README.md#elements) you are writing. The required tag is one of these:
- campaign
- adventure
- session
- scene
- character/npc
- character/pc
- faction
- location
- event
- clue
- note

One of the best practices used with [Rpg Manager Plugin](https://github.com/carlonicora/obsidian-rpg-manager) is to use 
a specific tags to geolocate an element when necessary. This is normally in the format 
`geolocation\country\city\location-name`. The geolocation is **not** required, but it will simplify your life if you 
use lots of locations and you want them geolocated specifically.

examples

```yaml
---
tags: [scene, geolocation\uk\london\my-house]
---
```

```yaml
---
tags: [location, geolocation\uk\london\my-house]
---
```

### synopsis

- Type:[text](#text)

The synopsis is a short text that is displayed immediately in the notes. The synopsis should be short enough to be read in a few seconds and give enough inforamtion to the storyteller on the element in question.

You can use obsidian links in the text and the link will be displayed in the Reading View.

example
```yaml
---
synopsis: "This is the synopsis for this element, it can contain [[links]]"
---
```

### ids

- Type: [object](#object)

Ids are object that contain specific `id` that are used to identify certain elements. They are used to dynamically 
generate lists of Adventures, Sessions, Scenes and Notes.

example
```yaml
---
ids: 
 adventure: 1
---
```

#### adventure

- Type: [number](#number)

Uniquely identifies an [adventure](#adventures) in a [campaign](#campaigns) or references a specific adventure a [session](#sessions) belongs 
to (if in a session).

adventure example
```yaml
---
ids:
 adventure: 1
---
```

session example
```yaml
---
ids:
 adventure: 1
 session: 10
---
```

#### session

- Type: [number](#number)

Uniquely identifies a [session](#sessions) in a campaign or references a specific session a [scene](#scenes) belongs to.
It is the session number the storyteller runs for the players.

session example
```yaml
---
ids:
 adventure: 1
 session: 10
---
```

scene example
```yaml
---
ids:
    session: 9
    scene: 11
---
```

#### scene

- Type: [number](#number)

Identifies the number of a [scene](#scenes) in a [session](#sessions). This number is unique in the context of a 
session, thereofre there can be two different scenes that have the same scene number, as long as the session number is 
different. 

example
```yaml
---
ids:
    session: 9
    scene: 11
---

---
ids:
    session: 10
    scene: 11
---
```

#### type

- Type: [text](#text)

If you are using the [ABT Plotting Structure](https://github.com/carlonicora/RAW/blob/master/StorytellingGuide.md#abt) 
to simplify your plot writing, this key identifies the stage of your session in the adventure storyarc. The value is 
one amongst `NEED`, `AND`, BUT` or `THEREFORE`. 

example
```yaml
---
ids:
 type: "AND"
---
```

### dates

- Type: [object](#object)

The `dates` object can contain a list of dates which are used in various elements. 

The `dates` can be either **in-game** or **in-real-life**. The **in-game** dates refers to dates the player characters 
encounters, while the **in-real-life** ones refers to a spacific date in which a session is played by the players. Only 
the Gregorian calendar is supported.

example
```yaml
---
dates:
 dob: 2000-01-01
---
```

#### current

- Type: [date](#date)

Used exclusively in the [campaign](#campaigns), this identifies the **in-game** date the campaign is currently in. If 
you are playing an '80s campaign, it could be `1984-05-20` and if you are playing a contemporary campaign it can be 
`2022-08-01`.

example
```yaml
---
dates: 
 current: 1984-05-20
---
```

#### irl

- Type: [date](#date)

Used exclusively in a [session](#sessions), this date identifies the **in-real-life** date schedule to run a particular 
game session. The date may or may not contain the time.

example
```yaml
---
dates:
 irl: 2022-08-01T20:30
---

---
dates:
 irl: 2022-08-01
---
```

#### found

- Type: [date](#date)

Used exclusively in a [clue](#clues), this date identifies the **in-game** moment the player characters have discovered 
a clue. This is used to make sure the storyteller knows which information the player characters have access to.

example
```yaml
---
dates:
 found: 1984-01-06
---
```

#### event

- Type: [date](#date)

Used exclusively in an [event](#events), this date identifies when an event happened. This is particularly important to 
create a timeline of events to help the storyteller to have a clear view of the events happening in the world the 
player characters live.

example
```yaml
---
dates:
 event: 1984-12-17
---
```

#### dob

- Type: [date](#date)

Used in a [player character](#player-characters) or in a [non player character](#non-player-characters), this dates 
identifies the **date of birth** of a character. In conjunction with the [current date in the campaign](#current), this 
date is used to identify the age of a character.

example
```yaml
---
dates:
 dob: 1947-05-26
---
```

#### death

- Type: [date](#date)

Used in a [player character](#player-characters) or in a [non player character](#non-player-characters), this dates
identifies the **date of death** of a character and to display if the character is alive or dead. In conjunction with 
the character [date of birth](#dob) and the [current date in the campaign](#current), this date is used to identify the 
age at death of a character.

example
```yaml
---
dates:
 death: 1979-01-05
---
```

### address

Used exclusively in a [location](#locations), this text identifies the precise address of a location. This is used to 
add flavour to the campaign, and allow the players to have a frame of reference of where a specific location is. The value has no effect on any map.

- Type: [text](#text)

example
```yaml
---
address: "35 Burns Road, SW11 5GX, London"
---
```

### goals

- Type: [text](#text)

Used exclusively in a [non player character](#non-player-characters), this text identifies what are the goals of a 
specific npc. This information is usually important for a storyteller to define the behaviour of a non player 
character when they meet the player characters. The goal should be a short text, easy to read quickly. 

You can use obsidian links in the text and the link will be displayed in the Reading View.

example
```yaml
---
alias: ["Darth Vader"]
goals: "Rid the universe from [[Jedi Knigths|Jedi]]"
---
```

### time

- Type: [object](#object)

The `time` object can contain the start and end time of a [scene](#scenes). We use these values to keep track of how 
long a specific scene lasts. Used in indsight, this will help storytellers to understand which type of scenes takes 
longer for a specific party and will allow a better plotting for future sessions. By no mean this is a required value.

example
```yaml
---
time:
 start: 2022-08-01T20:30
---
```

#### start

- Type: [date](#date)

Used exclusively in a [scene](#scenes), this date/time keeps track of the time a specific scene **starts**. 

example
```yaml
---
time:
 start: 2022-08-01T20:30
---
```

#### end

- Type: [date](#date)

Used exclusively in a [scene](#scenes), this date/time keeps track of the time a specific scene **ends**.

example
```yaml
---
time:
 start: 2022-08-01T20:30
 end: 2022-08-01T20:45
---
```

### completed

- Type: [boolean](#boolean)

This key identifies if the note has been fully written, or if it requires more work. The key can be polled with 
dataview to crate a list of notes that still requires some writing. Once the note is complete, you can either set the 
value to true, or remove this key alltogether.

example
```yaml
---
completed: false
---
```

### relationships

- Type: [object](#object)

This object identifies the relationship the current element has with other elements in the campaign.

example
```yaml
---
relationships:  
 characters: 
 clues: 
 factions: 
 locations: 
---
```

#### characters

- Type: [relationship](#relationship)

This creates specific relationships between the current element and a character (both player character and non player 
character). This relationships simplifies the life of the storyteller as it identifies how an element sees or is 
involved with a character. This ensures consistency in the way, for example, two non player characters relates to each 
other or how a non player character treats a player character.

You can use obsidian links in the text and the link will be displayed in the Reading View.

example
```yaml
---
alias: ["Obi-Wan", "Kenobi", "Ben", "Ben Kenobi"]
tags: [character/npc]
relationships:
 characters: 
  Darth Vader: "My former apprentice turned to the dark side. I love him, but he is lost"
  Luke Skywalker: "Luke is a boy with his heart in the right place. When he is ready I can train him"
  Leia Organa: "Leia is a tough girl, I like her attitude. If things don't pan out well with [[Luke Skywalker]] she is another option."
---
```

#### clues

- Type: [relationship](#relationship)

This creates a specific relationship between the current element and a clue. Normally it identifies which characters 
know about the clue (if the current element is a [non player character](#non-player-characters)), which event a clue 
was generated from (if the current element is an [event](#events)) or even where the clue can be found (if the current 
element is a [location](#locations)).

You can use obsidian links in the text and the link will be displayed in the Reading View.

example
```yaml
---
alias: ["Obi-Wan", "Kenobi", "Ben", "Ben Kenobi"]
tags: [character/npc]
relationships:
 clues:
  Darth Vader Lightsaber: "I have the lightsaber of [[Darth Vader]]"
  Plans of the Death Star: "The plans for the [[Death Star]] are in [[R2-D2]]'s internal memory, and R2 is with me"
---
```

#### factions

- Type: [relationship](#relationship)

This creates a specific relationship between the current element and a faction. The current element is normally a 
character (both non player characters and player characters) and identifies the belonging to one or more factions or 
groups. The value of the relationship is normally the role played by the character in the faction.

You can use obsidian links in the text and the link will be displayed in the Reading View.

example
```yaml
---
alias: ["Obi-Wan", "Kenobi", "Ben", "Ben Kenobi"]
tags: [character/npc]
relationships:
 factions:
  Jedi: "Jedi Knight"
  House Organa: "Trusted Figure"
---
```

#### locations

- Type: [relationship](#relationship)

This creates a specific relationship between the current element and a location. It may imply the presence in a 
location (in the case of a clue), its happening (in case of an event) or a simple relation to a specific location.

You can use obsidian links in the text and the link will be displayed in the Reading View.

example
```yaml
---
alias: ["Obi-Wan", "Kenobi", "Ben", "Ben Kenobi"]
tags: [character/npc]
relationships:
 locations:
  Obi-Wan Kenobi Hut: "Lives in"
  Dagobah: "Knows about it and knows that [[Yoda]] lives here"
---
```

## Frontmatter metadata for each element in RpgManager

### Campaigns

| Key           | Type            | Required/Optional | Description                                                          |
|---------------|-----------------|-------------------|----------------------------------------------------------------------|
| alias         | [array](#array) | **Required**      | The aliases of the current campaign                                  |
| tags          | [array](#array) | **Required**      | The tags associated to the campaign. The tag `campaign` is required. |
| dates.current | [date](#date)   | _Optional_        | The current **in-game** date                                         |

full example
```yaml
---
alias: ["Stranger Things"]
tags: [campaign]
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
| ids.adventure | [number](#number)   | **Required**      | The unique identifier of the adventure                                 |
| completed     | [boolean](#boolean) | _Optional_        | Identifies if the advenure is fully written                            |

full example
```yaml
---
alias: []
tags: [adventure]
synopsis: "The player characters will need to recover the [[Blue Pendant]] from the [[Upside Down]] to be able to find where the [[Demogorgon]]"
ids: 
 adventure: 5
completed: false
---
```

### Sessions

| Key           | Type                | Required/Optional                                           | Description                                                        |
|---------------|---------------------|-------------------------------------------------------------|--------------------------------------------------------------------|
| alias         | [array](#array)     | **Required**                                                | The aliases of the current session                                 |
| tags          | [array](#array)     | **Required**                                                | The tags associated to the session. The tag `session` is required. |
| synopsis      | [text](#text)       | **Required**                                                | The short description of the session                               |
| ids.adventure | [number](#number)   | **Required**                                                | The identifier of the adventure the session is part of             |
| ids.session   | [number](#number)   | **Required**                                                | The unique identifier of the session in the campaign               |
| dates.session | [date](#date)       | _Optional_                                                  | The **in-game** date when the event of the session happen          |
| dates.irl     | [date](#date)       | _Optional_                                                  | The **in-real-life** date in which the session is scheduled        |
| completed     | [boolean](#boolean) | _Optional_                                                  | Identifies if the session is fully written                         |

full example
```yaml
---
alias: []
tags: [session]
synopsis: "**BUT** they will realise there is a [[Demagorgon]] waiting for them in the [[Upside Down]]"
ids:
 adventure: 5
 session: 3
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
| ids.session              | [number](#number)             | **Required**      | The identifier of the session the scene is part of                    |
| ids.scene                | [number](#number)             | **Required**      | The unique identifier of the scene in the session                     |
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
tags: [scene]
synopsis: ""
action: ""
ids:
 session: 3
 scene: 4
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
tags: [character/pc, geolocation/usa/indiana/hawkins]
dates:
    dob: 197-01-01
    death:
relationships:
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
tags: [character/npc, geolocation/usa/indiana/hawkins]
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

| Key                  | Type                           | Required/Optional | Description                                                          |
|----------------------|--------------------------------|-------------------|----------------------------------------------------------------------|
| alias                | [array](#array)                | **Required**      | The aliases of the current location                                  |
| tags                 | [array](#array)                | **Required**      | The tags associated to the location. The tag `location` is required. |
| synopsis             | [text](#text)                  | **Required**      | The short description of the location                                |
| address              | [text](#text)                  | _Optional_        | The physical address of the location                                 |
| completed            | [boolean](#boolean)            | _Optional_        | Identifies if the location is fully written                          |

full example
```yaml
---
alias: ["Will's House", "The Scary House"]
tags: [location, geolocation/usa/indiana/hawkins/byers-house]
synopsis: "The house of [[Will Byers]] and the place from where he disappeared"
address: "573 Hawkins High, Hawkins, IN"
relationships:
 clues:
  Christmas Lights: "The [[Christmas Lights]] are in [[Byers House]]"
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

### Notes

| Key          | Type               | Required/Optional | Description                                                          |
|--------------|--------------------|-------------------|----------------------------------------------------------------------|
| alias        | [array](#array)    | **Required**      | The aliases of the current session note                              |
| tags         | [array](#array)    | **Required**      | The tags associated to the session note. The tag `note` is required. |
| ids.session  | [number](#number)  | **Required**      | The identifier of the session the notes refers to                    |

full example
```yaml
---
alias: []
tags: [note]
ids: 
 session: 10
---
```
