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
import {SVGContent} from "../data/content/SVGContent";
import {DateContent} from "../data/content/DateContent";

export class ContentFactory extends AbstractFactory implements ContentFactoryInterface{
	public create(
		content: any,
		type: ContentType,
		isInline = false,
		additionalInformation: any|undefined=undefined,
	): ContentInterface {
		switch (type) {
			case ContentType.String:
				return new StringContent(this.app, content, isInline, additionalInformation);
				break;
			case ContentType.Date:
				return new DateContent(this.app, content, isInline, additionalInformation);
				break;
			case ContentType.Link:
				return new LinkContent(this.app, content, isInline, additionalInformation);
				break;
			case ContentType.Number:
				return new NumberContent(this.app, content, isInline, additionalInformation);
				break;
			case ContentType.Object:
				return new ObjectContent(this.app, content, isInline, additionalInformation);
				break;
			case ContentType.Markdown:
				return new MarkdownContent(this.app, content, isInline, additionalInformation);
				break;
			case ContentType.Image:
				return new ImageContent(this.app, content, isInline, additionalInformation);
				break;
			case ContentType.SVG:
				return new SVGContent(this.app, content, isInline, additionalInformation);
				break;
		}
	}
}
