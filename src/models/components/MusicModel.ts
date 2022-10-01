import {AbstractModel} from "../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {ComponentType} from "../../enums/ComponentType";
import {MusicHeaderSubModel} from "../subModels/headers/MusicHeaderSubModel";
import {MusicV2Interface} from "../../_dbV2/components/interfaces/MusicV2Interface";
import {RelationshipV2Type} from "../../_dbV2/relationships/enums/RelationshipV2Type";

export class MusicModel extends AbstractModel {
	protected currentElement: MusicV2Interface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addElement(this.factories.breadcrumb.create(this.currentElement));

		await this.response.addSubModel(MusicHeaderSubModel,this.currentElement, this.currentElement);

		await this.addRelationships(ComponentType.Music, RelationshipV2Type.Reversed, 'Playlist');
		await this.addRelationships(ComponentType.Music, RelationshipV2Type.Child, 'Songs');
		await this.addRelationships(ComponentType.Scene, RelationshipV2Type.Reversed);

		return this.response;
	}
}
