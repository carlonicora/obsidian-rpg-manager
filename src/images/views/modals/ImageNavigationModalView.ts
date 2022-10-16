import {AbstractImageModalView} from "../../abstracts/AbstractImageModalView";
import {ImageViewType} from "../../enums/ImageViewType";

export class ImageNavigationModalView extends AbstractImageModalView {
	private _operationsEl: HTMLDivElement;

	public render(
		containerEl: HTMLDivElement,
	): void {
		const navigationEl: HTMLDivElement = containerEl.createDiv({cls: 'gallery-navigation'});
		this._operationsEl = containerEl.createDiv({cls: 'gallery-operations'})

		this.addLinkWithFunction(
			navigationEl,
			'Current Images',
			() => {
				this._loadView(ImageViewType.ModalList);
			}
		);

		this.addSeparator(navigationEl);

		this.addLinkWithFunction(
			navigationEl,
			'Add Local Image',
			() => {
				this._loadView(ImageViewType.ModalAddLocal);
			}
		);

		this.addSeparator(navigationEl);

		this.addLinkWithFunction(
			navigationEl,
			'Add Online Image',
			() => {
				this._loadView(ImageViewType.ModalAddRemote);
			},
			true,
		);

		this._loadView(ImageViewType.ModalList);
	}

	private _loadView(
		type: ImageViewType,
	): void {
		this._operationsEl.empty();

		const view = this.factories.imageView.create(type, this.component);
		view.render(this._operationsEl);
	}
}
