import {AbstractTemplate} from "../../abstracts/AbstractTemplate";
import {TemplateInterface} from "../../interfaces/TemplateInterface";

export class MusicTemplate extends AbstractTemplate implements TemplateInterface {
	public getContent(): string {
		return '';
	}

}
