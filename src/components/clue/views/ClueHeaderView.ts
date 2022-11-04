import {NewHeaderViewInterface} from "../../../managers/viewsManager/interfaces/NewHeaderViewInterface";
import {AbstractHeaderView} from "../../../managers/viewsManager/abstracts/AbstractHeaderView";
import {ClueInterface} from "../interfaces/ClueInterface";
import {LongTextElement} from "../../../managers/viewsManager/elements/LongTextElement";
import {ShortTextElement} from "../../../managers/viewsManager/elements/ShortTextElement";
import {DateElement} from "../../../services/dateService/views/elements/DateElement";
import {FantasyCalendarElement} from "../../../services/fantasyCalendarService/views/elements/FantasyCalendarElement";

export class ClueHeaderView extends AbstractHeaderView implements NewHeaderViewInterface {
	public model: ClueInterface;

	public render(
	): void {
		this.addBreadcrumb();
		this.addTitle();
		this.addComponentOptions();
		this.addGallery();
		this.addInfoElement(LongTextElement, {model: this.model, title: 'Description', values: this.model.synopsis ?? '<span class="missing">Synopsis Missing</span>', editableKey: 'data.synopsis'});
		this.addInfoElement(ShortTextElement, {model: this.model, title: 'Found', values: this.model.found ? 'Yes' : 'No', editableKey: 'data.synopsis'});

		this.addInfoElement(
			this.model.campaign.fantasyCalendar !== undefined
				? FantasyCalendarElement
				: DateElement,
			{model: this.model, title: 'Date Found', values: this.model.found, editableKey: 'data.found'}
		);
	}
}
