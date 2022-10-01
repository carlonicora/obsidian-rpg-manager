import {AbstractComponentV2} from "../abstracts/AbstractComponentV2";
import {CampaignV2Interface} from "./interfaces/CampaignV2Interface";
import {ComponentStage} from "./enums/ComponentStage";
import {AbtPlotInterface} from "../../_plots/interfaces/AbtPlotInterface";
import {AbtPlot} from "../../_plots/AbtPlot";
import {CampaignMetadataInterface} from "../interfaces/metadatas/CampaignMetadataInterface";

export class CampaignV2 extends AbstractComponentV2 implements CampaignV2Interface {
	protected metadata: CampaignMetadataInterface;
	public stage: ComponentStage = ComponentStage.Plot;

	public get date(): Date|undefined {
		return (this.metadata.current ? new Date(this.metadata.current) : undefined);
	}

	public get abtPlot(): AbtPlotInterface {
		return new AbtPlot(this.metadata.abt);
	}

	public get folder(
	): string {
		const lastSlashPosition = this.file.path.lastIndexOf('/');
		return (lastSlashPosition !== -1 ? this.file.path.substring(0, lastSlashPosition + 1) : '/');
	}
}
