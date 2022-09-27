import {ComponentNotesTemplateFactoryInterface} from "../../../interfaces/factories/ComponentNotesTemplateFactoryInterface";
import {AbstractTemplate} from "../../../abstracts/AbstractTemplate";

export class SceneNotesTemplateFactory extends AbstractTemplate implements ComponentNotesTemplateFactoryInterface {
	public getContent(): string {
		return "";
	}

}
