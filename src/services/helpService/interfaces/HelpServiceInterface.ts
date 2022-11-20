export interface HelpServiceInterface {
	add(
		containerEl: HTMLDivElement,
		description: string,
	): Promise<void>;
}
