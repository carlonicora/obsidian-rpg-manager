import { App, TFile } from "obsidian";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import { Element } from "src/data/classes/Element";
import { RelationshipType } from "src/data/enums/RelationshipType";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { RelationshipInterface } from "src/data/interfaces/RelationshipInterface";
import { RpgManagerCodeblockService } from "src/services/RpgManagerCodeblockService";
import { RelationshipFactory } from "./RelationshipFactory";

export class ElementFactory {
	static async createElement(app: App, api: RpgManagerInterface, file: TFile): Promise<ElementInterface> {
		const codeblockService = new RpgManagerCodeblockService(app, api, file);

		const rpgManagerBlock: any | undefined = await codeblockService.readCodeblock();

		if (rpgManagerBlock === undefined || rpgManagerBlock.id === undefined || rpgManagerBlock.id.type === undefined)
			return undefined;

		const response: ElementInterface = new Element(api, file, rpgManagerBlock);
		response.metadata = codeblockService.metadata;

		if (rpgManagerBlock.relationships != undefined && rpgManagerBlock.relationships.length > 0) {
			rpgManagerBlock.relationships.forEach((relationshipDefinition: any) => {
				const newRelationship: RelationshipInterface | undefined =
					RelationshipFactory.createFromRpgManagerBlock(relationshipDefinition);

				if (newRelationship !== undefined) response.relationships.push(newRelationship);
			});
		}

		const relationships: RelationshipInterface[] = await codeblockService.readInContentRelationships();

		if (response.path === "Campaigns/Æther/05. Locations/Europe/United Kingdom/London/Carlton Club.md")
			console.warn(relationships);

		relationships.forEach((relationship: RelationshipInterface) => {
			if (relationship.path === response.path) return;
			const existingRelationship: RelationshipInterface | undefined = response.relationships.find(
				(existingRelationship: RelationshipInterface) => existingRelationship.path === relationship.path
			);
			if (existingRelationship === undefined) {
				response.relationships.push(relationship);
			} else {
				existingRelationship.isAlsoInContent = true;
			}
		});

		return response;
	}

	static async updateElement(app: App, api: RpgManagerInterface, element: ElementInterface): Promise<void> {
		const codeblockService = new RpgManagerCodeblockService(app, api, element.file);

		const rpgManagerBlock: any | undefined = await codeblockService.readCodeblock();

		if (rpgManagerBlock === undefined || rpgManagerBlock.id === undefined || rpgManagerBlock.id.type === undefined)
			return undefined;

		element.codeblock = rpgManagerBlock;
		element.metadata = codeblockService.metadata;

		let areRelationshipChanged = false;

		if (rpgManagerBlock.relationships != undefined && rpgManagerBlock.relationships.length > 0) {
			rpgManagerBlock.relationships.forEach((relationshipDefinition: any) => {
				const foundRelationship: RelationshipInterface | undefined = element.relationships.find(
					(relationship: RelationshipInterface) => relationship.path === relationshipDefinition.path
				);

				if (foundRelationship === undefined) {
					const newRelationship: RelationshipInterface | undefined =
						RelationshipFactory.createFromRpgManagerBlock(relationshipDefinition);

					if (newRelationship !== undefined) {
						element.relationships.push(newRelationship);
						areRelationshipChanged = true;
					}
				} else {
					if (foundRelationship.description !== relationshipDefinition.description) areRelationshipChanged = true;
				}
			});
		}

		const relationships: RelationshipInterface[] = await codeblockService.readInContentRelationships();

		relationships.forEach((relationship: RelationshipInterface) => {
			const existingRelationship: RelationshipInterface | undefined = element.relationships.find(
				(existingRelationship: RelationshipInterface) => existingRelationship.path === relationship.path
			);
			if (existingRelationship === undefined) {
				areRelationshipChanged = true;
				element.relationships.push(relationship);
			} else {
				if (!existingRelationship.isAlsoInContent) {
					areRelationshipChanged = true;
					existingRelationship.isAlsoInContent = true;
				}
			}
		});

		const existingRelationships: RelationshipInterface[] = element.relationships.filter(
			(existingRelationship: RelationshipInterface) => existingRelationship.isInContent
		);
		const inContentRelationshipPaths = new Set(
			relationships.filter((relationship: RelationshipInterface) => relationship.isInContent).map((r) => r.path)
		);

		const pathsToRemove = new Set(
			existingRelationships
				.filter((r) => !inContentRelationshipPaths.has(r.path))
				.map((r: RelationshipInterface) => r.path)
		);
		element.relationships = element.relationships.filter(
			(relationship) => relationship.type === RelationshipType.Reversed || !pathsToRemove.has(relationship.path)
		);

		const allExistingRelationships = new Set(relationships.map((r: RelationshipInterface) => r.path));
		if (rpgManagerBlock.relationships !== undefined && rpgManagerBlock.relationships.length > 0) {
			rpgManagerBlock.relationships.forEach((relationshipDefinition: any) =>
				allExistingRelationships.add(relationshipDefinition.path)
			);
		}

		const relationshipsToBeRemoved = element.relationships.filter(
			(relationship: RelationshipInterface) =>
				relationship.type !== RelationshipType.Reversed && !allExistingRelationships.has(relationship.path)
		);

		if (relationshipsToBeRemoved.length !== 0) {
			element.relationships = element.relationships.filter((relationship: RelationshipInterface) =>
				allExistingRelationships.has(relationship.path)
			);
			areRelationshipChanged = true;
		}

		if (areRelationshipChanged) element.touch();
	}

