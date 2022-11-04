import {WizardPartInterface} from "../../../managers/modalsManager/interfaces/WizardPartInterface";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {IdInterface} from "../../idService/interfaces/IdInterface";
import {WizardDataInterface} from "../../../managers/modalsManager/interfaces/WizardDataInterface";

export abstract class AbstractStepModal implements WizardPartInterface {
	protected information: WizardDataInterface;
	protected descriptionEl: HTMLTextAreaElement;

	constructor(
		protected api: RpgManagerApiInterface,
		protected adventureId: IdInterface,
		protected description: string,
	) {
	}

	public get data(): WizardDataInterface|undefined {
		return this.information;
	}

	abstract render(
		containerEl: HTMLDivElement,
	): Promise<void>;

	abstract save(
	): Promise<void>;
}
