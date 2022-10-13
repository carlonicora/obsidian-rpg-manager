import {HeaderResponseInterface} from "../../../../responses/interfaces/HeaderResponseInterface";
import {HeaderResponseElementInterface} from "../../../../responses/interfaces/HeaderResponseElementInterface";
import {HeaderResponseType} from "../../../../responses/enums/HeaderResponseType";
import {AbstractPlotHeaderView} from "../../../../views/abstracts/AbstractPlotHeaderView";
import {SceneSelectionModal} from "../../../../modals/SceneSelectionModal";
import {SceneAnalyser} from "../../../../analyser/SceneAnalyser";
import {HeadlessTableView} from "../../../../views/HeadlessTableView";
import {SessionInterface} from "../interfaces/SessionInterface";
import {SceneInterface} from "../../scene/interfaces/SceneInterface";
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
				case HeaderResponseType.DurationSelector:
					headlessTable.addRow(element, this.addTargetDurationSelector.bind(this));
					break;
				default:
					element.value.fillContent(
						this.createContainerEl(element),
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

	protected addTargetDurationSelector(
		contentEl: HTMLDivElement,
		data: HeaderResponseElementInterface,
	): void {
		const options:any = {
			allowInput: true,
			enableTime: true,
			noCalendar: true,
			minuteIncrement: 15,
			time_24hr: true,
			onChange: (selectedDate: Date, dateStr: string , instance: flatpickr.Instance) => {
				const [hours, minutes] = dateStr.split(':');
				const duration = +hours * 60 + +minutes;

				this.manipulators.codeblock.update(
					'data.targetDuration',
					duration,
				);
			}
		};

		if (this.currentComponent.targetDuration != undefined) {
			const hours = Math.floor(this.currentComponent.targetDuration/60);
			const minutes = (this.currentComponent.targetDuration % 60);

			options.defaultDate = hours.toString() + ':' + (minutes < 10 ? '0' : '') + minutes.toString()
		}

		const flatpickrEl = contentEl.createEl('input', {cls: 'flatpickr', type: 'text'});
		flatpickrEl.placeholder = 'Target Duration';
		flatpickrEl.readOnly = true;

		flatpickr(flatpickrEl, options);
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
