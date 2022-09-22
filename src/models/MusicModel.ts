import {AbstractModel} from "../abstracts/AbstractModel";
import {MusicInterface} from "../interfaces/data/MusicInterface";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {RecordType} from "../enums/RecordType";
import {HeaderComponent} from "../components/HeaderComponent";
import {MusicTableComponent} from "../components/MusicTableComponent";
import {SceneTableComponent} from "../components/SceneTableComponent";
import {RelationshipType} from "../enums/RelationshipType";

export class MusicModel extends AbstractModel {
	protected currentElement: MusicInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addElement(this.factories.breadcrumb.create(this.currentElement));

		await this.response.addComponent(HeaderComponent,this.currentElement);

		await this.response.addComponent(
			MusicTableComponent,
			this.currentElement.getRelationships(RecordType.Music, RelationshipType.DirectInFrontmatter),
		);

		await this.response.addComponent(
			SceneTableComponent,
			this.currentElement.getRelationships(RecordType.Scene, RelationshipType.ReverseInFrontmatter),
		);

		return this.response;
	}
}
