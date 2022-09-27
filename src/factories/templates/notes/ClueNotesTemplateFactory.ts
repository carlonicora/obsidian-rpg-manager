import {ComponentNotesTemplateFactoryInterface} from "../../../interfaces/factories/ComponentNotesTemplateFactoryInterface";
import {AbstractTemplate} from "../../../abstracts/AbstractTemplate";

export class ClueNotesTemplateFactory extends AbstractTemplate implements ComponentNotesTemplateFactoryInterface {
	public getContent(): string {
		return "## Additional Information\n\n";
	}
}
