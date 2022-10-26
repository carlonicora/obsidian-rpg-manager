export interface AllComponentManipulatorServiceInterface {
	updateRelationshipPath(
		oldPath: string,
		newPath: string,
	): Promise<void>;

	updateImagePath(
		oldPath: string,
		newPath: string,
	): Promise<void>;
}
