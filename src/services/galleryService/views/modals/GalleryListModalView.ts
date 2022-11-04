import {GalleryViewInterface} from "../../interfaces/GalleryViewInterface";
import {AbstractGalleryModalView} from "../../abstracts/AbstractGalleryModalView";
import {ImageInterface} from "../../interfaces/ImageInterface";
import {Component, MarkdownRenderer} from "obsidian";
import {GalleryViewType} from "../../enums/GalleryViewType";
import {GalleryEditModalView} from "./GalleryEditModalView";
import {RpgManagerApiInterface} from "../../../../api/interfaces/RpgManagerApiInterface";
import {GalleryServiceInterface} from "../../interfaces/GalleryServiceInterface";

export class GalleryListModalView extends AbstractGalleryModalView implements GalleryViewInterface {
	private _masonryEl: HTMLDivElement;

	constructor(
		api: RpgManagerApiInterface,
		private _gallery: GalleryServiceInterface,
	) {
		super(api);
	}

	public render(
		containerEl: HTMLDivElement,
	): void {
		containerEl.empty();

		this._masonryEl = containerEl.createDiv({cls: 'gallery-operations-masonry'});

		this.model.images.forEach((image: ImageInterface) => {
			const masonryItemEl = this._masonryEl.createDiv({cls: 'gallery-operations-masonry-item'});

			const imageContainerEl = masonryItemEl.createDiv({cls: 'gallery-operations-masonry-item-container'});

			const imageEl = new Image();
			imageEl.addClass('image');
			imageEl.src = image.src;

			imageContainerEl.append(imageEl);

			const imageCaptionEl: HTMLDivElement = imageContainerEl.createDiv({cls: 'caption'});
			if (image.caption !== '') {
				MarkdownRenderer.renderMarkdown(
					image.caption,
					imageCaptionEl,
					'',
					null as unknown as Component,
				);
			}

			imageEl.addEventListener('click', () => {
				const view = this._gallery.createView(GalleryViewType.ModalEdit, this.model);
				(<GalleryEditModalView>view).image = image;
				view.render(containerEl);
			});
		});
	}
}
