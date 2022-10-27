import {NewHeaderViewInterface} from "../../../views/interfaces/NewHeaderViewInterface";
import {NewAbstractHeaderView} from "../../../views/abstracts/NewAbstractHeaderView";
import {ClueInterface} from "../interfaces/ClueInterface";

export class ClueHeaderView extends NewAbstractHeaderView implements NewHeaderViewInterface {
	public model: ClueInterface;

	public render(
	): void {
		this.addBreadcrumb();
		this.addTitle();
		this.addGallery();
		this.addInfoLongElement('Description', this.model.synopsis ?? '', 'data.synopsis');
		this.addInfoShortElement('Found', this.flatPickr, 'data.found');
	}
}
