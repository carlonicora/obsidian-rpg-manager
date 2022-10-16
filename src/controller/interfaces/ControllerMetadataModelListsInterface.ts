import {ControllerMetadataModelElementInterface} from "./ControllerMetadataModelElementInterface";

export interface ControllerMetadataModelListsInterface {
	adventures?: ControllerMetadataModelElementInterface;
	acts?: ControllerMetadataModelElementInterface;
	scenes?: ControllerMetadataModelElementInterface;
	sessions?: ControllerMetadataModelElementInterface;
	pcs?: ControllerMetadataModelElementInterface;
	npcs?: ControllerMetadataModelElementInterface;
	clues?: ControllerMetadataModelElementInterface|ControllerMetadataModelElementInterface[];
	events?: ControllerMetadataModelElementInterface|ControllerMetadataModelElementInterface[];
	factions?: ControllerMetadataModelElementInterface|ControllerMetadataModelElementInterface[];
	locations?: ControllerMetadataModelElementInterface|ControllerMetadataModelElementInterface[];
	musics?: ControllerMetadataModelElementInterface|ControllerMetadataModelElementInterface[];
	subplots?: ControllerMetadataModelElementInterface|ControllerMetadataModelElementInterface[];
}
