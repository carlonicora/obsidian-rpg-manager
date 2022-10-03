import {AbstractTemplate} from "../../abstracts/AbstractTemplate";
import {ComponentNotesTemplateFactoryInterface} from "../../interfaces/factories/ComponentNotesTemplateFactoryInterface";

export class MusicNotesTemplateFactory extends AbstractTemplate implements ComponentNotesTemplateFactoryInterface {
	public getContent(): string {
		return '';
	}

}
