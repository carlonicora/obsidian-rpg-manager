import {AbstractModel} from "../abstracts/AbstractModel";
import {MusicInterface} from "../interfaces/data/MusicInterface";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {RecordType} from "../enums/RecordType";
import {HeaderComponent} from "../components/HeaderComponent";
import {RelationshipType} from "../enums/RelationshipType";

export class MusicModel extends AbstractModel {
	protected currentElement: MusicInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addElement(this.factories.breadcrumb.create(this.currentElement));

		await this.response.addComponent(HeaderComponent,this.currentElement);

		await this.addRelationships(RecordType.Music, RelationshipType.DirectInFrontmatter);
		await this.addRelationships(RecordType.Scene, RelationshipType.ReverseInFrontmatter);

		return this.response;
	}
}
