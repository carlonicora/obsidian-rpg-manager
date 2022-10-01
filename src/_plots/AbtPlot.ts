import {AbtPlotInterface} from "./interfaces/AbtPlotInterface";

export class AbtPlot implements AbtPlotInterface {
	constructor(
		private abt: any|undefined,
	) {
	}

	get and(): string {
		return this.abt.and ?? '';
	}

	get but(): string {
		return this.abt.but ?? '';
	}

	get isEmpty(): boolean {
		if (
			this.need === '' &&
			this.and === '' &&
			this.but === '' &&
			this.therefore === ''
		) return false;

		return true;
	}

	get need(): string {
		return this.abt.need ?? '';
	}

	get therefore(): string {
		return this.abt.therefore ?? '';
	}


}
