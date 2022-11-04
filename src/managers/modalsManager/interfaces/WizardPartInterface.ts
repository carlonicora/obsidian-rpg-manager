import {WizardDataInterface} from "./WizardDataInterface";

export interface WizardPartInterface {
	get data(): WizardDataInterface|undefined;

	render(
		containerEl: HTMLDivElement,
	): Promise<void>;

	save(
	): Promise<void>;
}
