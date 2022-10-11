import {AbstractTemplate} from "../../../../templates/abstracts/AbstractTemplate";
import {ComponentNotesTemplateFactoryInterface} from "../../../../templates/factories/interfaces/ComponentNotesTemplateFactoryInterface";

export class MusicNotesTemplateFactory extends AbstractTemplate implements ComponentNotesTemplateFactoryInterface {
	public getContent(): string {
		return '---\n' +
			'### Music Details\n' +
			' - \n\n' +
			'---\n';
	}
}
