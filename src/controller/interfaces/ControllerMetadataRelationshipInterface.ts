export interface ControllerMetadataRelationshipInterface {
	type: 'unidirectional' | 'bidirectional' | 'child' | string | undefined,
	path: string,
	description?: string|undefined,
	isInContent?: boolean,
}
