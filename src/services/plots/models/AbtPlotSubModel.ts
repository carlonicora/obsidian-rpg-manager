import {AbstractSubModel} from "../../../REFACTOR/models/abstracts/AbstractSubModel";
import {ResponseDataElementInterface} from "../../../responses/interfaces/ResponseDataElementInterface";
import {ResponseTable} from "../../../responses/ResponseTable";
import {ContentType} from "../../../responses/enums/ContentType";
import {RelationshipInterface} from "../../relationshipsService/interfaces/RelationshipInterface";
import {PlotsInterface} from "../interfaces/PlotsInterface";
import {ResponseTableElement} from "../../../responses/ResponseTableElement";

export class AbtPlotSubModel extends AbstractSubModel {

	public async generateData(
		relationship: RelationshipInterface,
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseDataElementInterface|null> {
		if (!this.currentComponent.hasAbtPlot || (<PlotsInterface>this.currentComponent).abt.isEmpty) return null;

		const response = new ResponseTable(this.app, this.currentComponent);

		response.title = 'ABT Plot';
		response.class = 'rpgm-plot';

		const needContent = new ResponseTableElement(undefined, relationship);
		needContent.addElement(this.factories.contents.create('**NEED** ', ContentType.Markdown, true));
		needContent.addElement(this.factories.contents.create((additionalInformation.need ? additionalInformation.need : ''), ContentType.Markdown));
		response.addContent(needContent);

		const andContent = new ResponseTableElement(undefined, relationship);
		andContent.addElement(this.factories.contents.create('**AND** ', ContentType.Markdown, true));
		andContent.addElement(this.factories.contents.create((additionalInformation.and ? additionalInformation.and : ''), ContentType.Markdown));
		response.addContent(andContent);

		const butContent = new ResponseTableElement(undefined, relationship);
		butContent.addElement(this.factories.contents.create('**BUT** ', ContentType.Markdown, true));
		butContent.addElement(this.factories.contents.create((additionalInformation.but ? additionalInformation.but : ''), ContentType.Markdown));
		response.addContent(butContent);

		const thereforeContent = new ResponseTableElement(undefined, relationship);
		thereforeContent.addElement(this.factories.contents.create('**THEREFORE** ', ContentType.Markdown, true));
		thereforeContent.addElement(this.factories.contents.create((additionalInformation.therefore ? additionalInformation.therefore : ''), ContentType.Markdown));
		response.addContent(thereforeContent);

		return response;
	}
}
