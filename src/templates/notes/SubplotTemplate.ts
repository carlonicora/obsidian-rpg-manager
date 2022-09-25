import {AbstractTemplate} from "../../abstracts/AbstractTemplate";
import {TemplateInterface} from "../../interfaces/TemplateInterface";

export class SubplotTemplate extends AbstractTemplate implements TemplateInterface {
	public getContent(): string {
		return "## Subplot Details\n\n";
	}
}
