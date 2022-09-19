import {ItemView, TFile, WorkspaceLeaf} from "obsidian";
import {RpgErrorInterface} from "../interfaces/RpgErrorInterface";

export const RPGM_ERROR_VIEW = 'rpgm-error-view';

export class ErrorView extends ItemView {
	private errors: Map<TFile, RpgErrorInterface>;

	constructor(
		leaf: WorkspaceLeaf,
	) {
		super(leaf);
		this.errors = new Map();
	}

	public initialise(
		errors: Map<TFile, RpgErrorInterface>
	): void {
		this.errors = errors;
	}

	public getViewType(
	): string {
		return RPGM_ERROR_VIEW;
	}

	public getDisplayText(
	): string {
		return "RPG Manager Errors";
	}

	protected async onOpen(
	): Promise<void> {
		const container = this.containerEl.children[1];
		container.empty();
		container.createEl("h4", { text: "Example view" });
	}

	protected async onClose(
	): Promise<void> {
	}
}
