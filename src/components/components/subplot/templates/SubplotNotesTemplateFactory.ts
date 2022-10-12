import {AbstractTemplate} from "../../../../templates/abstracts/AbstractTemplate";
import {ComponentNotesTemplateFactoryInterface} from "../../../../templates/factories/interfaces/ComponentNotesTemplateFactoryInterface";

export class SubplotNotesTemplateFactory extends AbstractTemplate implements ComponentNotesTemplateFactoryInterface {
	public getContent(): string {
		return '---\n' +
			'### Subplot Notes\n' +
			' - \n\n' +
			'---\n';
	}
}
