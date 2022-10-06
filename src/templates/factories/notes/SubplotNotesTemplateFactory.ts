import {AbstractTemplate} from "../../abstracts/AbstractTemplate";
import {ComponentNotesTemplateFactoryInterface} from "../interfaces/ComponentNotesTemplateFactoryInterface";

export class SubplotNotesTemplateFactory extends AbstractTemplate implements ComponentNotesTemplateFactoryInterface {
	public getContent(): string {
		return '---\n' +
			'### Subplot Notes\n' +
			' - \n\n' +
			'---\n';
	}
}
