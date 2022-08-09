import {RpgAbstractView} from "../abstracts/RpgAbstractView";

export class RpgErrorView extends RpgAbstractView {
	public async render() {
		this.container.innerText = "The selected function does not exist in Rpg Manager";
	}
}
