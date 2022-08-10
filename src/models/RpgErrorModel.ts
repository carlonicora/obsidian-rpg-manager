import {AbstractModel} from "../abstracts/AbstractModel";

export class RpgErrorModel extends AbstractModel {
	public async render() {
		this.container.innerText = "The selected function does not exist in Rpg Manager";
	}
}
