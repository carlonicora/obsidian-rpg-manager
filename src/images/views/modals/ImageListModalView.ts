import {ImageViewInterface} from "../../interfaces/ImageViewInterface";
import {AbstractImageModalView} from "../../abstracts/AbstractImageModalView";
import {ImageInterface} from "../../interfaces/ImageInterface";
import {Component, MarkdownRenderer} from "obsidian";
import {ImageViewType} from "../../enums/ImageViewType";
import {ImageEditModalView} from "./ImageEditModalView";

export class ImageListModalView extends AbstractImageModalView implements ImageViewInterface {
	private _masonryEl: HTMLDivElement;

	public render(
		containerEl: HTMLDivElement,
	): void {
		containerEl.empty();

		this._masonryEl = containerEl.createDiv({cls: 'gallery-operations-masonry'});

		this.component.images.forEach((image: ImageInterface) => {
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
				const view = this.factories.imageView.create(ImageViewType.ModalEdit, this.component);
				(<ImageEditModalView>view).image = image;
				view.render(containerEl);
			});
		});
	}
}
