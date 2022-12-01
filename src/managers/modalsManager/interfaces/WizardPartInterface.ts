import {WizardDataInterface} from "./WizardDataInterface";

export interface WizardPartInterface {
	title: string;
	get data(): WizardDataInterface|undefined;

	get synopsis(): string;

	render(
		containerEl: HTMLDivElement,
	): Promise<void>;

	save(
	): Promise<void>;
}
