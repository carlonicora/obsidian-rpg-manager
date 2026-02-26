import { App, TFile } from "obsidian";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { RelationshipInterface } from "src/data/interfaces/RelationshipInterface";
import { RpgManagerCodeblockService } from "src/services/RpgManagerCodeblockService";
import { ElementFactory } from "./ElementFactory";

export class DatabaseFactory {
	/**
	 * Creates a new database of elements.
	 * @param {App} app - The Obsidian app.
	 * @param {RpgManagerInterface} api - The RPG Manager API.
	 * @returns {Promise<ElementInterface[]>} - A promise that resolves to the created elements.
	 */
	static async create(app: App, api: RpgManagerInterface): Promise<ElementInterface[]> {
		const response: (ElementInterface | undefined)[] = [];

		const elementPromises = app.vault.getMarkdownFiles().map((file: any) =>
			ElementFactory.createElement(app, api, file)
				.then((element: ElementInterface | undefined) => {
					return element;
				})
				.catch((error) => {
					console.warn(error);
					return undefined;
				})
		);

		const elements = await Promise.all(elementPromises);

		elements.filter((element: any) => element !== undefined).forEach((element: ElementInterface) => response.push(element));

		response.map((element) => ElementFactory.initialiseRelationships(element, response));

		return response;
	}

	/**
	* Adds a new element to the database.
	* @param {App} app - The Obsidian app.
	* @param {RpgManagerInterface} api - The RPG Manager API.
	* @param {ElementInterface[]} elements - The existing elements in the database.
	* @param {TFile} file - The file that contains the new element.
	* @returns {Promise<ElementInterface[]>} - A promise that resolves to the updated elements.
	*/
	static async add(
		app: App,
		api: RpgManagerInterface,
		elements: ElementInterface[],
		file: TFile
	): Promise<ElementInterface[]> {
		const element: ElementInterface | undefined = await ElementFactory.createElement(app, api, file);
		if (element === undefined) return elements;

		elements.push(element);

		ElementFactory.initialiseRelationships(element, elements);

		return elements;
	}

	/**
	 * Updates an existing element in the database.
	 * @param {App} app - The Obsidian app.
	 * @param {RpgManagerInterface} api - The RPG Manager API.
	 * @param {ElementInterface[]} elements - The existing elements in the database.element
	 * @param {ElementInterface} element - The element to update. 
	*/
	static async update(
		app: App,
		api: RpgManagerInterface,
		elements: ElementInterface[],
		element: ElementInterface
	): Promise<void> {
		const previousVersion: number = element.version;
		await ElementFactory.updateElement(app, api, element);
		ElementFactory.updateRelationships(element, elements, previousVersion !== element.version);
	}

	/**
	 * Renames an existing element in the database.
	 * @param {App} app - The Obsidian app.
	 * @param {RpgManagerInterface} api - The RPG Manager API.
	 * @param {ElementInterface[]} elements - The existing elements in the database.
	 * @param {ElementInterface} element - The element to rename.
	 * @param {string} oldPath - The old path of the element. 
	 */
	static async rename(
		app: App,
		api: RpgManagerInterface,
		elements: ElementInterface[],
		element: ElementInterface,
		oldPath: string
	): Promise<void> {
		const elementPromises = elements.map((existingElement: ElementInterface) => {
			let isElementToBeRenamed = false;

			if (existingElement.parentPath === oldPath || existingElement.campaignPath === oldPath)
				isElementToBeRenamed = true;

			const relationshipToRenamedElement: RelationshipInterface | undefined = existingElement.relationships.find(
				(relationship: RelationshipInterface) => relationship.path === oldPath
			);

			if (relationshipToRenamedElement !== undefined) {
				relationshipToRenamedElement.path = element.path;
				isElementToBeRenamed = true;
			}

			if (!isElementToBeRenamed) return undefined;

			return existingElement;
		});

		const allElements = await Promise.all(elementPromises);

		const elementsToUpdate: ElementInterface[] = allElements.filter(
			(element: ElementInterface) => element !== undefined
		) as ElementInterface[];

		const updatedElements = elementsToUpdate.map((elementToUpdate: ElementInterface) => {
			const codeblockService = new RpgManagerCodeblockService(app, api, elementToUpdate.file);
			return codeblockService.updateRelationshipsPaths(element.file, oldPath);
		});

		await Promise.all(updatedElements);
	}
}