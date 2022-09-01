import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";
import {ResponseTable} from "../../../data/ResponseTable";
import {ContentType} from "../../../enums/ContentType";
import {SessionDataInterface} from "../../../interfaces/data/SessionDataInterface";
import {AdventureDataInterface} from "../../../interfaces/data/AdventureDataInterface";
import {CharacterDataInterface} from "../../../interfaces/data/CharacterDataInterface";
import {ContentFactory} from "../../../factories/ContentFactory";

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
			ContentFactory.create('#', ContentType.String, true),
			ContentFactory.create('Adventure', ContentType.String),
			ContentFactory.create('Synopsis', ContentType.String),
		]);
		adventureList.elements.forEach((adventure: AdventureDataInterface) => {
			adventureListTable.addContent([
				ContentFactory.create(adventure.id, ContentType.Number, true),
				ContentFactory.create(adventure.link, ContentType.Link),
				ContentFactory.create(adventure.synopsis, ContentType.Markdown),
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
			ContentFactory.create('#', ContentType.String, true),
			ContentFactory.create('Session', ContentType.String),
			ContentFactory.create('Synopsis', ContentType.String),
			ContentFactory.create('Date', ContentType.String),
			ContentFactory.create('Play Date', ContentType.String),
		]);
		sessionList.elements.forEach((session: SessionDataInterface) => {
			sessionListTable.addContent([
				ContentFactory.create(session.id, ContentType.Number, true),
				ContentFactory.create(session.link, ContentType.Link),
				ContentFactory.create(session.synopsis, ContentType.Markdown),
				ContentFactory.create(session.date, ContentType.String, true),
				ContentFactory.create(session.irl, ContentType.String, true),
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
			ContentFactory.create('', ContentType.String, true),
			ContentFactory.create('Character', ContentType.String),
			ContentFactory.create('Age', ContentType.String),
			ContentFactory.create('Synopsis', ContentType.String),
		]);
		characterList.elements.forEach((character: CharacterDataInterface) => {
			characterListTable.addContent([
				ContentFactory.create(character.imageSrcElement, ContentType.Image, true),
				ContentFactory.create(character.link, ContentType.Link, true),
				ContentFactory.create(character.age, ContentType.String, true),
				ContentFactory.create(character.synopsis, ContentType.Markdown),
			])
		});
		this.data.addElement(characterListTable);
	}
}
