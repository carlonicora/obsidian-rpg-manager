import {DataType} from "../enums/DataType";

export interface DataId {
	dataType: DataType,
	campaignId: number,
	adventureId: number|undefined,
	sessionId: number|undefined,
	sceneId: number|undefined,
}
