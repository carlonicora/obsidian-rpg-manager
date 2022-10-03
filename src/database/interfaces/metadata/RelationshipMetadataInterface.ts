export interface RelationshipMetadataInterface {
	type: 'univocal' | 'biunivocal' | 'reversed' | 'parent' | 'child' | 'hierarchy' | string,
	path: string,
	description?: string|undefined,
}
