import {HeaderResponseInterface} from "../responses/interfaces/HeaderResponseInterface";
import {HeaderResponseElementInterface} from "../responses/interfaces/HeaderResponseElementInterface";
import {HeaderResponseType} from "../responses/enums/HeaderResponseType";
import {Component, Editor, MarkdownRenderer, MarkdownView, TFile, WorkspaceLeaf} from "obsidian";
import {SceneType, sceneTypeDescription} from "../../src/components/scene/enums/SceneType";
import {IdInterface} from "../../src/services/idService/interfaces/IdInterface";
import {HeadlessTableView} from "../views/HeadlessTableView";
import {ContentInterface} from "../responses/contents/interfaces/ContentInterface";
import {AbstractPlotHeaderView} from "../views/abstracts/AbstractPlotHeaderView";
import {SceneTypeDescriptionModal} from "../../src/components/scene/modals/SceneTypeDescriptionModal";
import {SceneInterface} from "../../src/components/scene/interfaces/SceneInterface";
import {SessionInterface} from "../../src/components/session/interfaces/SessionInterface";
import flatpickr from "flatpickr";
import {AnalyserInterface} from "../services/analyser/interfaces/AnalyserInterface";
import {AnalyserReportType} from "../services/analyser/enums/AnalyserReportType";
import {DateInterface} from "../../../../REFACTOR/services/dateService/interfaces/DateInterface";

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
					headlessTable.addRow(element, this._addSessionSelector.bind(this));
					break;
				case HeaderResponseType.SceneTypeSelector:
					headlessTable.addRow(element, this._addSceneTypeSelector.bind(this));
					break;
				case HeaderResponseType.SceneExcitment:
					headlessTable.addRow(element, this.addSceneExcitmentSelector.bind(this));
					break;
				case HeaderResponseType.SceneRun:
					headlessTable.addRow(element, this._runScene.bind(this));
					break;
				case HeaderResponseType.SceneRunTime:
					headlessTable.addRow(element, this._sceneRunTime.bind(this));
					break;
				case HeaderResponseType.DateSelector:
					headlessTable.addRow(element, this._addSceneDateSelector.bind(this));
					break;
				case HeaderResponseType.FantasyDateSelector:
					headlessTable.addRow(element, this.addFantasyDateSelector.bind(this));
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

		if (data.metadata?.sourceMeta?.analyser !== undefined)
			(<AnalyserInterface>data.metadata.sourceMeta.analyser).render(AnalyserReportType.Scene, this.headerContainerEl);

	}

	private _sceneRunTime(
		contentEl: HTMLDivElement,
		data: HeaderResponseElementInterface,
	): any|ContentInterface|undefined {
		const durationEl = contentEl.createSpan({text: this._countOngoingDuration()});

		if (this.currentComponent.isCurrentlyRunning) {
			setInterval(() => {
				durationEl.textContent = this._countOngoingDuration();
			}, 1000);
		}
	}

	private _countOngoingDuration(
	): string {
		let duration: number = this.currentComponent.currentDuration ?? 0;

		if (this.currentComponent.lastStart !== undefined && this.currentComponent.lastStart !== 0)
			duration += (Math.floor(Date.now()/1000) - this.currentComponent.lastStart);

		const expectedHoursDuration: number = Math.floor(duration / 60);
		const expectedMinutesDuration: number = Math.floor(duration - (expectedHoursDuration * 60));

		return (expectedHoursDuration < 10 ? '0' + expectedHoursDuration.toString() : expectedHoursDuration.toString()) +
			':' +
			(expectedMinutesDuration < 10 ? '0' + expectedMinutesDuration.toString() : expectedMinutesDuration.toString());
	}

	private _runScene(
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
						setTimeout(() => {this._refreshEditorsPosition(editorPositions);},0);
					});
			} else {
				this.factories.runningTimeManager.startScene(this.currentComponent)
					.then(() => {
						setTimeout(() => {this._refreshEditorsPosition(editorPositions);},0);
					});
			}
		});
	}

	private async _refreshEditorsPosition(
		editorsPosition: Map<Editor, number>,
	): Promise<void> {
		editorsPosition.forEach((position: number, editor: Editor) => {
			if (editor.getScrollInfo().top !== position){
				editor.scrollTo(0, position);
			}
		});
	}
}
