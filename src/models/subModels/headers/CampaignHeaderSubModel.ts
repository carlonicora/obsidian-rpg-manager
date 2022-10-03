import {AbstractHeaderSubModel} from "../../../abstracts/AbstractHeaderSubModel";
import {ResponseDataElementInterface} from "../../../interfaces/response/ResponseDataElementInterface";
import {ResponseHeader} from "../../../responses/ResponseHeader";
import {HeaderResponseInterface} from "../../../interfaces/response/subModels/HeaderResponseInterface";
import {ComponentType} from "../../../enums/ComponentType";
import {ResponseType} from "../../../enums/ResponseType";
import {CampaignInterface} from "../../../database/components/interfaces/CampaignInterface";
import {RelationshipInterface} from "../../../database/relationships/interfaces/RelationshipInterface";
import {AdventureInterface} from "../../../database/components/interfaces/AdventureInterface";
import {ComponentInterface} from "../../../database/interfaces/ComponentInterface";
import {SorterComparisonElement} from "../../../database/SorterComparisonElement";
import {SorterType} from "../../../enums/SorterType";
import {ActInterface} from "../../../database/components/interfaces/ActInterface";
import {SessionInterface} from "../../../database/components/interfaces/SessionInterface";

export class CampaignHeaderSubModel extends AbstractHeaderSubModel {
	protected data: CampaignInterface;

	public async generateData(
		relationship: RelationshipInterface,
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseDataElementInterface|null> {
		if (!this.initialiseData(relationship)) return null;

		if (additionalInformation === undefined) additionalInformation = {};

		additionalInformation.adventures = this.database.readList<AdventureInterface>(ComponentType.Adventure, this.currentElement.id)
			.sort(this.factories.sorter.create<ComponentInterface>([
				new SorterComparisonElement((component: ComponentInterface) => component.file.stat.mtime, SorterType.Descending),
			]));

		additionalInformation.acts = this.database.readList<ActInterface>(ComponentType.Act, this.currentElement.id)
			.sort(this.factories.sorter.create<ComponentInterface>([
				new SorterComparisonElement((component: ComponentInterface) => component.file.stat.mtime, SorterType.Descending),
			]));

		additionalInformation.sessions = this.database.readList<SessionInterface>(ComponentType.Session, this.currentElement.id)
			.sort(this.factories.sorter.create<ComponentInterface>([
				new SorterComparisonElement((component: ComponentInterface) => component.file.stat.mtime, SorterType.Descending),
			]));

		let response = await super.generateData(relationship, title, additionalInformation) as HeaderResponseInterface;

		if (response === null) response = new ResponseHeader(this.app, this.currentElement);

		response.type = ComponentType.Campaign;
		response.responseType = ResponseType.CampaignHeader;

		response.metadata = {campaignId: this.data.id, sourceMeta: additionalInformation};

		return this.completeData(response);
	}
}
