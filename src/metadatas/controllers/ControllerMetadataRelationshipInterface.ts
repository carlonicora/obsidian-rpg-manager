export interface ControllerMetadataRelationshipInterface {
	type: 'univocal' | 'biunivocal' | 'child' | string,
	path: string,
	description?: string|undefined,
	isInContent?: boolean,
}
