import {NewHeaderViewInterface} from "../../../views/interfaces/NewHeaderViewInterface";
import {NewViewType} from "../../../core/enums/NewViewType";
import {ComponentModelInterface} from "../../../api/componentManager/interfaces/ComponentModelInterface";
import {NewAbstractHeaderView} from "../../../views/abstracts/NewAbstractHeaderView";

export class NewClueHeaderView extends NewAbstractHeaderView implements NewHeaderViewInterface {
	public render(
	): void {

	}

	get type(): NewViewType {
		return NewViewType.Header;
	}
}
