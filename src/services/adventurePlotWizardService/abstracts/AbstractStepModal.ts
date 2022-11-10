import {WizardPartInterface} from "../../../managers/modalsManager/interfaces/WizardPartInterface";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {IdInterface} from "../../idService/interfaces/IdInterface";
import {WizardDataInterface} from "../../../managers/modalsManager/interfaces/WizardDataInterface";
import {AdventureInterface} from "../../../components/adventure/interfaces/AdventureInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {LinkSuggesterService} from "../../linkSuggesterService/LinkSuggesterService";

export abstract class AbstractStepModal implements WizardPartInterface {
	protected information: WizardDataInterface;
	protected descriptionEl: HTMLTextAreaElement;

	constructor(
		protected api: RpgManagerApiInterface,
		protected adventureId: IdInterface,
		protected title: string,
		protected description: string,
		protected existingDescription?: string,
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
		containsClues: boolean,
	) : HTMLDivElement {
		containerEl.createEl('h2', {cls: 'rpg-manager-wizard-main-content-header', text: this.title});
		containerEl.createDiv({cls: 'rpg-manager-wizard-main-content-title', text: this.description});

		const dataContainerEl: HTMLDivElement = containerEl.createDiv({cls: 'rpg-manager-wizard-main-content-container clearfix'});

		const descriptionContainerEl = dataContainerEl.createDiv({cls: 'rpg-manager-wizard-main-content-container-' + (containsClues ? 'clues-' : '') + 'text'});
		this.descriptionEl = descriptionContainerEl.createEl('textarea', {
			cls: 'rpg-manager-wizard-main-content-container',
			text: this.information?.description ?? this.existingDescription ?? ''
		});
		this.api.service(LinkSuggesterService).createHandler(this.descriptionEl, this.adventure);


		return dataContainerEl;
	}

	abstract render(
		containerEl: HTMLDivElement,
	): Promise<void>;

	abstract save(
	): Promise<void>;
}
