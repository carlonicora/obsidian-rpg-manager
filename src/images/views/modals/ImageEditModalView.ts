import {AbstractImageModalView} from "../../abstracts/AbstractImageModalView";
import {ImageViewInterface} from "../../interfaces/ImageViewInterface";
import {ImageInterface} from "../../interfaces/ImageInterface";
import {ImageViewType} from "../../enums/ImageViewType";

export class ImageEditModalView extends AbstractImageModalView implements ImageViewInterface {
	private _image: ImageInterface;

	private _captionEl: HTMLTextAreaElement;

	set image(image: ImageInterface) {
		this._image = image;
		this.component
	}

	public render(
		containerEl: HTMLDivElement,
	): void {
		containerEl.empty();

		const editorContainerEl = containerEl.createDiv({cls: 'gallery-operations-edit'});
		const editorDeletedContainerEl = editorContainerEl.createDiv({cls: 'gallery-operations-edit-deleted', text: 'The image has been removed. Click to return to the list of images for ' + this.component.file.basename});
		editorDeletedContainerEl.addEventListener('click', () => {
			const view = this.factories.imageView.create(ImageViewType.ModalList, this.component);
			view.render(containerEl);
		});


		const editorImageContainerEl = editorContainerEl.createDiv({cls: 'gallery-operations-edit-image'});
		const editorEditorContainerEl = editorContainerEl.createDiv({cls: 'gallery-operations-edit-editor clearfix'});

		const imageEl = new Image();
		imageEl.addClass('image');
		imageEl.src = this._image.src;

		editorImageContainerEl.append(imageEl);

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

		if (this._image.src.startsWith('http')) {
			editorEditorContainerEl.createEl('button', {
				text: 'Import the image to your Vault'
			})
		} else {
			const deleteImageEl: HTMLButtonElement = editorEditorContainerEl.createEl('button', {
				cls: 'danger',
				text: 'Delete Image from Vault'
			})
		}
	}

	private async _saveCaption(
	): Promise<void> {

	}
}
