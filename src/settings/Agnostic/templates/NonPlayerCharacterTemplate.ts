import {TemplateInterface} from "../../../interfaces/TemplateInterface";
import {AbstractTemplate} from "../../../abstracts/AbstractTemplate";

export class NonPlayerCharacterTemplate extends AbstractTemplate implements TemplateInterface {
	public getContent(): string {
		return '## Notes\n- \n\n## Backstory\n';
	}
}
