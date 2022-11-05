import {AbstractModel} from "../../../managers/modelsManager/abstracts/AbstractModel";
import {EventDataInterface} from "../interfaces/EventDataInterface";
import {EventMetadataInterface} from "../interfaces/EventMetadataInterface";
import {DateInterface} from "../../../services/dateService/interfaces/DateInterface";
import {DateService} from "../../../services/dateService/DateService";
import {FantasyCalendarCategory} from "../../../services/fantasyCalendarService/enums/FantasyCalendarCategory";

export abstract class AbstractEventData extends AbstractModel implements EventDataInterface {
	protected metadata: EventMetadataInterface;

	get date(): DateInterface | undefined {
		return this.api.service(DateService).getDate(
			this.metadata.data?.date,
			FantasyCalendarCategory.Event,
			this,
		);
	}
}
