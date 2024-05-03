import { App } from "obsidian";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import { AttributeComponentType } from "src/data/enums/AttributeComponentType";
import { AttributeInterface } from "src/data/interfaces/AttributeInterface";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { RpgManagerCodeblockService } from "./RpgManagerCodeblockService";

export class TimerService {
  private static _runningScene: string | undefined = undefined;
  private static _runningStart: number | undefined = undefined;

  static get runningScene(): string | undefined {
    return this._runningScene;
  }

  static startTimer(
    app: App,
    api: RpgManagerInterface,
    element: ElementInterface,
  ): void {
    if (this._runningScene !== undefined && this._runningScene !== element.id)
      return;

    if (this._runningScene !== undefined) TimerService.endTimer(app, api);

    this._runningScene = element.id;
    this._runningStart = Math.round(Date.now() / 1000);
  }

  static endTimer(app: App, api: RpgManagerInterface): void {
    if (
      TimerService._runningScene === undefined ||
      TimerService._runningStart === undefined
    ) {
      TimerService._runningScene = undefined;
      TimerService._runningStart = undefined;
      return;
    }

    const scene: ElementInterface = api.get({
      id: TimerService._runningScene,
    }) as ElementInterface;
    if (scene === undefined) return;
    const attribute: AttributeInterface | undefined = scene.attribute(
      AttributeComponentType.Duration,
    );
    if (attribute === undefined) return;

    const duration = Math.round(Date.now() / 1000) - TimerService._runningStart;

    const codeblockService = new RpgManagerCodeblockService(
      app,
      api,
      scene.file,
    );
    codeblockService.updateCodeblockData(
      attribute.id,
      (attribute.value ?? 0) + duration,
    );

    TimerService._runningScene = undefined;
    TimerService._runningStart = undefined;
  }
}
