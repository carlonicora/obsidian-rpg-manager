import {GalleryViewInterface} from "../../interfaces/GalleryViewInterface";
import {setIcon} from "obsidian";
import {ImageInterface} from "../../interfaces/ImageInterface";
import {AbstractConfirmationGalleryModalView} from "./abstracts/AbstractConfirmationGalleryModalView";
const fs = require("fs");

export class GalleryUploadModalView extends AbstractConfirmationGalleryModalView implements GalleryViewInterface {
	private _dropZoneEl: HTMLDivElement;

	public render(
		containerEl: HTMLDivElement,
	): void {
		super.render(containerEl);

		this._dropZoneEl = this.containerEl.createDiv({cls: 'dropzone'})
		this._dropZoneEl.createDiv();
		setIcon(this._dropZoneEl, 'download');
		this._dropZoneEl.createDiv({text: 'Drag and drop your image here to add it to your Vault'});

		if (this._isAdvancedUpload()) {
			this._dropZoneEl.ondrag = ((e: DragEvent) => {
				this._onDrag(e);
			});
			this._dropZoneEl.ondragstart = ((e: DragEvent) => {
				this._onDrag(e);
			});
			this._dropZoneEl.ondragend = ((e: DragEvent) => {
				this._onDrag(e);
			});
			this._dropZoneEl.ondragover = ((e: DragEvent) => {
				this._onDrag(e);
			});
			this._dropZoneEl.ondragenter = ((e: DragEvent) => {
				this._onDrag(e);
			});
			this._dropZoneEl.ondragleave = ((e: DragEvent) => {
				this._onDrag(e);
			});
			this._dropZoneEl.ondrop = ((e: DragEvent) => {
				this._onDrag(e);
				if (e.dataTransfer != null) {
					for(let index=0; index<e.dataTransfer.files.length; index++) {
						const file: any  = e.dataTransfer.files[index];
						const folder = (this.settings.imagesFolder !== undefined && this.settings.imagesFolder !== '') ? this.settings.imagesFolder : this.app.vault.config.attachmentFolderPath;

						let fileName = file.name;
						let fileIndex = 0;

						while (this.app.vault.getAbstractFileByPath(folder + '/' + fileName) != undefined) {
							const indexOfExtension = fileName.lastIndexOf('.');

							const name = fileName.substring(0, indexOfExtension);
							const extension = fileName.substring(indexOfExtension);
							fileIndex++;

							fileName = name + '_' + fileIndex.toString() + extension;
						}

						const path = this.app.vault.adapter.basePath + '/' +folder + '/' + fileName;

						const originalFilePath: string = file['path'];

						fs.copyFile(
							originalFilePath,
							path,
							(err: Error|undefined) => {
								if (err) throw err;

								this.manipulators.codeblock.addOrUpdateImage(folder + '/' + fileName, '')
									.then((image: ImageInterface|undefined) => {
										if (image !== undefined) {
											this.selectedImage = image;
											this.confirmationOverlayEl.style.display = 'block';
										}
									});
							}
						);
					}
				}
			});
		}
	}

	private _onDrag(
		e: DragEvent
	): void {
		e.preventDefault();
		e.stopPropagation();
	}

	private _isAdvancedUpload(
	): boolean {
		return (('draggable' in this._dropZoneEl) || ('ondragstart' in this._dropZoneEl && 'ondrop' in this._dropZoneEl)) && 'FormData' in window && 'FileReader' in window;
	}
}
