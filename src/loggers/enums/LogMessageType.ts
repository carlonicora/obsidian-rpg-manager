export enum LogMessageType {
	System=0b1,
	Database=0b10,
	DatabaseInitialisation=0b100,
	ComponentInitialisation=0b1000,
	Updater=0b10000,
	TagUpdates=0b100000,
	SessionSceneLink=0b1000000,
	Model=0b1000000,
	TagManagement=0b10000000,
	Performance=0b100000000,
}
