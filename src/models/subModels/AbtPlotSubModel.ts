import {AbstractSubModel} from "../../abstracts/AbstractSubModel";
import {ResponseDataElementInterface} from "../../interfaces/response/ResponseDataElementInterface";
import {ResponseTable} from "../../responses/ResponseTable";
import {ContentType} from "../../enums/ContentType";
import {RelationshipInterface} from "../../database/relationships/interfaces/RelationshipInterface";
import {AbtInterface} from "../../database/plots/interfaces/AbtInterface";
import {PlotsInterface} from "../../database/plots/interfaces/PlotsInterface";

export class AbtPlotSubModel extends AbstractSubModel {

	public async generateData(
		relationship: RelationshipInterface,
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseDataElementInterface|null> {
		if (!this.currentElement.hasAbtPlot || (<PlotsInterface>this.currentElement).abt.isEmpty) return null;

		const abt: AbtInterface = (<PlotsInterface>this.currentElement).abt;
		const response = new ResponseTable(this.app, this.currentElement);

		/*
		if (relationship.component === undefined) return null;
		const data = relationship.component;

		if (
			data instanceof Adventure &&
			this.database.readList<ActInterface>(ComponentType.Act, data.id).length === 0 &&
			additionalInformation.need !== '' &&
			additionalInformation.and !== '' &&
			additionalInformation.but !== '' &&
			additionalInformation.therefore !== ''
		) {
			response.create = ComponentType.Adventure;
			response.campaignId = data.campaign.id.campaignId;
			response.adventureId = data.id.adventureId;
		}

		 */

		response.title = 'ABT Plot';
		response.class = 'rpgm-plot';

		response.addContent([
			this.factories.contents.create('**NEED** ', ContentType.Markdown, true),
			this.factories.contents.create(abt.need, ContentType.Markdown),
		]);
		response.addContent([
			this.factories.contents.create('**AND** ', ContentType.Markdown, true),
			this.factories.contents.create(abt.and, ContentType.Markdown),
		]);
		response.addContent([
			this.factories.contents.create('**BUT** ', ContentType.Markdown, true),
			this.factories.contents.create(abt.but, ContentType.Markdown),
		]);
		response.addContent([
			this.factories.contents.create('**THEREFORE** ', ContentType.Markdown, true),
			this.factories.contents.create(abt.therefore, ContentType.Markdown),
		]);

		return response;
	}
}
