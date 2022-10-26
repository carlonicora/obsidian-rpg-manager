import {AbstractTemplate} from "../../../../REFACTOR/abstracts/AbstractTemplate";
import {ComponentNotesTemplateFactoryInterface} from "../../../../REFACTOR/interfaces/ComponentNotesTemplateFactoryInterface";

export class SubplotNotesTemplateFactory extends AbstractTemplate implements ComponentNotesTemplateFactoryInterface {
	public getContent(): string {
		return '---\n' +
			'### SubplotModel Notes\n' +
			' - \n\n' +
			'---\n';
	}
}
