export interface ControllerMetadataRelationshipInterface {
	type: 'unidirectional' | 'bidirectional' | 'child' | string,
	path: string,
	description?: string|undefined,
	isInContent?: boolean,
}
