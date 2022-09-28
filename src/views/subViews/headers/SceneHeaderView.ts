import {AbstractHeaderView} from "../../../abstracts/AbstractHeaderView";
import {HeaderResponseInterface} from "../../../interfaces/response/subModels/HeaderResponseInterface";
import {SceneInterface} from "../../../interfaces/components/SceneInterface";
import {HeaderResponseElementInterface} from "../../../interfaces/response/subModels/HeaderResponseElementInterface";
import {HeaderResponseType} from "../../../enums/HeaderResponseType";
import {Component, MarkdownRenderer, TFile} from "obsidian";
import {SceneType} from "../../../enums/SceneType";
import {IdInterface} from "../../../interfaces/components/IdInterface";
import {SessionInterface} from "../../../interfaces/components/SessionInterface";
import {ComponentType} from "../../../enums/ComponentType";
import {SorterComparisonElement} from "../../../database/SorterComparisonElement";
import {SorterType} from "../../../enums/SorterType";

export class SceneHeaderView extends AbstractHeaderView {
	protected currentElement: SceneInterface;

	public render(
		container: HTMLElement,
		data: HeaderResponseInterface,
	): void {
		super.internalRender(container, data);

		data.elements.forEach((element: HeaderResponseElementInterface) => {
			const containerEl = this.createContainerEl(element.type, element.title);

			switch (element.type){
				case HeaderResponseType.SessionSelection:
					this.addElement(containerEl, element, this.addSessionSelector(containerEl.children[1] as HTMLDivElement, element));
					break;
				case HeaderResponseType.SceneTypeSelector:
					this.addElement(containerEl, element, this.addSceneTypeSelector(containerEl.children[1] as HTMLDivElement, element));
					break;
				case HeaderResponseType.SceneExcitment:
					this.addElement(containerEl, element, this.addSceneExcitmentSelector(containerEl.children[1] as HTMLDivElement, element));
					break;
				default:
					element.value.fillContent(containerEl, this.sourcePath);
					break;
			}
		});
	}

	protected addSceneExcitmentSelector(
		contentEl: HTMLDivElement,
		data: HeaderResponseElementInterface,
	): void {
		if (data.additionalInformation?.sceneId !== undefined) {

			const sceneExcitementSelectorEl = contentEl.createEl('input');
			sceneExcitementSelectorEl.type = 'checkbox';

			if (data.value.content === true) sceneExcitementSelectorEl.checked = true;

			sceneExcitementSelectorEl.addEventListener("change", (e) => {
				const file: TFile|undefined = data.additionalInformation.file;

				if (file !== undefined){
					const map: Map<string,any> = new Map<string, any>();
					map.set('isExciting', sceneExcitementSelectorEl.checked);
					this.factories.frontmatter.update(file, map);
				}
			});
		}
	}

	private addSceneTypeSelector(
		contentEl: HTMLDivElement,
		data: HeaderResponseElementInterface,
	): void {
		if (data.additionalInformation?.sceneId !== undefined) {

			const sceneTypeSelectorEl = contentEl.createEl("select");
			sceneTypeSelectorEl.createEl("option", {
				text: "",
				value: ""
			}).selected = true;

			Object.keys(SceneType).filter((v) => isNaN(Number(v))).forEach((type, index) => {
				const sceneTypeOptionEl = sceneTypeSelectorEl.createEl("option", {
					text: type,
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
	}



	private addSessionSelector(
		contentEl: HTMLDivElement,
		data: HeaderResponseElementInterface,
	): void {
		const sceneId:IdInterface|undefined = data.additionalInformation?.sceneId;

		if (sceneId !== undefined) {
			const sessions: Array<SessionInterface> = this.database.read<SessionInterface>((session: SessionInterface) => session.id.type === ComponentType.Session && session.id.campaignId === sceneId.campaignId)
				.sort(this.factories.sorter.create<SessionInterface>([
					new SorterComparisonElement((session: SessionInterface) => session.sessionId, SorterType.Descending)
				]));

			sessions.forEach((session: SessionInterface) => {
				if (data.value.content.toString() === session.sessionId.toString()) {
					const sessionLinkEl = contentEl.createEl('span');
					MarkdownRenderer.renderMarkdown(
						session.link,
						sessionLinkEl,
						'',
						null as unknown as Component,
					);
				}
			});

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
