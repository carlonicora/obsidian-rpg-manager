import {FantasyCalendarServiceInterface} from "./interfaces/FantasyCalendarServiceInterface";
import {ServiceInterface} from "../../managers/servicesManager/interfaces/ServiceInterface";
import {AbstractService} from "../../managers/servicesManager/abstracts/AbstractService";
import {Calendar} from "obsidian-fantasy-calendar";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";

export class FantasyCalendarService extends AbstractService implements FantasyCalendarServiceInterface, ServiceInterface{
	private _isReady: boolean;

	constructor(
		api: RpgManagerApiInterface,
	) {
		super(api);
		this._isReady = false;

		this.registerEvent(
			this.api.app.workspace.on(
				"fantasy-calendars-settings-loaded",
				this.ready.bind(this),
			)
		);
	}

	public ready(
	): void {
		this._isReady = true;
	}

	get calendars(): Calendar[] {
		return window.FantasyCalendarAPI.getCalendars();
	}
}
