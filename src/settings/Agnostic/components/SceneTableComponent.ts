import {AbstractComponent} from "../../../abstracts/AbstractComponent";
import {ResponseElementInterface} from "../../../interfaces/response/ResponseElementInterface";
import {ResponseTable} from "../../../data/responses/ResponseTable";
import {ContentFactory} from "../../../factories/ContentFactory";
import {ContentType} from "../../../enums/ContentType";
import {RpgDataInterface} from "../../../interfaces/data/RpgDataInterface";
import {SceneInterface} from "../../../interfaces/data/SceneInterface";

export class SceneTableComponent extends AbstractComponent {
	generateData(
		data: RpgDataInterface[],
		title: string | null,
	): ResponseElementInterface | null {
		if (data.length === 0){
			return null;
		}

		const response = new ResponseTable(this.app);

		response.addTitle(title ? title : 'Scenes');

		response.addHeaders([
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('#', ContentType.String, true),
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('Scene', ContentType.String),
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('Synopsis', ContentType.String),
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('Start', ContentType.String),
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('End', ContentType.String),
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('Duration', ContentType.String),
		]);
		data.forEach((scene: SceneInterface) => {
			response.addContent([
				this.app.plugins.getPlugin('rpg-manager').factories.contents.create(scene.completed ? scene.sceneId.toString() : '**' + scene.sceneId + '**', ContentType.Markdown, true),
				this.app.plugins.getPlugin('rpg-manager').factories.contents.create(scene.link, ContentType.Link),
				this.app.plugins.getPlugin('rpg-manager').factories.contents.create(scene.synopsis, ContentType.Markdown),
				this.app.plugins.getPlugin('rpg-manager').factories.contents.create(this.app.plugins.getPlugin('rpg-manager').functions.formatTime(scene.startTime), ContentType.String, true),
				this.app.plugins.getPlugin('rpg-manager').factories.contents.create(this.app.plugins.getPlugin('rpg-manager').functions.formatTime(scene.endTime), ContentType.String, true),
				this.app.plugins.getPlugin('rpg-manager').factories.contents.create(scene.duration, ContentType.String, true),
			])
		});
		return response;
	}
}
