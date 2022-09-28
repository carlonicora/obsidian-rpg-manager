import {AbstractSubModelView} from "../../abstracts/AbstractSubModelView";
import {HeaderResponseInterface} from "../../interfaces/response/subModels/HeaderResponseInterface";
import {HeaderResponseElementInterface} from "../../interfaces/response/subModels/HeaderResponseElementInterface";
import {HeaderResponseType} from "../../enums/HeaderResponseType";
import {SessionInterface} from "../../interfaces/components/SessionInterface";
import {ComponentType} from "../../enums/ComponentType";
import {IdInterface} from "../../interfaces/components/IdInterface";
import {Component, MarkdownRenderer, TFile} from "obsidian";
import {SceneSelectionModal} from "../../modals/SceneSelectionModal";
import {SorterComparisonElement} from "../../database/SorterComparisonElement";
import {StoryCircleStage} from "../../enums/StoryCircleStage";
import {ViewType} from "../../enums/ViewType";
import {FrontmatterElementSelectionModal} from "../../modals/FrontmatterElementSelectionModal";
import {EditorSelector} from "../../helpers/EditorSelector";
import {SorterType} from "../../enums/SorterType";
import {AbtStage} from "../../enums/AbtStage";
import {SceneType} from "../../enums/SceneType";
import {SceneAnalyser, ThresholdResult} from "../../helpers/SceneAnalyser";
import {ActInterface} from "../../interfaces/components/ActInterface";

export class HeaderView extends AbstractSubModelView {
	private sessionSelectorEl: HTMLSelectElement;
	private storyCircleSelectorEl: HTMLSelectElement;
	private abtSelectorEl: HTMLSelectElement;
	private sceneTypeSelectorEl: HTMLSelectElement;

	private crsContainer: HTMLDivElement;

	render(
		container: HTMLElement,
		data: HeaderResponseInterface,
	): void {
		const crs = container.createDiv({cls: 'rpgm-header-info'});
		const adderEl = crs.createDiv({cls: 'adder'});
		const crsTitle = crs.createDiv({cls: 'title'});

		data.link.fillContent(crsTitle, this.sourcePath);


		const relationshipsAdderEl = adderEl.createEl('span', {text: '+ add relationship'});
		relationshipsAdderEl.addEventListener("click", () => {
			new FrontmatterElementSelectionModal(this.app, data.currentElement).open();
		});
		const c = adderEl.createEl('span', {text: 'edit'});

		c.addEventListener("click",() => {
			EditorSelector.select(this.app, data.currentElement);
		});

		if (data.type === ComponentType.Campaign) {
			crsTitle.createEl('a', {cls: 'subtitle', text: 'View Campaign Timeline', href: '#'})
				.addEventListener("click", () => {
					this.factories.views.showObsidianView(ViewType.Timeline, [data.metadata.campaignId]);
				});
		}

		this.crsContainer = crs.createDiv({cls: 'container'});

		const crsInfo = this.crsContainer.createDiv({cls: 'info'});
		const crsImage = this.crsContainer.createDiv({cls: 'image'});
		if (data.imgSrc == null) {
			crsImage.addClass('invisible');
			crsInfo.addClass('info-large');
		}

		let analyser: SceneAnalyser|undefined = undefined;
		let abtStage: AbtStage|undefined = undefined;

		data.elements.forEach((element: HeaderResponseElementInterface) => {
			let prefix = 'short';
			let crsContainer: HTMLElement;

			if (element.type === HeaderResponseType.Long) {
				prefix = 'long';
				crsContainer = crsInfo;
			} else {
				crsContainer = crsInfo.createDiv({cls: 'short'});
			}

			crsContainer.createDiv({cls: prefix+ 'Title', text: element.title});
			const contentEl = crsContainer.createDiv({cls: prefix+ 'Text'});

			switch (element.type){
				case HeaderResponseType.ScenesSelection:
					this.addScenesSelection(contentEl, element);
					break;
				case HeaderResponseType.SessionSelection:
					this.addSessionSelector(contentEl, element);
					break;
				case HeaderResponseType.StoryCircleSelector:
					this.addStoryCircleStageSelector(contentEl, element);
					break;
				case HeaderResponseType.AbtSelector:
					this.addAbtStageSelector(contentEl, element);
					abtStage = (<ActInterface|SessionInterface>element.currentElement).abtStage;
					if (abtStage !== undefined) {
						analyser = new SceneAnalyser(
							this.app,
							abtStage,
							element.currentElement.id
						);
					}
					break;
				case HeaderResponseType.SceneTypeSelector:
					this.addSceneTypeSelector(contentEl, element);
					break;
				case HeaderResponseType.SceneExcitment:
					this.addSceneExcitmentSelector(contentEl, element);
					break;
				default:
					element.value.fillContent(contentEl, this.sourcePath);
					break;
			}

			if (element.type !== HeaderResponseType.Long){
				crsContainer.createDiv({cls: 'reset'});
			}
		});


		if (data.imgSrc != null) {
			const image = new Image(data.imgWidth, data.imgHeight);
			image.src = data.imgSrc;
			image.style.objectFit = 'cover';

			if (image.src.startsWith('http')) {
				const crsImageLink = crsImage.createEl('a', {href: image.src});
				crsImageLink.append(image);
			} else {
				crsImage.append(image);
			}

		}

		this.crsContainer.createDiv({cls: 'reset'});

		if (analyser !== undefined){
			this.addActBalance(analyser);
		}
	}

