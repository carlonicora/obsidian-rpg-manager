import {ControllerMetadataModelElementInterface} from "./ControllerMetadataModelElementInterface";

export interface ControllerMetadataModelListsInterface {
	adventures?: ControllerMetadataModelElementInterface;
	acts?: ControllerMetadataModelElementInterface;
	scenes?: ControllerMetadataModelElementInterface;
	sessions?: ControllerMetadataModelElementInterface;
	pcs?: ControllerMetadataModelElementInterface;
	npcs?: ControllerMetadataModelElementInterface;
	clues?: ControllerMetadataModelElementInterface|Array<ControllerMetadataModelElementInterface>;
	events?: ControllerMetadataModelElementInterface|Array<ControllerMetadataModelElementInterface>;
	factions?: ControllerMetadataModelElementInterface|Array<ControllerMetadataModelElementInterface>;
	locations?: ControllerMetadataModelElementInterface|Array<ControllerMetadataModelElementInterface>;
	musics?: ControllerMetadataModelElementInterface|Array<ControllerMetadataModelElementInterface>;
	subplots?: ControllerMetadataModelElementInterface|Array<ControllerMetadataModelElementInterface>;
}
