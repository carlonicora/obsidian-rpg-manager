import {AbstractHeaderView} from "../../../managers/viewsManager/abstracts/AbstractHeaderView";
import {NewHeaderViewInterface} from "../../../managers/viewsManager/interfaces/NewHeaderViewInterface";
import {AdventureInterface} from "../interfaces/AdventureInterface";
import {LongTextElement} from "../../../managers/viewsManager/elements/LongTextElement";

export class AdventureHeaderView extends AbstractHeaderView implements NewHeaderViewInterface {
	public model: AdventureInterface;

	public render(
	): void {
		this.addBreadcrumb();
		this.addTitle();
		this.addComponentOptions();
		this.addGallery();
		this.addInfoElement(LongTextElement, {title: 'Description', values: this.model.synopsis ?? '<span class="missing">Synopsis Missing</span>', editableKey: 'data.synopsis'});

		if (this.api.settings.usePlotStructures)
			this.addPlot();

	}
}
