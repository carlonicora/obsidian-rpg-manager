import {DataManipulatorsInterface} from "./interfaces/DataManipulatorsInterface";
import {MetadataReaderInterface} from "./interfaces/dataManipulation/MetadataReaderInterface";
import {App} from "obsidian";
import {AbstractRpgManager} from "./abstracts/AbstractRpgManager";
import {MetadataReader} from "./dataManipulation/MetadataReader";
import {CodeBlockEditorInterface} from "./interfaces/dataManipulation/CodeBlockEditorInterface";
import {CodeBlockEditor} from "./dataManipulation/CodeBlockEditor";

export class DataManipulators extends AbstractRpgManager implements DataManipulatorsInterface {
	public metadata: MetadataReaderInterface;
	public codeblock: CodeBlockEditorInterface;

	constructor(
		app: App,
	) {
		super(app);

		this.metadata = new MetadataReader(this.app);
		this.codeblock = new CodeBlockEditor(this.app);
	}
}
