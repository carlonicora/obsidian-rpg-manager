[RPG Manager Documentation](../../index.md) >
[Frontmatter](../index.md) >
tag

# RPG Manager Frontmatter TAG

| Name     | Position     | Accepted values | Required/Optional |
|----------|--------------|-----------------|-------------------|
| **tag**  | frontmatter  | _special_       | Required          |

RPG Manager identifies the various components through the use of a special tag in the frontmatter. This tag
is required in every note you want to use as a RPG Manager component. When using the Obsidian Command
tool to create new plots and elements, RPG Manager will take care of automatically create these tags for you.

RPG Manager uses default tags, but you can change them in the settings.

| Component                | Default Tag    | Required id(s)                               |
|--------------------------|----------------|----------------------------------------------|
| **Campaign**             | rpgm/campaign  | {campaignId}                                 |   
| **Adventure**            | rpgm/adventure | {campaignId}/{adventureId}                   |
| **Act**                  | rpgm/act       | {campaignId}/{adventureId}/{actId}           |
| **Scene**                | rpgm/scene     | {campaignId}/{adventureId}/{actId}/{sceneId} |
| **Session**              | rpgm/session   | {campaignId}                                 |
| **Subplot**              | rpgm/subplot   | {campaignId}                                 |
| **Player Character**     | rpgm/pc        | {campaignId}                                 |
| **Non Player Character** | rpgm/npc       | {campaignId}                                 |
| **Event**                | rpgm/event     | {campaignId}                                 |
| **Clue**                 | rpgm/clue      | {campaignId}                                 |
| **Faction**              | rpgm/faction   | {campaignId}                                 |
| **Location**             | rpgm/location  | {campaignId}                                 |
| **Music**                | rpgm/music     | {campaignId}                                 |

> Be aware of manually editing these tags: they contain numeric identifiers which allow RPG Manager to work.
