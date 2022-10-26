import {ComponentNotesTemplateFactoryInterface} from "../../../../REFACTOR/interfaces/ComponentNotesTemplateFactoryInterface";
import {AbstractTemplate} from "../../../../REFACTOR/abstracts/AbstractTemplate";

export class ClueNotesTemplateFactory extends AbstractTemplate implements ComponentNotesTemplateFactoryInterface {
	public getContent(): string {
		return '---\n' +
			'### ClueModel Details\n' +
			' - \n\n' +
			'---\n';
	}
}
