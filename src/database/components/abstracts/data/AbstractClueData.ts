import {AbstractComponent} from "../../../abstracts/AbstractComponent";
import {ClueDataInterface} from "../../interfaces/data/ClueDataInterface";
import {ClueMetadataInterface} from "../../../interfaces/metadata/components/ClueMetadataInterface";

export abstract class AbstractClueData extends AbstractComponent implements ClueDataInterface {
	protected metadata: ClueMetadataInterface;

	public get found(): Date | undefined {
		if (this.metadata.data?.found === undefined) return undefined;

		return  new Date(this.metadata.data.found);
	}
}
