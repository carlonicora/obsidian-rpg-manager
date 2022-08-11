import {AbstractModel} from "../abstracts/AbstractModel";
import {RpgFunctions} from "../functions/RpgFunctions";
import {App, Component, MarkdownPostProcessorContext} from "obsidian";
import * as Models from '../models';

export class RpgModelFactory {
	public static create(
		functions: RpgFunctions,
		app: App,
		container: HTMLElement,
		source: string,
		component: Component | MarkdownPostProcessorContext,
		sourcePath: string,
	): AbstractModel {
		let modelName = source.replace(/[\n\r]/g, '').toLowerCase();
		modelName = modelName[0].toUpperCase() + modelName.substring(1);

		if (modelName === 'Sessionnavigation'){
			modelName = 'SessionNavigation';
		}

		//@ts-ignore
		return new Models[modelName + 'Model'](functions, app, container, source, component, sourcePath);
	}
}
