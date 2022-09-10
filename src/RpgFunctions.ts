import {App, TAbstractFile, TFile} from "obsidian";
import {DataType} from "./enums/DataType";

export class RpgFunctions {
	private root: string;
	
	constructor(
		private app: App,
	) {
		this.initialiseRoots();
	}

	private initialiseRoots() {
		if (this.app.vault.getFiles().length !== 0) {
			const filePath = this.app.vault.getFiles()[0].path;

			let slashCount = 0;
			let p = filePath.indexOf('/');
			while (p !== -1) {
				slashCount++;
				p = filePath.indexOf('/', p + 1);
			}

			slashCount++;
			const file = this.app.vault.getAbstractFileByPath(filePath);

			if (file instanceof TFile) {
				this.root = this.app.vault.getResourcePath(file);
			}

			if (this.root === null) {
				console.log('Rpg Manager failed to find the root folder!');
				return;
			}

			if (this.root.includes("?")) {
				this.root = this.root.substring(0, this.root.lastIndexOf("?"));
			}

			for (let removedSlash = slashCount; removedSlash > 0; removedSlash--) {
				this.root = this.root.slice(0, this.root.lastIndexOf('/'));
			}

			if (!this.root.endsWith("/")) {
				this.root += "/";
			}
		}
	}

	private fileExists(path: string): boolean {
		const abstractFile = this.app.vault.getAbstractFileByPath(path);
		let response = false;

		if (abstractFile instanceof TAbstractFile) {
			response = true;
		}

		return response;
	}


	public getImg(
		name: string,
	): string|null {
		const imageExtensions = ["jpeg", "jpg", "png", "webp"];

		for (let extensionCount = 0; extensionCount < imageExtensions.length; extensionCount++) {
			const fileName = this.app.vault.config.attachmentFolderPath + '/' + name + '.' + imageExtensions[extensionCount];

			if (this.fileExists(fileName)) {
				if (this.root == null) {
					this.initialiseRoots();
				}
				return this.root + fileName;
			}
		}

		return null;
	}

	public getImgElement(
		imgSrc: string,
		width: number|undefined =75,
		height: number|undefined =75,
	): HTMLImageElement|null
	{
		if (width !== 75 && height === 75){
			height = undefined;
		} else if (width === 75 && height !== 75){
			width = undefined;
		}

		const response = new Image(width, height);
		response.src = imgSrc;
		response.style.objectFit = 'cover';

		return response;
	}

	public getDataType(
		tags: Array<string>|null,
	): DataType|null {
		let response: DataType|null = null;

		(tags || []).forEach((tag: string) => {
			if (tag.startsWith(this.app.plugins.getPlugin('rpg-manager').settings.campaignTag)){
				response = DataType.Campaign;
			} else if (tag.startsWith(this.app.plugins.getPlugin('rpg-manager').settings.adventureTag)){
				response = DataType.Adventure;
			} else if (tag.startsWith(this.app.plugins.getPlugin('rpg-manager').settings.sessionTag)){
				response = DataType.Session;
			} else if (tag.startsWith(this.app.plugins.getPlugin('rpg-manager').settings.sceneTag)){
				response = DataType.Scene;
			} else if (tag.startsWith(this.app.plugins.getPlugin('rpg-manager').settings.npcTag)){
				response = DataType.NonPlayerCharacter;
			} else if (tag.startsWith(this.app.plugins.getPlugin('rpg-manager').settings.pcTag)){
				response = DataType.Character;
			} else if (tag.startsWith(this.app.plugins.getPlugin('rpg-manager').settings.clueTag)){
				response = DataType.Clue;
			} else if (tag.startsWith(this.app.plugins.getPlugin('rpg-manager').settings.locationTag)){
				response = DataType.Location;
			} else if (tag.startsWith(this.app.plugins.getPlugin('rpg-manager').settings.factionTag)){
				response = DataType.Faction;
			} else if (tag.startsWith(this.app.plugins.getPlugin('rpg-manager').settings.eventTag)){
				response = DataType.Event;
			} else if (tag.startsWith(this.app.plugins.getPlugin('rpg-manager').settings.timelineTag)){
				response = DataType.Timeline;
			} else if (tag.startsWith(this.app.plugins.getPlugin('rpg-manager').settings.noteTag)){
				response = DataType.Note;
			}
		});

		return response;
	}

