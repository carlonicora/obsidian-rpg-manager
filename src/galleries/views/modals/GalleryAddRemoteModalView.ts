import {AbstractGalleryModalView} from "../../abstracts/AbstractGalleryModalView";
import {GalleryViewInterface} from "../../interfaces/GalleryViewInterface";
import {ImageInterface} from "../../interfaces/ImageInterface";
import {GalleryViewType} from "../../enums/GalleryViewType";
import {GalleryEditModalView} from "./GalleryEditModalView";

export class GalleryAddRemoteModalView extends AbstractGalleryModalView implements GalleryViewInterface {
	private _containerEl: HTMLDivElement;
	private _errorEl: HTMLDivElement;
	private _imageContainerEl: HTMLDivElement;
	private _addButtonEl: HTMLButtonElement;
	private _urlEl: HTMLInputElement;

	public render(
		containerEl: HTMLDivElement,
	): void {
		this._containerEl = containerEl;
		this._containerEl.empty();

		this._containerEl.createEl('label', {text: 'Add the URL of the online image'})
		this._urlEl = this._containerEl.createEl('input', {type: 'text'})
		this._addButtonEl = this._containerEl.createEl('button', {text: 'Add image'});
		this._addButtonEl.disabled = true;
		this._errorEl = this._containerEl.createDiv({cls: 'error'});
		this._imageContainerEl = this._containerEl.createDiv({cls: 'image-container'});

		this._urlEl.addEventListener('paste', this._showPreview.bind(this));
		this._urlEl.addEventListener('keyup', this._showPreview.bind(this));

		this._addButtonEl.addEventListener('click', () => {
			const imageEl = new Image();

			for (let index=0; index<this.component.images.length; index++){
				if (this._urlEl.value.toLowerCase() === this.component.images[index].src.toLowerCase()){
					this._errorEl.style.display = '';
					this._errorEl.textContent = 'The URL to the image is invalid.';
					return;
				}
			}

			imageEl.onerror = (evt: Event|string) => {
				this._errorEl.style.display = '';
				this._errorEl.textContent = 'The URL to the image is invalid.';
				return;
			};

			imageEl.onload = (evt: Event) => {
				this.manipulators.codeblock.addOrUpdateImage(this._urlEl.value.toLowerCase(), '')
					.then((image: ImageInterface|undefined) => {
						if (image !== undefined) {
							const view = this.factories.imageView.create(GalleryViewType.ModalEdit, this.component);
							(<GalleryEditModalView>view).image = image;
							view.render(this._containerEl);
						}
					});
			};

			imageEl.src = this._urlEl.value;
		});
	}

	private _showPreview(
	): void {
		const imageEl = new Image();
		imageEl.onerror = (evt: Event|string) => {
			this._errorEl.style.display = '';
			this._addButtonEl.disabled = true;
			return;
		};

		imageEl.onload = (evt: Event) => {
			this._imageContainerEl.empty();
			this._imageContainerEl.append(imageEl);
			this._addButtonEl.disabled = false;
		};

		imageEl.src = this._urlEl.value;
	}
}
