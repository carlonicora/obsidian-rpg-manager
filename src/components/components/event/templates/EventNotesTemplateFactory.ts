import {ComponentNotesTemplateFactoryInterface} from "../../../../templates/factories/interfaces/ComponentNotesTemplateFactoryInterface";
import {AbstractTemplate} from "../../../../templates/abstracts/AbstractTemplate";

export class EventNotesTemplateFactory extends AbstractTemplate implements ComponentNotesTemplateFactoryInterface {
	public getContent(): string {
		return '---\n' +
			'### Event Details\n' +
			' - \n\n' +
			'---\n';
	}
}
