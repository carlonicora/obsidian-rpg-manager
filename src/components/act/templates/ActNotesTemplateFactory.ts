import {ComponentNotesTemplateFactoryInterface} from "../../../../REFACTOR/interfaces/ComponentNotesTemplateFactoryInterface";
import {AbstractTemplate} from "../../../../REFACTOR/abstracts/AbstractTemplate";

export class ActNotesTemplateFactory extends AbstractTemplate implements ComponentNotesTemplateFactoryInterface {
	public getContent(): string {
		return '---\n' +
			'### ActModel Notes\n' +
			' - \n\n' +
			'---\n';
	}
}
