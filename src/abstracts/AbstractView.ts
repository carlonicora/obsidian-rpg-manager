import {ItemView, View, WorkspaceLeaf} from "obsidian";

export abstract class AbstractView extends ItemView implements View {
	protected viewType: string;
	protected displayText: string;

	public constructor(
		leaf: WorkspaceLeaf,
	) {
		super(leaf);
	}

	public abstract initialise(
		params: Array<any>,
	): void;

	public getViewType(): string {
		return this.viewType;
	}

	public getDisplayText(): string {
		return this.displayText;
	}

	protected async onOpen(
	): Promise<void> {
		const container = this.containerEl.children[1];
		container.empty();
		container.createEl("h2", { text: this.displayText });
	}

	public abstract render(
	): Promise<void>;

	protected async onClose(
	): Promise<void> {
	}
}
