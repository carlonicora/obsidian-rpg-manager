import {AbstractResponse} from "../../abstracts/AbstractResponse";
import {HeaderResponseElementInterface} from "../../interfaces/response/HeaderResponseElementInterface";
import {HeaderResponseType} from "../../enums/HeaderResponseType";
import {App} from "obsidian";
import {ContentType} from "../../enums/ContentType";
import {ContentInterface} from "../../interfaces/ContentInterface";

export class HeaderResponseElement extends AbstractResponse implements HeaderResponseElementInterface {
	public value: ContentInterface;

	constructor(
		protected app: App,
		public title: string,
		content: string,
		public type: HeaderResponseType,
	) {
		super(app);
		this.value = this.app.plugins.getPlugin('rpg-manager').factories.contents.create(content, ContentType.Markdown);
	}
}
