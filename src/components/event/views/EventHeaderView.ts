import {AbstractHeaderView} from "../../../managers/viewsManager/abstracts/AbstractHeaderView";
import {NewHeaderViewInterface} from "../../../managers/viewsManager/interfaces/NewHeaderViewInterface";
import {EventInterface} from "../interfaces/EventInterface";
import {LongTextElement} from "../../../managers/viewsManager/elements/LongTextElement";
import {DateElement} from "../../../services/dateService/views/elements/DateElement";
import {CalendarType} from "../../../services/dateService/enums/CalendarType";
import {FantasyCalendarElement} from "../../../services/fantasyCalendarService/views/elements/FantasyCalendarElement";
import {FantasyCalendarCategory} from "../../../services/fantasyCalendarService/enums/FantasyCalendarCategory";

export class EventHeaderView extends AbstractHeaderView implements NewHeaderViewInterface {
	public model: EventInterface;

	public render(
	): void {
		this.addBreadcrumb();
		this.addTitle();
		this.addComponentOptions();
		this.addGallery();

		this.addInfoElement(LongTextElement, {model: this.model, title: 'Description', values: this.model.synopsis ?? '<span class="missing">Synopsis Missing</span>', editableKey: 'data.synopsis'});

		this.addInfoElement(this.model.campaign.calendar === CalendarType.Gregorian ? DateElement : FantasyCalendarElement, {model: this.model, title: 'Event Date', values: this.model.date, category: FantasyCalendarCategory.Event, editableKey: 'data.date'});
	}
}
