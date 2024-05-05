import { App, TFile } from "obsidian";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { ElementFactory } from "./ElementFactory";

export class DatabaseFactory {
  static async create(
    app: App,
    api: RpgManagerInterface,
  ): Promise<ElementInterface[]> {
    const response: (ElementInterface | undefined)[] = [];

    const elementPromises = app.vault.getMarkdownFiles().map((file) =>
      ElementFactory.createElement(app, api, file)
        .then((element: ElementInterface | undefined) => {
          return element;
        })
        .catch((error) => {
          console.error(error);
          return undefined;
        }),
    );

    const elements = await Promise.all(elementPromises);

    elements
      .filter((element) => element !== undefined)
      .forEach((element) => response.push(element));

    response.map((element) =>
      ElementFactory.initialiseRelationships(element, response),
    );

    return response;
  }

  static async add(
    app: App,
    api: RpgManagerInterface,
    elements: ElementInterface[],
    file: TFile,
  ): Promise<ElementInterface[]> {
    const element: ElementInterface | undefined =
      await ElementFactory.createElement(app, api, file);
    if (element === undefined) return elements;

    elements.push(element);

    ElementFactory.initialiseRelationships(element, elements);

    return elements;
  }

  static async update(
    app: App,
    api: RpgManagerInterface,
    elements: ElementInterface[],
    element: ElementInterface,
  ): Promise<void> {
    const previousVersion: number = element.version;
    await ElementFactory.updateElement(app, api, element);
    //TODO: When I remove a relationship, the relationship is not removed from the element
    ElementFactory.updateRelationships(
      element,
      elements,
      previousVersion !== element.version,
    );
  }

  static async rename(
    app: App,
    api: RpgManagerInterface,
    elements: ElementInterface[],
    element: ElementInterface,
    oldPath: string,
  ): Promise<void> {
    // const elementPromises = elements.map((existingElement: ElementInterface) => {
    // 	let isElementToBeRenamed = false;
    // 	if (existingElement.parentPath === oldPath || existingElement.campaignPath === oldPath)
    // 		isElementToBeRenamed = true;
    // 	const relationshipToRenamedElement: RelationshipInterface | undefined = existingElement.relationships.find(
    // 		(relationship: RelationshipInterface) => relationship.path === oldPath
    // 	);
    // 	if (relationshipToRenamedElement !== undefined) {
    // 		relationshipToRenamedElement.path = element.path;
    // 		isElementToBeRenamed = true;
    // 	}
    // 	if (!isElementToBeRenamed) return undefined;
    // 	return existingElement;
    // });
    // const allElements = await Promise.all(elementPromises);
    // const elementsToUpdate: ElementInterface[] = allElements.filter(
    // 	(element: ElementInterface) => element !== undefined
    // ) as ElementInterface[];
    // const updatedElements = elementsToUpdate.map((elementToUpdate: ElementInterface) => {
    // 	const codeblockService = new RpgManagerCodeblockService(app, api, elementToUpdate.file);
    // 	return codeblockService.updateRelationshipsPaths(element.file, oldPath);
    // });
    // await Promise.all(updatedElements);
  }
}
