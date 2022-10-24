import {ComponentNotesTemplateFactoryInterface} from "../../../core/interfaces/ComponentNotesTemplateFactoryInterface";
import {AbstractTemplate} from "../../../core/abstracts/AbstractTemplate";

export class EventNotesTemplateFactory extends AbstractTemplate implements ComponentNotesTemplateFactoryInterface {
	public getContent(): string {
		return '---\n' +
			'### EventModel Details\n' +
			' - \n\n' +
			'---\n';
	}
}
