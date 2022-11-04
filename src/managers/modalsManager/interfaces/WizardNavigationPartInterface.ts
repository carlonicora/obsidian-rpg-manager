export interface WizardNavigationPartInterface {
	render(
		step: number,
	): Promise<void>;
}
