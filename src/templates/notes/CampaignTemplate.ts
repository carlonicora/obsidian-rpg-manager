import {TemplateInterface} from "../../interfaces/TemplateInterface";
import {AbstractTemplate} from "../../abstracts/AbstractTemplate";

export class CampaignTemplate extends AbstractTemplate implements TemplateInterface {
	public getContent(): string {
		return '## Notes\n\n';
	}
}
