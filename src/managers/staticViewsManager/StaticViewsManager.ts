import {StaticViewsManagerInterface} from "./interfaces/StaticViewsManagerInterface";
import {StaticViewType} from "./enums/StaticViewType";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";
import {WorkspaceLeaf} from "obsidian";
import {AbstractStaticView} from "./abstracts/AbstractStaticView";

export class StaticViewsManager implements StaticViewsManagerInterface {
	private _showInRightLeaf: Map<StaticViewType, boolean> = new Map<StaticViewType, boolean>([
		[StaticViewType.RPGManager, true],
		[StaticViewType.Timeline, false],
		[StaticViewType.Errors, true],
		[StaticViewType.ReleaseNote, false],
	]);

	constructor(
		private _api: RpgManagerApiInterface,
	) {
	}

	public async create(
		type: StaticViewType,
		params: any[] = [],
	): Promise<void> {
		this._api.app.workspace.detachLeavesOfType(type.toString());

		const showInRightLeaf: boolean|undefined = this._showInRightLeaf.get(type);

		if (showInRightLeaf === true || showInRightLeaf === undefined) {
			await this._api.app.workspace.getRightLeaf(false).setViewState({
				type: type.toString(),
				active: true,
			});
		} else {
			await this._api.app.workspace.getLeaf(true).setViewState({
				type: type.toString(),
				active: true,
			});
		}

		const leaf: WorkspaceLeaf = this._api.app.workspace.getLeavesOfType(type.toString())[0];
		const view: AbstractStaticView = leaf.view as AbstractStaticView;

		this._api.app.workspace.revealLeaf(leaf);

		view.initialise(params);
		view.render();
	}

	async createGeneric(
		type: string,
		inRightSplit: boolean,
		params: any[] = [],
	): Promise<void> {
		this._api.app.workspace.detachLeavesOfType(type);
		if (inRightSplit === true) {
			await this._api.app.workspace.getRightLeaf(false).setViewState({
				type: type,
				active: true,
			});
		} else {
			await this._api.app.workspace.getLeaf(true).setViewState({
				type: type,
				active: true,
			});
		}

		const leaf: WorkspaceLeaf = this._api.app.workspace.getLeavesOfType(type.toString())[0];
		const view: AbstractStaticView = leaf.view as AbstractStaticView;

		this._api.app.workspace.revealLeaf(leaf);

		view.initialise(params);
		view.render();
	}
}
