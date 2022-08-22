import {AbstractModel} from "../abstracts/AbstractModel";
import {Api} from "../api";
import {App, Component, MarkdownPostProcessorContext} from "obsidian";
import * as Models from '../models';
import {ErrorModel} from "../models";
import {RpgManagerSettings} from "../Settings";

export class RpgModelFactory {
	private static api: Api;
	private static app: App;
	private static settings: RpgManagerSettings;

	public static initialise(
		api: Api,
	): void
	{
		this.api = api;
	}

	public static create(
		container: HTMLElement,
		source: string,
		component: Component | MarkdownPostProcessorContext,
		sourcePath: string,
	): AbstractModel
	{
		let modelName = source.replace(/[\n\r]/g, '').toLowerCase();
		modelName = modelName[0].toUpperCase() + modelName.substring(1);

		modelName = modelName.replace('navigation', 'Navigation');

		try {
			//@ts-ignore
			return new Models[modelName + 'Model'](this.api, container, source, component, sourcePath);
		} catch (e) {
			return new ErrorModel(this.api, container, source, component, sourcePath);
		}
	}
}
