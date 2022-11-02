import {AbstractEditorModal} from "../abstracts/AbstractEditorModal";
import {Component, MarkdownRenderer} from "obsidian";
import {EditableContentType} from "../enums/EditableContentType";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {ModelInterface} from "../../../managers/modelsManager/interfaces/ModelInterface";
import {LinkSuggesterService} from "../../linkSuggesterService/LinkSuggesterService";
import {ContentEditorServiceInterface} from "../interfaces/ContentEditorServiceInterface";

export class StoryCircleContentEditorModal extends AbstractEditorModal {
	constructor(
		api: RpgManagerApiInterface,
		contentEditor: ContentEditorServiceInterface,
		component: ModelInterface,
		editableContentType: EditableContentType,
		editableField: string,
		private _relatedAbtValue: string,
	) {
		super(api, contentEditor, component, editableContentType, editableField, true);

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
		this.rpgmContainerEl.createDiv({cls: 'rpg-manager-content-editor-plot-container'});

		if (this._relatedAbtValue !== '') {
			this.contentEditorContainerEl.addClass('clearfix');

			const alternativeTextContainerEl: HTMLDivElement = this.contentEditorContainerEl.createDiv({cls: 'rpg-manager-content-editor-abt-relative'});
			alternativeTextContainerEl.createEl('h3', {text: 'Relative ABT Plot'});
			const alternativeTextEl: HTMLDivElement = alternativeTextContainerEl.createDiv();
			MarkdownRenderer.renderMarkdown(
				this._relatedAbtValue,
				alternativeTextEl,
				'',
				null as unknown as Component,
			);

			const editorContainerEl = this.contentEditorContainerEl.createDiv({cls: 'rpg-manager-content-editor-storycircle-container'});
			this.addElements(editorContainerEl);
		} else {
			this.addElements(this.contentEditorContainerEl);
		}

		this.autocompletionHelper = this.api.service(LinkSuggesterService).createHandler(this.contentEditorEl, this.component);
	}
}
