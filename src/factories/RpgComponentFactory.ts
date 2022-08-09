import {RpgFunctions} from "../data/RpgFunctions";
import {DataviewInlineApi} from "obsidian-dataview/lib/api/inline-api";
import {Literal} from "obsidian-dataview/lib/data-model/value";

export class RpgComponentFactory{

	private currentPage: Record<string, Literal>|undefined;

	constructor(
		protected functions: RpgFunctions,
		protected dv: DataviewInlineApi,
	) {
		this.currentPage = this.dv.current();
	}

	spacer() {
		this.dv.span('<div style="height: 20px"></div>');
	}

	adventureList(){
		this.dv.span("## Adventures");

		this.dv.table(["&#35;", "Adventure", "Synopsis"],
			this.dv.pages("#adventure")
				.sort(page =>
					-page.ids.adventure
				)
				.where(page =>
					page.file.folder !== "Templates" &&
					page.ids !== null &&
					page.ids.adventure !== null
				)
				.map(page => [
					page.ids.adventure,
					page.file.link,
					page.synopsis,
				])
		);

		this.spacer();
	}

	sessionList(adventureNumber=null){
		this.dv.span("## Sessions");

		this.dv.table(["&#35;", "Session", "Type", "Synopsis", "Date", "Play Date", "Notes"],
			this.dv.pages("#session")
				.sort(page =>
					-page.ids.session
				)
				.where(page =>
					page.file.folder !== "Templates" &&
					page.ids !== null &&
					page.ids.session !== null &&
					(adventureNumber !== null ? page.ids.adventure === adventureNumber : true)
				)
				.map(page => [
					page.ids.session,
					page.file.link,
					page.ids.type,
					page.synopsis,
					page.dates.session ? this.functions.formatDate(page.dates.session, "short") : "",
					page.dates.irl ? this.functions.formatDate(page.dates.irl) : "",
					("[[Notes - " + page.file.name + "|>>]]"),
				])
		);

		this.spacer();
	}

	sceneList(sessionNumber: number){
		this.dv.span("## Scenes");

		this.dv.table(["&#35;", "Scene", "Start", "Duration"],
			this.dv.pages("#scene")
				.sort(page => page.ids.scene)
				.where(page =>
					page.file.folder !== "Templates" &&
					page.ids !== undefined &&
					page.ids.session !== undefined &&
					page.ids.session === sessionNumber
				)
				.map(page => [
					page.ids.scene,
					page.file.link,
					this.functions.formatTime(page.time.start),
					this.functions.calculateDuration(page.time.start, page.time.end),
				])
		);

		this.spacer();
	}

	characterList(){
		this.dv.span("## Characters");

		this.dv.table(["", "Name", "Age", "Bio"],
			this.dv.pages("#character")
				.sort(page => page.file.name)
				.where(page =>
					page.file.folder !== "Templates"
				)
				.map(page => [
					this.functions.getImage(page),
					page.file.link,
					this.functions.calculateAge(page, this.dv.pages("#campaign and " + `-"Templates"`)[0]) ? this.functions.calculateAge(page, this.dv.pages("#campaign and " + `-"Templates"`)[0]) : "",
					page.bio,
				])
		);

		this.spacer();
	}

	synopsis(title=null){
		if (this.currentPage?.dates?.death) {
			this.dv.span(
				"_Deceased " +
				this.functions.formatDate(this.currentPage?.dates.death)  +
				"_<br/>"
			);
		}

		if (title){
			this.dv.span("## " + title);
		}

		if (
			this.currentPage?.synopsis !== null &&
			this.currentPage?.synopsis !== undefined &&
			this.currentPage?.synopsis !== ""
		) {
			if (
				this.currentPage?.tags.indexOf('character/npc') !== -1
			) {
				this.dv.span(
					this.currentPage?.file.link +
					(this.currentPage?.dates.death ? " was " : " is ") +
					this.currentPage?.synopsis,
				);
			} else {
				this.dv.span(
					this.currentPage?.synopsis
				);
			}
		} else {
			this.dv.span(
				"==Synopsis missing=="
			);
		}

		this.spacer();
	}

	image(width=75, height=75){
		const image = this.functions.getImage(this.currentPage, width, height);

		if (image !== "") {
			this.dv.span(image);
		}

		this.spacer();
	}

