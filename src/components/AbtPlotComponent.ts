import {AbstractComponent} from "../abstracts/AbstractComponent";
import {ResponseElementInterface} from "../interfaces/response/ResponseElementInterface";
import {ResponseTable} from "../data/responses/ResponseTable";
import {ContentType} from "../enums/ContentType";
import {Adventure} from "../data/Adventure";
import {RecordType} from "../enums/RecordType";
import {ActInterface} from "../interfaces/data/ActInterface";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";

export class AbtPlotComponent extends AbstractComponent {

	public async generateData(
		relationship: RelationshipInterface,
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseElementInterface|null> {
		if (
			additionalInformation == null ||
			(
				additionalInformation.need == null ||
				additionalInformation.and == null ||
				additionalInformation.but == null ||
				additionalInformation.therefore == null
			) ||
			(
				additionalInformation.need === '' &&
				additionalInformation.and === '' &&
				additionalInformation.but === '' &&
				additionalInformation.therefore === ''
			)
		) return null;

		if (relationship.component === undefined) return null;
		const data = relationship.component;

		const response = new ResponseTable(this.app);

		if (
			data instanceof Adventure &&
			this.database.readList<ActInterface>(RecordType.Act, data.id).length === 0 &&
			additionalInformation.need !== '' &&
			additionalInformation.and !== '' &&
			additionalInformation.but !== '' &&
			additionalInformation.therefore !== ''
		) {
			response.create = RecordType.Adventure;
			response.campaignId = data.campaign.campaignId;
			response.adventureId = data.adventureId;
		}

		response.title = 'ABT Plot';
		response.class = 'rpgm-plot';

		response.addContent([
			this.factories.contents.create('**NEED** ', ContentType.Markdown, true),
			this.factories.contents.create((additionalInformation.need ? additionalInformation.need : ''), ContentType.Markdown),
		]);
		response.addContent([
			this.factories.contents.create('**AND** ', ContentType.Markdown, true),
			this.factories.contents.create((additionalInformation.and ? additionalInformation.and : ''), ContentType.Markdown),
		]);
		response.addContent([
			this.factories.contents.create('**BUT** ', ContentType.Markdown, true),
			this.factories.contents.create((additionalInformation.but ? additionalInformation.but : ''), ContentType.Markdown),
		]);
		response.addContent([
			this.factories.contents.create('**THEREFORE** ', ContentType.Markdown, true),
			this.factories.contents.create((additionalInformation.therefore ? additionalInformation.therefore : ''), ContentType.Markdown),
		]);

		return response;
	}
}
