export interface DatabaseUpdaterReporterInterface {
	setUpdater(
		startVersion: string,
		endVersion: string,
	): Promise<void>;

	setFileCount(
		count: number
	): Promise<void>;

	addFileUpdated(
	): Promise<void>;

	refreshFileCount(
	): Promise<void>;
}
