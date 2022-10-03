import {AbstractModel} from "../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {ComponentType} from "../../enums/ComponentType";
import {MusicHeaderSubModel} from "../subModels/headers/MusicHeaderSubModel";
import {MusicInterface} from "../../database/components/interfaces/MusicInterface";
import {RelationshipType} from "../../database/relationships/enums/RelationshipType";

export class MusicModel extends AbstractModel {
	protected currentElement: MusicInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addElement(this.factories.breadcrumb.create(this.currentElement));

		await this.response.addSubModel(MusicHeaderSubModel,this.currentElement, this.currentElement);

		await this.addRelationships(ComponentType.Music, RelationshipType.Reversed, 'Playlist');
		await this.addRelationships(ComponentType.Music, RelationshipType.Child, 'Songs');
		await this.addRelationships(ComponentType.Scene, RelationshipType.Reversed);

		return this.response;
	}
}
