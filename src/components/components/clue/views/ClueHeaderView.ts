import {AbstractHeaderView} from "../../../../views/abstracts/AbstractHeaderView";
import {ClueInterface} from "../interfaces/ClueInterface";
import {HeaderResponseInterface} from "../../../../responses/interfaces/HeaderResponseInterface";
import {HeadlessTableView} from "../../../../views/HeadlessTableView";
import {HeaderResponseElementInterface} from "../../../../responses/interfaces/HeaderResponseElementInterface";
import {HeaderResponseType} from "../../../../responses/enums/HeaderResponseType";

export class ClueHeaderView extends AbstractHeaderView {
	protected currentComponent: ClueInterface;

	public render(
		container: HTMLElement,
		data: HeaderResponseInterface,
	): void {
		super.internalRender(container, data);

		const headlessTable = new HeadlessTableView(this.app, this.sourcePath);

		data.elements.forEach((element: HeaderResponseElementInterface) => {
			switch (element.type){
				case HeaderResponseType.DateSelector:
					this.createContainerEl(element, this.addDateSelector.bind(this))
					break;
				default:
					element.value.fillContent(
						this.createContainerEl(element),
						this.sourcePath,
					);
					break;
			}
		});

		this.headerContainerEl.appendChild(headlessTable.tableEl as Node);
	}
}
