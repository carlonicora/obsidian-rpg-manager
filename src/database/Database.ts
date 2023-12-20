import { App, TAbstractFile, TFile } from "obsidian";
import { Api } from "src/api/Api";
import { ElementFactory } from "src/factories/ElementFactory";
import { RelationshipFactory } from "src/factories/RelationshipFactory";
import { DatabaseStructure } from "src/interfaces/DatabaseStructure";
import { Element } from "src/interfaces/Element";
import { ElementData } from "src/interfaces/ElementData";
import { Relationship } from "src/interfaces/Relationship";
import { RelationshipData } from "src/interfaces/RelationshipData";

export class Database {
	public db: DatabaseStructure;
	private _databaseFile: string;

	constructor(private _app: App, private _api: Api) {
		this.db = {
			elements: [],
			relationships: [],
		};
		this._databaseFile = `${this._app.vault.configDir}/plugins/rpg-manager/rpgm.json`;

		this._app.metadataCache.on("resolve", (file: TFile) => {
			this._savedFile(file);
		});
		this._app.vault.on("delete", (file: TFile) => {
			this._deletedFile(file);
		});
		this._app.vault.on("rename", (file: TAbstractFile, oldPath: string) => {
			this._renamedFile(file, oldPath);
		});
	}

	async initialise(): Promise<void> {
		const databaseFile = await this._app.vault.adapter.exists(this._databaseFile);
		let data: { elements: ElementData[]; relationships: RelationshipData[] };
		if (databaseFile) {
			data = JSON.parse(await this._app.vault.adapter.read(this._databaseFile));
		} else {
			await this._app.vault.adapter.write(this._databaseFile, JSON.stringify(this.db));
			data = { elements: [], relationships: [] };
		}

		data.elements.forEach((elementData: ElementData) => {
			this.db.elements.push(ElementFactory.create(elementData, this._app, this._api));
		});

		data.relationships.forEach((relationshipData: any) => {
			this.db.relationships.push(...RelationshipFactory.create(relationshipData, this._api));
		});
	}

	async persist(): Promise<void> {
		const data: { elements: ElementData[]; relationships: RelationshipData[] } = { elements: [], relationships: [] };

		this.db.elements.forEach((element: Element) => {
			data.elements.push(element.data);
		});

		const relationshipIds: string[] = [];
		this.db.relationships.forEach((relationship: Relationship) => {
			if (relationshipIds.includes(relationship.id)) return;
			data.relationships.push(relationship.data);
			relationshipIds.push(relationship.id);
		});

		await this._app.vault.adapter.write(this._databaseFile, JSON.stringify(data));
	}

	private async _savedFile(file: TFile): Promise<void> {}

	private async _renamedFile(file: TAbstractFile, oldPath: string): Promise<void> {}

	private async _deletedFile(file: TFile): Promise<void> {}
}
