import {AbstractComponent} from "../../../abstracts/AbstractComponent";
import {RpgDataInterface} from "../../../interfaces/data/RpgDataInterface";
import {ResponseElementInterface} from "../../../interfaces/response/ResponseElementInterface";
import {ResponseTable} from "../../../data/responses/ResponseTable";
import {ContentType} from "../../../enums/ContentType";

export class AbtPlotComponent extends AbstractComponent {

	public generateData(
		data: RpgDataInterface[],
		title:string|null,
		additionalInformation: any|null,
	): ResponseElementInterface|null {
		if (additionalInformation == null) return null;

		const response = new ResponseTable(this.app);

		response.title = 'ABT Plot';
		response.class = 'rpgm-plot';

		response.addContent([
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('**NEED** ', ContentType.Markdown, true),
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create((additionalInformation.need ? additionalInformation.need : ''), ContentType.Markdown),
		]);
		response.addContent([
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('**AND** ', ContentType.Markdown, true),
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create((additionalInformation.and ? additionalInformation.and : ''), ContentType.Markdown),
		]);
		response.addContent([
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('**BUT** ', ContentType.Markdown, true),
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create((additionalInformation.but ? additionalInformation.but : ''), ContentType.Markdown),
		]);
		response.addContent([
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('**THEREFORE** ', ContentType.Markdown, true),
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create((additionalInformation.therefore ? additionalInformation.therefore : ''), ContentType.Markdown),
		]);

		/*
		const response = new ResponseAbtPlot(this.app);
		response.need = this.app.plugins.getPlugin('rpg-manager').factories.contents.create(
			'**NEED** ' + additionalInformation.need,
			ContentType.Markdown,
		);
		response.and = this.app.plugins.getPlugin('rpg-manager').factories.contents.create(
			'**AND** ' + additionalInformation.and,
			ContentType.Markdown
		);
		response.but = this.app.plugins.getPlugin('rpg-manager').factories.contents.create(
			'**BUT** ' + additionalInformation.but,
			ContentType.Markdown
		);
		response.therefore = this.app.plugins.getPlugin('rpg-manager').factories.contents.create(
			'**THEREFORE** ' + additionalInformation.therefore, ContentType.Markdown
		);
		*/

		return response;
	}
}
