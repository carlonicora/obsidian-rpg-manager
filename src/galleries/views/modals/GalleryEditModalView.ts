import {AbstractGalleryModalView} from "../../abstracts/AbstractGalleryModalView";
import {GalleryViewInterface} from "../../interfaces/GalleryViewInterface";
import {ImageInterface} from "../../interfaces/ImageInterface";
import {GalleryViewType} from "../../enums/GalleryViewType";
import fetch, {Response} from "node-fetch";
import {TFile, TFolder} from "obsidian";
import {Event} from "../../../components/components/event/Event";

export class GalleryEditModalView extends AbstractGalleryModalView implements GalleryViewInterface {
	private _image: ImageInterface;

	private _captionEl: HTMLTextAreaElement;
	private _imageEl: HTMLImageElement;

	set image(image: ImageInterface) {
		this._image = image;
		this.component
	}

	public render(
		containerEl: HTMLDivElement,
	): void {
		containerEl.empty();

		const editorContainerEl = containerEl.createDiv({cls: 'gallery-operations-edit'});
		const editorDeletedContainerEl = editorContainerEl.createDiv({cls: 'gallery-operations-edit-deleted', text: 'The image has been removed. Click to return to the list of galleries for ' + this.component.file.basename});
		editorDeletedContainerEl.addEventListener('click', () => {
			const view = this.factories.imageView.create(GalleryViewType.ModalList, this.component);
			view.render(containerEl);
		});


		const editorImageContainerEl = editorContainerEl.createDiv({cls: 'gallery-operations-edit-image'});
		const editorEditorContainerEl = editorContainerEl.createDiv({cls: 'gallery-operations-edit-editor clearfix'});

		this._imageEl = new Image();
		this._imageEl.addClass('image');
		this._imageEl.src = this._image.src;

		editorImageContainerEl.append(this._imageEl);

		editorEditorContainerEl.createEl('h3', {text: 'Edit Image'});
		editorEditorContainerEl.createEl('label', {text: 'Caption'});
		this._captionEl = editorEditorContainerEl.createEl('textarea', {text: this._image.caption});

		editorEditorContainerEl.createEl('button', {text: 'Save Caption'})
			.addEventListener('click', () => {
				this.manipulators.codeblock.addOrUpdateImage(this._image.path, this._captionEl.value)
			});

		editorEditorContainerEl.createEl('button', {cls: 'danger', text: 'Remove Image from ' + this.component.file.basename})
			.addEventListener('click', () => {
				this.manipulators.codeblock.removeImage(this._image.path)
					.then(() => {
						editorDeletedContainerEl.style.display = 'block';
					});
			});

		if (!this._image.src.startsWith('http')) {
			const deleteImageEl: HTMLButtonElement = editorEditorContainerEl.createEl('button', {
				cls: 'danger',
				text: 'Delete Image from Vault'
			})
		}
	}

	private getBase64Image(
		img: HTMLImageElement,
	): string|undefined {
		var canvas = document.createElement("canvas");
		canvas.width = img.width;
		canvas.height = img.height;

		img.crossOrigin = 'anonmous'
		var ctx = canvas.getContext("2d");
		if (ctx == null)
			return;

		ctx.drawImage(img, 0, 0);

		var dataURL = canvas.toDataURL("image/png");

		return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
	}

	private async _saveCaption(
	): Promise<void> {

	}
}
