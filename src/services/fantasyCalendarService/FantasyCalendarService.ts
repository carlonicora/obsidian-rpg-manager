import {FantasyCalendarServiceInterface} from "./interfaces/FantasyCalendarServiceInterface";
import {ServiceInterface} from "../../managers/servicesManager/interfaces/ServiceInterface";
import {AbstractService} from "../../managers/servicesManager/abstracts/AbstractService";
import {Calendar, Day, EventCategory} from "obsidian-fantasy-calendar";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";
import {FantasyCalendarCategory} from "./enums/FantasyCalendarCategory";
import {FantasyCalendarDateInterface} from "./interfaces/FantasyCalendarDateInterface";
import {FantasyCalendarTextualDateInterface} from "./interfaces/FantasyCalendarTextualDateInterface";

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

	public async addCategory(
		category: FantasyCalendarCategory,
		calendar: Calendar,
	): Promise<EventCategory> {
		let colour = '';

		switch (category){
			case FantasyCalendarCategory.Birth:
				colour = '#00CC00';
				break;
			case FantasyCalendarCategory.ClueFound:
				colour = '#0066CC';
				break;
			case FantasyCalendarCategory.Death:
				colour = '#CC0000';
				break;
			case FantasyCalendarCategory.Event:
				colour = '#CC00CC';
				break;
			case FantasyCalendarCategory.Scene:
				colour = '#606060';
				break;
			default:
				colour = '';
				break;
		}

		const fantasyCalendarCategory: EventCategory = {
			name: category,
			id: 'rpgm-' + category.toLowerCase(),
			color: colour,
		};

		//await window.FantasyCalendarAPI.addCategoryToCalendar(fantasyCalendarCategory, calendar);

		calendar.categories.push(fantasyCalendarCategory);
		this.api.app.plugins.getPlugin('fantasy-calendar').saveCalendar();

		return fantasyCalendarCategory;
	}

	public getDay(
		date: FantasyCalendarDateInterface|FantasyCalendarTextualDateInterface,
		calendar: Calendar,
	): Day {
		return this.api.app.plugins.getPlugin('fantasy-calendar').api.getDay(date as any, calendar);
	}
}
