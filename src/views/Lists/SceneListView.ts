import {AbstractListView} from "../../abstracts/AbstractListView";
import {SceneListInterface} from "../../data/SceneData";

export class SceneListView extends AbstractListView {
	async render(
		data: SceneListInterface
	): Promise<void>
	{
		this.dv.span("## Sessions");

		this.dv.table(["&#35;", "Scene", "Synopsis", "Start", "End", "Duration"],
			data.elements
				.map(scene => [
					scene.sceneId,
					scene.link,
					scene.synopsis,
					scene.startTime,
					scene.endTime,
					scene.duration,
				])
		);

		this.spacer();
	}
}
