[RPG Manager Documentation](../../index.md) >
RPG Manager Code Block

# RPG Manager Code Block

The RPG Manager code blocks are elements that instruct the plugin to show certain visual elements. The code blocks are 
fully customiseable, and you can add as many elements in the as you like, as long as you use correct structures.

The code block of these type are automatically created in the Obsidian Notes once you invoke the creation of a 
RPG Manager `component` through the Obsidian Command.

```
```RpgManager
```

## Available Visual Elements

Currently there are two available elements to be used in the RPG Manager code block: header and lists

### Header

The header command shows the header for a `component` in which you can find all the relevant data regarding the 
`component`. RPG Manager will be aware of the type of `component` you are looking at, and it will customise the view
to propose the relevant information for that type.

To add he header in the RPG Manager code block you use this form:

```
```RpgManager
models:
  header: true
```

### Lists

The lists command shows one or more list of relationships of the `component`. You can add as many lists as you like in 
a single codeblock, and you can customise the type of relationship to show.

RPG Manager supports the following types of list:
- adventures 
- acts
- scenes
- sessions
- pcs
- npcs
- clues
- events
- factions
- locations
- musics
- subplots

moreover, every list type can specifiy the required [relationship](../relationships/index.md)

| Type of Relationship | Description                                                                                                                                     |
|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| Biunivocal           | Shows all the relations contained in the `component` as well as all the `components` that have a `biunivocal` relationship with the current one |
| Univocal             | Shows only the relationships contained in the component, without showing external relationships to the `component`                              |
| Child                | Shows only the `related` that have been marked as `child` of the current `component`                                                            |
| Parent               | Shows only the `related` that marked the current `component` as `child`                                                                         |
| Hierarchy            | Shows herarchical relationships, that occur between plot components                                                                             |

You can also leave the relationship type empty, and RPG Manager will display all the Univocal, Biunivocal and Reversed
relationships.

```
```RpgManager
models:
  lists: 
    pcs:
      relationship: biunivocal
    npcs:
      relationship: univocal
    locations:
    factions:
```
