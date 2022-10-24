import {App} from "obsidian";
import {RpgManagerInterface} from "../core/interfaces/RpgManagerInterface";
import {RpgManagerApiInterface} from "./interfaces/RpgManagerApiInterface";
import {SearchService} from "../services/search/SearchService";
import {FantasyCalendarService} from "../services/fantasyCalendar/FantasyCalendarService";
import {DateService} from "../services/date/DateService";
import {RpgManagerApi} from "./RpgManagerApi";
import {Clue} from "../components/clue/Clue";
import {RelationshipService} from "../services/relationships/RelationshipService";

export class Bootstrap {
	public static api(
		app: App,
		plugin: RpgManagerInterface,
	): RpgManagerApiInterface {
		const api = new RpgManagerApi(app, plugin);

		this._addComponents(api);
		this._addServices(api);

		return api;
	}

	private static _addComponents(
		api: RpgManagerApiInterface,
	): void {
		api.components.register(Clue);
	}

	private static _addServices(
		api: RpgManagerApiInterface,
	): void {
		api.services.register(RelationshipService);
		api.services.register(SearchService);

		if (app.plugins.enabledPlugins.has("fantasy-calendar"))
			api.services.register(FantasyCalendarService);

		api.services.register(DateService);
	}
}
