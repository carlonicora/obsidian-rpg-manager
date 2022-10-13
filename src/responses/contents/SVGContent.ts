import {AbstractContent} from "../abstracts/AbstractContent";
import {setIcon} from "obsidian";
import {StoryCircleStage} from "../../plots/enums/StoryCircleStage";

export class SVGContent extends AbstractContent {
	public content: string;

	public fillContent(
		container: HTMLElement|undefined,
		sourcePath: string,
	): void {
		if (container === undefined) return;

		if (this.content != null){
			if (this.additionalInfo.storyCircleStage !== undefined) {
				const storyCircleStage: StoryCircleStage = this.additionalInfo.storyCircleStage;

				const svgContainer = container.createEl('div')
				setIcon(svgContainer, this.content);
				svgContainer.style.transform = 'rotate(' + (+storyCircleStage * 45).toString() + 'deg)';
			}
		} else {
			container.textContent = '';
		}
	}
}
