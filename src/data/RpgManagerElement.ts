import { App, TAbstractFile, TFile } from "obsidian";
import { ElementType } from "src/enums/ElementType";
import { AttributeFactory } from "src/factories/AttributeFactory";
import { Attribute } from "src/interfaces/Attribute";
import { Element } from "src/interfaces/Element";
import { ElementData } from "src/interfaces/ElementData";
import { RPGManager } from "src/interfaces/RPGManager";
import { Relationship } from "src/interfaces/Relationship";

export class RpgManagerElement implements Element {
	private _file: TFile;
	private _version: number = 0;

	constructor(public data: ElementData, private _app: App, private _api: RPGManager) {
		const file: TAbstractFile | null = this._app.vault.getAbstractFileByPath(this.data.path);
		if (file == null) throw new Error(`File not found: ${this.data.path}`);

		if (file instanceof TFile) this._file = file;
		else throw new Error(`File not found: ${this.data.path}`);
	}

	get id(): string {
		return this.data.id;
	}

	get path(): string {
		return this.data.path;
	}

	set path(path: string) {
		this.data.path = path;
		this._file = this._app.vault.getAbstractFileByPath(this.data.path) as TFile;
	}

	get type(): ElementType {
		return this.data.type;
	}

	get campaign(): Element | undefined {
		if (!this.data.campaignId) return undefined;

		return this._api.getById(this.data.campaignId);
	}

	get parent(): Element | undefined {
		if (!this.data.parentId) return undefined;

		return this._api.getById(this.data.parentId);
	}

	get positionInParent(): number | undefined {
		return this.data.positionInParent;
	}

	get name(): string {
		return this._file.basename;
	}

	get version(): number {
		return this._version;
	}

	get relationships(): Relationship[] {
		return this._api.getRelationships(this);
	}

	get attributes(): Attribute[] {
		return AttributeFactory.createList(this.type, this.data.attributes);
	}

	attribute(id: string): Attribute {
		return AttributeFactory.create(id, this.data.attributes[id]);
	}
}
