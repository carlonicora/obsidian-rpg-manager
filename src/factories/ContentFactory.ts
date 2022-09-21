import {ContentType} from "../enums/ContentType";
import {ContentInterface} from "../interfaces/ContentInterface";
import {StringContent} from "../data/content/StringContent";
import {LinkContent} from "../data/content/LinkContent";
import {NumberContent} from "../data/content/NumberContent";
import {ObjectContent} from "../data/content/ObjectContent";
import {MarkdownContent} from "../data/content/MarkdownContent";
import {ImageContent} from "../data/content/ImageContent";
import {AbstractFactory} from "../abstracts/AbstractFactory";
import {ContentFactoryInterface} from "../interfaces/factories/ContentFactoryInterface";

export class ContentFactory extends AbstractFactory implements ContentFactoryInterface{
	public create(
		content: any,
		type: ContentType,
		isInline = false,
	): ContentInterface {
		switch (type) {
			case ContentType.String:
				return new StringContent(this.app, content, isInline);
				break;
			case ContentType.Link:
				return new LinkContent(this.app, content, isInline);
				break;
			case ContentType.Number:
				return new NumberContent(this.app, content, isInline);
				break;
			case ContentType.Object:
				return new ObjectContent(this.app, content, isInline);
				break;
			case ContentType.Markdown:
				return new MarkdownContent(this.app, content, isInline);
				break;
			case ContentType.Image:
				return new ImageContent(this.app, content, isInline);
				break;
		}
	}
}
