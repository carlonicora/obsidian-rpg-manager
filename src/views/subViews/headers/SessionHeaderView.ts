import {HeaderResponseInterface} from "../../../interfaces/response/subModels/HeaderResponseInterface";
import {SessionInterface} from "../../../interfaces/components/SessionInterface";
import {HeaderResponseElementInterface} from "../../../interfaces/response/subModels/HeaderResponseElementInterface";
import {HeaderResponseType} from "../../../enums/HeaderResponseType";
import {AbstractPlotHeaderView} from "../../../abstracts/AbstractPlotHeaderView";
import {SceneSelectionModal} from "../../../modals/SceneSelectionModal";
import {SceneAnalyser} from "../../../helpers/SceneAnalyser";
import {HeadlessTableView} from "../../HeadlessTableView";

export class SessionHeaderView extends AbstractPlotHeaderView {
	protected currentElement: SessionInterface;

	public render(
		container: HTMLElement,
		data: HeaderResponseInterface,
	): void {
		super.internalRender(container, data);

		let analyser: SceneAnalyser|undefined = undefined;
		const headlessTable = new HeadlessTableView(this.app, this.sourcePath);

		data.elements.forEach((element: HeaderResponseElementInterface) => {
			switch (element.type){
				case HeaderResponseType.ScenesSelection:
					headlessTable.addRow(element, this.addScenesSelection.bind(this));
					//this.addElement(containerEl, element, this.addScenesSelection(containerEl.children[1] as HTMLDivElement, element));
					break;
				case HeaderResponseType.AbtSelector:
					headlessTable.addRow(element, this.addAbtStageSelector.bind(this));
					//this.addElement(containerEl, element, this.addAbtStageSelector(containerEl.children[1] as HTMLDivElement, element));
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
