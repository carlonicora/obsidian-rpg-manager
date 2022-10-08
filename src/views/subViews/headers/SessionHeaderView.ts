import {HeaderResponseInterface} from "../../../responses/interfaces/HeaderResponseInterface";
import {HeaderResponseElementInterface} from "../../../responses/interfaces/HeaderResponseElementInterface";
import {HeaderResponseType} from "../../../responses/enums/HeaderResponseType";
import {AbstractPlotHeaderView} from "../../abstracts/AbstractPlotHeaderView";
import {SceneSelectionModal} from "../../../modals/SceneSelectionModal";
import {SceneAnalyser} from "../../../databases/SceneAnalyser";
import {HeadlessTableView} from "../../HeadlessTableView";
import {SessionInterface} from "../../../databases/components/interfaces/SessionInterface";
import {SceneInterface} from "../../../databases/components/interfaces/SceneInterface";
import {AbtStage} from "../../../plots/enums/AbtStage";
import {TFile} from "obsidian";
import flatpickr from "flatpickr";

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
				case HeaderResponseType.DateSelector:
					headlessTable.addRow(element, this.addIrlDateSelector.bind(this));
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

	protected addIrlDateSelector(
		contentEl: HTMLDivElement,
		data: HeaderResponseElementInterface,
	): void {
		const options:any = {
			allowInput: true,
			dateFormat: "Y-m-d",
			altInput: true,
			onChange: (selectedDate: any, dateStr: any , instance: any) => {
				this.manipulators.codeblock.update(
					'data.irl',
					dateStr,
				);
			}
		};

		if (this.currentComponent.irl !== undefined) {
			options.defaultDate = this.currentComponent.irl
		} else {
			//const previousSession = this.currentComponent.previousSession;
			//if (previousSession !== undefined && previousSession?.irl !== undefined) options.setSelectedDate(previousSession?.irl);
		}

		const flatpickrEl = contentEl.createEl('input', {cls: 'flatpickr', type: 'text'});
		flatpickrEl.placeholder = 'Select the Session Date';
		flatpickrEl.readOnly = true;

		flatpickr(flatpickrEl, options);
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
