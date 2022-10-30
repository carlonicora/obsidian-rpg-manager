import {AbstractHeaderView} from "../../../managers/viewsManager/abstracts/AbstractHeaderView";
import {NewHeaderViewInterface} from "../../../managers/viewsManager/interfaces/NewHeaderViewInterface";
import {ActInterface} from "../interfaces/ActInterface";
import {LongTextElement} from "../../../managers/viewsManager/elements/LongTextElement";
import {AbtStageElement} from "../../../services/plotsService/views/elements/AbtStageElement";

export class ActHeaderView extends AbstractHeaderView implements NewHeaderViewInterface {
	public model: ActInterface;

	public render(
	): void {
		this.addBreadcrumb();
		this.addTitle();
		this.addComponentOptions();
		this.addGallery();
		this.addInfoElement(LongTextElement, {title: 'Description', values: this.model.synopsis ?? '<span class="missing">Synopsis Missing</span>', editableKey: 'data.synopsis'});

		if (this.api.settings.usePlotStructures) {
			this.addInfoElement(AbtStageElement, {
				title: 'ABT Stage',
				values: this.model.abtStage,
				editableKey: 'data.abtStage'
			});

			this.addPlot();
		}

		if (this.api.settings.useSceneAnalyser) {
		}
	}
}
