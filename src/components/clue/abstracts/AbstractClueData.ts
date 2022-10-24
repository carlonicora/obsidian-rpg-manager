import {AbstractComponent} from "../../../core/abstracts/AbstractComponent";
import {ClueDataInterface} from "../interfaces/ClueDataInterface";
import {ClueMetadataInterface} from "../interfaces/ClueMetadataInterface";
import {DateHelper} from "../../../core/helpers/DateHelper";
import {DateInterface} from "../../../services/date/interfaces/DateInterface";
import {DateService} from "../../../services/date/DateService";

export abstract class AbstractClueData extends AbstractComponent implements ClueDataInterface {
	protected metadata: ClueMetadataInterface;

	public get found(): DateInterface | undefined {
		if (this.metadata.data?.found === undefined || this.metadata.data.found === false)
			return undefined;

		if (typeof this.metadata.data.found === 'boolean')
			return undefined;

		return this.api.services.get(DateService)?.getDate(
			this.metadata.data?.found,
			this.frontmatter['fc-date'],
			this,
		);
	}
}