	nonPlayerCharacterInfo(){
		const age = this.functions.calculateAge(this.currentPage, this.dv.pages("#campaign and " + `-"Templates"`)[0]);

		this.dv.table(["**" + this.currentPage?.file.name + "**", ""], [
			["Status", (this.currentPage?.dates.death ? "Dead" : "Alive")],
			[(this.currentPage?.dates.death ? "Age at Death" : "Age"), (age !== "" ? age : "==Dob or campaign date missing==" )],
			["Goals", (this.currentPage?.goals ? this.currentPage?.goals : "==Goals missing==")],
		]);

		this.spacer();
	}

	affiliations() {
		const affiliations = this.dv.pages("#faction")
			.where(page =>
				page.file.folder !== "Templates" &&
				this.currentPage?.relationships.factions &&
				this.currentPage?.relationships.factions[page.file.name] !== undefined
			);

		if (affiliations.length !== 0){
			this.dv.span("## Affiliations");

			this.dv.table(["Faction", "Role"],
				affiliations
					.map(page => [
						page.file.link,
						this.currentPage?.relationships.factions[page.file.name],
					])
			);

			this.spacer();
		}
	}

	relationships(){
		const relationships = this.dv.pages("#character")
			.where(page =>
				page.file.folder !== "Templates" &&
				this.currentPage?.relationships.characters &&
				this.currentPage?.relationships.characters[page.file.name] !== undefined
			);

		if (relationships.length !== 0){
			this.dv.span("## Relationships");

			this.dv.table(["", "Character", "Relationship"],
				this.dv.pages("#character")
					.where(page =>
						page.file.folder !== "Templates" &&
						this.currentPage?.relationships.characters &&
						this.currentPage?.relationships.characters[page.file.name] !== undefined
					)
					.map(page => [
						this.functions.getImage(page),
						page.file.link,
						this.currentPage?.relationships.characters[page.file.name]
					])
			);

			this.spacer();
		}
	}

	characterEvents() {
		const events = this.dv.pages("#event")
			.where(page =>
				page.file.folder !== "Templates" &&
				page.relationships?.characters &&
				page.relationships?.characters[this.currentPage?.file.name] !== undefined
			);

		if (events.length !== 0) {
			this.dv.span("## Events involved in");
			this.dv.table(["Event", "Synopsis", "Date", "Additional Information"],
				events
					.map(page => [
						page.file.link,
						page.synopsis,
						this.functions.formatDate(page.dates.event, "short"),
						page.relationships?.characters[this.currentPage?.file.name]
					])
			);

			this.spacer();
		}
	}

	cluesKnowledge(){
		const unknownClues = this.dv.pages("#clue")
			.where(page =>
				page.file.folder !== "Templates" &&
				page.relationships?.characters &&
				page.relationships?.characters[this.currentPage?.file.name] !== undefined &&
				page.dates.found === null
			);

		const knownClues = this.dv.pages("#clue")
			.where(page =>
				page.file.folder !== "Templates" &&
				page.relationships?.characters &&
				page.relationships?.characters[this.currentPage?.file.name] !== undefined &&
				page.dates.found !== null
			);

		if (unknownClues.length !== 0 || knownClues.length !== 0) {
			this.dv.span("## Clues Known by " + this.currentPage?.file.name);

			if (unknownClues.length !== 0) {
				this.dv.table(["Unknown Clue", "Synopsis"],
					unknownClues
						.map(page => [
							page.file.link,
							page.synopsis
						])
				);
			}

			if (knownClues.length !== 0) {
				this.dv.table(["Known Clue", "Synopsis", "Discovered on"],
					knownClues
						.map(page => [
							page.file.link,
							page.synopsis,
							this.functions.formatDate(page.dates.found, "short"),
						])
				);
			}

			this.spacer();
		}
	}

	knowledgeOfClue(){
		const npcs = this.dv.pages("#character")
			.where(page =>
				page.file.folder !== "Templates" &&
				this.currentPage?.relationships.characters &&
				this.currentPage?.relationships.characters[page.file.name] !== undefined
			);

		if (npcs.length !== 0) {
			this.dv.span("## Characters in the know");

			this.dv.table(["", "Character", "Additional Information"],
				npcs
					.map(page => [
						this.functions.getImage(page),
						page.file.link,
						this.currentPage?.relationships.characters[page.file.name],
					])
			);

			this.spacer();
		}
	}

