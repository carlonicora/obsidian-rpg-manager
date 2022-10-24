import {App} from "obsidian";
import {RpgManagerInterface} from "../core/interfaces/RpgManagerInterface";
import {RpgManagerApiInterface} from "./interfaces/RpgManagerApiInterface";
import {SearchService} from "../services/search/SearchService";
import {FantasyCalendarService} from "../services/fantasyCalendar/FantasyCalendarService";
import {DateService} from "../services/date/DateService";
import {RpgManagerApi} from "./RpgManagerApi";
import {ClueComponent} from "../components/clue/ClueComponent";
import {RelationshipService} from "../services/relationships/RelationshipService";
import {AdventureComponent} from "../components/adventure/AdventureComponent";
import {ActComponent} from "../components/act/ActComponent";
import {CampaignComponent} from "../components/campaign/CampaignComponent";
import {CharacterComponent} from "../components/character/CharacterComponent";
import {NonPlayerCharacterComponent} from "../components/character/NonPlayerCharacterComponent";
import {EventComponent} from "../components/event/EventComponent";
import {FactionComponent} from "../components/faction/FactionComponent";
import {LocationComponent} from "../components/location/LocationComponent";
import {MusicComponent} from "../components/music/MusicComponent";
import {SceneComponent} from "../components/scene/SceneComponent";
import {SessionComponent} from "../components/session/SessionComponent";
import {SubplotComponent} from "../components/subplot/SubplotComponent";

export class Bootstrap {
	public static api(
		app: App,
		plugin: RpgManagerInterface,
	): RpgManagerApiInterface {
		const api = new RpgManagerApi(app, plugin);
		window["RpgManagerAPI"] = api;

		this._addComponents(api);
		this._addServices(api);

		return api;
	}

	private static _addComponents(
		api: RpgManagerApiInterface,
	): void {
		api.components.register(ActComponent);
		api.components.register(AdventureComponent);
		api.components.register(CampaignComponent);
		api.components.register(CharacterComponent);
		api.components.register(NonPlayerCharacterComponent);
		api.components.register(ClueComponent);
		api.components.register(EventComponent);
		api.components.register(FactionComponent);
		api.components.register(LocationComponent);
		api.components.register(MusicComponent);
		api.components.register(SceneComponent);
		api.components.register(SessionComponent);
		api.components.register(SubplotComponent);
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
