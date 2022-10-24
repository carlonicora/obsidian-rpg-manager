import {NewAbstractHeaderView} from "../../../views/abstracts/NewAbstractHeaderView";
import {NewHeaderViewInterface} from "../../../views/interfaces/NewHeaderViewInterface";
import {ActInterface} from "../../act/interfaces/ActInterface";
import {SessionInterface} from "../interfaces/SessionInterface";

export class NewSessionHeaderView extends NewAbstractHeaderView implements NewHeaderViewInterface {
	public model: SessionInterface;

	public render(
	): void {

	}
}
