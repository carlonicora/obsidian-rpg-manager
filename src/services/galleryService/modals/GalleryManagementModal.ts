import {GalleryViewType} from "../enums/GalleryViewType";
import {ModelInterface} from "../../../managers/modelsManager/interfaces/ModelInterface";
import {AbstractModal} from "../../../managers/modalsManager/abstracts/AbstractModal";
import {GalleryViewInterface} from "../interfaces/GalleryViewInterface";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {GalleryServiceInterface} from "../interfaces/GalleryServiceInterface";

export class GalleryManagementModal extends AbstractModal {
	protected title = 'Gallery Manager';

	private _containerEl: HTMLDivElement;

	constructor(
		api: RpgManagerApiInterface,
		private _model: ModelInterface,
		private _gallery: GalleryServiceInterface,
	) {
		super(api);
	}

	onClose() {
		super.onClose();

		this.rpgmContainerEl.empty();
	}

	onOpen() {
		super.onOpen();
		this.modalEl.style.width = 'var(--modal-max-width)';

		this._containerEl = this.rpgmContainerEl.createDiv({cls:'gallery'});

		const view = this._gallery.createView(GalleryViewType.ModalNavigation, this._model);

		view.render(this._containerEl);
	}
}
