import {AbstractModel} from "../abstracts/AbstractModel";
import {MusicInterface} from "../interfaces/data/MusicInterface";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {DataType} from "../enums/DataType";
import {HeaderComponent} from "../components/HeaderComponent";
import {MusicTableComponent} from "../components/MusicTableComponent";
import {SceneTableComponent} from "../components/SceneTableComponent";
import {RelationshipType} from "../enums/RelationshipType";

export class MusicModel extends AbstractModel {
	protected currentElement: MusicInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		this.response.addElement(this.generateBreadcrumb());

		await this.response.addComponent(HeaderComponent,this.currentElement);

		await this.response.addComponent(
			MusicTableComponent,
			this.currentElement.getRelationships(DataType.Music, RelationshipType.DirectInFrontmatter),
		);

		await this.response.addComponent(
			SceneTableComponent,
			this.currentElement.getRelationships(DataType.Scene, RelationshipType.ReverseInFrontmatter),
		);

		return this.response;
	}
}
