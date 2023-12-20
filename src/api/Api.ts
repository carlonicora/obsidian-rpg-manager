import { App } from "obsidian";
import { ElementType } from "react";
import { Database } from "src/database/Database";
import { Element } from "src/interfaces/Element";
import { RPGManager } from "src/interfaces/RPGManager";
import { Relationship } from "src/interfaces/Relationship";

export class Api implements RPGManager {
	private _db: Database;

	constructor(private _app: App) {
		this._db = new Database(this._app, this);
	}

	async initialise(): Promise<void> {
		await this._db.initialise();
	}

	async persist(): Promise<void> {
		await this._db.persist();
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
		return this._db.db.relationships.filter((relationship: Relationship) => relationship.from.id === element.id);
	}
}
