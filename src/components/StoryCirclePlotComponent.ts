import {AbstractComponent} from "../abstracts/AbstractComponent";
import {ResponseElementInterface} from "../interfaces/response/ResponseElementInterface";
import {ContentType} from "../enums/ContentType";
import {ResponseTable} from "../data/responses/ResponseTable";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";

export class StoryCirclePlotComponent extends AbstractComponent {
	public async generateData(
		relationship: RelationshipInterface,
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseElementInterface|null> {
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

		const response = new ResponseTable(this.app);

		response.title = 'Story Circle Plot';
		response.class = 'rpgm-plot';

		response.addContent([
			this.factories.contents.create('**YOU** ', ContentType.Markdown, true),
			this.factories.contents.create((additionalInformation.you ? additionalInformation.you : ''), ContentType.Markdown),
		]);
		response.addContent([
			this.factories.contents.create('**NEED** ', ContentType.Markdown, true),
			this.factories.contents.create((additionalInformation.need ? additionalInformation.need : ''), ContentType.Markdown),
		]);
		response.addContent([
			this.factories.contents.create('**GO** ', ContentType.Markdown, true),
			this.factories.contents.create((additionalInformation.go ? additionalInformation.go : ''), ContentType.Markdown),
		]);
		response.addContent([
			this.factories.contents.create('**SEARCH** ', ContentType.Markdown, true),
			this.factories.contents.create((additionalInformation.search ? additionalInformation.search : ''), ContentType.Markdown),
		]);
		response.addContent([
			this.factories.contents.create('**FIND** ', ContentType.Markdown, true),
			this.factories.contents.create((additionalInformation.find ? additionalInformation.find : ''), ContentType.Markdown),
		]);
		response.addContent([
			this.factories.contents.create('**TAKE** ', ContentType.Markdown, true),
			this.factories.contents.create((additionalInformation.take ? additionalInformation.take : ''), ContentType.Markdown),
		]);
		response.addContent([
			this.factories.contents.create('**RETURN** ', ContentType.Markdown, true),
			this.factories.contents.create((additionalInformation.return ? additionalInformation.return : ''), ContentType.Markdown),
		]);
		response.addContent([
			this.factories.contents.create('**CHANGE** ', ContentType.Markdown, true),
			this.factories.contents.create((additionalInformation.change ? additionalInformation.change : ''), ContentType.Markdown),
		]);

		/*
		const response = new ResponseStoryCirclePlot(this.app);
		response.you = this.templates.contents.create(
			'**YOU:** ' + (additionalInformation.you ? additionalInformation.you : ''),
			ContentType.Markdown,
		);
		response.need = this.templates.contents.create(
			'**NEED:** ' + (additionalInformation.need ? additionalInformation.need : ''),
			ContentType.Markdown,
		);
		response.go = this.templates.contents.create(
			'**GO:** ' + (additionalInformation.go ? additionalInformation.go : ''),
			ContentType.Markdown,
		);
		response.search = this.templates.contents.create(
			'**SEARCH >** ' + (additionalInformation.search ? additionalInformation.search : ''),
			ContentType.Markdown,
		);
		response.find = this.templates.contents.create(
			'**FIND >** ' + (additionalInformation.find ? additionalInformation.find : ''),
			ContentType.Markdown,
		);
		response.take = this.templates.contents.create(
			'**TAKE >** ' + (additionalInformation.take ? additionalInformation.take : ''),
			ContentType.Markdown,
		);
		response.change = this.templates.contents.create(
			'**RETURN >** ' + (additionalInformation.return ? additionalInformation.return : ''),
			ContentType.Markdown,
		);
		response.return = this.templates.contents.create(
			'**CHANGE >** ' + (additionalInformation.change ? additionalInformation.change : ''),
			ContentType.Markdown,
		);
		*/

		return response;
	}
}
