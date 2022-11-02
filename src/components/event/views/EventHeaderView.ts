import {AbstractHeaderView} from "../../../managers/viewsManager/abstracts/AbstractHeaderView";
import {NewHeaderViewInterface} from "../../../managers/viewsManager/interfaces/NewHeaderViewInterface";
import {EventInterface} from "../interfaces/EventInterface";
import {LongTextElement} from "../../../managers/viewsManager/elements/LongTextElement";
import {DateElement} from "../../../services/dateService/views/elements/DateElement";

export class EventHeaderView extends AbstractHeaderView implements NewHeaderViewInterface {
	public model: EventInterface;

	public render(
	): void {
		this.addBreadcrumb();
		this.addTitle();
		this.addComponentOptions();
		this.addGallery();

		this.addInfoElement(LongTextElement, {model: this.model, title: 'Description', values: this.model.synopsis ?? '<span class="missing">Synopsis Missing</span>', editableKey: 'data.synopsis'});

		if (this.model.campaign.fantasyCalendar !== undefined)
			this.addInfoElement(DateElement, {model: this.model, title: 'Event Date', values: this.model.date, editableKey: 'data.date'});
		else
			this.addInfoElement(DateElement, {model: this.model, title: 'Event Date', values: this.model.date, editableKey: 'data.date'});
	}
}
