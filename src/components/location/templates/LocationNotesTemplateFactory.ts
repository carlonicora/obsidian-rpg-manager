import {ComponentNotesTemplateFactoryInterface} from "../../../core/interfaces/ComponentNotesTemplateFactoryInterface";
import {AbstractTemplate} from "../../../core/abstracts/AbstractTemplate";

export class LocationNotesTemplateFactory extends AbstractTemplate implements ComponentNotesTemplateFactoryInterface {
	public getContent(): string {
		return '---\n' +
			'### LocationModel Details\n' +
			' - \n\n' +
			'---\n';
	}
}
