import {Api} from "../api";
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
	SceneAction,
	CampaignNavigation,
}

export class RpgViewFactory {
	private static api: Api;

	public static initialise(
		api: Api,
	): void
	{
		this.api = api;
	}

	public static createList(
		viewName: viewType,
		dv: DataviewInlineApi,
	): ListViewInterface {
		// @ts-ignore
		return new Views[viewType[viewName] + 'View'](
			this.api,
			dv
		);
	}

	public static createSingle(
		viewName: viewType,
		dv: DataviewInlineApi,
	): SingleViewInterface {
		// @ts-ignore
		return new Views[viewType[viewName] + 'View'](
			this.api,
			dv
		);
	}
}
