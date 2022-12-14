import {AbstractGalleryModalView} from "../../abstracts/AbstractGalleryModalView";
import {GalleryViewInterface} from "../../interfaces/GalleryViewInterface";
import {ImageInterface} from "../../interfaces/ImageInterface";
import {GalleryViewType} from "../../enums/GalleryViewType";
import {CodeblockService} from "../../../codeblockService/CodeblockService";
import {RpgManagerApiInterface} from "../../../../api/interfaces/RpgManagerApiInterface";
import {GalleryServiceInterface} from "../../interfaces/GalleryServiceInterface";

export class GalleryEditModalView extends AbstractGalleryModalView implements GalleryViewInterface {
	private _image: ImageInterface;

	private _captionEl: HTMLTextAreaElement;
	private _imageEl: HTMLImageElement;

	constructor(
		api: RpgManagerApiInterface,
		private _gallery: GalleryServiceInterface,
	) {
		super(api);
	}

	set image(image: ImageInterface) {
		this._image = image;
		this.model;
	}

	public render(
		containerEl: HTMLDivElement,
	): void {
		containerEl.empty();

		const editorDeletedContainerEl = containerEl.createDiv({cls: 'gallery-operations-edit-deleted'});
		editorDeletedContainerEl.createDiv({text: 'The image has been removed from ' + this.model.file.basename});
		editorDeletedContainerEl.createDiv({text: 'Click to return to its gallery'});
		editorDeletedContainerEl.addEventListener('click', () => {
			const view = this._gallery.createView(GalleryViewType.ModalList, this.model);
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
				this.api.service(CodeblockService).addOrUpdateImage(this._image.path, this._captionEl.value);
			});

		editorEditorContainerEl.createEl('button', {cls: 'danger', text: 'Remove Image from ' + this.model.file.basename})
			.addEventListener('click', () => {
				this.api.service(CodeblockService).removeImage(this._image.path)
					.then(() => {
						editorDeletedContainerEl.style.display = 'block';
					});
			});
	}
}
