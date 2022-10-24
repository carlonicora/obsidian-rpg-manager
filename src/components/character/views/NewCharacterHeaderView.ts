import {NewAbstractHeaderView} from "../../../views/abstracts/NewAbstractHeaderView";
import {NewHeaderViewInterface} from "../../../views/interfaces/NewHeaderViewInterface";
import {ActInterface} from "../../act/interfaces/ActInterface";
import {CharacterInterface} from "../interfaces/CharacterInterface";

export class NewCharacterHeaderView extends NewAbstractHeaderView implements NewHeaderViewInterface {
	public model: CharacterInterface;

	public render(
	): void {

	}
}
