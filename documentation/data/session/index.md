[RPG Manager Documentation](../../index.md) >
[RPG Manager Data Code Block](../index.md) >
Session Data Codeblock

# Session Data Code Block


In addition to its own data, the `session` code block contains the [common data](../common/index.md). Please
note that the `session` cannot have direct relationships with any other `components`, but inherit all the 
relationships from the [scenes](../../components/scene.md) it contains.

## Session-Specific Data

The `session` contains the following  data:

- [irl](irl.md)
- [abtStage](../shared/abtstage.md)
- [targetDuration](tagetDuration.md)

## RpgManagerData Structure for Session

```yaml
data:
  synopsis: 
  image: 
  complete:
  irl:
  abtStage:
  targetDuration:
```

> **Relevant links**
>
> [Session component](../../components/session.md)
