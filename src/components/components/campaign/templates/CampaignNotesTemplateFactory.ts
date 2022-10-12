import {ComponentNotesTemplateFactoryInterface} from "../../../../templates/factories/interfaces/ComponentNotesTemplateFactoryInterface";
import {AbstractTemplate} from "../../../../templates/abstracts/AbstractTemplate";

export class CampaignNotesTemplateFactory extends AbstractTemplate implements ComponentNotesTemplateFactoryInterface {
	public getContent(): string {
		return '---\n' +
			'### Campaign Notes\n' +
			' - \n\n' +
			'---\n';
	}
}
