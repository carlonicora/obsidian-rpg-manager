import {NewHeaderViewInterface} from "../../../managers/viewsManager/interfaces/NewHeaderViewInterface";
import {AbstractHeaderView} from "../../../managers/viewsManager/abstracts/AbstractHeaderView";
import {ClueInterface} from "../interfaces/ClueInterface";
import {LongTextElement} from "../../../managers/viewsManager/elements/LongTextElement";
import {ShortTextElement} from "../../../managers/viewsManager/elements/ShortTextElement";
import {DateElement} from "../../../managers/viewsManager/elements/DateElement";

export class ClueHeaderView extends AbstractHeaderView implements NewHeaderViewInterface {
	public model: ClueInterface;

	public render(
	): void {
		this.addBreadcrumb();
		this.addTitle();
		this.addComponentOptions();
		this.addGallery();
		this.addInfoElement(LongTextElement, {title: 'Description', values: this.model.synopsis ?? '', editableKey: 'data.synopsis'});

		if (this.model.campaign.fantasyCalendar !== undefined)
			this.addInfoElement(DateElement, {title: 'Found', values: this.model.found, editableKey: 'data.found'});
		else
			this.addInfoElement(DateElement, {title: 'Found', values: this.model.found, editableKey: 'data.found'});
	}
}
