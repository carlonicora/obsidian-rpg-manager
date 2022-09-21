import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {NoteInterface} from "../interfaces/data/NoteInterface";
import {SceneInterface} from "../interfaces/data/SceneInterface";
import {DataType} from "../enums/DataType";
import {SceneTableComponent} from "../components/SceneTableComponent";

export class NoteModel extends AbstractModel {
	protected currentElement: NoteInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addElement(this.generateBreadcrumb());

		await this.response.addComponent(
			SceneTableComponent,
			this.database.readList<SceneInterface>(
				DataType.Scene,
				this.currentElement.id,
			).sort(function (leftData: SceneInterface, rightData: SceneInterface) {
				if (leftData.sceneId > rightData.sceneId) return +1;
				if (leftData.sceneId < rightData.sceneId) return -1;
				return 0;
			}),
		);

		return this.response;
	}
}
