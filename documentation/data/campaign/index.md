[RPG Manager Documentation](../../index.md) >
[RPG Manager Data Code Block](../index.md) >
Campaign Data Codeblock

# Campaign Data Code Block


In addition to its own data, the `campaign` code block contains the [plot](../shared/plot.md), the
[common data](../common/index.md) and the [relationships](../common/relationship.md).

## Campaign-Specific Data

The `campaign` contains the following  data:

- [date](date.md) 
- [currentAdventureId](currentAdventureId.md)
- [currentActId](currentActId.md)
- [currentSessionId](currentSessionId.md)

## RpgManagerData Structure for Act

```yaml
plot:
  abt:
    need: 
    and: 
    but: 
    therefore: 
  storycircle:
    you: 
    need: 
    go: 
    search: 
    find: 
    take: 
    return: 
    change: 
data:
  synopsis: 
  image: 
  complete: 
  date:
  currentAdventureId:
  currentActId:
  currentSessionId:
relationships: []
```

> **Relevant links**
>
> [Campaign component](../../components/TYPE.md)
