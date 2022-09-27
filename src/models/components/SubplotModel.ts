import {AbstractModel} from "../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {HeaderSubModel} from "../subModels/HeaderSubModel";
import {ComponentType} from "../../enums/ComponentType";
import {SubplotInterface} from "../../interfaces/components/SubplotInterface";
import {AbtPlotSubModel} from "../subModels/AbtPlotSubModel";
import {RelationshipType} from "../../enums/RelationshipType";

export class SubplotModel extends AbstractModel {
	protected currentElement: SubplotInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addElement(this.factories.breadcrumb.create(this.currentElement));

		await this.response.addSubModel(HeaderSubModel, this.currentElement, this.currentElement);

		if (this.sourceMeta?.abt != null){
			await this.response.addSubModel(
				AbtPlotSubModel,
				this.currentElement,
				this.currentElement,
				undefined,
				this.sourceMeta.abt,
			);
		}

		await this.addRelationships(ComponentType.Event);
		await this.addRelationships(ComponentType.Clue);
		await this.addRelationships(ComponentType.Faction, RelationshipType.Direct|RelationshipType.DirectInFrontmatter);
		await this.addRelationships(ComponentType.NonPlayerCharacter, RelationshipType.Direct|RelationshipType.DirectInFrontmatter);

		return this.response;
	}
}
