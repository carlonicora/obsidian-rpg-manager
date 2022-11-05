import {AbstractModel} from "../../../managers/modelsManager/abstracts/AbstractModel";
import {ClueDataInterface} from "../interfaces/ClueDataInterface";
import {ClueMetadataInterface} from "../interfaces/ClueMetadataInterface";
import {DateInterface} from "../../../services/dateService/interfaces/DateInterface";
import {DateService} from "../../../services/dateService/DateService";
import {FantasyCalendarCategory} from "../../../services/fantasyCalendarService/enums/FantasyCalendarCategory";

export abstract class AbstractClueData extends AbstractModel implements ClueDataInterface {
	protected metadata: ClueMetadataInterface;

	public get found(): DateInterface | undefined {
		if (this.metadata.data?.found === undefined || this.metadata.data.found === false)
			return undefined;

		if (typeof this.metadata.data.found === 'boolean')
			return undefined;

		return this.api.service(DateService).getDate(
			this.metadata.data?.found,
			FantasyCalendarCategory.ClueFound,
			this,
		);
	}
}
