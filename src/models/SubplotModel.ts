import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {HeaderComponent} from "../components/HeaderComponent";
import {RecordType} from "../enums/RecordType";
import {SubplotInterface} from "../interfaces/data/SubplotInterface";
import {AbtPlotComponent} from "../components/AbtPlotComponent";
import {RelationshipType} from "../enums/RelationshipType";

export class SubplotModel extends AbstractModel {
	protected currentElement: SubplotInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addElement(this.factories.breadcrumb.create(this.currentElement));

		await this.response.addComponent(HeaderComponent, this.currentElement, this.currentElement);

		if (this.sourceMeta?.abt != null){
			await this.response.addComponent(
				AbtPlotComponent,
				this.currentElement,
				this.currentElement,
				undefined,
				this.sourceMeta.abt,
			);
		}

		await this.addRelationships(RecordType.Event);
		await this.addRelationships(RecordType.Clue);
		await this.addRelationships(RecordType.Faction, RelationshipType.Direct|RelationshipType.DirectInFrontmatter);
		await this.addRelationships(RecordType.NonPlayerCharacter, RelationshipType.Direct|RelationshipType.DirectInFrontmatter);

		return this.response;
	}
}
