import {GalleryViewType} from "../enums/GalleryViewType";
import {ModelInterface} from "../../../managers/modelsManager/interfaces/ModelInterface";
import {AbstractModal} from "../../../managers/modalsManager/abstracts/AbstractModal";
import {GalleryNavigationModalView} from "../views/modals/GalleryNavigationModalView";
import {GalleryListModalView} from "../views/modals/GalleryListModalView";
import {GalleryEditModalView} from "../views/modals/GalleryEditModalView";
import {GalleryAddLocalModalView} from "../views/modals/GalleryAddLocalModalView";
import {GalleryAddRemoteModalView} from "../views/modals/GalleryAddRemoteModalView";
import {GalleryUploadModalView} from "../views/modals/GalleryUploadModalView";
import {GalleryViewInterface} from "../interfaces/GalleryViewInterface";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";

export class GalleryManagementModal extends AbstractModal {
	protected title = 'Gallery Manager';

	private _containerEl: HTMLDivElement;
	private _views: Map<GalleryViewType, any> = new Map<GalleryViewType, any>([
		[GalleryViewType.ModalNavigation, GalleryNavigationModalView],
		[GalleryViewType.ModalList, GalleryListModalView],
		[GalleryViewType.ModalEdit, GalleryEditModalView],
		[GalleryViewType.ModalAddLocal, GalleryAddLocalModalView],
		[GalleryViewType.ModalAddRemote, GalleryAddRemoteModalView],
		[GalleryViewType.ModalUpload, GalleryUploadModalView],
	]);

	constructor(
		api: RpgManagerApiInterface,
		private _component: ModelInterface,
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

		const viewClass = this._views.get(GalleryViewType.ModalNavigation);
		if (viewClass === undefined)
			throw new Error('');

		const view: GalleryViewInterface = new viewClass(this.app);
		view.component = this._component;

		view.render(this._containerEl);
	}
}
