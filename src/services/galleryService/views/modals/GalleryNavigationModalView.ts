import {AbstractGalleryModalView} from "../../abstracts/AbstractGalleryModalView";
import {GalleryViewType} from "../../enums/GalleryViewType";

export class GalleryNavigationModalView extends AbstractGalleryModalView {
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
				this._loadView(GalleryViewType.ModalList);
			}
		);

		this.addSeparator(navigationEl);

		this.addLinkWithFunction(
			navigationEl,
			'Add Local Image',
			() => {
				this._loadView(GalleryViewType.ModalAddLocal);
			}
		);

		this.addSeparator(navigationEl);

		this.addLinkWithFunction(
			navigationEl,
			'Upload Image',
			() => {
				this._loadView(GalleryViewType.ModalUpload);
			}
		);

		this.addSeparator(navigationEl);

		this.addLinkWithFunction(
			navigationEl,
			'Add Online Image',
			() => {
				this._loadView(GalleryViewType.ModalAddRemote);
			},
			true,
		);

		this._loadView(GalleryViewType.ModalList);
	}

	private _loadView(
		type: GalleryViewType,
	): void {
		this._operationsEl.empty();

		const view = this.factories.imageView.create(type, this.component);
		view.render(this._operationsEl);
	}
}
