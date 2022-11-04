import {WizardNavigationPartInterface} from "../interfaces/WizardNavigationPartInterface";

export class NavigationPart implements WizardNavigationPartInterface {
	private _circles: HTMLDivElement[] = [];

	constructor(
		private _steps: number,
		private _containerEl: HTMLDivElement,
		private _moveFn: any,
	) {
		const navigationEl: HTMLDivElement = this._containerEl.createDiv({cls: 'rpg-manager-wizard-navigation-elements'});

		for (let index = 0; index<this._steps + 1; index++){
			const dotEl: HTMLDivElement = navigationEl.createDiv({cls: 'rpg-manager-wizard-navigation-elements-dot', text: (index + 1).toString()});
			dotEl.addEventListener('click', () => {
				this._moveFn(index);
			})

			this._circles.push(
				dotEl
			);
		}
	}

	public async render(
		step: number,
	): Promise<void> {
		for (let index=0; index<this._steps + 1; index++){
			if (index <= step)
				this._circles[index].addClass('rpg-manager-wizard-navigation-elements-dot-active');
			else
				this._circles[index].removeClass('rpg-manager-wizard-navigation-elements-dot-active');

		}
	}
}
