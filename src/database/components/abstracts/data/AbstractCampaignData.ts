import {CampaignDataInterface} from "../../interfaces/data/CampaignDataInterface";
import {CampaignMetadataInterface} from "../../../interfaces/metadata/components/CampaignMetadataInterface";
import {PlotsAbtOnly} from "../../../plots/PlotsAbtOnly";
import {AdventureInterface} from "../../interfaces/AdventureInterface";
import {ActInterface} from "../../interfaces/ActInterface";
import {SessionInterface} from "../../interfaces/SessionInterface";
import {ComponentType} from "../../../../enums/ComponentType";
import {Act} from "../../Act";

export abstract class AbstractCampaignData extends PlotsAbtOnly implements CampaignDataInterface{
	protected metadata: CampaignMetadataInterface;

	public get date(): Date|undefined {
		return (this.metadata.data?.date ? new Date(this.metadata.data.date) : undefined);
	}

	get currentAdventure(): AdventureInterface|undefined {
		if (this.metadata.data?.currentAdventureId === undefined) return undefined;

		const id = this.factories.id.create()

		const response = this.database.read<AdventureInterface>((adventure: AdventureInterface) =>
			adventure.id.type === ComponentType.Adventure &&
			adventure.id.campaignId === this.id.campaignId &&
			adventure.id.adventureId === this.metadata.data?.currentAdventureId
		);

		return response[0] ?? undefined;
	}

	get currentAct(): ActInterface|undefined {
		if (this.metadata.data?.currentActId === undefined) return undefined;

		const response = this.database.read<ActInterface>((act: Act) =>
			act.id.type === ComponentType.Act &&
			act.id.campaignId === this.id.campaignId &&
			act.id.actId === this.metadata.data?.currentActId
		);

		return response[0] ?? undefined;
	}

	get currentSession(): SessionInterface|undefined {
		if (this.metadata.data?.currentSessionId === undefined) return undefined;

		const response = this.database.read<SessionInterface>((session: SessionInterface) =>
			session.id.type === ComponentType.Session &&
			session.id.campaignId === this.id.campaignId &&
			session.id.sessionId === this.metadata.data?.currentSessionId
		);

		return response[0] ?? undefined;
	}
}
