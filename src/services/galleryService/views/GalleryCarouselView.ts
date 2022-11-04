import {ImageInterface} from "../interfaces/ImageInterface";
import {Component, MarkdownRenderer} from "obsidian";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";

export class GalleryCarouselView {
	private _currentImage: number;
	private _imagesCount: number;

	private _imageGroups: HTMLDivElement[];

	private _imageCounterEl: HTMLDivElement;

	constructor(
		private _api: RpgManagerApiInterface,
		private _images: ImageInterface[],
	) {
		this._currentImage = 0;
		this._imagesCount = this._images.length;
		this._imageGroups = [];
	}

	render(
		containerEl: HTMLDivElement,
	): void {
		const carouselContainerEl = containerEl.createDiv({cls: 'rpg-manager-image-carousel'});
		this._addImageNavigator(carouselContainerEl);
		const imagesContainerEl = carouselContainerEl.createDiv({cls: 'rpg-manager-image-carousel-images'});

		this._images.forEach((image: ImageInterface, index:number) => {
			this._addImageGroup(image, imagesContainerEl);
		});

		this._imageGroups[0].removeClass('rpg-manager-image-carousel-images-group-invisible');
	}

	private _addImageGroup(
		image: ImageInterface,
		containerEl: HTMLDivElement,
	): void {
		const imageGroupEl: HTMLDivElement = containerEl.createDiv({cls: 'rpg-manager-image-carousel-images-group rpg-manager-image-carousel-images-group-invisible'});

		const imageContainerEl: HTMLDivElement = imageGroupEl.createDiv({cls: 'rpg-manager-image-carousel-images-group-container'});

		const imageEl = new Image();

		imageEl.onload = (evt: Event) => {
			if (image.src.startsWith('http')) {
				const crsImageLink = imageContainerEl.createEl('a', {href: image.src});
				crsImageLink.append(imageEl);
			} else {
				imageContainerEl.append(imageEl);
			}
		};

		imageEl.src = image.src;

		const imageCaptionEl: HTMLDivElement = imageGroupEl.createDiv({cls: 'rpg-manager-image-carousel-images-group-container'});
		if (image.caption !== '') {
			MarkdownRenderer.renderMarkdown(
				image.caption,
				imageCaptionEl,
				'',
				null as unknown as Component,
			);
		}

		this._imageGroups.push(imageGroupEl);
	}

	private _addImageNavigator(
		containerEl: HTMLDivElement,
	): void {
		if (this._imagesCount > 1) {
			const imageNavigatorContainerEl: HTMLDivElement = containerEl.createDiv({cls: 'rpg-manager-image-carousel-images-navigator clearfix'});

			if (this._images.length > 0) {
				const previousImageNavigatorEl: HTMLDivElement = imageNavigatorContainerEl.createDiv({
					cls: 'rpg-manager-image-carousel-images-navigator-previous',
					text: '<<'
				});
				previousImageNavigatorEl.addEventListener('click', this._movePrevious.bind(this));

				const nextImageNavigatorEl: HTMLDivElement = imageNavigatorContainerEl.createDiv({
					cls: 'rpg-manager-image-carousel-images-navigator-next',
					text: '>>'
				});
				nextImageNavigatorEl.addEventListener('click', this._moveNext.bind(this));

				this._imageCounterEl = imageNavigatorContainerEl.createDiv({cls: 'rpg-manager-image-carousel-images-navigator-counter'});
			}

			this._imageCounterEl.textContent = '1/' + this._imagesCount.toString();
		}
	}

	private _movePrevious(): void {
		this._imageGroups[this._currentImage].addClass('rpg-manager-image-carousel-images-group-invisible');

		if (this._currentImage === 0) {
			this._currentImage = this._imagesCount-1;
		} else {
			this._currentImage--;
		}

		this._imageGroups[this._currentImage].removeClass('rpg-manager-image-carousel-images-group-invisible');
		this._imageCounterEl.textContent = (this._currentImage + 1).toString() + '/' + this._imagesCount.toString();
	}

	private _moveNext(): void {
		this._imageGroups[this._currentImage].addClass('rpg-manager-image-carousel-images-group-invisible');

		if (this._currentImage === this._imagesCount -1) {
			this._currentImage = 0;
		} else {
			this._currentImage++;
		}

		this._imageGroups[this._currentImage].removeClass('rpg-manager-image-carousel-images-group-invisible');
		this._imageCounterEl.textContent = (this._currentImage + 1).toString() + '/' + this._imagesCount.toString();
	}
}
