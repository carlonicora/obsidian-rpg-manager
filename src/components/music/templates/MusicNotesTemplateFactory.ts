import {AbstractTemplate} from "../../../core/abstracts/AbstractTemplate";
import {ComponentNotesTemplateFactoryInterface} from "../../../core/interfaces/ComponentNotesTemplateFactoryInterface";

export class MusicNotesTemplateFactory extends AbstractTemplate implements ComponentNotesTemplateFactoryInterface {
	public getContent(): string {
		return '---\n' +
			'### MusicModel Details\n' +
			' - \n\n' +
			'---\n';
	}
}
