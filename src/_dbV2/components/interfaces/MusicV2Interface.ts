import {ComponentV2Interface} from "../../interfaces/ComponentV2Interface";

export interface MusicV2Interface extends ComponentV2Interface {
	get url(): string | undefined;
	getThumbnail(): Promise<string | undefined>;
}
