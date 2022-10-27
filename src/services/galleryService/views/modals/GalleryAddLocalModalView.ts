import {GalleryViewInterface} from "../../interfaces/GalleryViewInterface";
import {ImageInterface} from "../../interfaces/ImageInterface";
import {TAbstractFile} from "obsidian";
import {AbstractConfirmationGalleryModalView} from "./abstracts/AbstractConfirmationGalleryModalView";
import {GalleryService} from "../../GalleryService";
import {CodeblockService} from "../../../codeblockService/CodeblockService";

export class GalleryAddLocalModalView extends AbstractConfirmationGalleryModalView implements GalleryViewInterface {
	private _masonryEl: HTMLDivElement;
	private _attachmentFolder: string;
	private _allImages: Array<TAbstractFile>;

	public render(
		containerEl: HTMLDivElement,
	): void {
		super.render(containerEl);

		this.containerEl.createEl('label', {text: 'Search your image'});
		const searchEl = this.containerEl.createEl('input', {type: 'text'});
		searchEl.addEventListener('keyup', () => {
			this._populateGrid(searchEl.value);
		});

		this._masonryEl = this.containerEl.createDiv({cls: 'gallery-operations-masonry-x'});

		this._attachmentFolder = (this.api.settings.imagesFolder !== undefined && this.api.settings.imagesFolder !== '') ? this.api.settings.imagesFolder : this.api.app.vault.config.attachmentFolderPath;

		if (this._attachmentFolder === undefined)
			return;

		this._attachmentFolder = this._attachmentFolder.toLowerCase();

		const existingImages: Array<string> = [];
		this.model.images.forEach((image: ImageInterface) => {
			existingImages.push(image.path);
		});

		this._allImages = this.api.app.vault.getFiles().filter((file: TAbstractFile) =>
			file.path.toLowerCase().startsWith(this._attachmentFolder) &&
			!existingImages.contains(file.path)
		);

		this._populateGrid();
	}

	private _populateGrid(
		searchedText?: string
	): void {
		this._masonryEl.empty();

		let images = this._allImages;
		if (searchedText !== undefined)
			images = this._allImages.filter((image: TAbstractFile) =>
				image.path.toLowerCase().indexOf(searchedText.toLowerCase()) !== -1
			);

		images.forEach((image: TAbstractFile) => {
			const imageEl = new Image();
			imageEl.addClass('image');
			imageEl.src = this.api.service(GalleryService).root + image.path;
			imageEl.dataset.id = image.path;

			imageEl.addEventListener('click', () => {
				if (imageEl.dataset.id !== undefined) {
					this.api.service(CodeblockService).addOrUpdateImage(imageEl.dataset.id, '')
						.then((image: ImageInterface|undefined) => {
							if (image !== undefined) {
								this.selectedImage = image;
								this.confirmationOverlayEl.style.display = 'block';
							}
						});
				}
			});

			this._masonryEl.append(imageEl);
		});
	}
}
