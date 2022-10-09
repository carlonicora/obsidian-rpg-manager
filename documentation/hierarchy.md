[RPG Manager Documentation](../../index.md) >
Hierarchy

# Plot Hierarachy

RPG Manager uses a stuctured approach to the hierarchy of a campaign plot. This hierarchy draws inpiration from
both the world of storytelling as well as the world of films. The structure is fixed and cannot be customised.

> **Campaign** > **Adventures** > **Acts** > **Scenes**

A [campaign](components/campaign.md) is an overarching plot which does not involve the player characters directly. It 
contains multiple [adventures](components/adventure.md), which are self-contained story arcs that intersect the
campaign plot. These adventures, both for sake of simplifying their plot and for giving a more organised way to
manage them, are divided in [acts](components/act.md). Apart form being a logical subdivision of an adventure, an act 
has its own plot, to simplify its creation and contains multiple [scenes](components/scene.md). The scene is the 
smallest element in the plotting phase, and identifies a moment in a game in which the player characters are required
to do something. Consider, for example, a combat, or meeting a non-player character, or climbing a wall to reach 
something they need: these are all examples of scenes.

- A `scene` should last 5 to 30 minutes of game time each.
- An `act` should try and be the lenght of a session, containing up to around 10 scenes
- An `adventure` should contain 4 `acts`, therefore be played in 4 sessions
- A `campaign` should contain between 8 and 12 `adventures`

These are, of course, generalisations based on a [structured approach to plotting](plots/index.md). While you can 
manage your campaign as you see fit, RPG Manager was built with this structured approach to simplify the creation
of your plots.
