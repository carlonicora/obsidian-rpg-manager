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

		const response = new ResponseTable();

		response.addTitle(title ? title : 'Scenes');

		response.addHeaders([
			ContentFactory.create('#', ContentType.String, true),
			ContentFactory.create('Scene', ContentType.String),
			ContentFactory.create('Synopsis', ContentType.String),
			ContentFactory.create('Start', ContentType.String),
			ContentFactory.create('End', ContentType.String),
			ContentFactory.create('Duration', ContentType.String),
		]);
		data.forEach((scene: SceneInterface) => {
			response.addContent([
				ContentFactory.create(scene.completed ? scene.sceneId.toString() : '**' + scene.sceneId + '**', ContentType.Markdown, true),
				ContentFactory.create(scene.link, ContentType.Link),
				ContentFactory.create(scene.synopsis, ContentType.Markdown),
				ContentFactory.create(this.app.plugins.getPlugin('rpg-manager').functions.formatTime(scene.startTime), ContentType.String, true),
				ContentFactory.create(this.app.plugins.getPlugin('rpg-manager').functions.formatTime(scene.endTime), ContentType.String, true),
				ContentFactory.create(scene.duration, ContentType.String, true),
			])
		});
		return response;
	}
}
