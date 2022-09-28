import {HeaderResponseInterface} from "../../../interfaces/response/subModels/HeaderResponseInterface";
import {CampaignInterface} from "../../../interfaces/components/CampaignInterface";
import {ViewType} from "../../../enums/ViewType";
import {AdventureInterface} from "../../../interfaces/components/AdventureInterface";
import {ActInterface} from "../../../interfaces/components/ActInterface";
import {SessionInterface} from "../../../interfaces/components/SessionInterface";
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














	private addCurrentAdventureSelector(
		contentEl: HTMLDivElement,
		currentAdventure: string|undefined,
		adventures: Array<AdventureInterface>,
	): any|ContentInterface|undefined {
		const adventureSelectorEl = contentEl.createEl("select");
		adventureSelectorEl.style.width = '100%';
		adventureSelectorEl.createEl("option", {
			text: "",
			value: ""
		}).selected = true;

		adventures.forEach((adventure: AdventureInterface) => {
			const adventureOptionEl = adventureSelectorEl.createEl("option", {
				text: adventure.name,
				value: adventure.id.stringValue,
			});

			if (currentAdventure === adventure.id.stringValue) {
				adventureOptionEl.selected = true;
			}
		});

		adventureSelectorEl.addEventListener("change", (e) => {
			const file: TFile|undefined = this.currentElement.file;

			if (file !== undefined){
				this.factories.codeblock.update('campaignNavigation', 'current.adventure', adventureSelectorEl.value)
			}
		});

		return ((contentEl: HTMLDivElement, currentAdventure: string|undefined, adventures: Array<AdventureInterface>) => {
			let link: string|undefined = undefined;
			adventures.forEach((adventure: AdventureInterface) => {
				if (currentAdventure === adventure.id.stringValue) link = adventure.link;
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

	private addCurrentActSelector(
		contentEl: HTMLDivElement,
		currentAct: string|undefined,
		acts: Array<ActInterface>,
	): void {
		let selectedAct: ActInterface|undefined;

		const actSelectorEl = contentEl.createEl("select");
		actSelectorEl.style.width = '100%';
		actSelectorEl.createEl("option", {
			text: "",
			value: ""
		}).selected = true;

		acts.forEach((act: ActInterface) => {
			const actOptionEl = actSelectorEl.createEl("option", {
				text: act.name,
				value: act.id.stringValue,
			});

			if (currentAct === act.id.stringValue) {
				selectedAct = act;
				actOptionEl.selected = true;
			}
		});

		actSelectorEl.addEventListener("change", (e) => {
			const file: TFile|undefined = this.currentElement.file;

			if (file !== undefined){
				this.factories.codeblock.update('campaignNavigation', 'current.act', actSelectorEl.value)
			}
		});

		if (selectedAct !== undefined){
			const actLinkEl = contentEl.createSpan();
			MarkdownRenderer.renderMarkdown(
				selectedAct.link,
				actLinkEl,
				this.sourcePath,
				null as unknown as Component,
			);
		}
	}

	private addCurrentSessionSelector(
		contentEl: HTMLDivElement,
		currentSession: string|undefined,
		sessions: Array<SessionInterface>,
	): void {
		let selectedSession: SessionInterface|undefined;

		const sessionSelectorEl = contentEl.createEl("select");
		sessionSelectorEl.style.width = '100%';
		sessionSelectorEl.createEl("option", {
			text: "",
			value: ""
		}).selected = true;

		sessions.forEach((session: SessionInterface) => {
			const sessionOptionEl = sessionSelectorEl.createEl("option", {
				text: session.name,
				value: session.id.stringValue,
			});

			if (currentSession === session.id.stringValue) {
				selectedSession = session;
				sessionOptionEl.selected = true;
			}
		});

		sessionSelectorEl.addEventListener("change", (e) => {
			const file: TFile|undefined = this.currentElement.file;

			if (file !== undefined){
				this.factories.codeblock.update('campaignNavigation', 'current.session', sessionSelectorEl.value)
			}
		});

		if (selectedSession !== undefined){
			const sessionLinkEl = contentEl.createSpan();
			MarkdownRenderer.renderMarkdown(
				selectedSession.link,
				sessionLinkEl,
				this.sourcePath,
				null as unknown as Component,
			);
		}
	}
}
