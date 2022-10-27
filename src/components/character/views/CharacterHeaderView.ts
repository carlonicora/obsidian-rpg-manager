import {NewAbstractHeaderView} from "../../../managers/viewsManager/abstracts/NewAbstractHeaderView";
import {NewHeaderViewInterface} from "../../../managers/viewsManager/interfaces/NewHeaderViewInterface";
import {CharacterInterface} from "../interfaces/CharacterInterface";

export class CharacterHeaderView extends NewAbstractHeaderView implements NewHeaderViewInterface {
	public model: CharacterInterface;

	public render(
	): void {

	}
}
