import {FantasyCalendarServiceInterface} from "./interfaces/FantasyCalendarServiceInterface";
import {ServiceInterface} from "../../managers/servicesManager/interfaces/ServiceInterface";
import {AbstractService} from "../../managers/servicesManager/abstracts/AbstractService";
import {Calendar, Day, Event, EventCategory} from "obsidian-fantasy-calendar";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";
import {FantasyCalendarCategory} from "./enums/FantasyCalendarCategory";
import {FantasyCalendarDateInterface} from "./interfaces/FantasyCalendarDateInterface";
import {FantasyCalendarTextualDateInterface} from "./interfaces/FantasyCalendarTextualDateInterface";
import {ModelInterface} from "../../managers/modelsManager/interfaces/ModelInterface";
import {CampaignInterface} from "../../components/campaign/interfaces/CampaignInterface";
import {EventInterface} from "../../components/event/interfaces/EventInterface";
import {CharacterInterface} from "../../components/character/interfaces/CharacterInterface";
import {SceneInterface} from "../../components/scene/interfaces/SceneInterface";
import {ClueInterface} from "../../components/clue/interfaces/ClueInterface";
import {debounce} from "obsidian";

export class FantasyCalendarService extends AbstractService implements FantasyCalendarServiceInterface, ServiceInterface{
	private _isReady: boolean;
	private _isDatabaseReady: boolean;
	private _events: Map<string, Map<ModelInterface, Map<string, FantasyCalendarDateInterface>>>;

	constructor(
		api: RpgManagerApiInterface,
	) {
		super(api);
		this._isReady = false;
		this._isDatabaseReady = false;

		this._fantasyCalendarUpdated = debounce(this._fantasyCalendarUpdated, 250, true) as unknown as () => Promise<void>;

		this.registerEvent(this.api.app.workspace.on("rpgmanager:database-ready", this._dbReady.bind(this),));

		this.registerEvent(this.api.app.workspace.on("fantasy-calendars-settings-loaded", this.ready.bind(this),));
		this.registerEvent(this.api.app.workspace.on("fantasy-calendars-updated", this._fantasyCalendarUpdated.bind(this)));
	}

	private _fantasyCalendarUpdated(
	): void {
		if (this._events === undefined)
			return;

		const calendars = this.calendars;

		let anyUpdate = false;
		for (let index=0; index<calendars.length; index++){
			const calendar: Calendar = calendars[index];
			let calendarMap: Map<ModelInterface, Map<string, FantasyCalendarDateInterface>>|undefined = this._events.get(calendar.name);

			if (calendarMap === undefined)
				calendarMap = this._events.set(calendar.name, new Map()).get(calendar.name);

			if (calendarMap === undefined)
				continue;

			for (let eventIndex=0; eventIndex<calendars[index].events.length; eventIndex++) {
				const event = calendar.events[eventIndex];
				if (event.note == null || event.category == null)
					continue;

				const model: ModelInterface | undefined = this.api.database.readByPath(event.note + '.md');
				if (model === undefined)
					continue;

				let modelMap = calendarMap.get(model);

				if (modelMap === undefined)
					modelMap = calendarMap.set(model, new Map()).get(model);

				if (modelMap === undefined)
					continue;

				const modelDate = this._getModelDate(model, event.category);
				const fantasyCalendaDate = modelMap.get(event.category);

				if (
					modelDate === undefined ||
					(
						modelDate.year !== fantasyCalendaDate?.year &&
						modelDate.month !== fantasyCalendaDate?.month &&
						modelDate.day !== fantasyCalendaDate?.day
					)
				) {
					anyUpdate = true;
					model.touch(true);
				}
			}
		}

		if (anyUpdate)
			this.api.app.workspace.trigger("rpgmanager:refresh-views");

	}

	private _getModelDate(
		model: ModelInterface,
		category: string,
	): FantasyCalendarDateInterface|undefined {
		switch (category) {
			case FantasyCalendarCategory.CurrentDate:
				return (<CampaignInterface>model).date?.date as FantasyCalendarDateInterface|undefined;
				break;
			case FantasyCalendarCategory.Event:
				return (<EventInterface>model).date?.date as FantasyCalendarDateInterface|undefined;
				break;
			case FantasyCalendarCategory.Birth:
				return (<CharacterInterface>model).dob?.date as FantasyCalendarDateInterface|undefined;
				break;
			case FantasyCalendarCategory.Death:
				return (<CharacterInterface>model).death?.date as FantasyCalendarDateInterface|undefined;
				break;
			case FantasyCalendarCategory.Scene:
				return (<SceneInterface>model).date?.date as FantasyCalendarDateInterface|undefined;
				break;
			case FantasyCalendarCategory.ClueFound:
				return (<ClueInterface>model).found?.date as FantasyCalendarDateInterface|undefined;
				break;
		}

		return undefined;
	}

	private _dbReady(
	): void {
		this._isDatabaseReady = true;

		if (this._isReady)
			this._processInitialEvents();
	}

	public ready(
	): void {
		this._isReady = true;

		if (this._isDatabaseReady)
			this._processInitialEvents();
	}

	private _processInitialEvents(
	): void {
		this._events = new Map<string, Map<ModelInterface, Map<string, FantasyCalendarDateInterface>>>();

		this.calendars.forEach((calendar: Calendar) => {
			this._events.set(calendar.name, new Map());

			const calendarMap = this._events.get(calendar.name);

			if (calendarMap !== undefined) {
				calendar.events.forEach((event: Event) => {
					if (event.note != null && event.category != undefined) {
						const model: ModelInterface | undefined = this.api.database.readByPath(event.note);
						if (model !== undefined) {
							let modelMap = calendarMap.get(model);

							if (modelMap === undefined)
								modelMap = calendarMap.set(model, new Map()).get(model);

							if (modelMap !== undefined) {
								const eventDate = modelMap.get(event.category);

								if (eventDate === undefined)
									modelMap.set(event.category, event.date);
							}
						}
					}
				});
			}
		});
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
