import {AbstractSubModel} from "../../abstracts/AbstractSubModel";
import {ResponseDataElementInterface} from "../../responses/interfaces/ResponseDataElementInterface";
import {ResponseTable} from "../../responses/ResponseTable";
import {ContentType} from "../../responses/enums/ContentType";
import {RelationshipInterface} from "../../relationships/interfaces/RelationshipInterface";
import {AbtInterface} from "../../plots/interfaces/AbtInterface";
import {PlotsInterface} from "../../plots/interfaces/PlotsInterface";

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
			this.databases.readList<ActInterface>(ComponentType.Act, data.id).length === 0 &&
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
