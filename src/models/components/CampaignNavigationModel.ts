import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {AbstractModel} from "../../abstracts/AbstractModel";
import {CampaignInterface} from "../../interfaces/components/CampaignInterface";
import {CampaignHeaderSubModel} from "../subModels/headers/CampaignHeaderSubModel";
import {AdventureInterface} from "../../interfaces/components/AdventureInterface";
import {ComponentType} from "../../enums/ComponentType";
import {ActInterface} from "../../interfaces/components/ActInterface";
import {SessionInterface} from "../../interfaces/components/SessionInterface";
import {ComponentInterface} from "../../interfaces/database/ComponentInterface";
import {SorterComparisonElement} from "../../database/SorterComparisonElement";
import {SorterType} from "../../enums/SorterType";

export class CampaignNavigationModel extends AbstractModel {
	protected currentElement: CampaignInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		this.sourceMeta.adventures = this.database.readList<AdventureInterface>(ComponentType.Adventure, this.currentElement.id)
			.sort(this.factories.sorter.create<ComponentInterface>([
				new SorterComparisonElement((data: ComponentInterface) => data.file.stat.mtime, SorterType.Descending),
			]));
		this.sourceMeta.acts = this.database.readList<ActInterface>(ComponentType.Act, this.currentElement.id)
			.sort(this.factories.sorter.create<ComponentInterface>([
				new SorterComparisonElement((data: ComponentInterface) => data.file.stat.mtime, SorterType.Descending),
			]));
		this.sourceMeta.sessions = this.database.readList<SessionInterface>(ComponentType.Session, this.currentElement.id)
			.sort(this.factories.sorter.create<ComponentInterface>([
				new SorterComparisonElement((data: ComponentInterface) => data.file.stat.mtime, SorterType.Descending),
			]));

		await this.response.addSubModel(CampaignHeaderSubModel, this.currentElement, this.currentElement, undefined, this.sourceMeta);

		return this.response;
	}
}
