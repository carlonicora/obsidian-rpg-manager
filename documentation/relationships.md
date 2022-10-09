[RPG Manager Documentation](../../index.md) >
Relationships

# Relationships

The relationships are the backbone of how RPG Manager associates different `component`. These relationships can
be of different types.

When a relationship is created from one `component` to a `related`, the description is only valid for the `component`
itself. It identifies the relationships that the `component` has towards the `related`. This means that in certain
cases the relationships might be available to the `related` as well, but without any specific description.

It is important to understand that if you create an Obsidian Link in the content of the Obsidian Note, this will
be used by RPG Manager.

## Type of Relationships

There are six types of relationships, but only three are available to the user. The remaining three are used
by RPG Manager to manage hidden or reversed relationships.

**User-defined**
- Biunivocal
- Univocal
- Child

**System-defined**
- Reversed
- Parent
- Hierarchy

### Biunivocal
The `biunivocal` relationships are relationships that live in one `component`, but are read by both component. This types of relationships should be the more common.
If both `components` require a specific description for the relationships, both can have a `biunivocal` relationship with each other.

> The `biunivocal` relationship is read in the other component as a `reverse` relationship with the default description of the component.

### Univocal
The `univocal` relationship is a relationship that matter exclusively to the `component` in which it is created. An example of this is the relationship between two Non-player characters.

> The `univocal` relationship **does not** create a reverse relationship.

### Child
The `child` relationship define a parent/children relationship (*one to many*). The relationship carries, if needed, a description. It is important to understand that this type of relationship identify a hierarcy.

> The `child` relationship is read in the other component as a `parent` relationship with the default description of the component.

### Reversed (not assigneable, auto generated only)
The `reversed` relationship is a relationship which is automatically generated when a another component has a `biunivocal` relationship with the current component. It is not possible to create a `reverse` relationship, as it is generated dynamically from the system.

### Parent (not assigneable, auto generated only)
The `parent` relationship is an automatically generated relationship that is created when another component define the current component as its `child`. There is no description for the relationship with a parent.

### Hierarchy (not assigneable, auto generated only)
The `hierarchy` relationship identifies ownership between two different plot components. They cannot be created in any way, and they are only used by the system to load the correct hierarchical children of a component.
