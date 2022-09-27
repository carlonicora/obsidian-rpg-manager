# Frontmatter Specifications for Rpg Manager

## Introduction

One of the things to remember about Frontmatter metadata is that it is a [YAML](https://en.wikipedia.org/wiki/YAML) 
code, and it must follow some specific rules.
- Tabs are NOT allowed in YAML. You should use space for indention.
- Though the amount of space doesn't matter as long as the child node indentation is more than the parent, it is a good 
practice to keep the same number of spaces.
- There must be space between different elements of YAML (explained later).
- YAML is case-sensitive.

## Frontmatter specifications for components

### Campaigns

| Key           | Type     | Required/Optional | Description                                                                                              |
|---------------|----------|-------------------|----------------------------------------------------------------------------------------------------------|
| alias         | array    | **Required**      | The aliases of the current campaign                                                                      |
| tags          | array    | **Required**      | The tags associated to the campaign. The tag `campaign` is required.                                     |
| settings      | text     | _Optional_        | Identifies the game-specific settins. Currently supported are `Agnostic` (anything), `Raw` and `Vampire` |
| dates.current | date     | _Optional_        | The current **in-game** date                                                                             |
| completed     | boolean  | _Optional_        | Identifies if the campaign is fully written                                                              |

Please note: RPG Manager focuses on plotting stories and it is therefore agnostic to the type of RPG settings you are
using; however, I am working on creating setting-specific functionalities that **extend** what RPG Manager does with its
default Agnostic set of information.

full example
```yaml
---
alias: ["Olympia - An '80s horror story"]
tags: [rpgm/campaign/1]
settings: Agnostic
dates:
  current: 1984-05-20
---
```

### Adventures

| Key           | Type     | Required/Optional | Description                                                            |
|---------------|----------|-------------------|------------------------------------------------------------------------|
| alias         | array    | **Required**      | The aliases of the current adventure                                   |
| tags          | array    | **Required**      | The tags associated to the adventure. The tag `adventure` is required. |
| synopsis      | text     | _Optional_        | The short description of the adventure                                 |
| completed     | boolean  | _Optional_        | Identifies if the advenure is fully written                            |

full example
```yaml
---
alias: []
tags: [rpgm/adventure/1/1]
synopsis: "Recover the [[Grimoire]] from the [[Cave]]"
completed: false
---
```

### Acts

| Key                   | Type     | Required/Optional | Description                                                |
|-----------------------|----------|-------------------|------------------------------------------------------------|
| alias                 | array    | **Required**      | The aliases of the current act                             |
| tags                  | array    | **Required**      | The tags associated to the act. The tag `act` is required. |
| synopsis              | text     | _Optional_        | The short description of the session                       |
| completed             | boolean  | _Optional_        | Identifies if the session is fully written                 |

full example
```yaml
---
alias: []
tags: [rpgm/act/1/1/1]
synopsis: "**BUT** they will realise there is a corpse in the [[Cave]], before the [[Main Hall in the Cave|main hall]]"
completed: true
---
```

### Scenes

| Key          | Type          | Required/Optional | Description                                                                                                                                   |
|--------------|---------------|-------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| alias        | array         | **Required**      | The aliases of the current scene                                                                                                              |
| tags         | array         | **Required**      | The tags associated to the scene. The tag `scene` is required.                                                                                |
| synopsis     | text          | _Optional_        | The goal of the scene                                                                                                                         |
| date         | date          | _Optional_        | The **in-game** date (Gregorian calendar only)                                                                                                |
| time.start   | date and time | _Optional_        | The **in-real-life** time the scene starts                                                                                                    |
| time.end     | date and time | _Optional_        | The **in-real-life** time the scene ends                                                                                                      |
| session      | number        | _Optional_        | The unique identifier of the session in which the scene will be played                                                                        |
| storycircle  | text          | _Optional_        | The stage in which the scene belongs in a story circle act plot. It accepts `You`, `Need`, `Go`, `Search`, `Find`, `Take`, `Return`, `Change` |
| completed    | boolean       | _Optional_        | Identifies if the scene is fully written                                                                                                      |

full example
```yaml
---
alias: []
tags: [rpgm/scene/1/2/5/12]
synopsis: "Discover the corpse of [[Felipe Maniego]] lying on the ground"
date: 1984-10-31
time:
  start: 2022-08-01T22:30
  end: 2022-08-01T22-45
session: 1
storycircle: Change
---
```

### Sessions

| Key       | Type    | Required/Optional | Description                                                        |
|-----------|---------|-------------------|--------------------------------------------------------------------|
| alias     | array   | **Required**      | The aliases of the current session                                 |
| tags      | array   | **Required**      | The tags associated to the session. The tag `session` is required. |
| synopsis  | text    | _Optional_        | The description of the session                                     |
| dates.irl | date    | _Optional_        | The **in-real-life** date in which the session is played           |
| completed | boolean | _Optional_        | Identifies if the session is fully written                         |

full example
```yaml
---
alias: []
tags: [rpgm/session/1/1]
synopsis: "Session 0! Start the campaing"
dates: 
  irl: 1984-10-31
---
```

### Subplot

| Key       | Type    | Required/Optional | Description                                                       |
|-----------|---------|-------------------|-------------------------------------------------------------------|
| alias     | array   | **Required**      | The aliases of the current subplot                                |
| tags      | array   | **Required**      | The tags associated to the subplot. The tag `subplot` is required |
| synopsis  | text    | _Optional_        | The short description of the subplot                              |
| completed | boolean | _Optional_        | Identifies if the clue is fully written                           |


full example
```yaml
---
alias: ["Felipe's murder"]
tags: [rpgm/subplot/1]
synopsis: "All the events and clues related to the murder of [[Felipe]]"
completed: false
---
```

### Player Characters

| Key         | Type    | Required/Optional | Description                                                                                |
|-------------|---------|-------------------|--------------------------------------------------------------------------------------------|
| alias       | array   | **Required**      | The aliases of the current player character                                                |
| tags        | array   | **Required**      | The tags associated to the player character. The tag `pc` is required.                     |
| synopsis    | text    | _Optional_        | The description of the player character                                                    |
| dates.dob   | date    | _Optional_        | The **in-game** date of birth of the player character (Gregorian calendar only)            |
| dates.death | date    | _Optional_        | The **in-game** date of death of the player character (Gregorian calendar only)            |
| pronoun     | text    | _Optional_        | The pronoun used for the character (accepts "t" (they/them) "s" (she/her) and "h" (he/him) |
| image       | url     | _Optional_        | A link to an image to be used as avatar for the character                                  |
| completed   | boolean | _Optional_        | Identifies if the session is fully written                                                 |

full example
```yaml
---
alias: [Lisa]
tags: [rpgm/pc/1]
synopsis: "The character of **Faby**"
dates:
  dob: 1968-01-01
  death:
pronoun: s
image: http://something.jpg
completed: false
---
```

### Non Player Characters

| Key         | Type    | Required/Optional | Description                                                                                |
|-------------|---------|-------------------|--------------------------------------------------------------------------------------------|
| alias       | array   | **Required**      | The aliases of the current non player character                                            |
| tags        | array   | **Required**      | The tags associated to the non player character. The tag `npc` is required.                |
| synopsis    | text    | _Optional_        | The description of the non player character                                                |
| dates.dob   | date    | _Optional_        | The **in-game** date of birth of the non player character (Gregorian calendar only)        |
| dates.death | date    | _Optional_        | The **in-game** date of death of the non player character (Gregorian calendar only)        |
| pronoun     | text    | _Optional_        | The pronoun used for the character (accepts "t" (they/them) "s" (she/her) and "h" (he/him) |
| image       | url     | _Optional_        | A link to an image to be used as avatar for the character                                  |
| goals       | text    | _Optional_        | A short description of the goals of the non player character                               |
| completed   | boolean | _Optional_        | Identifies if the session is fully written                                                 |

full example
```yaml
---
alias: [Christina]
tags: [rpgm/npc/1]
synopsis: "The main npc and friend of the [[Party]]. Eclectic, punk chick"
dates:
  dob: 1967-05-20
  death:
pronoun: s
image: https://somelink.jpg
goals: "Understand who was the girl she saw performing the [[Ritual]] and possibly killing [[Andreas]]"
completed: false
---
```

### Factions

| Key       | Type     | Required/Optional | Description                                                        |
|-----------|----------|-------------------|--------------------------------------------------------------------|
| alias     | array    | **Required**      | The aliases of the current faction                                 |
| tags      | array    | **Required**      | The tags associated to the faction. The tag `faction` is required. |
| synopsis  | text     | _Optional_        | The short description of the faction                               |
| image     | url      | _Optional_        | A link to an image to be used as avatar for the faction            |
| completed | boolean  | _Optional_        | Identifies if the faction is fully written                         |

full example
```yaml
---
alias: [Party, "The Party"]
tags: [rpgm/faction/1]
synopsis: "The party is a group of four people who are tasked with finding the [[Grimoire]]"
completed: false
---
```

### Locations

| Key       | Type    | Required/Optional | Description                                                          |
|-----------|---------|-------------------|----------------------------------------------------------------------|
| alias     | array   | **Required**      | The aliases of the current location                                  |
| tags      | array   | **Required**      | The tags associated to the location. The tag `location` is required. |
| synopsis  | text    | _Optional_        | The short description of the location                                |
| image     | url     | _Optional_        | A link to an image to be used as avatar for the location             |
| address   | text    | _Optional_        | The physical address of the location                                 |
| completed | boolean | _Optional_        | Identifies if the location is fully written                          |

full example
```yaml
---
alias: ["The Cave"]
tags: [rpgm/location/1]
synopsis: "The cave in which it is rumoured the [[Grimoire]] can be found"
address: "666 Dr Nels Hanson Way S, Olympia, WA"
image: https://photoofacave.png
completed: false
---
```

### Events

| Key                      | Type     | Required/Optional | Description                                                                              |
|--------------------------|----------|-------------------|------------------------------------------------------------------------------------------|
| alias                    | array    | **Required**      | The aliases of the current event                                                         |
| tags                     | array    | **Required**      | The tags associated to the event. The tag `event` is required.                           |
| synopsis                 | text     | _Optional_        | The short description of the event                                                       |
| dates.event              | date     | **Required**      | The **in-game** date of when the event happened or will happen (Gregorian calendar only) |
| completed                | boolean  | _Optional_        | Identifies if the event is fully written                                                 |

full example
```yaml
---
alias: ["The murder of Felipe"]
tags: [rpgm/event/1]
synopsis: "[[Jessica]] killed [[Felipe]] to perform a ritual"
dates:
  event: 1983-11-06
completed: true
---
```

### Clues

| Key         | Type     | Required/Optional | Description                                                                   |
|-------------|----------|-------------------|-------------------------------------------------------------------------------|
| alias       | array    | **Required**      | The aliases of the current clue                                               |
| tags        | array    | **Required**      | The tags associated to the clue. The tag `clue` is required.                  |
| synopsis    | text     | _Optional_        | The short description of the clue                                             |
| dates.found | date     | _Optional_        | The **in-game** date of when the clue was discovered by the player characters |
| image       | url      | _Optional_        | A link to an image to be used as avatar for the clue                          |
| completed   | boolean  | _Optional_        | Identifies if the clue is fully written                                       |

full example
```yaml
---
alias: ["Grimoire", "Grimoire of Olympia", "Satanic Book"]
tags: [rpgm/clue/1]
synopsis: "The book called [[Grimoire]] is nothing else that a satanic tome"
dates:
  found:
image: https://the_photo_of_a_scary_book.jpeg
---
```

### Music

| Key       | Type    | Required/Optional | Description                                                   |
|-----------|---------|-------------------|---------------------------------------------------------------|
| alias     | array   | **Required**      | The aliases of the current song or playlist                   |
| tags      | array   | **Required**      | The tags associated to the music. The tag `music` is required |
| synopsis  | text    | _Optional_        | The short description of the song or playlist                 |
| image     | url     | _Optional_        | A link to an image to be used as avatar for the Music         |
| url       | url     | _Optional_        | A link to an online song or playlist                          |
| completed | boolean | _Optional_        | Identifies if the clue is fully written                       |


full example
```yaml
---
alias: [unease]
tags: [rpgm/music/1]
synopsis: "The music to play during moments in which the player character should start feeling something is coming up"
url: "https://www.youtube.com/watch?v=NLvzfOWI4aE"
---
```
