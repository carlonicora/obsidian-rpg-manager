import {HeaderResponseInterface} from "../../../../responses/interfaces/HeaderResponseInterface";
import {HeaderResponseElementInterface} from "../../../../responses/interfaces/HeaderResponseElementInterface";
import {HeaderResponseType} from "../../../../responses/enums/HeaderResponseType";
import {Component, Editor, MarkdownRenderer, MarkdownView, TFile, WorkspaceLeaf} from "obsidian";
import {SceneType, sceneTypeDescription} from "../../../enums/SceneType";
import {IdInterface} from "../../../../id/interfaces/IdInterface";
import {HeadlessTableView} from "../../../../views/HeadlessTableView";
import {ContentInterface} from "../../../../responses/contents/interfaces/ContentInterface";
import {AbstractPlotHeaderView} from "../../../../views/abstracts/AbstractPlotHeaderView";
import {SceneTypeDescriptionModal} from "../../../../modals/SceneTypeDescriptionModal";
import {SceneInterface} from "../interfaces/SceneInterface";
import {SessionInterface} from "../../session/interfaces/SessionInterface";
import flatpickr from "flatpickr";

export class SceneHeaderView extends AbstractPlotHeaderView {
	protected currentComponent: SceneInterface;

	public render(
		container: HTMLElement,
		data: HeaderResponseInterface,
	): void {
		super.internalRender(container, data);

		const headlessTable = new HeadlessTableView(this.app, this.sourcePath);

		data.elements.forEach((element: HeaderResponseElementInterface) => {
			switch (element.type){
				case HeaderResponseType.StoryCircleSelector:
					headlessTable.addRow(element, this.addStoryCircleStageSelector.bind(this));
					break;
				case HeaderResponseType.SessionSelection:
					headlessTable.addRow(element, this.addSessionSelector.bind(this));
					break;
				case HeaderResponseType.SceneTypeSelector:
					headlessTable.addRow(element, this.addSceneTypeSelector.bind(this));
					break;
				case HeaderResponseType.SceneExcitment:
					headlessTable.addRow(element, this.addSceneExcitmentSelector.bind(this));
					break;
				case HeaderResponseType.SceneRun:
					headlessTable.addRow(element, this.runScene.bind(this));
					break;
				case HeaderResponseType.SceneRunTime:
					headlessTable.addRow(element, this.sceneRunTime.bind(this));
					break;
				case HeaderResponseType.DateSelector:
					headlessTable.addRow(element, this.addSceneDateSelector.bind(this));
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

		if (data.metadata?.sourceMeta?.analyser !== undefined){
			this.addSceneAnalyser(data.metadata.sourceMeta.analyser);
		}
	}

	private addSceneDateSelector(
		contentEl: HTMLDivElement,
		data: HeaderResponseElementInterface,
	): void {
		const options:any = {
			allowInput: true,
			dateFormat: "Y-m-d",
			altInput: true,
			onChange: (selectedDate: any, dateStr: any , instance: any) => {
				this.manipulators.codeblock.update(
					'data.date',
					dateStr,
				);
			}
		};

		if (this.currentComponent.date !== undefined) options.defaultDate = this.currentComponent.date

		const flatpickrEl = contentEl.createEl('input', {cls: 'flatpickr', type: 'text'});
		flatpickrEl.placeholder = 'Select the Scene Date';
		flatpickrEl.readOnly = true;

		flatpickr(flatpickrEl, options);
	}

	private sceneRunTime(
		contentEl: HTMLDivElement,
		data: HeaderResponseElementInterface,
	): any|ContentInterface|undefined {
		const durationEl = contentEl.createSpan({text: this.countOngoingDuration()});
		if (this.currentComponent.isCurrentlyRunning) {
			setInterval(() => {
				durationEl.textContent = this.countOngoingDuration();
			}, 1000);
		}
	}

	private countOngoingDuration(
	): string {
		let duration: number = this.currentComponent.currentDuration ?? 0;
		if (this.currentComponent.lastStart !== undefined && this.currentComponent.lastStart !== 0){
			duration += (Math.floor(Date.now()/1000) - this.currentComponent.lastStart);
		}

		const expectedHoursDuration: number = Math.floor(duration / 60);
		const expectedMinutesDuration: number = Math.floor(duration - (expectedHoursDuration * 60));
		return (expectedHoursDuration < 10 ? '0' + expectedHoursDuration.toString() : expectedHoursDuration.toString()) +
			':' +
			(expectedMinutesDuration < 10 ? '0' + expectedMinutesDuration.toString() : expectedMinutesDuration.toString());
	}

	private runScene(
		contentEl: HTMLDivElement,
		data: HeaderResponseElementInterface,
	): any|ContentInterface|undefined {
		const startStopEl = contentEl.createEl('a', {href: '#', text: (this.currentComponent.isCurrentlyRunning ? 'stop' : 'start')});
		startStopEl.addEventListener('click', (e) => {
			const editorPositions: Map<Editor, number> = new Map<Editor, number>();

			this.app.workspace.iterateAllLeaves((leaf: WorkspaceLeaf) => {
				if (leaf.view instanceof MarkdownView) {
					const editor = leaf.view.editor;
					editorPositions.set(editor, editor.getScrollInfo().top);
				}
			});

			e.preventDefault();

			if (this.currentComponent.isCurrentlyRunning){
				this.factories.runningTimeManager.stopScene(this.currentComponent)
					.then(() => {
						setTimeout(() => {this.refreshEditorsPosition(editorPositions)},0);
					});
			} else {
				this.factories.runningTimeManager.startScene(this.currentComponent)
					.then(() => {
						setTimeout(() => {this.refreshEditorsPosition(editorPositions)},0);
					});
			}
		})
	}

	private async refreshEditorsPosition(
		editorsPosition: Map<Editor, number>,
	): Promise<void> {
		editorsPosition.forEach((position: number, editor: Editor) => {
			if (editor.getScrollInfo().top !== position){
				editor.scrollTo(0, position);
			}
		});
	}

	protected addSceneExcitmentSelector(
		contentEl: HTMLDivElement,
		data: HeaderResponseElementInterface,
	): any|ContentInterface|undefined {
		if (data.additionalInformation?.sceneId !== undefined) {

			const sceneExcitementSelectorEl = contentEl.createEl('input');
			sceneExcitementSelectorEl.type = 'checkbox';

			if (data.value.content === true) sceneExcitementSelectorEl.checked = true;

			sceneExcitementSelectorEl.addEventListener("change", (e) => {
				const file: TFile|undefined = data.additionalInformation.file;

				if (file !== undefined){
					this.manipulators.codeblock.update(
						'data.isActedUpon',
						sceneExcitementSelectorEl.checked,
					);
				}
			});
		}

		return undefined;
	}

	private addSceneTypeSelector(
		contentEl: HTMLDivElement,
		data: HeaderResponseElementInterface,
	): any|ContentInterface|undefined {
		if (data.additionalInformation?.sceneId !== undefined) {

			const sceneTypeSelectorEl = contentEl.createEl("select");
			sceneTypeSelectorEl.createEl("option", {
				text: "",
				value: ""
			}).selected = true;

			Object.keys(SceneType).filter((v) => isNaN(Number(v))).forEach((type, index) => {
				const sceneTypeOptionEl = sceneTypeSelectorEl.createEl("option", {
					text: sceneTypeDescription.get(SceneType[type as keyof typeof SceneType]) ?? type,
					value: type,
				});

				if (data.value.content !== undefined && data.value.content === SceneType[type as keyof typeof SceneType]) sceneTypeOptionEl.selected = true;
			});

			sceneTypeSelectorEl.addEventListener("change", (e) => {
				const file: TFile|undefined = data.additionalInformation.file;

				if (file !== undefined){
					this.manipulators.codeblock.update(
						'data.sceneType',
						this.factories.sceneType.createReadableSceneType(SceneType[sceneTypeSelectorEl.value as keyof typeof SceneType]),
					);
				}
			});

			contentEl.createSpan({text: '?'}).addEventListener('click', () => {
				new SceneTypeDescriptionModal(this.app).open();
			});
		}

		return undefined;
	}

	private addCurrentSessionLink(
		contentEl: HTMLDivElement,
		data: HeaderResponseElementInterface,
	): void {
		const sceneId:IdInterface|undefined = data.additionalInformation?.sceneId;

		if (sceneId !== undefined) {
			const sessions = data.additionalInformation.sessions;
			sessions.forEach((session: SessionInterface) => {
				if (data.value.content.toString() === session.id.sessionId?.toString()) {
					MarkdownRenderer.renderMarkdown(
						session.file.path,
						contentEl,
						'',
						null as unknown as Component,
					);
				}
			});
		}
	}

	private addSessionSelector(
		contentEl: HTMLDivElement,
		data: HeaderResponseElementInterface,
	): any|ContentInterface|undefined {
		const sceneId:IdInterface|undefined = data.additionalInformation?.sceneId;

		if (sceneId !== undefined) {
			const sessions = data.additionalInformation.sessions;

			const sessionSelectorEl = contentEl.createEl("select");
			sessionSelectorEl.createEl("option", {
				text: "",
				value: ""
			}).selected = true;

			sessions.forEach((session: SessionInterface) => {
				const sessionOptionEl = sessionSelectorEl.createEl("option", {
					text: session.file.basename,
					value: session.id.sessionId?.toString(),
				});

				if (data.value.content !== undefined && data.value.content.toString() === session.id.sessionId?.toString()) sessionOptionEl.selected = true;
			});

			sessionSelectorEl.addEventListener("change", (e) => {
				const file: TFile|undefined = data.additionalInformation.file;

				if (file !== undefined){
					this.manipulators.codeblock.update(
						'data.sessionId',
						+sessionSelectorEl.value,
					);
				}
			});
		}

		return ((contentEl: HTMLDivElement,data: HeaderResponseElementInterface) => {
			const sceneId:IdInterface|undefined = data.additionalInformation?.sceneId;

			if (sceneId !== undefined) {
				const sessions = data.additionalInformation.sessions;
				sessions.forEach((session: SessionInterface) => {
					if (data.value.content !== undefined && data.value.content.toString() === session.id.sessionId?.toString()) {
						MarkdownRenderer.renderMarkdown(
							session.link,
							contentEl,
							'',
							null as unknown as Component,
						);
					}
				});
			}
		}
		);
	}
}
