import {WizardPartInterface} from "../../../managers/modalsManager/interfaces/WizardPartInterface";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {IdInterface} from "../../idService/interfaces/IdInterface";
import {WizardDataInterface} from "../../../managers/modalsManager/interfaces/WizardDataInterface";
import {AdventureInterface} from "../../../components/adventure/interfaces/AdventureInterface";
import {ComponentType} from "../../../core/enums/ComponentType";

export abstract class AbstractStepModal implements WizardPartInterface {
	protected information: WizardDataInterface;
	protected descriptionEl: HTMLTextAreaElement;

	constructor(
		protected api: RpgManagerApiInterface,
		protected adventureId: IdInterface,
		protected description: string,
	) {
	}

	protected get adventure(): AdventureInterface {
		return this.api.database.readSingle(ComponentType.Adventure, this.adventureId);
	}

	public get data(): WizardDataInterface|undefined {
		return this.information;
	}

	protected getContainer(
		containerEl: HTMLDivElement,
	) : HTMLDivElement {
		containerEl.createDiv({cls: 'rpg-manager-wizard-main-content-title', text: this.description});
		return containerEl.createDiv({cls: 'rpg-manager-wizard-main-content-container clearfix'});
	}

	abstract render(
		containerEl: HTMLDivElement,
	): Promise<void>;

	abstract save(
	): Promise<void>;
}
