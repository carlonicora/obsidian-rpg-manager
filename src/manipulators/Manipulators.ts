import {App} from "obsidian";
import {AbstractRpgManager} from "../abstracts/AbstractRpgManager";
import {CodeBlockManipulatorInterface} from "./interfaces/CodeBlockManipulatorInterface";
import {CodeBlockManipulator} from "./CodeBlockManipulator";
import {ManipulatorsInterface} from "./interfaces/ManipulatorsInterface";
import {AllComponentManipulatorInterface} from "./interfaces/AllComponentManipulatorInterface";
import {AllComponentManipulator} from "./AllComponentManipulator";

export class Manipulators extends AbstractRpgManager implements ManipulatorsInterface {
	public codeblock: CodeBlockManipulatorInterface;
	public allComponents: AllComponentManipulatorInterface;

	constructor(
		app: App,
	) {
		super(app);

		this.codeblock = new CodeBlockManipulator(this.app);
		this.allComponents = new AllComponentManipulator(this.app);
	}
}
