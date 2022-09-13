import {TemplateInterface} from "../interfaces/TemplateInterface";
import {AbstractTemplate} from "../abstracts/AbstractTemplate";

export class TimelineTemplate extends AbstractTemplate implements TemplateInterface {
	public getContent(): string {
		return "";
	}
}
