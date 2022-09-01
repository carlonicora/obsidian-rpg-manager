import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";
import {ResponseTable} from "../../../data/ResponseTable";
import {ContentType} from "../../../enums/ContentType";
import {SessionDataInterface} from "../../../interfaces/data/SessionDataInterface";
import {AdventureDataInterface} from "../../../interfaces/data/AdventureDataInterface";
import {CharacterDataInterface} from "../../../interfaces/data/CharacterDataInterface";
import {Factory} from "../../../Factory";

export class CampaignModel extends AbstractModel {
	public generateData(
	): ResponseDataInterface {
		this.adventureList();
		this.sessionList();
		this.characterList();

		return this.data;
	}

	private async adventureList(
	) {
		const adventureList = this.io.getAdventureList();
		const adventureListTable = new ResponseTable();
		adventureListTable.addTitle('Adventures');
		adventureListTable.addHeaders([
			Factory.createContent('#', ContentType.String, true),
			Factory.createContent('Adventure', ContentType.String),
			Factory.createContent('Synopsis', ContentType.String),
		]);
		adventureList.elements.forEach((adventure: AdventureDataInterface) => {
			adventureListTable.addContent([
				Factory.createContent(adventure.id, ContentType.Number, true),
				Factory.createContent(adventure.link, ContentType.Link),
				Factory.createContent(adventure.synopsis, ContentType.Markdown),
			])
		});
		this.data.addElement(adventureListTable);
	}

	private async sessionList(
	) {
		const sessionList = this.io.getSessionList();

		const sessionListTable = new ResponseTable();
		sessionListTable.addTitle('Sessions');
		sessionListTable.addHeaders([
			Factory.createContent('#', ContentType.String, true),
			Factory.createContent('Session', ContentType.String),
			Factory.createContent('Synopsis', ContentType.String),
			Factory.createContent('Date', ContentType.String),
			Factory.createContent('Play Date', ContentType.String),
		]);
		sessionList.elements.forEach((session: SessionDataInterface) => {
			sessionListTable.addContent([
				Factory.createContent(session.id, ContentType.Number, true),
				Factory.createContent(session.link, ContentType.Link),
				Factory.createContent(session.synopsis, ContentType.Markdown),
				Factory.createContent(session.date, ContentType.String, true),
				Factory.createContent(session.irl, ContentType.String, true),
			])
		});
		this.data.addElement(sessionListTable);
	}

	private async characterList(
	) {
		const characterList = this.io.getCharacterList();

		const characterListTable = new ResponseTable();
		characterListTable.addTitle('Characters');
		characterListTable.addHeaders([
			Factory.createContent('', ContentType.String, true),
			Factory.createContent('Character', ContentType.String),
			Factory.createContent('Age', ContentType.String),
			Factory.createContent('Synopsis', ContentType.String),
		]);
		characterList.elements.forEach((character: CharacterDataInterface) => {
			characterListTable.addContent([
				Factory.createContent(character.imageSrcElement, ContentType.Image, true),
				Factory.createContent(character.link, ContentType.Link, true),
				Factory.createContent(character.age, ContentType.String, true),
				Factory.createContent(character.synopsis, ContentType.Markdown),
			])
		});
		this.data.addElement(characterListTable);
	}
}
