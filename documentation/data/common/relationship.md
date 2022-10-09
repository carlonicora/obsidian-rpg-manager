[RPG Manager Documentation](../../index.md) >
[RPG Manager Data Code Block](../index.md) >
Common Data >
relationships

# relationships

The relationships data is one of the most important element in the data code block structure, and it is common
amongst all the `components`. It identifies the relationships between different `component` and saves them in order to 
maintain the details of each relationship.

**Please Note**: The structure is automatically created when you use the "Manage Relationships" function
in the header of a `component`. As long as you are not sure how to edit these, don't change anything with 
the exception of the description.

```yaml
type: 
path:
description:
```

Accepted Value for each relationship:
- type: 'univocal' | 'biunivocal' | 'child'
- path: the path to the `related component`
- description: the description of the relationship as seen by the `component`

> **Relevant links**
>
> [relationships](../../relationships.md)
