import {NewAbstractHeaderView} from "../../../views/abstracts/NewAbstractHeaderView";
import {NewHeaderViewInterface} from "../../../views/interfaces/NewHeaderViewInterface";
import {ActInterface} from "../../act/interfaces/ActInterface";
import {AdventureInterface} from "../interfaces/AdventureInterface";

export class NewAdventureHeaderView extends NewAbstractHeaderView implements NewHeaderViewInterface {
	public model: AdventureInterface;

	public render(
	): void {

	}
}
