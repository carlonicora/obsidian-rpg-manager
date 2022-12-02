import {AbstractElement} from "../../../../managers/viewsManager/abstracts/AbstractElement";
import {ElementDataInterface} from "../../../../managers/viewsManager/interfaces/ElementDataInterface";
import {SceneInterface} from "../../interfaces/SceneInterface";
import {setIcon} from "obsidian";
import {ComponentType} from "../../../../core/enums/ComponentType";
import i18next from "i18next";
import {LinkSuggesterService} from "../../../../services/linkSuggesterService/LinkSuggesterService";

export class FeedbackElement extends AbstractElement {
	private _data: ElementDataInterface;
	private _scene: SceneInterface;

	private _titleEl: HTMLElement;
	private _feedbackContainerEl: HTMLDivElement;
	private _feedbackEl: HTMLDivElement;
	private _feedbackNotesEl: HTMLTextAreaElement;

	render(
		data: ElementDataInterface,
		containerEl: HTMLElement
	) {
		this._data = data;

		this._scene = data.model as SceneInterface;
		this._titleEl = containerEl.createEl('h3');
		this._feedbackContainerEl = containerEl.createDiv({cls: 'rpgm-scene-feedback'});
		this._feedbackContainerEl.style.display = 'none';

		this._addTitle();
		this._addFeedback()

	}

	private async _save(
	): Promise<void> {

	}

	private _addTitle(
	): void {
		const arrowEl: HTMLSpanElement = this._titleEl.createSpan();
		arrowEl.style.marginRight = '10px';
		setIcon(arrowEl, 'openClose');

		const arrowIconEl: HTMLElement = arrowEl.children[0] as HTMLElement;

		// arrowIconEl.style.transform = 'rotate(90deg)';

		this._titleEl.createSpan({text: this._data.title});

		this._titleEl.addEventListener('click', () => {
			if (this._feedbackContainerEl.style.display === 'none'){
				this._feedbackContainerEl.style.display = '';
				arrowIconEl.style.transform = 'rotate(90deg)';
			} else {
				this._feedbackContainerEl.style.display = 'none';
				arrowIconEl.style.transform = 'rotate(0deg)';
			}
		});
	}

	private _addFeedback(
	): void {
		this._addFeedbackNotes();
		this._addFeedbackAsPlotted();
		this._addFeedbackQuality();
		this._addFeedbackRose();
	}

	private _addFeedbackNotes(
	): void {
		const feedbackNotesEl: HTMLDivElement = this._feedbackContainerEl.createDiv({cls: 'rpg-manager-scene-feedback'});

		feedbackNotesEl.createEl('h4', {text: i18next.t('note', {count: 2}) ?? ''});
		this._feedbackNotesEl = feedbackNotesEl.createEl('textarea');

		if (this._scene.feedback?.notes !== undefined)
			this._feedbackNotesEl.textContent = this._scene.feedback.notes;

		this.api.service(LinkSuggesterService).createHandler(this._feedbackNotesEl, this._scene, ComponentType.Scene);
	}

	private _addFeedbackAsPlotted(
	): void {
		const feedbackAsPlottedEl: HTMLDivElement = this._feedbackContainerEl.createDiv({cls: 'rpg-manager-scene-feedback'});
		feedbackAsPlottedEl.createEl('h4', {text: 'Did the scene go as plotted?'});

	}

	private _addFeedbackQuality(
	): void {
		const feedbackQualityEl: HTMLDivElement = this._feedbackContainerEl.createDiv({cls: 'rpg-manager-scene-feedback'});
		feedbackQualityEl.createEl('h4', {text: 'How did the scene go?'});


	}

	private _addFeedbackRose(
	): void {
		const feedbackRoseEl: HTMLDivElement = this._feedbackContainerEl.createDiv({cls: 'rpg-manager-scene-feedback'});
		feedbackRoseEl.createEl('h4', {text: 'Which player characters deserve a rose?'});


	}
}
