import {AbstractModel} from "../../abstracts/AbstractModel";
import {MusicInterface} from "../../interfaces/components/MusicInterface";
import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {ComponentType} from "../../enums/ComponentType";
import {HeaderSubModel} from "../subModels/HeaderSubModel";
import {RelationshipType} from "../../enums/RelationshipType";

export class MusicModel extends AbstractModel {
	protected currentElement: MusicInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addElement(this.factories.breadcrumb.create(this.currentElement));

		await this.response.addSubModel(HeaderSubModel,this.currentElement, this.currentElement);

		await this.addRelationships(ComponentType.Music, RelationshipType.DirectInFrontmatter);
		await this.addRelationships(ComponentType.Scene, RelationshipType.ReverseInFrontmatter);

		return this.response;
	}
}