	//@TODO Move the calculation of the act or session balance outside the View and into the Model
	private addActBalance(
		analyser: SceneAnalyser,
	): void {
		const analyserEl: HTMLDivElement = this.crsContainer.createDiv({cls: 'analyser'});
		const analyserTextEl  = analyserEl.createSpan();

		if (analyser.excitementLevel === ThresholdResult.Correct && analyser.activityLevel === ThresholdResult.Correct){
			analyserTextEl.textContent = 'The' + ComponentType[analyser.parentType] + ' is balanced!';
		} else {
			let text = 'The' + ComponentType[analyser.parentType] + ' is not balanced!\n';

			switch (analyser.activityLevel) {
				case ThresholdResult.Correct:
					text += 'The amount of active scenes is balanced\n';
					break;
				case ThresholdResult.Higher:
					text += 'There are maybe a bit too many active scenes (_' + analyser.activeScenePercentage + '% of the scenes are active, while you should have around ' + analyser.targetActiveScenePercentage + '%_)\n';
					break;
				case ThresholdResult.CriticallyLow:
					text += '**You don\'t have enough active scenes** (_only ' + analyser.activeScenePercentage + '% of the scenes are active, while you should have around ' + analyser.targetActiveScenePercentage + '%_)\n';
					break;
				case ThresholdResult.Lower:
					text += 'There are maybe not enough active scenes (_' + analyser.activeScenePercentage + '% of the scenes are active, while you should have around ' + analyser.targetActiveScenePercentage + '%_)\n';
					break;
			}

			switch (analyser.excitementLevel) {
				case ThresholdResult.Correct:
					text += 'The number of exciting scenes is balanced\n';
					break;
				case ThresholdResult.Higher:
					text += 'There are maybe a bit too many exciting scenes (_' + analyser.excitingScenePercentage + '% of the scenes are active, while you should have around ' + analyser.targetExcitingScenePercentage + '%_)\n';
					break;
				case ThresholdResult.CriticallyLow:
					text += '**You don\'t have enough exciting scenes** (_only ' + analyser.excitingScenePercentage + '% of the scenes are active, while you should have around ' + analyser.targetExcitingScenePercentage + '%_)\n';
					break;
				case ThresholdResult.Lower:
					text += 'There are maybe not enough exciting scenes (_' + analyser.excitingScenePercentage + '% of the scenes are active, while you should have around ' + analyser.targetExcitingScenePercentage + '%_)\n';
					break;
			}

			MarkdownRenderer.renderMarkdown(
				text,
				analyserTextEl,
				this.sourcePath,
				null as unknown as Component,
			);
		}
	}

