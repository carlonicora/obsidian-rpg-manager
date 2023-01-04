import {AbstractStaticView} from "../../../managers/staticViewsManager/abstracts/AbstractStaticView";
import {SceneInterface} from "../../../components/scene/interfaces/SceneInterface";
import i18next from "i18next";
import {LinkSuggesterService} from "../../linkSuggesterService/LinkSuggesterService";
import {ComponentType} from "../../../core/enums/ComponentType";
import {CodeblockService} from "../../codeblockService/CodeblockService";
import {setIcon} from "obsidian";
import {CharacterInterface} from "../../../components/character/interfaces/CharacterInterface";

export class SceneFeedbackView extends AbstractStaticView {
	protected viewType: string = "SceneFeedbackView";
	protected displayText = "Scene Feedback";
	public icon = 'd20';

	private _scene: SceneInterface;

	private _feedbackEl: HTMLDivElement;
	private _feedbackNotesEl: HTMLTextAreaElement;
	private _qualityEls: HTMLSpanElement[];

	onResize() {
		super.onResize();
		this.initialise([]);
		this.render();
	}

	initialise(
		params: any[],
	): void {
		if (params.length !== 0) {
			super.initialise([]);

			this._scene = params[0];
		}
	}

	public async render(
	): Promise<void> {
		if (this._scene === undefined)
			return;

		this.rpgmContentEl.removeClass('rpgm-view');
		this.rpgmContentEl.addClass('rpg-manager-feedback');
		this.rpgmContentEl.empty();
		this.rpgmContentEl.createEl("h2", {text: "Scene Feedback"});
		this.rpgmContentEl.createEl("h3", {text: this._scene.file.basename});

		this._addFeedbackNotes();
		this._addFeedbackAsPlotted();
		this._addFeedbackQuality();
		this._addFeedbackRose();

		return Promise.resolve(undefined);
	}

	private _addFeedbackNotes(
	): void {
		const feedbackNotesEl: HTMLDivElement = this.rpgmContentEl.createDiv({cls: 'rpg-manager-scene-feedback'});

		feedbackNotesEl.createEl('h4', {text: i18next.t('note', {count: 2}) ?? ''});
		this._feedbackNotesEl = feedbackNotesEl.createEl('textarea');

		if (this._scene.feedback?.notes !== undefined)
			this._feedbackNotesEl.textContent = this._scene.feedback.notes;

		this.api.service(LinkSuggesterService).createHandler(this._feedbackNotesEl, this._scene, ComponentType.Scene);

		feedbackNotesEl.createEl('button', {text: 'Save feedback'})
			.addEventListener('click', () => {
				this.api.service(CodeblockService).addOrUpdate('data.feedback.notes', this._feedbackNotesEl.value, this._scene.file);
			});
	}

	private _addFeedbackAsPlotted(
	): void {
		const feedbackAsPlottedEl: HTMLDivElement = this.rpgmContentEl.createDiv({cls: 'rpg-manager-scene-feedback'});
		feedbackAsPlottedEl.createEl('h4', {text: 'Did the scene go as plotted?'});

		const plottedYesEl: HTMLInputElement = feedbackAsPlottedEl.createEl("input", {type: "radio", value: "true", text: "Yes"});
		plottedYesEl.name = "asPlotted";
		feedbackAsPlottedEl.createSpan({text: "Yes"});
		const plottedNoEl: HTMLInputElement = feedbackAsPlottedEl.createEl("input", {type: "radio", value: "false", text: "No"});
		plottedNoEl.name = "asPlotted";
		feedbackAsPlottedEl.createSpan({text: "No"});

		if (this._scene.feedback?.asPlanned !== undefined){
			if (this._scene.feedback.asPlanned)
				plottedYesEl.checked = true;
			else
				plottedNoEl.checked = true;

		}

		plottedYesEl.addEventListener("change", () => {
			this.api.service(CodeblockService).addOrUpdate('data.feedback.asPlanned', true, this._scene.file);
		});

		plottedNoEl.addEventListener("change", () => {
			this.api.service(CodeblockService).addOrUpdate('data.feedback.asPlanned', false, this._scene.file);
		});
	}

	private _addFeedbackQuality(
	): void {
		const feedbackQualityEl: HTMLDivElement = this.rpgmContentEl.createDiv({cls: 'rpg-manager-scene-feedback'});
		feedbackQualityEl.createEl('h4', {text: 'How did the scene go?'});

		feedbackQualityEl.addEventListener("mouseout", () => {
			this._previewQualityFeedbackValue();
		});

		this._qualityEls = [];

		for (let index=0; index<5; index++){
			const star: HTMLSpanElement = feedbackQualityEl.createSpan();
			star.dataset.id = (index + 1).toString();

			['click','mouseover'].forEach( evt =>
			// ['click', 'mouseenter', "mousedown"].forEach( evt =>
				star.addEventListener(evt, this._analyseFeedbackChange.bind(this), false)
			);

			this._qualityEls.push(star);
		}

		this._previewQualityFeedbackValue();
	}

	private _analyseFeedbackChange(
		evt: MouseEvent
	){
		let target = evt.targetNode;

		if (target == undefined)
			return;

		while (target.nodeName !== "SPAN" && target.parentNode != undefined) {
			target = target.parentNode;
		}

		const value: number = +((<HTMLSpanElement>target).dataset.id ?? 0);

		this._setQualityFeedbackValue(value);
	}

	private async _previewQualityFeedbackValue(
		value?: number,
	): Promise<void>{
		if (value === undefined)
			value = this._scene.feedback?.quality ?? -1;

		for (let index=0; index<this._qualityEls.length; index++){
			this._qualityEls[index].empty();

			if (value > index)
				setIcon(this._qualityEls[index], "filled-star");
			else
				setIcon(this._qualityEls[index], "empty-star");

		}
	}

	private async _setQualityFeedbackValue(
		value: number,
	): Promise<void>{
		this._previewQualityFeedbackValue(value);
		this.api.service(CodeblockService).addOrUpdate('data.feedback.quality', value, this._scene.file);
	}

	private _addFeedbackRose(
	): void {
		const feedbackRoseEl: HTMLDivElement = this.rpgmContentEl.createDiv({cls: 'rpg-manager-scene-feedback'});
		feedbackRoseEl.createEl('h4', {text: 'Which player characters deserve a rose?'});

		const characters: CharacterInterface[] = this.api.database.readChildren<CharacterInterface>(ComponentType.Character, this._scene.campaign.index.id);

		const roseEl: HTMLSelectElement = feedbackRoseEl.createEl("select");
		roseEl.multiple = true;

		characters.forEach((character: CharacterInterface) => {
			const characterEl: HTMLOptionElement = roseEl.createEl("option", {text: character.file.basename, value: character.index.id});

			if (this._scene.feedback?.roses?.contains(character.index.id))
				characterEl.selected = true;

		});

		roseEl.addEventListener("change", () => {
			if (roseEl.selectedOptions.length > 0 ) {
				const roses: string[] = [];
				for (let index=0; index<roseEl.selectedOptions.length; index++){
					roses.push(roseEl.selectedOptions[index].value);
				}

				this.api.service(CodeblockService).addOrUpdate('data.feedback.roses', roses, this._scene.file);
			}
		});
	}
}
