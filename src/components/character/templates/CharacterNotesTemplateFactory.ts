import {ComponentNotesTemplateFactoryInterface} from "../../../../REFACTOR/interfaces/ComponentNotesTemplateFactoryInterface";
import {AbstractTemplate} from "../../../../REFACTOR/abstracts/AbstractTemplate";

export class CharacterNotesTemplateFactory extends AbstractTemplate implements ComponentNotesTemplateFactoryInterface {
	public getContent(): string {
		return '---\n' +
			'### Player CharacterModel Notes\n' +
			' - \n\n' +
			'---\n';
	}
}