	private addSceneExcitmentSelector(
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

	private addStoryCircleStageSelector(
		contentEl: HTMLDivElement,
		data: HeaderResponseElementInterface,
	): void {
		const sceneId:IdInterface|undefined = data.additionalInformation?.sceneId;

		if (sceneId !== undefined) {

			this.storyCircleSelectorEl = contentEl.createEl("select");
			this.storyCircleSelectorEl.createEl("option", {
				text: "",
				value: ""
			}).selected = true;

			Object.keys(StoryCircleStage).filter((v) => isNaN(Number(v))).forEach((type, index) => {
				const storyCircleOptionEl = this.storyCircleSelectorEl.createEl("option", {
					text: type,
					value: type,
				});

				if (data.value.content.toString() === type) storyCircleOptionEl.selected = true;
			});

			this.storyCircleSelectorEl.addEventListener("change", (e) => {
				const file: TFile|undefined = data.additionalInformation.file;

				if (file !== undefined){
					const map: Map<string,string> = new Map<string, string>();
					map.set('storycircle', this.storyCircleSelectorEl.value);
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

			this.sceneTypeSelectorEl = contentEl.createEl("select");
			this.sceneTypeSelectorEl.createEl("option", {
				text: "",
				value: ""
			}).selected = true;

			Object.keys(SceneType).filter((v) => isNaN(Number(v))).forEach((type, index) => {
				const sceneTypeOptionEl = this.sceneTypeSelectorEl.createEl("option", {
					text: type,
					value: type,
				});

				if (data.value.content.toString() === type) sceneTypeOptionEl.selected = true;
			});

			this.sceneTypeSelectorEl.addEventListener("change", (e) => {
				const file: TFile | undefined = data.additionalInformation.file;

				if (file !== undefined) {
					const map: Map<string, string> = new Map<string, string>();
					map.set('sceneType', this.sceneTypeSelectorEl.value);
					this.factories.frontmatter.update(file, map);
				}
			});
		}
	}

	private addAbtStageSelector(
		contentEl: HTMLDivElement,
		data: HeaderResponseElementInterface,
	): void {
		if (data.additionalInformation?.id !== undefined) {

			this.abtSelectorEl = contentEl.createEl("select");
			this.abtSelectorEl.createEl("option", {
				text: "",
				value: ""
			}).selected = true;

			Object.keys(AbtStage).filter((v) => isNaN(Number(v))).forEach((type, index) => {
				const abtOptionEl = this.abtSelectorEl.createEl("option", {
					text: type,
					value: type,
				});

				if (data.value.content.toString() === type) abtOptionEl.selected = true;
			});

			this.abtSelectorEl.addEventListener("change", (e) => {
				const file: TFile|undefined = data.additionalInformation.file;

				if (file !== undefined){
					const map: Map<string,string> = new Map<string, string>();
					map.set('abt', this.abtSelectorEl.value);
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

			this.sessionSelectorEl = contentEl.createEl("select");
			if (sessions.length > 1) {
				this.sessionSelectorEl.createEl("option", {
					text: "",
					value: ""
				}).selected = true;
			}
			sessions.forEach((session: SessionInterface) => {
				const sessionOptionEl = this.sessionSelectorEl.createEl("option", {
					text: session.name,
					value: session.sessionId.toString(),
				});

				if (data.value.content.toString() === session.sessionId.toString()) sessionOptionEl.selected = true;
			});

			this.sessionSelectorEl.addEventListener("change", (e) => {
				this.selectSession(data);
			});
		}
	}

	private addScenesSelection(
		contentEl: HTMLDivElement,
		data: HeaderResponseElementInterface,
	): void {
		const sceneSelectionButtonEl = contentEl.createEl('button', {text: 'Select session scenes'});
		sceneSelectionButtonEl.addEventListener("click", () => {
			new SceneSelectionModal(this.app, data.additionalInformation.session).open();
		});
	}

	private async selectSession(
		data: HeaderResponseElementInterface,
	): Promise<void> {
		const file: TFile|undefined = data.additionalInformation.file;

		if (file !== undefined){
			const map: Map<string,string> = new Map<string, string>();
			map.set('session', this.sessionSelectorEl.value);
			this.factories.frontmatter.update(file, map);
		}
	}
}
