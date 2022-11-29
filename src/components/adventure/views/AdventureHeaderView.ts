import {AbstractHeaderView} from "../../../managers/viewsManager/abstracts/AbstractHeaderView";
import {NewHeaderViewInterface} from "../../../managers/viewsManager/interfaces/NewHeaderViewInterface";
import {AdventureInterface} from "../interfaces/AdventureInterface";
import {LongTextElement} from "../../../managers/viewsManager/elements/LongTextElement";
import i18next from "i18next";

export class AdventureHeaderView extends AbstractHeaderView implements NewHeaderViewInterface {
	public model: AdventureInterface;

	public render(): void {
		this.addBreadcrumb();
		this.addTitle();
		this.addComponentOptions();
		this.addGallery();
		this.addInfoElement(LongTextElement, {
			model: this.model,
			title: i18next.t("description"),
			values: this.model.synopsis ?? '',
			editableKey: 'data.synopsis'
		});

		if (this.api.settings.usePlotStructures)
			this.addPlot();

	}
}
