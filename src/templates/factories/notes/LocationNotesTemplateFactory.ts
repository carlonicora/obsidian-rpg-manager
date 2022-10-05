import {ComponentNotesTemplateFactoryInterface} from "../interfaces/ComponentNotesTemplateFactoryInterface";
import {AbstractTemplate} from "../../abstracts/AbstractTemplate";

export class LocationNotesTemplateFactory extends AbstractTemplate implements ComponentNotesTemplateFactoryInterface {
	public getContent(): string {
		return "## Additional Information\n\n";
	}

}
