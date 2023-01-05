import {AbstractRelationshipView} from "../../../managers/viewsManager/abstracts/AbstractRelationshipView";
import {RelationshipsViewInterface} from "../../../managers/viewsManager/interfaces/RelationshipsViewInterface";
import {TableField} from "../../../services/relationshipsService/enums/TableField";
import {SceneInterface} from "../interfaces/SceneInterface";
import {DateService} from "../../../services/dateService/DateService";
import {RelationshipInterface} from "../../../services/relationshipsService/interfaces/RelationshipInterface";
import {Component, MarkdownRenderer, setIcon} from "obsidian";
import {CharacterInterface} from "../../character/interfaces/CharacterInterface";
import {SceneFeedbackService} from "../../../services/sceneFeedbackService/SceneFeedbackService";

export class SceneRelationshipView extends AbstractRelationshipView implements RelationshipsViewInterface {
	protected canBeOrdered = true;

	render(
	): void {
		super.render();

		if (this.relationships.length > 0) {
			const feedbacksContainerEl: HTMLDivElement = this.relationshipElementsEl.createDiv({cls: "rpg-manager-feedbackview"});
			feedbacksContainerEl.createEl("h4", {cls: "rpg-manager-feedbackview-title", text: "Scene Notes"});

			this.relationships.forEach((relationship: RelationshipInterface) => {
				if (relationship.component !== undefined) {
					const scene: SceneInterface = relationship.component as SceneInterface;
					if (scene.feedback !== undefined) {
						this._addSceneFeedback(scene, feedbacksContainerEl);
					} else {
						this._addEmptyFeedback(scene, feedbacksContainerEl);
					}
				}
			});
		}
	}

	private _addEmptyFeedback(
		scene: SceneInterface,
		containerEl: HTMLDivElement,
	): void {
		const feedbackContainerEl: HTMLDivElement = containerEl.createDiv({cls: "rpg-manager-feedbackview-container"});

		const feedbackTitleEl: HTMLDivElement = feedbackContainerEl.createDiv({cls: "rpg-manager-feedbackview-container-title clearfix"});
		const feedbackTitleLinkEl: HTMLSpanElement = feedbackTitleEl.createSpan();
		MarkdownRenderer.renderMarkdown(
			scene.link,
			feedbackTitleLinkEl,
			this.sourcePath,
			null as unknown as Component,
		);

		feedbackTitleEl.createEl("span", {cls: "rpg-manager-feedbackview-container-title-actionable", text: "(add feedback)"}).addEventListener("click", () => {
			this.api.service(SceneFeedbackService).openFeedback(scene);
		});
	}

	private _addSceneFeedback(
		scene: SceneInterface,
		containerEl: HTMLDivElement,
	): void {
		const feedbackContainerEl: HTMLDivElement = containerEl.createDiv({cls: "rpg-manager-feedbackview-container"});
		const feedbackTitleEl: HTMLDivElement = feedbackContainerEl.createDiv({cls: "rpg-manager-feedbackview-container-title clearfix"});
		const feedbackTitleLinkEl: HTMLSpanElement = feedbackTitleEl.createSpan();
		MarkdownRenderer.renderMarkdown(
			scene.link,
			feedbackTitleLinkEl,
			this.sourcePath,
			null as unknown as Component,
		);

		feedbackTitleEl.createEl("span", {cls: "rpg-manager-feedbackview-container-title-actionable", text: "(edit feedback)"}).addEventListener("click", () => {
			this.api.service(SceneFeedbackService).openFeedback(scene);
		});

		const feedbackNotesEl: HTMLDivElement = feedbackContainerEl.createDiv({cls: "rpg-manager-feedbackview-container-note"});
		if (scene.feedback?.notes !== undefined){
			MarkdownRenderer.renderMarkdown(
				scene.feedback.notes,
				feedbackNotesEl,
				this.sourcePath,
				null as unknown as Component,
			);
		}

		const additionalFeedbackEl: HTMLDivElement = feedbackContainerEl.createDiv({cls: "rpg-manager-feedbackview-container-additional clearfix"});

		additionalFeedbackEl.createDiv({cls: "rpg-manager-feedbackview-container-additional-title", text: "As plotted?"});

		const asPlannedEl: HTMLSpanElement = additionalFeedbackEl.createDiv({cls: "rpg-manager-feedbackview-container-additional-value"});
		if (scene.feedback?.asPlanned !== undefined)
			setIcon(asPlannedEl, (scene.feedback.asPlanned ? "thumbs-up" : "thumbs-down"));

		additionalFeedbackEl.createDiv({cls: "rpg-manager-feedbackview-container-additional-title", text: "Quality?"});
		const qualityContainerEl: HTMLDivElement = additionalFeedbackEl.createDiv({cls: "rpg-manager-feedbackview-container-additional-value"});
		if (scene.feedback?.quality !== undefined){
			for(let index=1; index<=5; index++){
				const starEl: HTMLSpanElement = qualityContainerEl.createSpan();

				if (scene.feedback.quality >= index)
					setIcon(starEl, "filled-star");
				else
					setIcon(starEl, "empty-star");

			}
		} else {
			qualityContainerEl.textContent = 'n/a';
		}

		additionalFeedbackEl.createDiv({cls: "rpg-manager-feedbackview-container-additional-title", text: "Rose(s)"});
		const rosesEl: HTMLDivElement = additionalFeedbackEl.createDiv({cls: "rpg-manager-feedbackview-container-additional-value"});
		if (scene.feedback?.roses !== undefined && scene.feedback.roses.length > 0){
			scene.feedback.roses.forEach((id: string) => {
				try {
					const character = this.api.database.readById<CharacterInterface>(id);
					const roseEl: HTMLSpanElement = rosesEl.createSpan();
					MarkdownRenderer.renderMarkdown(
						character.link,
						roseEl,
						this.sourcePath,
						null as unknown as Component,
					);
				} catch (e) {
					//no need to do anything
				}
			});
		} else {
			rosesEl.textContent = "n/a";
		}
	}

	protected getFieldValue(
		field: TableField,
		model: SceneInterface,
	): string {
		switch (field){
			case TableField.Duration:
				return model.duration;
				break;
			case TableField.SceneType:
				if (!this.api.settings.useSceneAnalyser)
					return '';

				return model.sceneType?.toString() ?? '';
			case TableField.SceneExciting:
				if (!this.api.settings.useSceneAnalyser)
					return '';

				return String(model.isExciting);
			case TableField.StoryCircleIndicator:
				if (!this.api.settings.usePlotStructures)
					return '';

				return model.storyCircleStage?.toString() ?? '';
			case TableField.Date:
				return this.api.service(DateService).getReadableDate(model.date, model);
		}
		return '';
	}
}
