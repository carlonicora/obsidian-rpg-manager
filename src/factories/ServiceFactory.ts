import { App } from "obsidian";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import { SceneAnalyserService } from "src/services/sceneAnalyserService/SceneAnalyserService";

export class ServiceFactory {
	private static _app: App;
	private static _api: RpgManagerInterface;
	/**
	 * Initializes the ServiceFactory with the provided app and api.
	 *
	 * @param {App} app - The app instance.
	 * @param {RpgManagerInterface} api - The RPG Manager Interface.
	 */
	static initialise(app: App, api: RpgManagerInterface) {
		ServiceFactory._app = app;
		ServiceFactory._api = api;
	}
	/**
	 * Creates a new instance of the SceneAnalyserService class.
	 *
	 * @return {SceneAnalyserService} A new instance of the SceneAnalyserService class.
	 */
	static createSceneAnalyserService() {
		return new SceneAnalyserService(ServiceFactory._api);
	}
}