	characterLocations(){
		if (this.currentPage === undefined || this.currentPage.relationships === undefined) return;

		const locations = this.dv.pages("#location")
			.where(page =>
				page.file.folder !== "Templates" &&
				this.currentPage !== undefined &&
				this.currentPage?.relationships !== undefined &&
				this.currentPage.relationships?.locations &&
				this.currentPage.relationships?.locations[page.file.name] !== undefined
			);

		if (locations.length !== 0) {
			this.dv.span("## Notable Locations");
			this.dv.table(["", "Location", "Role"],
				locations
					.map(page => [
						this.functions.getImage(page, 70),
						page.file.link,
						this.currentPage?.relationships?.locations[page.file.name]
					])
			);

			this.spacer();
		}
	}

	locationEvents(){
		const events = this.dv.pages("#event")
			.where(page =>
				page.file.folder !== "Templates" &&
				page.relationships?.locations &&
				page.relationships?.locations[this.currentPage?.file.name] !== undefined
			)
			.sort(page =>
				page.file.name
			);

		if (events.length !== 0) {
			this.dv.span("## Events at " + this.currentPage?.file.name);

			this.dv.table(["Event", "Date", "Synopsis", "Additional Information"],
				events
					.map(page => [
						page.file.link,
						this.functions.formatDate(page.dates.event, "short"),
						page.synopsis,
						page.relationships?.locations[this.currentPage?.file.name]
					])
			);

			this.spacer();
		}
	}

	locationClues(){
		const clues = this.dv.pages("#clue")
			.where(page =>
				page.file.folder !== "Templates" &&
				page.relationships?.locations &&
				page.relationships?.locations[this.currentPage?.file.name] !== undefined
			)
			.sort(page =>
				page.file.name
			);

		if (clues.length !== 0) {
			this.dv.span("## Clues at " + this.currentPage?.file.name);

			this.dv.table(["Clue", "Found", "Synopsis", "Additional Information"],
				clues
					.map(page => [
						page.file.link,
						page.dates.found === null ? "==No==" : this.functions.formatDate(page.dates.found, "short"),
						page.synopsis,
						page.relationships?.locations[this.currentPage?.file.name]
					])
			);

			this.spacer();
		}
	}

	locationCharacters(){
		const characters = this.dv.pages("#character")
			.where(page =>
				page.file.folder !== "Templates" &&
				page.relationships?.locations &&
				page.relationships?.locations[this.currentPage?.file.name] !== undefined
			);

		if (characters.length !== 0) {
			this.dv.span("## Characters at " + this.currentPage?.file.name);

			this.dv.table(["", "Character", "Role"],
				characters
					.map(page => [
						this.functions.getImage(page),
						page.file.link + this.functions.getDeathStatus(page),
						page.relationships?.locations[this.currentPage?.file.name]
					])
			);

			this.spacer();
		}
	}

	factionCharacters(){
		const characters = this.dv.pages("#character")
			.sort(page => page.file.name)
			.where(page =>
				page.file.folder !== "Templates" &&
				page.relationships?.factions !== null &&
				page.relationships?.factions[this.currentPage?.file.name] !== undefined
			);

		if (characters.length !== 0) {
			this.dv.span("## Members");

			this.dv.table(["", "Character", "Role"],
				characters
					.map(page => [
						this.functions.getImage(page),
						page.file.link + this.functions.getDeathStatus(page),
						page.relationships?.factions[this.currentPage?.file.name]
					])
			);

			this.spacer();
		}
	}

	factionLocations(){
		const locations = this.dv.pages("#location")
			.sort(page => page.file.name)
			.where(page =>
				page.file.folder !== "Templates" &&
				this.currentPage?.relationships !== null &&
				this.currentPage?.relationships.locations !== null &&
				this.currentPage?.relationships.locations[page.file.name] !== undefined
			);

		if (locations.length !== 0) {
			this.dv.span("## Relevant Locations");

			this.dv.table(["", "Location", "Additional Information"],
				locations
					.map(page => [
						this.functions.getImage(page, 70),
						page.file.link,
						this.currentPage?.relationships.locations[page.file.name]
					])
			);

			this.spacer();
		}
	}

	clueStatus(){
		this.dv.span(
			((this.currentPage?.dates.found !== undefined)
				? "==Clue **NOT** found by the player characters=="
				: "_clue found by the player characters on " + this.functions.formatDate(this.currentPage?.dates.found, "short")  + "_") + "<br/>&nbsp;<br/>"
		);
	}

