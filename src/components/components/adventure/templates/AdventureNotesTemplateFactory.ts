import {ComponentNotesTemplateFactoryInterface} from "../../../../templates/factories/interfaces/ComponentNotesTemplateFactoryInterface";
import {AbstractTemplate} from "../../../../templates/abstracts/AbstractTemplate";

export class AdventureNotesTemplateFactory extends AbstractTemplate implements ComponentNotesTemplateFactoryInterface {
	public getContent(): string {
		return '---\n' +
			'### Adventure Notes\n' +
			' - \n\n' +
			'---\n';
	}
}
