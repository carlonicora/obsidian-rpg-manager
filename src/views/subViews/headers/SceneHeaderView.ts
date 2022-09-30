import {HeaderResponseInterface} from "../../../interfaces/response/subModels/HeaderResponseInterface";
import {SceneInterface} from "../../../interfaces/components/SceneInterface";
import {HeaderResponseElementInterface} from "../../../interfaces/response/subModels/HeaderResponseElementInterface";
import {HeaderResponseType} from "../../../enums/HeaderResponseType";
import {Component, Editor, MarkdownRenderer, MarkdownView, TFile, WorkspaceLeaf} from "obsidian";
import {SceneType, sceneTypeDescription} from "../../../enums/SceneType";
import {IdInterface} from "../../../interfaces/components/IdInterface";
import {SessionInterface} from "../../../interfaces/components/SessionInterface";
import {HeadlessTableView} from "../../HeadlessTableView";
import {ContentInterface} from "../../../interfaces/ContentInterface";
import {AbstractPlotHeaderView} from "../../../abstracts/AbstractPlotHeaderView";

export class SceneHeaderView extends AbstractPlotHeaderView {
	protected currentElement: SceneInterface;

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
				default:
					element.value.fillContent(
						this.createContainerEl(element.type, element.title),
						this.sourcePath,
					);
					break;
			}
		});

		this.headerContainerEl.appendChild(headlessTable.tableEl as Node);

		if (data.metadata?.sourceMeta?.analyser !== undefined){
			this.addActBalance(data.metadata.sourceMeta.analyser);
		}
	}

	private sceneRunTime(
		contentEl: HTMLDivElement,
		data: HeaderResponseElementInterface,
	): any|ContentInterface|undefined {
		const durationEl = contentEl.createSpan({text: this.countOngoingDuration()});
		if (this.currentElement.isCurrentlyRunning) {
			setInterval(() => {
				durationEl.textContent = this.countOngoingDuration();
			}, 1000);
		}
	}

	private countOngoingDuration(
	): string {
		let duration: number = this.currentElement.currentDuration ?? 0;
		if (this.currentElement.lastStart !== undefined && this.currentElement.lastStart !== 0){
			duration += (Math.floor(Date.now()/1000) - this.currentElement.lastStart);
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
		const startStopEl = contentEl.createEl('a', {href: '#', text: (this.currentElement.isCurrentlyRunning ? 'stop' : 'start')});
		startStopEl.addEventListener('click', (e) => {
			const editorPositions: Map<Editor, number> = new Map<Editor, number>();
			/*


			const editor: Editor|undefined = this.app.workspace.getActiveViewOfType(MarkdownView)?.editor;
			const top: number|undefined = editor?.getScrollInfo().top;

			if (editor !== undefined && top !== undefined){
				editorPositions.set(editor, top);
			}
			*/

			this.app.workspace.iterateAllLeaves((leaf: WorkspaceLeaf) => {
				if (leaf.view instanceof MarkdownView) {
					const editor = leaf.view.editor;
					editorPositions.set(editor, editor.getScrollInfo().top);
				}
			});

			e.preventDefault();

			if (this.currentElement.isCurrentlyRunning){
				this.factories.runningTimeManager.stopScene(this.currentElement)
					.then(() => {
						setTimeout(() => {this.refreshEditorsPosition(editorPositions)},0);
					});
			} else {
				this.factories.runningTimeManager.startScene(this.currentElement)
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
					const map: Map<string,any> = new Map<string, any>();
					map.set('isActedUpon', sceneExcitementSelectorEl.checked);
					this.factories.frontmatter.update(file, map);
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

				if (data.value.content.toString() === type) sceneTypeOptionEl.selected = true;
			});

			sceneTypeSelectorEl.addEventListener("change", (e) => {
				const file: TFile | undefined = data.additionalInformation.file;

				if (file !== undefined) {
					const map: Map<string, string> = new Map<string, string>();
					map.set('sceneType', sceneTypeSelectorEl.value);
					this.factories.frontmatter.update(file, map);
				}
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
				if (data.value.content.toString() === session.sessionId.toString()) {
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

	private addSessionSelector(
		contentEl: HTMLDivElement,
		data: HeaderResponseElementInterface,
	): any|ContentInterface|undefined {
		const sceneId:IdInterface|undefined = data.additionalInformation?.sceneId;

		if (sceneId !== undefined) {
			const sessions = data.additionalInformation.sessions;

			const sessionSelectorEl = contentEl.createEl("select");
			if (sessions.length > 1) {
				sessionSelectorEl.createEl("option", {
					text: "",
					value: ""
				}).selected = true;
			}
			sessions.forEach((session: SessionInterface) => {
				const sessionOptionEl = sessionSelectorEl.createEl("option", {
					text: session.name,
					value: session.sessionId.toString(),
				});

				if (data.value.content.toString() === session.sessionId.toString()) sessionOptionEl.selected = true;
			});

			sessionSelectorEl.addEventListener("change", (e) => {
				this.selectSession(data, sessionSelectorEl.value);
			});
		}

		return ((contentEl: HTMLDivElement,data: HeaderResponseElementInterface) => {
			const sceneId:IdInterface|undefined = data.additionalInformation?.sceneId;

			if (sceneId !== undefined) {
				const sessions = data.additionalInformation.sessions;
				sessions.forEach((session: SessionInterface) => {
					if (data.value.content.toString() === session.sessionId.toString()) {
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

	protected async selectSession(
		data: HeaderResponseElementInterface,
		selectedValue: string,
	): Promise<void> {
		const file: TFile|undefined = data.additionalInformation.file;

		if (file !== undefined){
			const map: Map<string,string> = new Map<string, string>();
			map.set('session', selectedValue);
			this.factories.frontmatter.update(file, map);
		}
	}
}
