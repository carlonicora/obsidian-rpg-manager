import {ComponentNotesTemplateFactoryInterface} from "../../interfaces/factories/ComponentNotesTemplateFactoryInterface";
import {AbstractTemplate} from "../../abstracts/AbstractTemplate";

export class AdventureNotesTemplateFactory extends AbstractTemplate implements ComponentNotesTemplateFactoryInterface {
	public getContent(): string {
		return '## Notes\n\n';
	}

}
