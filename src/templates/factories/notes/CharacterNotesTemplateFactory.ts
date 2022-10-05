import {ComponentNotesTemplateFactoryInterface} from "../interfaces/ComponentNotesTemplateFactoryInterface";
import {AbstractTemplate} from "../../abstracts/AbstractTemplate";

export class CharacterNotesTemplateFactory extends AbstractTemplate implements ComponentNotesTemplateFactoryInterface {
	public getContent(): string {
		return '## Questionnaire\n' +
			'**Where and when were you born?**\n' +
			'>\n' +
			'\n' +
			'**Who are/were your parents?**\n' +
			'>\n' +
			'\n' +
			'**Do you have any siblings?**\n' +
			'>\n' +
			'\n' +
			'**Write a full physical description of yourself.**\n' +
			'>\n' +
			'\n' +
			'**To which social class do you belong?**\n' +
			'>\n' +
			'\n' +
			'**Do you have any allergies, diseases or other physical or mental weaknesses?**\n' +
			'>\n' +
			'\n' +
			'**Are you right-handed or left-handed?**\n' +
			'>\n' +
			'\n' +
			'**What do you have in your pockets?**\n' +
			'1. \n' +
			'2. \n' +
			'3. \n' +
			'4. \n' +
			'5. \n' +
			'\n' +
			'**Do you have any quirks, strange mannerism, annoying habits, or other defining characteristics?**\n' +
			'>\n' +
			'\n' +
			'**What are you afraid of?**\n' +
			'>\n' +
			'\n' +
			'**What defining moments have you experienced?**\n' +
			'>\n' +
			'\n' +
			'**What things matter to you?**\n' +
			'>\n' +
			'\n' +
			'**What do you believe in?**\n' +
			'>\n' +
			'\n' +
			'**What is your idol?**\n' +
			'>\n' +
			'\n' +
			'**What is your desire?**\n' +
			'>\n' +
			'\n' +
			'**What is your "normal"?**\n' +
			'>\n' +
			'\n' +
			'**What is your "secret"?**\n' +
			'>\n' +
			'\n' +
			'**What do you want to do when you "grow up"?**\n' +
			'>\n' +
			'\n' +
			'Do you have any enemy or person you don\'t go on well with?\n' +
			'>\n' +
			'\n' +
			'**Write and answer 5 questions about your character.**\n' +
			'1. \n' +
			'2. \n' +
			'3. \n' +
			'4. \n' +
			'5. \n' +
			'\n' +
			'## Backstory\n\n';
	}

}
