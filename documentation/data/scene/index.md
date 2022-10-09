[RPG Manager Documentation](../../index.md) >
[RPG Manager Data Code Block](../index.md) >
Scene Data Codeblock

# Scene Data Code Block


In addition to its own data, the `scene` code block contains the [common data](../common/index.md) and the 
[relationships](../common/relationship.md).

## Scene-Specific Data

The `scene` contains the following  data:

- [sessionId](sessionId.md)
- [action](action.md)
- [trigger](trigger.md)
- [date](date.md)
- [sceneType](sceneType.md)
- [isActedUpon](isActedUpon.md)
- [duration](duration.md)
- [durations](durations.md)
- [storyCircleStage](storyCircleStage.md)

## RpgManagerData Structure for Scene

```yaml
data:
  synopsis: 
  image: 
  complete:
  sessionId:
  action:
  trigger:
  date:
  sceneType:
  isActedUpon:
  duration:
  durations: []
  storyCircleStage:
relationships: []
```

> **Relevant links**
>
> [Scene component](../../components/scene.md)
