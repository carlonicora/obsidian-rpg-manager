[RPG Manager Documentation](../../index.md) >
[Components](index.md) >
Scene

# Scene Component

A `scene` is the smallest of the plotting `components` and it identifies a moment in an [act](act.md) or a 
[session](session.md) in which the player characters must **DO** something.

It is important to understand that, with some rare exclusions, the scene must require some actions from the player
characters, to make sure that the story evolves.

Each `scene` can contain a synopsis (_the goal of the scene_), a trigger (_what starts the scene_) and an action (_what 
the characters should do in the scene_).

If you are using the [Scene Analyser](../analyser/index.md), you can specify the type of a `scene` to help you with the
creation of balanced [acts](act.md) and [sessions](session.md).

## Acts or Sessions?
It is important to understand that a `scene` is **plotted** inside an [act](act.md), but it is **played** inside a 
[session](session.md). The `scene` a hierarchically child of an [act](act.md) which can be added to a 
[session](session.md).

> **Relevant links**
>
> [Data Structure of a scene](../data/scene/index.md)
