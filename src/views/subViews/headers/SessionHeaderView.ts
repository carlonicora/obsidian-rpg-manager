import {HeaderResponseInterface} from "../../../responses/interfaces/HeaderResponseInterface";
import {HeaderResponseElementInterface} from "../../../responses/interfaces/HeaderResponseElementInterface";
import {HeaderResponseType} from "../../../responses/enums/HeaderResponseType";
import {AbstractPlotHeaderView} from "../../abstracts/AbstractPlotHeaderView";
import {SceneSelectionModal} from "../../../modals/SceneSelectionModal";
import {SceneAnalyser} from "../../../databases/SceneAnalyser";
import {HeadlessTableView} from "../../HeadlessTableView";
import {SessionInterface} from "../../../databases/components/interfaces/SessionInterface";
import {SceneInterface} from "../../../databases/components/interfaces/SceneInterface";

export class SessionHeaderView extends AbstractPlotHeaderView {
	protected currentComponent: SessionInterface;

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
					break;
				case HeaderResponseType.AbtSelector:
					headlessTable.addRow(element, this.addAbtStageSelector.bind(this));
					if (this.currentComponent.abtStage !== undefined) {
						analyser = element.additionalInformation.sceneAnalyser;
					}
					break;
				case HeaderResponseType.SceneAnalyser:
					analyser = element.additionalInformation.sceneAnalyser;
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

		if (data.metadata.isSceneNoteListAvailable && data.metadata.scenes !== undefined && data.metadata.scenes.length > 0){
			const sceneNoteReplacerButtonEl = this.headerContainerEl
				.createDiv().
				createEl('button', {cls: 'actionButton', text: 'Add scene list to Storyteller Diary'});

			sceneNoteReplacerButtonEl.addEventListener('click', () => {
				const content: Array<string> = [];
				content.push('### Storyteller Diary');
				data.metadata.scenes.forEach((scene: SceneInterface) => {
					content.push(scene.link);
					content.push('-');
					content.push('');
				})
				content.push('');
				content.push('###');

				this.currentComponent.replaceSceneNoteList(content);
			});
		}

		if (analyser !== undefined){
			this.addSceneAnalyser(analyser);
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