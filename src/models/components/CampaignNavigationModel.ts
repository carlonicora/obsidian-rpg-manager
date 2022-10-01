import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {AbstractModel} from "../../abstracts/AbstractModel";
import {CampaignHeaderSubModel} from "../subModels/headers/CampaignHeaderSubModel";
import {ComponentType} from "../../enums/ComponentType";
import {SorterComparisonElement} from "../../database/SorterComparisonElement";
import {SorterType} from "../../enums/SorterType";
import {CampaignV2Interface} from "../../_dbV2/components/interfaces/CampaignV2Interface";
import {ComponentV2Interface} from "../../_dbV2/interfaces/ComponentV2Interface";
import {AdventureV2Interface} from "../../_dbV2/components/interfaces/AdventureV2Interface";
import {ActV2Interface} from "../../_dbV2/components/interfaces/ActV2Interface";
import {SessionV2Interface} from "../../_dbV2/components/interfaces/SessionV2Interface";

export class CampaignNavigationModel extends AbstractModel {
	protected currentElement: CampaignV2Interface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		this.sourceMeta.adventures = this.database.readList<AdventureV2Interface>(ComponentType.Adventure, this.currentElement.id)
			.sort(this.factories.sorter.create<ComponentV2Interface>([
				new SorterComparisonElement((component: ComponentV2Interface) => component.file.stat.mtime, SorterType.Descending),
			]));
		this.sourceMeta.acts = this.database.readList<ActV2Interface>(ComponentType.Act, this.currentElement.id)
			.sort(this.factories.sorter.create<ComponentV2Interface>([
				new SorterComparisonElement((component: ComponentV2Interface) => component.file.stat.mtime, SorterType.Descending),
			]));
		this.sourceMeta.sessions = this.database.readList<SessionV2Interface>(ComponentType.Session, this.currentElement.id)
			.sort(this.factories.sorter.create<ComponentV2Interface>([
				new SorterComparisonElement((component: ComponentV2Interface) => component.file.stat.mtime, SorterType.Descending),
			]));

		await this.response.addSubModel(CampaignHeaderSubModel, this.currentElement, this.currentElement, undefined, this.sourceMeta);

		return this.response;
	}
}
