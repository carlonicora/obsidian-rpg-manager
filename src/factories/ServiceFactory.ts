import { App } from "obsidian";
import { RpgManagerInterface } from "src/RpgManagerInterface";

export class ServiceFactory {
  private static _app: App;
  private static _api: RpgManagerInterface;

  static initialise(app: App, api: RpgManagerInterface) {
    ServiceFactory._app = app;
    ServiceFactory._api = api;
  }
}
