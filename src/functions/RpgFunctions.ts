import {App, Component, TFile, TAbstractFile} from "obsidian";
import {Literal} from "obsidian-dataview/lib/data-model/value";
import {DateTime} from "obsidian-dataview";

declare module 'obsidian' {
	interface Vault {
		getAvailablePathForAttachments: (
			fileName: string,
			extension?: string,
			currentFile?: TFile
		) => Promise<string>;
		config: {
			attachmentFolderPath: string;
		};
	}
}

export class RpgFunctions extends Component {
	private root: string;
	private attachmentRoot: string;

	public static create(
		app: App,
	): RpgFunctions {
		return new RpgFunctions(app);
	}

	constructor(
		private app: App,
	) {
		super();
		this.initialiseRoots();
	}

	private initialiseRoots() {
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

		if (this.root === null){
			console.log('Rpg Manager failed to find the root folder!');
			return;
		}

		if (this.root.includes("?")){
			this.root = this.root.substring(0, this.root.lastIndexOf("?"));
		}

		for (let removedSlash=slashCount; removedSlash > 0; removedSlash--){
			this.root = this.root.slice(0,this.root.lastIndexOf('/'));
		}

		if (!this.root.endsWith("/")){
			this.root += "/";
		}

		this.attachmentRoot = this.root + this.app.vault.config.attachmentFolderPath + "/";
	}

	fileExists(path: string): boolean {
		const abstractFile = this.app.vault.getAbstractFileByPath(path);
		let response = false;

		if (abstractFile instanceof TAbstractFile) {
			response = (abstractFile ? true : false);
		}

		return response;
	}

	getImageLink(page: Record<string, Literal>|undefined){
		const imageExtensions = ["jpeg", "jpg", "png", "webp"];

		for (let extensionCount = 0; extensionCount < imageExtensions.length; extensionCount++){
			const fileName = this.app.vault.config.attachmentFolderPath + '/' + page?.file.name + '.' + imageExtensions[extensionCount];

			if (this.fileExists(fileName)){
				return this.root + fileName;
			}
		}

		return null;
	}

	getImage(page: Record<string, Literal>|undefined, width=75, height=75){
		let imageFile = null;

		if (page !== undefined) {
			imageFile = this.getImageLink(page);
		}

		let minimalDimensions = false;
		let dimensions = "width: " + width + "px; height: " + height + "px;";

		if (width !== 75 && height === 75){
			dimensions = "width: " + width + "px;";
		} else if (width === 75 && height !== 75){
			dimensions = "height: " + height + "px;";
		} else if (width === 75 && height === 75) {
			minimalDimensions = true;
		}

		if (imageFile === null) {
			if (!minimalDimensions){
				return "";
			} else {
				return "<div style=\"" + dimensions + "\"></div>";
			}
		}

		return "<img src=\"" + imageFile + "\" style=\"object-fit: cover;" + dimensions + "\">";
	}

	/**
	 * Return an ISO formatted date
	 *
	 * @param date
	 * @returns {string|*}
	 */
	formatDate(date: DateTime|undefined, type: string|null = null): string{
		if (!date || date === undefined) return "";

		let options = null;

		if (type === "long"){
			options = {
				day:  'numeric',
				month : 'long',
				year: 'numeric',
			};

			return date.toLocaleString(options);
		}

		if (type === "short"){
			options = {
				weekday: 'short',
				month : 'short',
				day:  'numeric',
				year: 'numeric',
			};
		}

		if (options !== null){
			return date.toLocaleString(options);
		} else {
			return date.toISODate();
		}
	}

	formatTime(date: DateTime|undefined){
		if (!date || date === undefined) return "";

		const options = {
			hour12 : false,
			hour:  "2-digit",
			minute: "2-digit",
		};

		return date.toLocaleString(options);
	}

	calculateDuration(start:DateTime, end:DateTime){
		if (!start || !end) return "";

		const dtStart = new Date(start);
		const dtEnd = new Date(end);

		const difference = dtEnd.valueOf() - dtStart.valueOf();

		const minutes = difference/60000;
		const remaining = (difference-(minutes*60000));
		const seconds = remaining > 0 ?  remaining/1000 : 0;

		return minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
	}

	getDeathStatus(page: Record<string, Literal>){
		return (page.dates.death !== null ? "<br/>_(Deceased " + this.formatDate(page.dates.death) + ")_ " : "");
	}

	calculateAge(
		page: Record<string, Literal>|undefined,
		currentDate: DateTime,
	): string {
		if (page === undefined) return "";

		if (!page?.dates.dob) return "";

		const end = page.dates.death || currentDate;

		const startDate = new Date(page.dates.dob);
		const endDate = new Date(end);

		const ageDifMs = endDate.valueOf() - startDate.valueOf();
		const ageDate = new Date(ageDifMs);

		return (Math.abs(ageDate.getUTCFullYear() - 1970)).toString();
	}
}
