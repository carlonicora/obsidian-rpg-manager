import {AbstractModel} from "../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {ComponentType} from "../../enums/ComponentType";
import {AbtPlotSubModel} from "../subModels/AbtPlotSubModel";
import {SubplotHeaderSubModel} from "../subModels/headers/SubplotHeaderSubModel";
import {SubplotInterface} from "../../database/components/interfaces/SubplotInterface";
import {RelationshipType} from "../../database/relationships/enums/RelationshipType";

export class SubplotModel extends AbstractModel {
	protected currentElement: SubplotInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addElement(this.factories.breadcrumb.create(this.currentElement));

		await this.response.addSubModel(SubplotHeaderSubModel, this.currentElement, this.currentElement);

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
		await this.addRelationships(ComponentType.Faction, RelationshipType.Univocal);
		await this.addRelationships(ComponentType.NonPlayerCharacter, RelationshipType.Univocal);

		return this.response;
	}
}
