import {AbstractHeaderView} from "../../../managers/viewsManager/abstracts/AbstractHeaderView";
import {NewHeaderViewInterface} from "../../../managers/viewsManager/interfaces/NewHeaderViewInterface";
import {FactionInterface} from "../interfaces/FactionInterface";
import {LongTextElement} from "../../../managers/viewsManager/elements/LongTextElement";

export class FactionHeaderView extends AbstractHeaderView implements NewHeaderViewInterface {
	public model: FactionInterface;

	public render(
	): void {
		this.addBreadcrumb();
		this.addTitle();
		this.addComponentOptions();
		this.addGallery();
		this.addInfoElement(LongTextElement, {title: 'Description', values: this.model.synopsis ?? '<span class="missing">Synopsis Missing</span>', editableKey: 'data.synopsis'});
	}
}
