import {ComponentNotesTemplateFactoryInterface} from "../../../../REFACTOR/interfaces/ComponentNotesTemplateFactoryInterface";
import {AbstractTemplate} from "../../../../REFACTOR/abstracts/AbstractTemplate";

export class CampaignNotesTemplateFactory extends AbstractTemplate implements ComponentNotesTemplateFactoryInterface {
	public getContent(): string {
		return '---\n' +
			'### CampaignModel Notes\n' +
			' - \n\n' +
			'---\n';
	}
}
