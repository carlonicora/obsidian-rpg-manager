import {CodeBlockManipulatorInterface} from "./CodeBlockManipulatorInterface";
import {AllComponentManipulatorInterface} from "./AllComponentManipulatorInterface";

export interface ManipulatorsInterface {
	codeblock: CodeBlockManipulatorInterface;
	allComponents: AllComponentManipulatorInterface;
}
