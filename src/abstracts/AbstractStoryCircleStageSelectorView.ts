import {AbstractHeaderView} from "./AbstractHeaderView";
import {HeaderResponseElementInterface} from "../interfaces/response/subModels/HeaderResponseElementInterface";
import {IdInterface} from "../interfaces/components/IdInterface";
import {StoryCircleStage} from "../enums/StoryCircleStage";
import {TFile} from "obsidian";

export abstract class AbstractStoryCircleStageSelectorView extends AbstractHeaderView {
	protected addStoryCircleStageSelector(
		contentEl: HTMLDivElement,
		data: HeaderResponseElementInterface,
	): void {
		console.log('HEY')
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

				if (data.value.content.toString() === type) storyCircleOptionEl.selected = true;
			});

			storyCircleSelectorEl.addEventListener("change", (e) => {
				const file: TFile|undefined = data.additionalInformation.file;

				if (file !== undefined){
					const map: Map<string,string> = new Map<string, string>();
					map.set('storycircle', storyCircleSelectorEl.value);
					this.factories.frontmatter.update(file, map);
				}
			});
		}
	}
}
