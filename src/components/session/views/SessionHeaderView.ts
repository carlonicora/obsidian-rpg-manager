import {AbstractHeaderView} from "../../../managers/viewsManager/abstracts/AbstractHeaderView";
import {NewHeaderViewInterface} from "../../../managers/viewsManager/interfaces/NewHeaderViewInterface";
import {SessionInterface} from "../interfaces/SessionInterface";
import {LongTextElement} from "../../../managers/viewsManager/elements/LongTextElement";
import {AbtStageElement} from "../../../services/plotsServices/views/elements/AbtStageElement";

export class SessionHeaderView extends AbstractHeaderView implements NewHeaderViewInterface {
	public model: SessionInterface;

	public render(
	): void {
		this.addBreadcrumb();
		this.addTitle();
		this.addComponentOptions();
		this.addGallery();
		this.addInfoElement(LongTextElement, {title: 'Description', values: this.model.synopsis ?? '<span class="missing">Synopsis Missing</span>', editableKey: 'data.synopsis'});

		if (this.api.settings.usePlotStructures)
			this.addInfoElement(AbtStageElement, {title: 'ABT Stage', values: this.model.abtStage, editableKey: 'data.abtStage'});
	}
}
