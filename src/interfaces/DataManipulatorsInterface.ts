import {MetadataReaderInterface} from "./dataManipulation/MetadataReaderInterface";
import {CodeBlockEditorInterface} from "./dataManipulation/CodeBlockEditorInterface";

export interface DataManipulatorsInterface {
	metadata: MetadataReaderInterface;
	codeblock: CodeBlockEditorInterface;
}
