[RPG Manager Documentation](../../index.md) >
[RPG Manager Data Code Block](../index.md) >
[Scene Data](../index.md) >
durations

# durations

The durations is a key that contains the various durations of a [scene](../../components/scene.md). It is an array of
unix timestamps which is added when a [scene](../../components/scene.md) is started or it is stopped.

This value is valid if you use a [structured plotting](../plots/index.md) approach in conjunction with the
[Scene Analyser](../../analyser/index.md).

**Please Note**: this value is automatically written every time you use the timer to keep track of a
[scene](../../components/scene.md) duration. Is should not be manually edited

Accepted Values:
- array of unix timestamps (start "-" stop) identifying the beginning and the end of a counter
