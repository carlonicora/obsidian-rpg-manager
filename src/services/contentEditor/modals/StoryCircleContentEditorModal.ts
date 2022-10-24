import {AbstractEditorModal} from "../abstracts/AbstractEditorModal";
import {App, Component, MarkdownRenderer} from "obsidian";
import {ComponentModelInterface} from "../../../api/componentManager/interfaces/ComponentModelInterface";
import {EditableContentType} from "../enums/EditableContentType";
import {LinkSuggesterHandler} from "../../linkSuggester/handlers/LinkSuggesterHandler";

export class StoryCircleContentEditorModal extends AbstractEditorModal {

	constructor(
		app: App,
		component: ComponentModelInterface,
		editableContentType: EditableContentType,
		editableField: string,
		private _relatedAbtValue: string,
	) {
		super(app, component, editableContentType, editableField, true);

		this.maxWidth = true;

		let title = '';
		switch (this.editableContentType){
			case EditableContentType.StoryCircleYou:
				title = 'You';
				break;
			case EditableContentType.StoryCircleNeed:
				title = 'Need';
				break;
			case EditableContentType.StoryCircleGo:
				title = 'Go';
				break;
			case EditableContentType.StoryCircleSearch:
				title = 'Search';
				break;
			case EditableContentType.StoryCircleFind:
				title = 'Find';
				break;
			case EditableContentType.StoryCircleTake:
				title = 'Take';
				break;
			case EditableContentType.StoryCircleReturn:
				title = 'Return';
				break;
			case EditableContentType.StoryCircleChange:
				title = 'Change';
				break;
		}

		this.title = 'Edit the "' + title + '" part of the Story Circle Plot for ' + this.component.file.basename;
	}

	onOpen() {
		super.onOpen();
		this.rpgmContainerEl.createDiv({cls: 'rpgm-content-editor-plot-container'});

		if (this._relatedAbtValue !== '') {
			this.contentEditorContainerEl.addClass('clearfix');

			const alternativeTextContainerEl: HTMLDivElement = this.contentEditorContainerEl.createDiv({cls: 'rpgm-content-editor-abt-relative'});
			alternativeTextContainerEl.createEl('h3', {text: 'Relative ABT Plot'});
			const alternativeTextEl: HTMLDivElement = alternativeTextContainerEl.createDiv();
			MarkdownRenderer.renderMarkdown(
				this._relatedAbtValue,
				alternativeTextEl,
				'',
				null as unknown as Component,
			);

			const editorContainerEl = this.contentEditorContainerEl.createDiv({cls: 'rpgm-content-editor-storycircle-container'});
			this.addElements(editorContainerEl)
		} else {
			this.addElements(this.contentEditorContainerEl);
		}

		this.autocompletionHelper = new LinkSuggesterHandler(this.app, this.contentEditorEl, this.component);
	}
}
