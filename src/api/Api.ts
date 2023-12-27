import { App } from "obsidian";
import { ElementType } from "src/enums/ElementType";
import { ServiceFactory } from "src/factories/ServiceFactory";
import { Element } from "src/interfaces/Element";
import { RPGManager } from "src/interfaces/RPGManager";
import { Relationship } from "src/interfaces/Relationship";
import { DatabaseService } from "src/services/DatabaseService";

export class Api implements RPGManager {
	private _db: DatabaseService;

	constructor(private _app: App) {}

	async persist(): Promise<void> {
		await this._db.persist();
	}

	async initialise(): Promise<void> {
		this._db = await ServiceFactory.create(DatabaseService, this._app, this);
	}

	async add(element: Element): Promise<void> {
		this._db.db.elements.push(element);
		await this.persist();
	}

	getById(id: string): Element | undefined {
		return this._db.db.elements.find((element: Element) => element.id === id);
	}

	getByPath(path: string): Element | undefined {
		return this._db.db.elements.find((element: Element) => element.path === path);
	}

	getChildren(root: Element, type: ElementType): Element[] {
		return this._db.db.elements.filter((element: Element) => element?.parent?.id === root.id && element.type === type);
	}

	getRelationships(element: Element): Relationship[] {
		return this._db.db.relationships.filter(
			(relationship: Relationship) => relationship.from.id === element.id || relationship.from.id === element.id
		);
	}
}
