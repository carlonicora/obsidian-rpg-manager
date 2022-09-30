import {HeaderResponseInterface} from "../../../interfaces/response/subModels/HeaderResponseInterface";
import {CampaignInterface} from "../../../interfaces/components/CampaignInterface";
import {ViewType} from "../../../enums/ViewType";
import {Component, MarkdownRenderer, TFile} from "obsidian";
import {AbstractPlotHeaderView} from "../../../abstracts/AbstractPlotHeaderView";
import {HeadlessTableView} from "../../HeadlessTableView";
import {ContentInterface} from "../../../interfaces/ContentInterface";
import {ComponentInterface} from "../../../interfaces/database/ComponentInterface";

export class CampaignHeaderView extends AbstractPlotHeaderView {
	protected currentElement: CampaignInterface;

	public render(
		container: HTMLElement,
		data: HeaderResponseInterface,
	): void {
		super.render(container, data);

		if (this.currentElement.image != null){
			this.headerTitleEl.empty();
			this.headerTitleEl.addClass('rpgm-header');
			this.headerInfoEl.addClass('info-large');
			this.headerContainerEl.removeChild(this.imageContainterEl);

			this.headerTitleEl.style.backgroundImage = 'url(\'' + this.currentElement.image + '\')';

			const overlay = this.headerTitleEl.createDiv({cls: 'rpgm-header-overlay'});
			overlay.createDiv({cls: 'rpgm-header-title', text: this.currentElement.name});

			//overlay.createDiv({cls: 'rpgm-campaign-name', text: this.campaign.name});
			overlay.createDiv({cls: 'rpgm-current-date', text: (this.currentElement.currentDate !== null ? this.currentElement.currentDate.toDateString() : '')});
		}

		if (this.currentElement.currentDate !== undefined) {
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
				['adventure', data.metadata?.sourceMeta?.current?.adventure, data.metadata?.sourceMeta?.adventures]
			);
		}

		if (data.metadata?.sourceMeta?.acts !== undefined){
			headlessTable.addRow(
				'Current Act',
				this.addCurrentComponentSelector.bind(this),
				['act', data.metadata?.sourceMeta?.current?.act, data.metadata?.sourceMeta?.acts]
			);
		}

		if (data.metadata?.sourceMeta?.sessions !== undefined){
			headlessTable.addRow(
				'Current Session',
				this.addCurrentComponentSelector.bind(this),
				['session', data.metadata?.sourceMeta?.current?.session, data.metadata?.sourceMeta?.sessions]
			);
		}

		this.headerInfoEl.appendChild(headlessTable.tableEl as Node);

		if (this.settings.usePlotStructures && data?.metadata?.sourceMeta?.abt !== undefined){
			this.addAbtPlot(data?.metadata?.sourceMeta?.abt);
		}

		if (this.settings.usePlotStructures && data?.metadata?.sourceMeta?.storycircle !== undefined){
			this.addStoryCirclePlot(data?.metadata?.sourceMeta?.storycircle);
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
				text: component.name,
				value: component.id.stringValue,
			});

			if (currentComponent === component.id.stringValue) {
				componentOptionEl.selected = true;
			}
		});

		componentSelectorEl.addEventListener("change", (e) => {
			const file: TFile|undefined = this.currentElement.file;

			if (file !== undefined){
				this.factories.codeblock.update('campaignNavigation', 'current.' + type, componentSelectorEl.value)
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