	clueEvents(){
		const events = this.dv.pages("#event")
			.where(page =>
				page.file.folder !== "Templates" &&
				page.relationships?.clues &&
				page.relationships?.clues[this.currentPage?.file.name] !== undefined
			);

		if (events.length !== 0) {
			this.dv.span("## Part of events");

			this.dv.table(["Event", "Date", "Syopsis", "Additional Information"],
				events
					.map(page => [
						page.file.link,
						this.functions.formatDate(page.dates.event, "short"),
						page.synopsis,
						page.relationships?.clues[this.currentPage?.file.name]
					])
			);

			this.spacer();
		}
	}

	clueLocations(){
		const locations = this.dv.pages("#location")
			.where(page =>
				page.file.folder !== "Templates" &&
				this.currentPage?.relationships.locations &&
				this.currentPage?.relationships.locations[page.file.name] !== undefined
			);

		if (locations.length !== 0) {
			this.dv.span("## In Locations");
			this.dv.table(["", "Location", "Additional Information"],
				locations
					.map(page => [
						this.functions.getImage(page, 70),
						page.file.link,
						this.currentPage?.relationships.locations[page.file.name],
					])
			);

			this.spacer();
		}
	}

	eventCharacters() {
		const characters = this.dv.pages("#character")
			.where(page =>
				page.file.folder !== "Templates" &&
				this.currentPage?.relationships.characters &&
				this.currentPage?.relationships.characters[page.file.name] !== undefined
			);

		if (characters.length !== 0) {
			this.dv.span("## Characters");
			this.dv.table(["", "Character", "Additional Information"],
				characters
					.map(page => [
						this.functions.getImage(page),
						page.file.link,
						this.currentPage?.relationships.characters[page.file.name]
					])
			);

			this.spacer();
		}
	}

	eventClues() {
		const clues = this.dv.pages("#clue")
			.where(page =>
				page.file.folder !== "Templates" &&
				this.currentPage?.relationships.clues &&
				this.currentPage?.relationships.clues[page.file.name] !== undefined
			);

		if (clues.length !== 0) {
			this.dv.span("## Clues");
			this.dv.table(["Clue", "Found", "Synopsis", "Additional Information"],
				clues
					.map(page => [
						page.file.link,
						page.dates.found === null ? "==No==" : this.functions.formatDate(page.dates.found, "short"),
						page.synopsis,
						this.currentPage?.relationships.clues[page.file.name]
					])
			);

			this.spacer();
		}
	}

	eventLocations() {
		const locations = this.dv.pages("#location")
			.where(page =>
				page.file.folder !== "Templates" &&
				this.currentPage?.relationships.locations &&
				this.currentPage?.relationships.locations[page.file.name] !== undefined
			);

		if (locations.length !== 0) {
			this.dv.span("## Locations");
			this.dv.table(["", "Location", "Additional Information"],
				locations
					.map(page => [
						this.functions.getImage(page, 70),
						page.file.link,
						this.currentPage?.relationships.locations[page.file.name],
					])
			);

			this.spacer();
		}
	}

	sceneLocations(){
		const locations = this.dv.pages("#location")
			.where(page =>
				page.file.folder !== "Templates" &&
				this.currentPage?.relationships.locations &&
				this.currentPage?.relationships.locations[page.file.name] !== undefined
			);

		if (locations.length !== 0) {
			this.dv.span("## Scene Locations");

			this.dv.table(["", "Location", "Additional Information"],
				locations
					.map(page => [
						this.functions.getImage(page, 70),
						page.file.link,
						this.currentPage?.relationships.locations[page.file.name]
					])
			);

			this.spacer();
		}
	}

