import {AbstractTemplate} from "../../../../REFACTOR/abstracts/AbstractTemplate";
import {ComponentNotesTemplateFactoryInterface} from "../../../../REFACTOR/interfaces/ComponentNotesTemplateFactoryInterface";

export class MusicNotesTemplateFactory extends AbstractTemplate implements ComponentNotesTemplateFactoryInterface {
	public getContent(): string {
		return '---\n' +
			'### MusicModel Details\n' +
			' - \n\n' +
			'---\n';
	}
}
