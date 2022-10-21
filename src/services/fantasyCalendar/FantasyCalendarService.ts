import {App} from "obsidian";
import {FantasyCalendarServiceInterface} from "./interfaces/FantasyCalendarServiceInterface";
import {ServiceInterface} from "../../servicesManager/interfaces/ServiceInterface";

export class FantasyCalendarService implements FantasyCalendarServiceInterface, ServiceInterface{
	constructor(
		private _app: App,
	) {
	}

	/*
	get calendars(): any {
		console.log(this._app.plugins.getPlugin('fantasy-calendar').api);
		return (this._app.plugins.getPlugin('fantasy-calendar').api.getCalendars())
	}
	*/
}
