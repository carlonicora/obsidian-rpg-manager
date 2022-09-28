import {HeaderResponseInterface} from "../../../interfaces/response/subModels/HeaderResponseInterface";
import {ActInterface} from "../../../interfaces/components/ActInterface";
import {HeaderResponseElementInterface} from "../../../interfaces/response/subModels/HeaderResponseElementInterface";
import {HeaderResponseType} from "../../../enums/HeaderResponseType";
import {SceneAnalyser} from "../../../helpers/SceneAnalyser";
import {AbstractPlotHeaderView} from "../../../abstracts/AbstractPlotHeaderView";
import {HeadlessTableView} from "../../HeadlessTableView";

export class ActHeaderView extends AbstractPlotHeaderView {
	protected currentElement: ActInterface;

	public render(
		container: HTMLElement,
		data: HeaderResponseInterface,
	): void {
		super.internalRender(container, data);

		let analyser: SceneAnalyser|undefined = undefined;

		const headlessTable = new HeadlessTableView(this.app, this.sourcePath);

		data.elements.forEach((element: HeaderResponseElementInterface) => {

			switch (element.type){
				case HeaderResponseType.StoryCircleSelector:
					headlessTable.addRow(element, this.addStoryCircleStageSelector.bind(this));
					break;
				case HeaderResponseType.AbtSelector:
					headlessTable.addRow(element, this.addAbtStageSelector.bind(this));
					if (this.currentElement.abtStage !== undefined) {
						analyser = element.additionalInformation.sceneAnalyser;
					}
					break;
				default:
					element.value.fillContent(
						this.createContainerEl(element.type, element.title),
						this.sourcePath,
					);
					break;
			}
		});

		this.headerContainerEl.appendChild(headlessTable.tableEl as Node);

		if (analyser !== undefined){
			this.addActBalance(analyser);
		}

		if (this.settings.usePlotStructures && data?.metadata?.sourceMeta?.abt !== undefined){
			this.addAbtPlot(data?.metadata?.sourceMeta?.abt);
		}

		if (this.settings.usePlotStructures && data?.metadata?.sourceMeta?.storycircle !== undefined){
			this.addStoryCirclePlot(data?.metadata?.sourceMeta?.storycircle);
		}
	}
}
