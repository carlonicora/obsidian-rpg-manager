import {ComponentNotesTemplateFactoryInterface} from "../../../../REFACTOR/interfaces/ComponentNotesTemplateFactoryInterface";
import {AbstractTemplate} from "../../../../REFACTOR/abstracts/AbstractTemplate";

export class AdventureNotesTemplateFactory extends AbstractTemplate implements ComponentNotesTemplateFactoryInterface {
	public getContent(): string {
		return '---\n' +
			'### AdventureModel Notes\n' +
			' - \n\n' +
			'---\n';
	}
}
