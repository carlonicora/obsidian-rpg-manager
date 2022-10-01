import {AbstractPlotHeaderView} from "../../../abstracts/AbstractPlotHeaderView";
import {HeaderResponseInterface} from "../../../interfaces/response/subModels/HeaderResponseInterface";
import {AdventureV2Interface} from "../../../_dbV2/components/interfaces/AdventureV2Interface";

export class AdventureHeaderView extends AbstractPlotHeaderView {
	protected currentElement: AdventureV2Interface;

	public render(
		container: HTMLElement,
		data: HeaderResponseInterface,
	): void {
		super.render(container, data);

		if (this.settings.usePlotStructures && data?.metadata?.sourceMeta?.abt !== undefined){
			this.addAbtPlot(data?.metadata?.sourceMeta?.abt);
		}

		if (this.settings.usePlotStructures && data?.metadata?.sourceMeta?.storycircle !== undefined){
			this.addStoryCirclePlot(data?.metadata?.sourceMeta?.storycircle);
		}
	}
}
