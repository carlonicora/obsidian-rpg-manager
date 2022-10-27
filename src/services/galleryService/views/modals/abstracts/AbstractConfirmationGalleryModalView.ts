import {AbstractGalleryModalView} from "../../../abstracts/AbstractGalleryModalView";
import {GalleryViewInterface} from "../../../interfaces/GalleryViewInterface";
import {GalleryViewType} from "../../../enums/GalleryViewType";
import {GalleryEditModalView} from "../GalleryEditModalView";
import {ImageInterface} from "../../../interfaces/ImageInterface";
import {GalleryService} from "../../../GalleryService";

export abstract class AbstractConfirmationGalleryModalView extends AbstractGalleryModalView implements GalleryViewInterface{
	protected containerEl: HTMLDivElement;
	protected confirmationOverlayEl: HTMLDivElement;
	protected selectedImage: ImageInterface|undefined;

	render(
		containerEl: HTMLDivElement,
	) {
		this.containerEl = containerEl;
		this.containerEl.empty();

		this.confirmationOverlayEl = this.containerEl.createDiv({cls: 'gallery-operations-edit-deleted'});
		this.confirmationOverlayEl.createDiv({text: 'The image has been added to ' + this.model.file.basename});
		this.confirmationOverlayEl.createDiv({text: 'Click to edit its caption'});
		this.confirmationOverlayEl.addEventListener('click', () => {
			if (this.selectedImage !== undefined) {
				const view = this.api.service(GalleryService).createView(GalleryViewType.ModalEdit, this.model);
				(<GalleryEditModalView>view).image = this.selectedImage;
				view.render(this.containerEl);
			} else {
				const view = this.api.service(GalleryService).createView(GalleryViewType.ModalList, this.model);
				view.render(containerEl);
			}
		});
	}
}
