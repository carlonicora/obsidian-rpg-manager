import {ComponentNotesTemplateFactoryInterface} from "../../../core/interfaces/ComponentNotesTemplateFactoryInterface";
import {AbstractTemplate} from "../../../core/abstracts/AbstractTemplate";

export class ActNotesTemplateFactory extends AbstractTemplate implements ComponentNotesTemplateFactoryInterface {
	public getContent(): string {
		return '---\n' +
			'### ActModel Notes\n' +
			' - \n\n' +
			'---\n';
	}
}
