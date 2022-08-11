import {AbstractSingleView} from "../abstracts/AbstractSingleView";
import {ClueDataInterface} from "../data/ClueData";

export class ClueStatusView extends AbstractSingleView {
	async render(
		data: ClueDataInterface
	): Promise<void> {
		this.dv.span(
			((data.found === false)
				? "==Clue **NOT** found by the player characters=="
				: "_clue found by the player characters on " + data.found  + "_") + "<br/>&nbsp;<br/>"
		);
	}
}
