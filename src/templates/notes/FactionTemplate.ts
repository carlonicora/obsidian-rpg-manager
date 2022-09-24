import {TemplateInterface} from "../../interfaces/TemplateInterface";
import {AbstractTemplate} from "../../abstracts/AbstractTemplate";

export class FactionTemplate extends AbstractTemplate implements TemplateInterface {
	public getContent(): string {
		return "## Additional Information\n\n";
	}

}
