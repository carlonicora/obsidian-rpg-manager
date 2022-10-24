import {AbstractTemplate} from "../../../core/abstracts/AbstractTemplate";
import {ComponentNotesTemplateFactoryInterface} from "../../../core/interfaces/ComponentNotesTemplateFactoryInterface";

export class SubplotNotesTemplateFactory extends AbstractTemplate implements ComponentNotesTemplateFactoryInterface {
	public getContent(): string {
		return '---\n' +
			'### SubplotModel Notes\n' +
			' - \n\n' +
			'---\n';
	}
}
