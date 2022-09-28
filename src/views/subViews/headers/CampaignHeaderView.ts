import {HeaderResponseInterface} from "../../../interfaces/response/subModels/HeaderResponseInterface";
import {CampaignInterface} from "../../../interfaces/components/CampaignInterface";
import {ViewType} from "../../../enums/ViewType";
import {HeaderResponseType} from "../../../enums/HeaderResponseType";
import {AdventureInterface} from "../../../interfaces/components/AdventureInterface";
import {HeaderResponseElementInterface} from "../../../interfaces/response/subModels/HeaderResponseElementInterface";
import {ActInterface} from "../../../interfaces/components/ActInterface";
import {SessionInterface} from "../../../interfaces/components/SessionInterface";
import {Component, MarkdownRenderer, TFile} from "obsidian";
import {AbstractPlotHeaderView} from "../../../abstracts/AbstractPlotHeaderView";

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

		let containerEl: HTMLDivElement;
		const element:HeaderResponseElementInterface = {
			currentElement: this.currentElement,
			title: '',
			value: {isInLine: true, content: null, fillContent(container: HTMLElement, sourcePath: string) {}},
			type: HeaderResponseType.Half,
		}

		if (data.metadata?.sourceMeta?.adventures !== undefined){
			containerEl = this.createContainerEl(HeaderResponseType.Half, 'Current Adventure');
			this.addElement(
				containerEl,
				element,
				this.addCurrentAdventureSelector(
					containerEl.children[1] as HTMLDivElement,
					data.metadata?.sourceMeta?.current?.adventure,
					data.metadata?.sourceMeta?.adventures,
				),
			);
		}

		if (data.metadata?.sourceMeta?.acts !== undefined){
			containerEl = this.createContainerEl(HeaderResponseType.Half, 'Current Act');
			this.addElement(
				containerEl,
				element,
				this.addCurrentActSelector(
					containerEl.children[1] as HTMLDivElement,
					data.metadata?.sourceMeta?.current?.act,
					data.metadata?.sourceMeta?.acts,
				),
			);
		}

		if (data.metadata?.sourceMeta?.sessions !== undefined){
			containerEl = this.createContainerEl(HeaderResponseType.Half, 'Current Session');
			this.addElement(
				containerEl,
				element,
				this.addCurrentSessionSelector(
					containerEl.children[1] as HTMLDivElement,
					data.metadata?.sourceMeta?.current?.session,
					data.metadata?.sourceMeta?.sessions,
				),
			);
		}

		if (this.settings.usePlotStructures && data?.metadata?.sourceMeta?.abt !== undefined){
			this.addAbtPlot(data?.metadata?.sourceMeta?.abt);
		}

		if (this.settings.usePlotStructures && data?.metadata?.sourceMeta?.storycircle !== undefined){
			this.addStoryCirclePlot(data?.metadata?.sourceMeta?.storycircle);
		}
	}

	private addCurrentAdventureSelector(
		contentEl: HTMLDivElement,
		currentAdventure: string|undefined,
		adventures: Array<AdventureInterface>,
	): void {
		let selectedAdventure: AdventureInterface|undefined;

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
				selectedAdventure = adventure;
				adventureOptionEl.selected = true;
			}
		});

		adventureSelectorEl.addEventListener("change", (e) => {
			const file: TFile|undefined = this.currentElement.file;

			if (file !== undefined){
				this.factories.codeblock.update('campaignNavigation', 'current.adventure', adventureSelectorEl.value)
			}
		});

		if (selectedAdventure !== undefined){
			const adventureLinkEl = contentEl.createSpan();
			MarkdownRenderer.renderMarkdown(
				selectedAdventure.link,
				adventureLinkEl,
				this.sourcePath,
				null as unknown as Component,
			);
		}
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
