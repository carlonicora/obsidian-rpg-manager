import {AbstractModel} from "../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {ComponentType} from "../../enums/ComponentType";
import {RelationshipType} from "../../enums/RelationshipType";
import {MusicHeaderSubModel} from "../subModels/headers/MusicHeaderSubModel";
import {MusicV2Interface} from "../../_dbV2/components/interfaces/MusicV2Interface";

export class MusicModel extends AbstractModel {
	protected currentElement: MusicV2Interface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addElement(this.factories.breadcrumb.create(this.currentElement));

		await this.response.addSubModel(MusicHeaderSubModel,this.currentElement, this.currentElement);

		await this.addRelationships(ComponentType.Music, RelationshipType.DirectInFrontmatter);
		await this.addRelationships(ComponentType.Scene, RelationshipType.ReverseInFrontmatter);

		return this.response;
	}
}
