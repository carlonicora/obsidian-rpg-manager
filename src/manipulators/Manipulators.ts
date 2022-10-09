import {App} from "obsidian";
import {AbstractRpgManager} from "../abstracts/AbstractRpgManager";
import {CodeBlockManipulatorInterface} from "./interfaces/CodeBlockManipulatorInterface";
import {CodeBlockManipulator} from "./CodeBlockManipulator";
import {ManipulatorsInterface} from "./interfaces/ManipulatorsInterface";

export class Manipulators extends AbstractRpgManager implements ManipulatorsInterface {
	public codeblock: CodeBlockManipulatorInterface;

	constructor(
		app: App,
	) {
		super(app);

		this.codeblock = new CodeBlockManipulator(this.app);
	}
}
