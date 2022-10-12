import {HeaderResponseInterface} from "../../../../responses/interfaces/HeaderResponseInterface";
import {ViewType} from "../../../../views/enums/ViewType";
import {Component, MarkdownRenderer, TFile} from "obsidian";
import {AbstractPlotHeaderView} from "../../../../views/abstracts/AbstractPlotHeaderView";
import {HeadlessTableView} from "../../../../views/HeadlessTableView";
import {ContentInterface} from "../../../../responses/contents/interfaces/ContentInterface";
import {CampaignInterface} from "../interfaces/CampaignInterface";
import {ComponentInterface} from "../../../interfaces/ComponentInterface";

export class CampaignHeaderView extends AbstractPlotHeaderView {
	protected currentComponent: CampaignInterface;

	public render(
		container: HTMLElement,
		data: HeaderResponseInterface,
	): void {
		super.render(container, data);

		if (this.currentComponent.image != null){
			this.headerTitleEl.empty();
			this.headerTitleEl.addClass('rpgm-header');
			this.headerInfoEl.addClass('info-large');
			this.headerContainerEl.removeChild(this.imageContainterEl);

			this.headerTitleEl.style.backgroundImage = 'url(\'' + this.currentComponent.image + '\')';

			const overlay = this.headerTitleEl.createDiv({cls: 'rpgm-header-overlay'});
			overlay.createDiv({cls: 'rpgm-header-title', text: this.currentComponent.file.basename});

			//overlay.createDiv({cls: 'rpgm-campaign-name', text: this.campaign.name});
			overlay.createDiv({cls: 'rpgm-current-date', text: (this.currentComponent.date !== null ? this.currentComponent.date?.toDateString() : '')});
		}

		if (this.currentComponent.date !== undefined) {
			this.headerTitleEl.createEl('a', {cls: 'subtitle', text: 'View Campaign Timeline', href: '#'})
				.addEventListener("click", () => {
					this.factories.views.showObsidianView(ViewType.Timeline, [data.metadata.campaignId]);
				});
		}

		const headlessTable = new HeadlessTableView(this.app, this.sourcePath);

		if (data.metadata?.sourceMeta?.adventures !== undefined){
			headlessTable.addRow(
				'Current Adventure',
				this.addCurrentComponentSelector.bind(this),
				['adventure', this.currentComponent.currentAdventureId, data.metadata?.sourceMeta?.adventures]
			);
		}

		if (data.metadata?.sourceMeta?.acts !== undefined){
			headlessTable.addRow(
				'Current Act',
				this.addCurrentComponentSelector.bind(this),
				['act', this.currentComponent.currentActId, data.metadata?.sourceMeta?.acts]
			);
		}

		if (data.metadata?.sourceMeta?.sessions !== undefined){
			headlessTable.addRow(
				'Current Session',
				this.addCurrentComponentSelector.bind(this),
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

	private addCurrentComponentSelector(
		contentEl: HTMLDivElement,
		type: string,
		currentComponent: string|undefined,
		components: Array<ComponentInterface>,
	): any|ContentInterface|undefined {
		const componentSelectorEl = contentEl.createEl("select");
		componentSelectorEl.id = type;
		componentSelectorEl.style.width = '100%';
		componentSelectorEl.createEl("option", {
			text: "",
			value: ""
		}).selected = true;

		components.forEach((component: ComponentInterface) => {
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

		return ((contentEl: HTMLDivElement, type: string, currentComponent: string|undefined, components: Array<ComponentInterface>) => {
			let link: string|undefined = undefined;
			components.forEach((component: ComponentInterface) => {
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
