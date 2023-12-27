import { App, TAbstractFile, TFile } from "obsidian";
import { Api } from "src/api/Api";
import { ElementFactory } from "src/factories/ElementFactory";
import { RelationshipFactory } from "src/factories/RelationshipFactory";
import { ServiceFactory } from "src/factories/ServiceFactory";
import { DatabaseStructure } from "src/interfaces/DatabaseStructure";
import { Element } from "src/interfaces/Element";
import { ElementData } from "src/interfaces/ElementData";
import { Relationship } from "src/interfaces/Relationship";
import { RelationshipData } from "src/interfaces/RelationshipData";
import { Service } from "src/interfaces/Service";
import { FileRelationship, FileRelationshipService } from "src/services/FileRelationshipsService";
import { RelationshipsService } from "src/services/RelationshipsService";

export class DatabaseService implements Service {
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
			this.db.relationships.push(RelationshipFactory.create(relationshipData, this._api));
		});
	}

	async persist(): Promise<void> {
		const data: { elements: ElementData[]; relationships: RelationshipData[] } = { elements: [], relationships: [] };

		this.db.elements.forEach((element: Element) => {
			data.elements.push(element.data);
		});

		this.db.relationships.forEach((relationship: Relationship) => {
			data.relationships.push(relationship.data);
		});

		await this._app.vault.adapter.write(this._databaseFile, JSON.stringify(data));
	}

	private async _savedFile(file: TFile): Promise<void> {
		const fileRelationshipsService: FileRelationshipService = await ServiceFactory.create(
			FileRelationshipService,
			this._app,
			file
		);
		const relationshipsService: RelationshipsService = await ServiceFactory.create(
			RelationshipsService,
			this._app,
			this._api,
			file
		);

		const fileRelationships: FileRelationship[] = fileRelationshipsService.getFrontmatterAndContentRelationships();
		const haveRelationshipsChanged: boolean = relationshipsService.createOrUpdateRelationshipsFromFileRelationships(
			this.db.relationships,
			fileRelationships
		);

		if (haveRelationshipsChanged) await this.persist();
	}

	private async _renamedFile(file: TAbstractFile, oldPath: string): Promise<void> {
		const element: Element | undefined = this.db.elements.find((element: Element) => element.path === oldPath);
		if (!element) return;

		element.path = file.path;
		await this.persist();
	}

	private async _deletedFile(file: TFile): Promise<void> {
		const element: Element | undefined = this.db.elements.find((element: Element) => element.path === file.path);
		if (!element) return;

		this.db.elements = this.db.elements.filter((element: Element) => element.path !== file.path);
		this.db.relationships = this.db.relationships.filter(
			(relationship: Relationship) => relationship.from.path !== file.path && relationship.to.path !== file.path
		);
		await this.persist();
	}
}
