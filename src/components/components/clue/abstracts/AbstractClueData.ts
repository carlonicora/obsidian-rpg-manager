import {AbstractComponent} from "../../../abstracts/AbstractComponent";
import {ClueDataInterface} from "../interfaces/ClueDataInterface";
import {ClueMetadataInterface} from "../interfaces/ClueMetadataInterface";

export abstract class AbstractClueData extends AbstractComponent implements ClueDataInterface {
	protected metadata: ClueMetadataInterface;

	public get found(): Date | undefined {
		if (this.metadata.data?.found === undefined || this.metadata.data.found === false || this.metadata.data.found === '') return undefined;

		if (typeof this.metadata.data.found === 'string') return new Date(this.metadata.data.found);

		return undefined;
	}
}
