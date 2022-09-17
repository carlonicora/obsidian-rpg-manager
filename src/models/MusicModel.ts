import {AbstractModel} from "../abstracts/AbstractModel";
import {MusicInterface} from "../interfaces/data/MusicInterface";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {ResponseData} from "../data/responses/ResponseData";
import {DataType} from "../enums/DataType";
import {HeaderComponent} from "../components/HeaderComponent";
import {MusicTableComponent} from "../components/MusicTableComponent";
import {SceneTableComponent} from "../components/SceneTableComponent";
import {SessionTableComponent} from "../components/SessionTableComponent";

export class MusicModel extends AbstractModel {
	protected currentElement: MusicInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		this.response.addElement(this.generateBreadcrumb());

		await this.response.addComponent(HeaderComponent,this.currentElement);

		await this.response.addComponent(
			MusicTableComponent,
			this.currentElement.getRelationships(DataType.Music, false),
		);

		await this.response.addComponent(
			SceneTableComponent,
			this.currentElement.getRelationships(DataType.Scene, true),
		);

		await this.response.addComponent(
			SessionTableComponent,
			this.currentElement.getRelationships(DataType.Session, true),
		);

		return this.response;
	}
}
