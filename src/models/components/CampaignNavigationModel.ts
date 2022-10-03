import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {AbstractModel} from "../../abstracts/AbstractModel";
import {CampaignHeaderSubModel} from "../subModels/headers/CampaignHeaderSubModel";
import {ComponentType} from "../../enums/ComponentType";
import {SorterComparisonElement} from "../../database/SorterComparisonElement";
import {SorterType} from "../../enums/SorterType";
import {CampaignInterface} from "../../database/components/interfaces/CampaignInterface";
import {ComponentInterface} from "../../database/interfaces/ComponentInterface";
import {AdventureInterface} from "../../database/components/interfaces/AdventureInterface";
import {ActInterface} from "../../database/components/interfaces/ActInterface";
import {SessionInterface} from "../../database/components/interfaces/SessionInterface";

export class CampaignNavigationModel extends AbstractModel {
	protected currentElement: CampaignInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		this.sourceMeta.adventures = this.database.readList<AdventureInterface>(ComponentType.Adventure, this.currentElement.id)
			.sort(this.factories.sorter.create<ComponentInterface>([
				new SorterComparisonElement((component: ComponentInterface) => component.file.stat.mtime, SorterType.Descending),
			]));
		this.sourceMeta.acts = this.database.readList<ActInterface>(ComponentType.Act, this.currentElement.id)
			.sort(this.factories.sorter.create<ComponentInterface>([
				new SorterComparisonElement((component: ComponentInterface) => component.file.stat.mtime, SorterType.Descending),
			]));
		this.sourceMeta.sessions = this.database.readList<SessionInterface>(ComponentType.Session, this.currentElement.id)
			.sort(this.factories.sorter.create<ComponentInterface>([
				new SorterComparisonElement((component: ComponentInterface) => component.file.stat.mtime, SorterType.Descending),
			]));

		await this.response.addSubModel(CampaignHeaderSubModel, this.currentElement, this.currentElement, undefined, this.sourceMeta);

		return this.response;
	}
}
