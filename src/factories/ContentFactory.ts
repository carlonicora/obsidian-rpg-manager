import {ContentType} from "../enums/ContentType";
import {ContentInterface} from "../interfaces/ContentInterface";
import {StringContent} from "../data/content/StringContent";
import {LinkContent} from "../data/content/LinkContent";
import {NumberContent} from "../data/content/NumberContent";
import {ObjectContent} from "../data/content/ObjectContent";
import {MarkdownContent} from "../data/content/MarkdownContent";
import {ImageContent} from "../data/content/ImageContent";

export class ContentFactory {
	public static create(
		content: any,
		type: ContentType,
		isInline = false,
	): ContentInterface {
		switch (type) {
			case ContentType.String:
				return new StringContent(content, isInline);
				break;
			case ContentType.Link:
				return new LinkContent(content, isInline);
				break;
			case ContentType.Number:
				return new NumberContent(content, isInline);
				break;
			case ContentType.Object:
				return new ObjectContent(content, isInline);
				break;
			case ContentType.Markdown:
				return new MarkdownContent(content, isInline);
				break;
			case ContentType.Image:
				return new ImageContent(content, isInline);
				break;
		}
	}
}
