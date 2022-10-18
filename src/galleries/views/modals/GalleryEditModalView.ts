import {AbstractGalleryModalView} from "../../abstracts/AbstractGalleryModalView";
import {GalleryViewInterface} from "../../interfaces/GalleryViewInterface";
import {ImageInterface} from "../../interfaces/ImageInterface";
import {GalleryViewType} from "../../enums/GalleryViewType";

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

		const editorDeletedContainerEl = containerEl.createDiv({cls: 'gallery-operations-edit-deleted'});
		editorDeletedContainerEl.createDiv({text: 'The image has been removed from ' + this.component.file.basename});
		editorDeletedContainerEl.createDiv({text: 'Click to return to its gallery'});
		editorDeletedContainerEl.addEventListener('click', () => {
			const view = this.factories.imageView.create(GalleryViewType.ModalList, this.component);
			view.render(containerEl);
		});

		const editorContainerEl = containerEl.createDiv({cls: 'gallery-operations-edit'});

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

		/*
		if (!this._image.src.startsWith('http')) {
			const deleteImageEl: HTMLButtonElement = editorEditorContainerEl.createEl('button', {
				cls: 'danger',
				text: 'Delete Image from Vault'
			})
		}
		*/
	}
}
