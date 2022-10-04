import {Plots} from "../../../../plots/Plots";
import {ActDataInterface} from "../../interfaces/data/ActDataInterface";
import {ActMetadataInterface} from "../../../../metadatas/components/ActMetadataInterface";
import {AbtStage} from "../../../../plots/enums/AbtStage";

export abstract class AbstractActData extends Plots implements  ActDataInterface {
	protected metadata: ActMetadataInterface;

	public get abtStage(): AbtStage|undefined {
		if (this.metadata.data?.abtStage === undefined) return undefined;
		return this.factories.abtStage.createAbtStage(this.metadata.data.abtStage);
	}
}