	static initialiseRelationships(element: ElementInterface, elements: ElementInterface[]): void {
		if (element.campaign === undefined && element.campaignPath !== undefined)
			element.campaign = elements.find(
				(elementInList: ElementInterface) => elementInList.path === element.campaignPath
			);

		if (
			element.parent === undefined ||
			(element.parentPath !== undefined && element.parent.file.path !== element.parentPath)
		)
			element.parent = elements.find((elementInList: ElementInterface) => elementInList.path === element.parentPath);

		element.relationships.forEach((relationship: RelationshipInterface) => {
			const targetElement: ElementInterface | undefined = elements.find(
				(element: ElementInterface) => element.path === relationship.path
			);
			if (targetElement !== undefined && targetElement.path !== element.path) {
				relationship.component = targetElement;

				const reverseRelationship: RelationshipInterface | undefined = targetElement.relationships.find(
					(relationship: RelationshipInterface) => relationship.path === element.path
				);

				if (reverseRelationship === undefined) {
					const reverseRelationship: RelationshipInterface | undefined = RelationshipFactory.createFromReverse(
						relationship,
						element
					);
					if (reverseRelationship !== undefined) targetElement.relationships.push(reverseRelationship);
				} else if (
					relationship.type === RelationshipType.Parent &&
					reverseRelationship.type !== RelationshipType.Child
				) {
					reverseRelationship.type = RelationshipType.Child;
				}
			}
		});
	}

	static updateRelationships(
		element: ElementInterface,
		elements: ElementInterface[],
		updateReverseRelationships: boolean
	): void {
		ElementFactory.initialiseRelationships(element, elements);

		let touch = false;

		elements.forEach((elementInList: ElementInterface) => {
			const reverseRelationship: RelationshipInterface | undefined = elementInList.relationships.find(
				(relationship: RelationshipInterface) => relationship.path === element.path
			);
			const existingRelationship: RelationshipInterface | undefined = element.relationships.find(
				(relationship: RelationshipInterface) => relationship.path === elementInList.path
			);

			if (reverseRelationship !== undefined && existingRelationship === undefined) {
				const newRelationship = RelationshipFactory.createFromReverse(reverseRelationship, elementInList);

				if (newRelationship !== undefined) {
					element.relationships.push(newRelationship);
					touch = true;
				}
			}
		});

		if (touch) element.touch();

		if (updateReverseRelationships)
			elements.forEach((relatedElement: ElementInterface) => {
				if (
					relatedElement.relationships.some((relationship: RelationshipInterface) => relationship.path === element.path)
				)
					relatedElement.touch();
			});
	}

	static async updateFileRelationships(
		app: App,
		api: RpgManagerInterface,
		file: TFile,
		elements: ElementInterface[]
	): Promise<void> {
		const element: ElementInterface = elements.find((element: ElementInterface) => element.path === file.path);
		const codeblockService = new RpgManagerCodeblockService(app, api, file);

		codeblockService.updateRelationshipInContent(element.relationships);
	}
}