	public getTagId(
		tags: Array<string>|null,
		type: DataType,
	): number {
		if (tags == null) {
			throw new Error();
		}

		let response = '';

		tags.forEach((tag: string) => {
			if (response === ''){
				if (tag.startsWith(this.app.plugins.getPlugin('rpg-manager').settings.campaignTag)){
					if (type === DataType.Campaign){
						response = tag.substring(this.app.plugins.getPlugin('rpg-manager').settings.campaignTag.length + 1);
					} else {
						throw new Error();
					}
				} else if (tag.startsWith(this.app.plugins.getPlugin('rpg-manager').settings.adventureTag)){
					const parts = tag.substring(this.app.plugins.getPlugin('rpg-manager').settings.adventureTag.length + 1).split('/');
					if (parts.length === 2){
						if (type === DataType.Campaign){
							response = parts[0];
						} else if (type === DataType.Adventure){
							response = parts[1];
						}
					} else if (parts.length === 1 && type === DataType.Adventure){
						response = parts[0];
					}
				} else if (tag.startsWith(this.app.plugins.getPlugin('rpg-manager').settings.sessionTag) || tag.startsWith(this.app.plugins.getPlugin('rpg-manager').settings.noteTag)){
					let parts: Array<string>;
					if (tag.startsWith(this.app.plugins.getPlugin('rpg-manager').settings.sessionTag)) {
						parts = tag.substring(this.app.plugins.getPlugin('rpg-manager').settings.sessionTag.length + 1).split('/');
					} else {
						parts = tag.substring(this.app.plugins.getPlugin('rpg-manager').settings.noteTag.length + 1).split('/');
					}
					if (parts.length === 3){
						if (type === DataType.Campaign){
							response = parts[0];
						} else if (type === DataType.Adventure){
							response = parts[1];
						} else if (type === DataType.Session){
							response = parts[2];
						}
					} else if (parts.length === 2){
						if (type === DataType.Adventure){
							response = parts[0];
						} else if (type === DataType.Session){
							response = parts[1];
						}
					}
				} else if (tag.startsWith(this.app.plugins.getPlugin('rpg-manager').settings.sceneTag)){
					const parts = tag.substring(this.app.plugins.getPlugin('rpg-manager').settings.sceneTag.length + 1).split('/');
					if (parts.length === 4){
						if (type === DataType.Campaign){
							response = parts[0];
						} else if (type === DataType.Adventure){
							response = parts[1];
						} else if (type === DataType.Session){
							response = parts[2];
						} else if (type === DataType.Scene){
							response = parts[3]
						}
					} else if (parts.length === 3){
						if (type === DataType.Adventure){
							response = parts[0];
						} else if (type === DataType.Session){
							response = parts[1];
						} else if (type === DataType.Scene) {
							response = parts[2]
						}
					}
				} else {
					let tagLength = 0;
					if (tag.startsWith(this.app.plugins.getPlugin('rpg-manager').settings.npcTag)) {
						tagLength = this.app.plugins.getPlugin('rpg-manager').settings.npcTag.length;
					} else if (tag.startsWith(this.app.plugins.getPlugin('rpg-manager').settings.pcTag)) {
						tagLength = this.app.plugins.getPlugin('rpg-manager').settings.pcTag.length;
					} else if (tag.startsWith(this.app.plugins.getPlugin('rpg-manager').settings.eventTag)) {
						tagLength = this.app.plugins.getPlugin('rpg-manager').settings.eventTag.length;
					} else if (tag.startsWith(this.app.plugins.getPlugin('rpg-manager').settings.factionTag)) {
						tagLength = this.app.plugins.getPlugin('rpg-manager').settings.factionTag.length;
					} else if (tag.startsWith(this.app.plugins.getPlugin('rpg-manager').settings.locationTag)) {
						tagLength = this.app.plugins.getPlugin('rpg-manager').settings.locationTag.length;
					} else if (tag.startsWith(this.app.plugins.getPlugin('rpg-manager').settings.clueTag)) {
						tagLength = this.app.plugins.getPlugin('rpg-manager').settings.clueTag.length;
					} else if (tag.startsWith(this.app.plugins.getPlugin('rpg-manager').settings.timelineTag)) {
						tagLength = this.app.plugins.getPlugin('rpg-manager').settings.timelineTag.length;
					} else if (tag.startsWith(this.app.plugins.getPlugin('rpg-manager').settings.noteTag)) {
						tagLength = this.app.plugins.getPlugin('rpg-manager').settings.noteTag.length;
					}

					if (tagLength !== 0 && tag.length > tagLength && type === DataType.Campaign){
						response = tag.substring(tagLength+1);
					}
				}
			}
		});

		if (response === ''){
			throw new Error();
		}

		return +response;
	}

	public formatTime(
		date: Date|null
	): string {
		if (date == null) return '';

		const hours = date.getHours();
		const minutes = date.getMinutes();

		return (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes);
	}
}
