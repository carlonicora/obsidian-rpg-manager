export interface RelationshipMetadataInterface {
	type: 'univocal' | 'biunivocal' | 'parent' | string,
	path: string,
	description?: string|undefined,
}
