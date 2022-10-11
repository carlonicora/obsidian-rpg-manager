import {ComponentNotesTemplateFactoryInterface} from "../../../../templates/factories/interfaces/ComponentNotesTemplateFactoryInterface";
import {AbstractTemplate} from "../../../../templates/abstracts/AbstractTemplate";

export class SceneNotesTemplateFactory extends AbstractTemplate implements ComponentNotesTemplateFactoryInterface {
	public getContent(): string {
		return '---\n' +
			'### Scene Notes\n' +
			' - \n\n' +
			'---\n';
	}
}
