import {AbstractModel} from "../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {ComponentType} from "../../enums/ComponentType";
import {AbtPlotSubModel} from "../subModels/AbtPlotSubModel";
import {SubplotHeaderSubModel} from "../subModels/headers/SubplotHeaderSubModel";
import {SubplotV2Interface} from "../../_dbV2/components/interfaces/SubplotV2Interface";
import {RelationshipV2Type} from "../../_dbV2/relationships/enums/RelationshipV2Type";

export class SubplotModel extends AbstractModel {
	protected currentElement: SubplotV2Interface;

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
		await this.addRelationships(ComponentType.Faction, RelationshipV2Type.Univocal);
		await this.addRelationships(ComponentType.NonPlayerCharacter, RelationshipV2Type.Univocal);

		return this.response;
	}
}
