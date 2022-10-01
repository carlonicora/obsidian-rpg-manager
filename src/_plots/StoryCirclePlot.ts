import {StoryCirclePlotInterface} from "./interfaces/StoryCirclePlotInterface";

export class StoryCirclePlot implements StoryCirclePlotInterface {
	constructor(
		private storyCircle: any|undefined,
	) {
	}

	get change(): string {
		return this.storyCircle.change ?? '';
	}

	get find(): string {
		return this.storyCircle.find ?? '';
	}

	get go(): string {
		return this.storyCircle.go ?? '';
	}

	get isEmpty(): boolean {
		if (
			this.you === '' &&
			this.need === '' &&
			this.go === '' &&
			this.search === '' &&
			this.find === '' &&
			this.take === '' &&
			this.return === '' &&
			this.change === ''
		) return false;

		return true;
	}

	get need(): string {
		return this.storyCircle.need ?? '';
	}

	get return(): string {
		return this.storyCircle.return ?? '';
	}

	get search(): string {
		return this.storyCircle.search ?? '';
	}

	get take(): string {
		return this.storyCircle.take ?? '';
	}

	get you(): string {
		return this.storyCircle.you ?? '';
	}

}
