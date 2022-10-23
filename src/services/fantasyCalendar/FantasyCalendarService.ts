import {App} from "obsidian";
import {FantasyCalendarServiceInterface} from "./interfaces/FantasyCalendarServiceInterface";
import {ServiceInterface} from "../../api/servicesManager/interfaces/ServiceInterface";
import {AbstractService} from "../../api/servicesManager/abstracts/AbstractService";
import {bind} from "svelte/internal";
import {Calendar} from "obsidian-fantasy-calendar/src/@types";

export class FantasyCalendarService extends AbstractService implements FantasyCalendarServiceInterface, ServiceInterface{
	private _isReady: boolean;

	constructor(
		app: App,
	) {
		super(app);
		this._isReady = false;

		this.registerEvent(
			this.app.workspace.on(
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
