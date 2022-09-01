import {Io} from "../settings/Agnostic/io/Io";
import {CampaignDataInterface} from "../interfaces/data/CampaignDataInterface";
import {DataviewInlineApi} from "obsidian-dataview/lib/api/inline-api";
import {App} from "obsidian";

const IosMap = {
	AgnosticIo: Io,
};
type IosMapType = typeof IosMap;
type IoKeys = keyof IosMapType;
type Tuples<T> = T extends IoKeys ? [T, InstanceType<IosMapType[T]>] : never;
export type SingleIoKey<K> = [K] extends (K extends IoKeys ? [K] : never) ? K : never;
type IoClassType<A extends IoKeys> = Extract<Tuples<IoKeys>, [A, any]>[1];

export class IoFactory {
	static create<K extends IoKeys>(
		k: SingleIoKey<K>,
		app: App,
		campaign: CampaignDataInterface,
		dv: DataviewInlineApi,
		current: Record<string, any>,
	): IoClassType<K> {
		return new IosMap[k](app, campaign, dv, current);
	}
}
