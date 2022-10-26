import {HeaderResponseInterface} from "../../../responses/interfaces/HeaderResponseInterface";
import {ViewType} from "../../../../REFACTOR/views/enums/ViewType";
import {Component, MarkdownRenderer, TFile} from "obsidian";
import {AbstractPlotHeaderView} from "../../../../REFACTOR/views/abstracts/AbstractPlotHeaderView";
import {HeadlessTableView} from "../../../../REFACTOR/views/HeadlessTableView";
import {ContentInterface} from "../../../responses/contents/interfaces/ContentInterface";
import {CampaignInterface} from "../interfaces/CampaignInterface";
import {ModelInterface} from "../../../api/modelsManager/interfaces/ModelInterface";
import {HeaderResponseElementInterface} from "../../../responses/interfaces/HeaderResponseElementInterface";
import {HeaderResponseType} from "../../../responses/enums/HeaderResponseType";
import {DateService} from "../../../../REFACTOR/services/dateService/DateService";

export class CampaignHeaderView extends AbstractPlotHeaderView {
	protected currentComponent: CampaignInterface;

	public render(
		container: HTMLElement,
		data: HeaderResponseInterface,
	): void {
		super.internalRender(container, data);

		if (this.currentComponent.images.length > 0){
			this.headerTitleEl.empty();
			this.headerTitleEl.addClass('rpgm-header');
			this.headerInfoEl.addClass('info-large');

			if (this.imageContainterEl !== undefined)
				this.headerContainerEl.removeChild(this.imageContainterEl);

			this.headerTitleEl.style.backgroundImage = 'url(\'' + this.currentComponent.images[0].src + '\')';

			const overlay = this.headerTitleEl.createDiv({cls: 'rpgm-header-overlay'});
			overlay.createDiv({cls: 'rpgm-header-title', text: this.currentComponent.file.basename});

			//overlay.createDiv({cls: 'rpgm-campaign-name', text: this.campaign.name});
			overlay.createDiv({cls: 'rpgm-current-dateService', text: (this.api.service(DateService).getReadableDate(this.currentComponent.date, this.currentComponent) ?? '')});
		}

		if (this.currentComponent.date !== undefined) {
			this.headerTitleEl.createEl('a', {cls: 'subtitle', text: 'View CampaignModel Timeline', href: '#'})
				.addEventListener("click", () => {
					this.factories.views.showObsidianView(ViewType.Timeline, [data.metadata.campaignId]);
				});
		}

		const headlessTable = new HeadlessTableView(this.app, this.sourcePath);

		data.elements.forEach((element: HeaderResponseElementInterface) => {
			switch (element.type){
				case HeaderResponseType.DateSelector:
					this.createContainerEl(element, this.addDateSelector.bind(this));
					break;
				case HeaderResponseType.FantasyDateSelector:
					this.createContainerEl(element, this.addFantasyDateSelector.bind(this));
					break;
				default:
					element.value.fillContent(
						this.createContainerEl(element),
						this.sourcePath,
					);
					break;
			}
		});

		if (data.metadata?.sourceMeta?.adventures !== undefined){
			headlessTable.addRow(
				'Current AdventureModel',
				this._addCurrentComponentSelector.bind(this),
				['adventure', this.currentComponent.currentAdventureId, data.metadata?.sourceMeta?.adventures]
			);
		}

		if (data.metadata?.sourceMeta?.acts !== undefined){
			headlessTable.addRow(
				'Current ActModel',
				this._addCurrentComponentSelector.bind(this),
				['act', this.currentComponent.currentActId, data.metadata?.sourceMeta?.acts]
			);
		}

		if (data.metadata?.sourceMeta?.sessions !== undefined){
			headlessTable.addRow(
				'Current SessionModel',
				this._addCurrentComponentSelector.bind(this),
				['session', this.currentComponent.currentSessionId, data.metadata?.sourceMeta?.sessions]
			);
		}

		this.headerInfoEl.appendChild(headlessTable.tableEl as Node);

		if (this.settings.usePlotStructures && data.currentComponent.hasAbtPlot && !data.currentComponent.abt.isEmpty){
			this.addAbtPlot(data.currentComponent.abt);
		}

		if (this.settings.usePlotStructures && data.currentComponent.hasStoryCirclePlot && !data.currentComponent.storyCircle.isEmpty){
			this.addStoryCirclePlot(data.currentComponent.storyCircle);
		}
	}

	private _addCurrentComponentSelector(
		contentEl: HTMLDivElement,
		type: string,
		currentComponent: string|undefined,
		components: ModelInterface[],
	): any|ContentInterface|undefined {
		const componentSelectorEl = contentEl.createEl("select");
		componentSelectorEl.id = type;
		componentSelectorEl.style.width = '100%';
		componentSelectorEl.createEl("option", {
			text: "",
			value: ""
		}).selected = true;

		components.forEach((component: ModelInterface) => {
			const componentOptionEl = componentSelectorEl.createEl("option", {
				text: component.file.basename,
				value: component.id.stringValue,
			});

			if (currentComponent === component.id.stringValue) {
				componentOptionEl.selected = true;
			}
		});

		componentSelectorEl.addEventListener("change", (e) => {
			const file: TFile|undefined = this.currentComponent.file;

			if (file !== undefined){
				this.manipulators.codeblock.update('data.current' + type[0].toUpperCase() + type.substring(1).toLowerCase() + 'Id', componentSelectorEl.value);
			}
		});

		return ((contentEl: HTMLDivElement, type: string, currentComponent: string|undefined, components: ModelInterface[]) => {
			let link: string|undefined = undefined;
			components.forEach((component: ModelInterface) => {
				if (currentComponent === component.id.stringValue) link = component.link;
			});

			if (link !== undefined) {
				MarkdownRenderer.renderMarkdown(
					link,
					contentEl,
					'',
					null as unknown as Component,
				);
			} else {
				contentEl.textContent = '';
			}
		});
	}
}