	sceneNavigator(){
		const session = this.dv.pages("#session")
			.where(session =>
				session.file.folder !== "Templates" &&
				session.ids !== undefined &&
				session.ids.session === this.currentPage?.ids.session
			)[0];
		const adventure = this.dv.pages("#adventure")
			.where(adventure =>
				adventure.file.folder !== "Templates" &&
				adventure.ids !== undefined &&
				adventure.ids.adventure === session.ids.adventure
			)[0];

		const campaign = this.dv.pages("#campaign and " + `-"Templates"`)[0];
		const previousScene = this.dv.pages("#scene")
			.where(scene =>
				scene.file.folder !== "Templates" &&
				scene.ids !== undefined &&
				scene.ids.session === this.currentPage?.ids.session &&
				scene.ids.scene === this.currentPage?.ids.scene - 1
			);
		const nextScene = this.dv.pages("#scene")
			.where(scene =>
				scene.file.folder !== "Templates" &&
				scene.ids !== undefined &&
				scene.ids.session === this.currentPage?.ids.session &&
				scene.ids.scene === this.currentPage?.ids.scene + 1
			);


		const tableElements = [];
		tableElements.push(["Adventure", adventure ? adventure.file.link : '']);
		tableElements.push(["Session", session ? session.file.link : '']);
		tableElements.push(["Session Notes", session ? "[[Notes - " + session.file.name + "]]" : '']);

		if (previousScene.length > 0){
			tableElements.push(["<< Previous Scene", previousScene[0].file.link]);
		}

		if (nextScene.length > 0){
			tableElements.push(["Next Scene >>", nextScene[0].file.link]);
		}

		//@ts-ignore
		const table = this.dv.markdownTable(["Campaign", "" + campaign.file.link],tableElements);

		this.dv.paragraph(table);

		this.spacer();
	}

	sceneCharacters() {
		const pages = [];
		for (let pagesCount=0; pagesCount < this.currentPage?.file.outlinks.length; pagesCount++) {
			pages.push(this.dv.page(this.currentPage?.file.outlinks[pagesCount].path));
		}

		const characters = this.dv.array(pages)
			.where(page =>
				page.tags.indexOf('character/npc') !== -1 ||
				page.tags.indexOf('character/pc') !== -1
			)
			.sort(page => page.file.name);

		if (characters.length > 0){
			this.dv.span("## Characters");

			this.dv.table(["", "Character"],
				characters
					.map(page => [
						this.functions.getImage(page),
						page.file.link,
					])
			);

			this.spacer();
		}
	}

	sceneClues() {
		const clues = this.dv.pages("#clue")
			.where(page =>
				page.file.folder !== "Templates" &&
				this.currentPage?.relationships.clues &&
				this.currentPage?.relationships.clues[page.file.name] !== undefined
			);

		if (clues.length !== 0) {
			this.dv.span("## Clues");

			this.dv.table(["Clue", "Found", "Synopsis", "Additional Information"],
				clues
					.map(page => [
						page.file.link,
						page.dates.found === null ? "==No==" : this.functions.formatDate(page.dates.found, "short"),
						page.synopsis,
						this.currentPage?.relationships.clues[page.file.name]
					])
			);

			this.spacer();
		}
	}

	sessionNavigator(){
		const campaign = this.dv.pages("#campaign and " + `-"Templates"`)[0];
		const adventure = this.dv.pages("#adventure")
			.where(adventure =>
				adventure.file.folder !== "Templates" &&
				adventure.ids.adventure == this.currentPage?.ids.adventure
			)[0];
		const previousSession = this.dv.pages("#session")
			.where(session =>
				session.file.folder !== "Templates" &&
				session.ids.adventure === this.currentPage?.ids.adventure &&
				session.ids.session === this.currentPage?.ids.session - 1
			);
		const nextSession = this.dv.pages("#session")
			.where(session =>
				session.file.folder !== "Templates" &&
				session.ids.adventure === this.currentPage?.ids.adventure &&
				session.ids.session === this.currentPage?.ids.session + 1
			);

		const tableElements = [];
		tableElements.push(["Adventure", adventure ? adventure.file.link : '']);
		tableElements.push(["Introduction", "[[#Introduction]]"]);
		tableElements.push(["ABT Plot", "[[#ABT Plot]]"]);
		tableElements.push(["Story Circle Plot", "[[#Story Circle Plot]]"]);
		tableElements.push(["Notes", "[[Notes - " + this.currentPage?.file.name + "]]"]);

		if (previousSession.length > 0){
			tableElements.push(["<< Previous Session", previousSession[0].file.link]);
		}

		if (nextSession.length > 0){
			tableElements.push(["Next Session >>", nextSession[0].file.link]);
		}

		//@ts-ignore
		const table = this.dv.markdownTable(["Campaign", "" + campaign.file.link],tableElements);

		this.dv.paragraph(table);

		this.spacer();
	}
}
