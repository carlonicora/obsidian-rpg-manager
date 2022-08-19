import {AbstractListView} from "../../abstracts/AbstractListView";
import {SceneListInterface} from "../../data/SceneData";
import {DataType} from "../../io/IoData";

export class SceneListView extends AbstractListView {
	async render(
		data: SceneListInterface
	): Promise<void>
	{
		this.dv.span("## Sessions");

		this.dv.table(["&#35;", "Scene", "Synopsis", "Start", "End", "Duration"],
			data.elements
				.map(scene => [
					scene.id,
					scene.link,
					scene.synopsis,
					scene.startTime,
					scene.endTime,
					scene.duration,
				])
		);

		this.dv.container.createEl('a', {cls: 'rpgm-button', text: 'Add new scene', href: '#'}).addEventListener('click', (e: Event) => {
			this.createNewScene();
		});


		this.spacer();
	}

	public async createNewScene(
	): Promise<void> {
		const current = this.dv.current();

		if (current != null) {
			let campaignId: number|null = null;
			let adventureId: number|null = null;
			let sessionId: number|null = null;

			current.tags.forEach((tag: string) => {
				if (tag.startsWith(this.api.settings.sessionTag)){
					const ids = tag.substring(this.api.settings.sessionTag.length + 1).split('/');
					campaignId = +ids[0];
					adventureId = +ids[1];
					sessionId = +ids[2];
				}
			});

			if (campaignId != null && adventureId != null && sessionId != null) {
				let sceneId = 1;

				this.dv.pages('#' + this.api.settings.sceneTag + '/' + campaignId + '/' + adventureId + '/' + sessionId)
					.forEach(page => {
						page.tags.forEach((tag: string) => {
							if (tag.startsWith(this.api.settings.sceneTag)){
								const currentScene = +tag.substring(tag.lastIndexOf('/') + 1);
								if (currentScene >= sceneId){
									sceneId = currentScene + 1;
								}
							}
						});
					})

				const sessionIdText = (sessionId < 10 ? '0' + sessionId : sessionId);
				const sceneIdText = (sceneId < 10 ? '0' + sceneId : sceneId);

				this.api.fileFactory.silentCreate(
					DataType.Scene,
					's' + sessionIdText + 'e' + sceneIdText,
					campaignId,
					adventureId,
					sessionId,
					sceneId
				);
			}
		}
	}
}
