import {AbstractElement} from "../abstracts/AbstractElement";
import {StoryCircleStageElementDataInterface} from "./interfaces/StoryCircleStageElementDataInterface";
import {PlotService} from "../../../services/plotsServices/PlotService";
import {CodeblockService} from "../../../services/codeblockService/CodeblockService";
import {StoryCircleStage} from "../../../services/plotsServices/enums/StoryCircleStage";

export class StoryCircleStageElement extends AbstractElement {
	render(
		data: StoryCircleStageElementDataInterface,
		containerEl: HTMLElement,
	) {
		const infoEl = containerEl.createDiv({cls: 'rpg-manager-header-container-info-data-container rpg-manager-header-container-info-data-container-short clearfix'});
		this.createTitle(data.title, infoEl);

		const contentEl = infoEl.createDiv({cls: 'rpg-manager-header-container-info-data-container-content clearfix'});

		const storyCircleStageSelectorEl = contentEl.createEl("select");
		storyCircleStageSelectorEl.createEl("option", {
			text: "",
			value: ""
		}).selected = true;

		Object.keys(StoryCircleStage).filter((v) => isNaN(Number(v))).forEach((type, index) => {
			const storyCircleStageOptionEl = storyCircleStageSelectorEl.createEl("option", {
				text: type,
				value: type,
			});

			if (data.values !== undefined && data.values === this.api.service(PlotService).getStoryCircleStage(type))
				storyCircleStageOptionEl.selected = true;
		});

		storyCircleStageSelectorEl.addEventListener("change", (e) => {
			if (data.editableKey !== undefined)
				this.api.service(CodeblockService).addOrUpdate(
					data.editableKey,
					storyCircleStageSelectorEl.value.toLowerCase(),
				);

		});
	}
}
