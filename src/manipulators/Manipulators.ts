import {ManipulatorsInterface} from "./interfaces/ManipulatorsInterface";
import {MetadataManipulatorInterface} from "./interfaces/MetadataManipulatorInterface";
import {App} from "obsidian";
import {AbstractRpgManager} from "../abstracts/AbstractRpgManager";
import {MetadataManipulator} from "./MetadataManipulator";
import {CodeBlockManipulatorInterface} from "./interfaces/CodeBlockManipulatorInterface";
import {CodeBlockManipulator} from "./CodeBlockManipulator";
import {FrontmatterManipulatorInterface} from "./interfaces/FrontmatterManipulatorInterface";
import {FrontmatterManipulator} from "./FrontmatterManipulator";

export class Manipulators extends AbstractRpgManager implements ManipulatorsInterface {
	public metadata: MetadataManipulatorInterface;
	public codeblock: CodeBlockManipulatorInterface;
	public frontmatter: FrontmatterManipulatorInterface;

	constructor(
		app: App,
	) {
		super(app);

		this.metadata = new MetadataManipulator(this.app);
		this.codeblock = new CodeBlockManipulator(this.app);
		this.frontmatter = new FrontmatterManipulator(this.app);
	}
}
