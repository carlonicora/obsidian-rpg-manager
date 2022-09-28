import {HeaderResponseInterface} from "../../../interfaces/response/subModels/HeaderResponseInterface";
import {ActInterface} from "../../../interfaces/components/ActInterface";
import {HeaderResponseElementInterface} from "../../../interfaces/response/subModels/HeaderResponseElementInterface";
import {HeaderResponseType} from "../../../enums/HeaderResponseType";
import {SceneAnalyser} from "../../../helpers/SceneAnalyser";
import {AbstractPlotHeaderView} from "../../../abstracts/AbstractPlotHeaderView";

export class ActHeaderView extends AbstractPlotHeaderView {
	protected currentElement: ActInterface;

	public render(
		container: HTMLElement,
		data: HeaderResponseInterface,
	): void {
		super.internalRender(container, data);

		let analyser: SceneAnalyser|undefined = undefined;

		data.elements.forEach((element: HeaderResponseElementInterface) => {
			const containerEl = this.createContainerEl(element.type, element.title);

			switch (element.type){
				case HeaderResponseType.StoryCircleSelector:
					this.addElement(containerEl, element, this.addStoryCircleStageSelector(containerEl.children[1] as HTMLDivElement, element));
					break;
				case HeaderResponseType.AbtSelector:
					this.addElement(containerEl, element, this.addAbtStageSelector(containerEl.children[1] as HTMLDivElement, element));
					if (this.currentElement.abtStage !== undefined) {
						analyser = element.additionalInformation.sceneAnalyser;
					}
					break;
				default:
					element.value.fillContent(containerEl, this.sourcePath);
					break;
			}
		});

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
