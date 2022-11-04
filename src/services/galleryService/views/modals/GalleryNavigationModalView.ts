import {AbstractGalleryModalView} from "../../abstracts/AbstractGalleryModalView";
import {GalleryViewType} from "../../enums/GalleryViewType";
import {RpgManagerApiInterface} from "../../../../api/interfaces/RpgManagerApiInterface";
import {GalleryServiceInterface} from "../../interfaces/GalleryServiceInterface";

export class GalleryNavigationModalView extends AbstractGalleryModalView {
	private _operationsEl: HTMLDivElement;

	constructor(
		api: RpgManagerApiInterface,
		private _gallery: GalleryServiceInterface,
	) {
		super(api);
	}

	public render(
		containerEl: HTMLDivElement,
	): void {
		const navigationEl: HTMLDivElement = containerEl.createDiv({cls: 'gallery-navigation'});
		this._operationsEl = containerEl.createDiv({cls: 'gallery-operations'});

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

		const view = this._gallery.createView(type, this.model);
		view.render(this._operationsEl);
	}
}
