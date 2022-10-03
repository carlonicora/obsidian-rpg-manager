import {ComponentNotesTemplateFactoryInterface} from "../../interfaces/factories/ComponentNotesTemplateFactoryInterface";
import {AbstractTemplate} from "../../abstracts/AbstractTemplate";

export class FactionNotesTemplateFactory extends AbstractTemplate implements ComponentNotesTemplateFactoryInterface {
	public getContent(): string {
		return "## Additional Information\n\n";
	}

}
