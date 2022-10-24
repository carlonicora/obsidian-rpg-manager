import {AbstractHeaderSubModel} from "../../../REFACTOR/models/abstracts/AbstractHeaderSubModel";
import {ResponseDataElementInterface} from "../../../responses/interfaces/ResponseDataElementInterface";
import {ResponseHeader} from "../../../responses/ResponseHeader";
import {HeaderResponseInterface} from "../../../responses/interfaces/HeaderResponseInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {ResponseType} from "../../../responses/enums/ResponseType";
import {CampaignInterface} from "../interfaces/CampaignInterface";
import {RelationshipInterface} from "../../../services/relationships/interfaces/RelationshipInterface";
import {AdventureInterface} from "../../adventure/interfaces/AdventureInterface";
import {ComponentModelInterface} from "../../../api/componentManager/interfaces/ComponentModelInterface";
import {SorterComparisonElement} from "../../../database/SorterComparisonElement";
import {SorterType} from "../../../database/enums/SorterType";
import {ActInterface} from "../../act/interfaces/ActInterface";
import {SessionInterface} from "../../session/interfaces/SessionInterface";
import {ResponseHeaderElement} from "../../../responses/ResponseHeaderElement";
import {HeaderResponseType} from "../../../responses/enums/HeaderResponseType";
import {DateService} from "../../../services/date/DateService";

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
			.sort(this.factories.sorter.create<ComponentModelInterface>([
				new SorterComparisonElement((component: ComponentModelInterface) => component.file.stat.mtime, SorterType.Descending),
			]));

		additionalInformation.acts = this.database.readList<ActInterface>(ComponentType.Act, this.currentComponent.id);
		if (this.data.currentAdventureId != undefined && this.data.currentAdventureId !== '') {
			const currentAdventureId = +this.data.currentAdventureId.split('/')[2];
			additionalInformation.acts = additionalInformation.acts.filter((act: ActInterface) => act.id.adventureId === currentAdventureId)
		}

		additionalInformation.acts.sort(this.factories.sorter.create<ComponentModelInterface>([
				new SorterComparisonElement((component: ComponentModelInterface) => component.file.stat.mtime, SorterType.Descending),
			]));

		additionalInformation.sessions = this.database.readList<SessionInterface>(ComponentType.Session, this.currentComponent.id)
			.sort(this.factories.sorter.create<ComponentModelInterface>([
				new SorterComparisonElement((component: ComponentModelInterface) => component.file.stat.mtime, SorterType.Descending),
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
				this.api.services.get<DateService>(DateService)?.getReadableDate(this.data.date, this.data),
				(this.data.fantasyCalendar !== undefined ? HeaderResponseType.FantasyDateSelector : HeaderResponseType.DateSelector),
				{
					yamlIdentifier: 'data.date',
					date: this.data.date,
					placeholder: 'Select the current date in the campaign'
				}
			)
		);

		response.metadata = {campaignId: this.data.id, sourceMeta: additionalInformation};

		return this.completeData(response);
	}
}
