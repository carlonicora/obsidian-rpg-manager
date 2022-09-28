import {HeaderResponseInterface} from "../../../interfaces/response/subModels/HeaderResponseInterface";
import {SessionInterface} from "../../../interfaces/components/SessionInterface";
import {HeaderResponseElementInterface} from "../../../interfaces/response/subModels/HeaderResponseElementInterface";
import {HeaderResponseType} from "../../../enums/HeaderResponseType";
import {AbstractPlotHeaderView} from "../../../abstracts/AbstractPlotHeaderView";
import {SceneSelectionModal} from "../../../modals/SceneSelectionModal";
import {SceneAnalyser} from "../../../helpers/SceneAnalyser";

export class SessionHeaderView extends AbstractPlotHeaderView {
	protected currentElement: SessionInterface;

	public render(
		container: HTMLElement,
		data: HeaderResponseInterface,
	): void {
		super.internalRender(container, data);

		let analyser: SceneAnalyser|undefined = undefined;

		data.elements.forEach((element: HeaderResponseElementInterface) => {
			const containerEl = this.createContainerEl(element.type, element.title);

			switch (element.type){
				case HeaderResponseType.ScenesSelection:
					this.addElement(containerEl, element, this.addScenesSelection(containerEl.children[1] as HTMLDivElement, element));
					break;
				case HeaderResponseType.AbtSelector:
					this.addElement(containerEl, element, this.addAbtStageSelector(containerEl.children[1] as HTMLDivElement, element));
					if (this.currentElement.abtStage !== undefined) {
						analyser = new SceneAnalyser(
							this.app,
							this.currentElement.abtStage,
							element.currentElement.id
						);
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
	}

	protected addScenesSelection(
		contentEl: HTMLDivElement,
		data: HeaderResponseElementInterface,
	): void {
		const sceneSelectionButtonEl = contentEl.createEl('button', {text: 'Select session scenes'});
		sceneSelectionButtonEl.addEventListener("click", () => {
			new SceneSelectionModal(this.app, data.additionalInformation.session).open();
		});
	}
}
