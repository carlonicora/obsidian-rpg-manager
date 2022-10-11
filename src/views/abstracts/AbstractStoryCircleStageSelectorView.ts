import {AbstractHeaderView} from "./AbstractHeaderView";
import {HeaderResponseElementInterface} from "../../responses/interfaces/HeaderResponseElementInterface";
import {IdInterface} from "../../id/interfaces/IdInterface";
import {StoryCircleStage} from "../../plots/enums/StoryCircleStage";
import {TFile} from "obsidian";

export abstract class AbstractStoryCircleStageSelectorView extends AbstractHeaderView {
	protected addStoryCircleStageSelector(
		contentEl: HTMLDivElement,
		data: HeaderResponseElementInterface,
	): void {
		const sceneId:IdInterface|undefined = data.additionalInformation?.sceneId;

		if (sceneId !== undefined) {
			const storyCircleSelectorEl = contentEl.createEl("select");
			storyCircleSelectorEl.createEl("option", {
				text: "",
				value: ""
			}).selected = true;

			Object.keys(StoryCircleStage).filter((v) => isNaN(Number(v))).forEach((type, index) => {
				const storyCircleOptionEl = storyCircleSelectorEl.createEl("option", {
					text: type,
					value: type,
				});

				if (data.value.content === StoryCircleStage[type as keyof typeof StoryCircleStage]) storyCircleOptionEl.selected = true;
			});

			storyCircleSelectorEl.addEventListener("change", (e) => {
				const file: TFile|undefined = data.additionalInformation.file;

				if (file !== undefined) {
					this.manipulators.codeblock.update(
						'data.storyCircleStage',
						storyCircleSelectorEl.value.toLowerCase(),
					);
				}
			});
		}
	}
}
