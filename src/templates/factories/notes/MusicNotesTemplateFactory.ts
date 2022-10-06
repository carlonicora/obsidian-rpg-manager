import {AbstractTemplate} from "../../abstracts/AbstractTemplate";
import {ComponentNotesTemplateFactoryInterface} from "../interfaces/ComponentNotesTemplateFactoryInterface";

export class MusicNotesTemplateFactory extends AbstractTemplate implements ComponentNotesTemplateFactoryInterface {
	public getContent(): string {
		return '---\n' +
			'### Music Details\n' +
			' - \n\n' +
			'---\n';
	}
}
