export interface LinkSuggesterPopUpInterface {
	hide(): void;
	moveUp(): Promise<void>;
	moveDown(): Promise<void>;
	select(): void;
}
