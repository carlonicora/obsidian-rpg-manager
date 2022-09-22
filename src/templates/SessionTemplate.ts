import {TemplateInterface} from "../interfaces/TemplateInterface";
import {AbstractTemplate} from "../abstracts/AbstractTemplate";

export class SessionTemplate extends AbstractTemplate implements TemplateInterface {
	public getContent(): string {
		return '## Notes\n\n';
	}

}
