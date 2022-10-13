import {AbstractSubModel} from "../../models/abstracts/AbstractSubModel";
import {ResponseDataElementInterface} from "../../responses/interfaces/ResponseDataElementInterface";
import {ContentType} from "../../responses/enums/ContentType";
import {ResponseTable} from "../../responses/ResponseTable";
import {RelationshipInterface} from "../../relationships/interfaces/RelationshipInterface";
import {ResponseTableElement} from "../../responses/ResponseTableElement";

export class StoryCirclePlotSubModel extends AbstractSubModel {
	public async generateData(
		relationship: RelationshipInterface,
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseDataElementInterface|null> {
		if (
			additionalInformation == null ||
			(
			additionalInformation.you == null ||
			additionalInformation.need == null ||
			additionalInformation.go == null ||
			additionalInformation.search == null ||
			additionalInformation.find == null ||
			additionalInformation.take == null ||
			additionalInformation.return == null ||
			additionalInformation.change == null
			) ||
			(
				additionalInformation.you === '' &&
				additionalInformation.need === '' &&
				additionalInformation.go === '' &&
				additionalInformation.search === '' &&
				additionalInformation.find === '' &&
				additionalInformation.take === '' &&
				additionalInformation.return === '' &&
				additionalInformation.change === ''
			)
		) return null;
		if (relationship.component === undefined) return null;

		const response = new ResponseTable(this.app, this.currentComponent);

		response.title = 'Story Circle Plot';
		response.class = 'rpgm-plot';

		const youContent = new ResponseTableElement(undefined, relationship);
		youContent.addElement(this.factories.contents.create('**YOU** ', ContentType.Markdown, true));
		youContent.addElement(this.factories.contents.create((additionalInformation.you ? additionalInformation.you : ''), ContentType.Markdown));
		response.addContent(youContent);

		const needContent = new ResponseTableElement(undefined, relationship);
		needContent.addElement(this.factories.contents.create('**NEED** ', ContentType.Markdown, true));
		needContent.addElement(this.factories.contents.create((additionalInformation.need ? additionalInformation.need : ''), ContentType.Markdown));
		response.addContent(needContent);

		const goContent = new ResponseTableElement(undefined, relationship);
		goContent.addElement(this.factories.contents.create('**GO** ', ContentType.Markdown, true));
		goContent.addElement(this.factories.contents.create((additionalInformation.go ? additionalInformation.go : ''), ContentType.Markdown));
		response.addContent(goContent);

		const searchContent = new ResponseTableElement(undefined, relationship);
		searchContent.addElement(this.factories.contents.create('**SEARCH** ', ContentType.Markdown, true));
		searchContent.addElement(this.factories.contents.create((additionalInformation.search ? additionalInformation.search : ''), ContentType.Markdown));
		response.addContent(searchContent);

		const findContent = new ResponseTableElement(undefined, relationship);
		findContent.addElement(this.factories.contents.create('**FIND** ', ContentType.Markdown, true));
		findContent.addElement(this.factories.contents.create((additionalInformation.find ? additionalInformation.find : ''), ContentType.Markdown));
		response.addContent(findContent);

		const takeContent = new ResponseTableElement(undefined, relationship);
		takeContent.addElement(this.factories.contents.create('**TAKE** ', ContentType.Markdown, true));
		takeContent.addElement(this.factories.contents.create((additionalInformation.take ? additionalInformation.take : ''), ContentType.Markdown));
		response.addContent(takeContent);

		const returnContent = new ResponseTableElement(undefined, relationship);
		returnContent.addElement(this.factories.contents.create('**RETURN** ', ContentType.Markdown, true));
		returnContent.addElement(this.factories.contents.create((additionalInformation.return ? additionalInformation.return : ''), ContentType.Markdown));
		response.addContent(returnContent);

		const changeContent = new ResponseTableElement(undefined, relationship);
		changeContent.addElement(this.factories.contents.create('**CHANGE** ', ContentType.Markdown, true));
		changeContent.addElement(this.factories.contents.create((additionalInformation.change ? additionalInformation.change : ''), ContentType.Markdown));
		response.addContent(changeContent);

		return response;
	}
}
