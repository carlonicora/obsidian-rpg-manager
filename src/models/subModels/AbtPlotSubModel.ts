import {AbstractSubModel} from "../../abstracts/AbstractSubModel";
import {ResponseDataElementInterface} from "../../interfaces/response/ResponseDataElementInterface";
import {ResponseTable} from "../../responses/ResponseTable";
import {ContentType} from "../../enums/ContentType";
import {Adventure} from "../../components/Adventure";
import {ComponentType} from "../../enums/ComponentType";
import {ActInterface} from "../../interfaces/components/ActInterface";
import {RelationshipInterface} from "../../interfaces/RelationshipInterface";

export class AbtPlotSubModel extends AbstractSubModel {

	public async generateData(
		relationship: RelationshipInterface,
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseDataElementInterface|null> {
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

		const response = new ResponseTable(this.app, this.currentElement);

		if (
			data instanceof Adventure &&
			this.database.readList<ActInterface>(ComponentType.Act, data.id).length === 0 &&
			additionalInformation.need !== '' &&
			additionalInformation.and !== '' &&
			additionalInformation.but !== '' &&
			additionalInformation.therefore !== ''
		) {
			response.create = ComponentType.Adventure;
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
