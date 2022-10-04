import {MetadataManipulatorInterface} from "./MetadataManipulatorInterface";
import {CodeBlockManipulatorInterface} from "./CodeBlockManipulatorInterface";
import {FrontmatterManipulatorInterface} from "./FrontmatterManipulatorInterface";

export interface ManipulatorsInterface {
	metadata: MetadataManipulatorInterface;
	codeblock: CodeBlockManipulatorInterface;
	frontmatter: FrontmatterManipulatorInterface;
}
