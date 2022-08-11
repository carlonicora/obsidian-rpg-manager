import {SessionData, SessionList, SessionListInterface} from "../data/SessionData";
import {CampaignDataInterface} from "../data/CampaignData";
import {RpgFunctions} from "../data/functions/RpgFunctions";
import {DataviewInlineApi} from "obsidian-dataview/lib/api/inline-api";
import {AdventureData, AdventureList, AdventureListInterface} from "../data/AdventureData";
import {CharacterData, CharacterList, CharacterListInterface} from "../data/CharacterData";

export class IoData {
	constructor(
		private functions: RpgFunctions,
		private campaign: CampaignDataInterface|null,
		private dv: DataviewInlineApi,
	) {
	}

	public getAdventureList(
	): AdventureListInterface
	{
		const response = new AdventureList(this.campaign);

		this.dv.pages("#adventure")
			.where(adventure =>
				adventure.file.folder !== "Templates" &&
				adventure.ids !== null &&
				adventure.ids.adventure !== null
			)
			.sort(adventure =>
				-adventure.ids.adventure
			)
			.forEach((adventure) => {
			response.add(
				new AdventureData(
					this.functions,
					adventure,
				)
			)
		});

		return response;
	}


	public getSessionList(
		adventureId: number|null = null,
	): SessionListInterface
	{
		const response = new SessionList(this.campaign);

		this.dv.pages("#session")
			.where(session =>
				session.file.folder !== "Templates" &&
				session.ids !== null &&
				session.ids.session !== null &&
				(adventureId != null ? session.ids.adventure === adventureId : true)
			).sort(session =>
				-session.ids.session
			).forEach((session) => {
				response.add(
					new SessionData(
						this.functions,
						session,
					)
				)
			});

		return response;
	}

	public getCharacterList(
	): CharacterListInterface
	{
		const response = new CharacterList(this.campaign);

		this.dv.pages("#character")
			.where(character =>
				character.file.folder !== "Templates"
			)
			.sort(character =>
				character.file.name
			)
			.forEach((character) => {
				response.add(
					new CharacterData(
						this.functions,
						character,
						this.campaign
					)
				)
			});

		return response;
	}
}
