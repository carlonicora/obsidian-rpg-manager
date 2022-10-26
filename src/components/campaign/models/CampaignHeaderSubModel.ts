import {AbstractHeaderSubModel} from "../../../../REFACTOR/models/abstracts/AbstractHeaderSubModel";
import {ComponentType} from "../../../core/enums/ComponentType";
import {CampaignInterface} from "../interfaces/CampaignInterface";
import {RelationshipInterface} from "../../../services/relationshipsService/interfaces/RelationshipInterface";
import {AdventureInterface} from "../../adventure/interfaces/AdventureInterface";
import {ModelInterface} from "../../../api/modelsManager/interfaces/ModelInterface";
import {SorterComparisonElement} from "../../../database/SorterComparisonElement";
import {SorterType} from "../../../database/enums/SorterType";
import {ActInterface} from "../../act/interfaces/ActInterface";
import {SessionInterface} from "../../session/interfaces/SessionInterface";
import {DateService} from "../../../../REFACTOR/services/dateService/DateService";

export class CampaignHeaderSubModel extends AbstractHeaderSubModel {
	protected data: CampaignInterface;

	public async generateData(
		relationship: RelationshipInterface,
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseDataElementInterface|null> {
		if (!this.initialiseData(relationship)) return null;

		if (additionalInformation === undefined) additionalInformation = {};

		additionalInformation.adventures = this.database.readList<AdventureInterface>(ComponentType.Adventure, this.currentComponent.id)
			.sort(this.factories.sorter.create<ModelInterface>([
				new SorterComparisonElement((component: ModelInterface) => component.file.stat.mtime, SorterType.Descending),
			]));

		additionalInformation.acts = this.database.readList<ActInterface>(ComponentType.Act, this.currentComponent.id);
		if (this.data.currentAdventureId != undefined && this.data.currentAdventureId !== '') {
			const currentAdventureId = +this.data.currentAdventureId.split('/')[2];
			additionalInformation.acts = additionalInformation.acts.filter((act: ActInterface) => act.id.adventureId === currentAdventureId);
		}

		additionalInformation.acts.sort(this.factories.sorter.create<ModelInterface>([
				new SorterComparisonElement((component: ModelInterface) => component.file.stat.mtime, SorterType.Descending),
			]));

		additionalInformation.sessions = this.database.readList<SessionInterface>(ComponentType.Session, this.currentComponent.id)
			.sort(this.factories.sorter.create<ModelInterface>([
				new SorterComparisonElement((component: ModelInterface) => component.file.stat.mtime, SorterType.Descending),
			]));

		let response = await super.generateData(relationship, title, additionalInformation) as HeaderResponseInterface;

		if (response === null)
			response = new ResponseHeader(this.app, this.currentComponent);

		response.type = ComponentType.Campaign;
		response.responseType = ResponseType.CampaignHeader;

		response.addElement(
			new ResponseHeaderElement(
				this.app,
				this.currentComponent,
				'Current Date',
				this.api.service(DateService).getReadableDate(this.data.date, this.data),
				(this.data.fantasyCalendar !== undefined ? HeaderResponseType.FantasyDateSelector : HeaderResponseType.DateSelector),
				{
					yamlIdentifier: 'data.dateService',
					date: this.data.date,
					placeholder: 'Select the current dateService in the campaign'
				}
			)
		);

		response.metadata = {campaignId: this.data.id, sourceMeta: additionalInformation};

		return this.completeData(response);
	}
}
