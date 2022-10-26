import {ComponentNotesTemplateFactoryInterface} from "../../../../REFACTOR/interfaces/ComponentNotesTemplateFactoryInterface";
import {AbstractTemplate} from "../../../../REFACTOR/abstracts/AbstractTemplate";

export class NonPlayerCharacterNotesTemplateFactory extends AbstractTemplate implements ComponentNotesTemplateFactoryInterface {
	public getContent(): string {
		return '---\n' +
			'### Non Player CharacterModel Notes\n' +
			' - \n\n' +
			'### Non Player CharacterModel Story\n' +
			' - \n\n' +
			'---\n';
	}
}
