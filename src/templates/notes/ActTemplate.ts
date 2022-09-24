import {TemplateInterface} from "../../interfaces/TemplateInterface";
import {AbstractTemplate} from "../../abstracts/AbstractTemplate";

export class ActTemplate extends AbstractTemplate implements TemplateInterface {
	public getContent(): string {
		return "";
	}

}
