import {RpgFunctions} from "../functions/RpgFunctions";
import {App} from "obsidian";
import {ListViewInterface} from "../abstracts/AbstractListView";
import {DataviewInlineApi} from "obsidian-dataview/lib/api/inline-api";
import * as Views from '../views'
import {SingleViewInterface} from "../abstracts/AbstractSingleView";

export enum viewType{
	AdventureList,
	CharacterList,
	Timeline,
	SessionList,
	ClueStatus,
	Image,
	Synopsis,
	ClueRelationshipList,
	LocationList,
	EventList,
	ClueList,
	CharacterInfo,
	FactionList,
	SessionNavigator,
	SceneList,
	SceneNavigation,
}

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

	public static createList(
		viewName: viewType,
		dv: DataviewInlineApi,
	): ListViewInterface {
		// @ts-ignore
		return new Views[viewType[viewName] + 'View'](
			this.functions,
			this.app,
			dv
		);
	}

	public static createSingle(
		viewName: viewType,
		dv: DataviewInlineApi,
	): SingleViewInterface {
		// @ts-ignore
		return new Views[viewType[viewName] + 'View'](
			this.functions,
			this.app,
			dv
		);
	}
}
