import {DataManipulatorsInterface} from "./interfaces/DataManipulatorsInterface";
import {MetadataReaderInterface} from "./interfaces/dataManipulation/MetadataReaderInterface";
import {App} from "obsidian";
import {AbstractRpgManager} from "./abstracts/AbstractRpgManager";
import {MetadataReader} from "./dataManipulation/MetadataReader";

export class DataManipulators extends AbstractRpgManager implements DataManipulatorsInterface {
	public metadata: MetadataReaderInterface;

	constructor(
		app: App,
	) {
		super(app);

		this.metadata = new MetadataReader(this.app);
	}
}
