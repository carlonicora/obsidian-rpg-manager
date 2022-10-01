import {ComponentV2Interface} from "../../interfaces/ComponentV2Interface";
import {AbtStage} from "../../../enums/AbtStage";
import {AbtPlotInterface} from "../../../_plots/interfaces/AbtPlotInterface";
import {AdventureV2Interface} from "./AdventureV2Interface";

export interface ActV2Interface extends ComponentV2Interface {
	get adventure(): AdventureV2Interface;
	get previousAct(): ActV2Interface|null;
	get nextAct(): ActV2Interface|null;

	get abtStage(): AbtStage|undefined;
	get abtPlot(): AbtPlotInterface;
}
