import {AbstractRecord} from "./AbstractRecord";
import {RecordInterface} from "../../interfaces/database/RecordInterface";
import {DataId} from "../../interfaces/DataId";
import {App, TFile} from "obsidian";
import {DataType} from "../../enums/DataType";
import {DatabaseInterface} from "../../interfaces/database/DatabaseInterface";
import {ElementDuplicatedError} from "../../errors/ElementDuplicatedError";

export abstract class AbstractOutlineRecord extends AbstractRecord implements RecordInterface{
	public isOutline = true;
	public dataId: DataId;

	constructor(
		app: App,
		tag: string,
		type: DataType,
		file: TFile,
	) {
		super(app, tag, type, file);

		this.dataId = {
			dataType: this.type,
			campaignId: app.plugins.getPlugin('rpg-manager').tagManager.getId(DataType.Campaign, tag),
			adventureId: app.plugins.getPlugin('rpg-manager').tagManager.getOptionalId(DataType.Adventure, tag),
			sessionId: app.plugins.getPlugin('rpg-manager').tagManager.getOptionalId(DataType.Session, tag),
			sceneId: app.plugins.getPlugin('rpg-manager').tagManager.getOptionalId(DataType.Scene, tag),
		}
	}

	public checkDuplicates(
		database: DatabaseInterface,
	): void {
		const query = (data: RecordInterface) => data.dataId === this.dataId;
		const elements = database.read(query);

		if (elements.length > 0) throw new ElementDuplicatedError(this.app, this.type, this.tag);
	}
}
