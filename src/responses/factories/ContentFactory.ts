import {ContentType} from "../enums/ContentType";
import {ContentInterface} from "../contents/interfaces/ContentInterface";
import {StringContent} from "../contents/StringContent";
import {LinkContent} from "../contents/LinkContent";
import {NumberContent} from "../contents/NumberContent";
import {ObjectContent} from "../contents/ObjectContent";
import {MarkdownContent} from "../contents/MarkdownContent";
import {ImageContent} from "../contents/ImageContent";
import {AbstractFactory} from "../../core/abstracts/AbstractFactory";
import {ContentFactoryInterface} from "./interfaces/ContentFactoryInterface";
import {SVGContent} from "../contents/SVGContent";
import {DateContent} from "../contents/DateContent";

export class ContentFactory extends AbstractFactory implements ContentFactoryInterface{
	public create(
		content: any,
		type: ContentType,
		isInline = false,
		additionalInformation: any|undefined=undefined,
		isEditable = false,
	): ContentInterface {
		switch (type) {
			case ContentType.String:
				return new StringContent(this.app, content, isInline, additionalInformation, isEditable);
				break;
			case ContentType.Date:
				return new DateContent(this.app, content, isInline, additionalInformation, isEditable);
				break;
			case ContentType.Link:
				return new LinkContent(this.app, content, isInline, additionalInformation, isEditable);
				break;
			case ContentType.Number:
				return new NumberContent(this.app, content, isInline, additionalInformation, isEditable);
				break;
			case ContentType.Object:
				return new ObjectContent(this.app, content, isInline, additionalInformation, isEditable);
				break;
			case ContentType.Markdown:
				return new MarkdownContent(this.app, content, isInline, additionalInformation, isEditable);
				break;
			case ContentType.Image:
				return new ImageContent(this.app, content, isInline, additionalInformation, isEditable);
				break;
			case ContentType.SVG:
				return new SVGContent(this.app, content, isInline, additionalInformation, isEditable);
				break;
		}
	}
}
