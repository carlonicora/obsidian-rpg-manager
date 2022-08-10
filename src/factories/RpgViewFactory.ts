import {RpgFunctions} from "../data/RpgFunctions";
import {App} from "obsidian";
import {ViewInterface} from "../abstracts/AbstractView";
import {DataviewInlineApi} from "obsidian-dataview/lib/api/inline-api";
import * as Views from '../views/TimelineView'

export class RpgViewFactory {
	private static functions: RpgFunctions;
	private static app: App;

	public static initialise(
		functions: RpgFunctions,
		app: App,
	): void
	{
		this.functions = functions;
		this.app = app;
	}

	public static create(
		viewName: string,
		dv: DataviewInlineApi,
	): ViewInterface {

		// @ts-ignore
		return new Views[viewName + 'View'](
			this.functions,
			this.app,
			dv
		);
	}
}
