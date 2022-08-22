import {TemplateInterface} from "../interfaces/TemplateInterface";
import {RpgManagerSettings} from "../Settings";

export abstract class AbstractTemplate  implements TemplateInterface{
	constructor(
		protected settings: RpgManagerSettings,
		protected name: string,
		protected campaignId: number,
		protected adventureId: number|null,
		protected sessionId: number|null,
		protected sceneId: number|null,
	) {
	}

	protected abstract generateFrontmatterTags(): string;

	public generateData(
	): string {
		let response = '';

		response += this.generateFrontmatter();
		response += this.generateTemplate();

		return response;
	}

	protected generateFrontmatter(
	): string {
		let response = '---\n';

		response += 'alias: []\n';
		response += this.generateFrontmatterTags();
		response += this.generateFrontmatterSynopsis();
		response += this.generateFrontmatterAction();
		response += this.generateFrontmatterGoals();
		response += this.generateFrontmatterAddress();

		const dates = this.generateFrontmatterDates();
		if (dates !== null) {
			response += 'dates:\n' + dates;
		}

		const times = this.generateFrontmatterTimes();
		if (times !== null) {
			response += 'time:\n' + times;
		}

		const relationships = this.generateFrontmatterRelationships();
		if (relationships !== null){
			response += 'relationships: \n' + relationships;
		}

		response += 'completed: false\n';
		response += '---\n';

		return response;
	}

	protected generateFrontmatterRelationships(
	): string|null {
		return null
	}

	protected generateFrontmatterDates(
	): string|null {
		return null
	}

	protected generateFrontmatterTimes(
	): string|null {
		return null
	}

	protected generateFrontmatterSynopsis(
	): string {
		return '';
	}

	protected generateFrontmatterAddress(
	): string {
		return '';
	}

	protected generateFrontmatterAction(
	): string {
		return '';
	}

	protected generateFrontmatterGoals(
	): string {
		return '';
	}

	protected abstract generateTemplate(): string;

	protected getHeader(
		title: string,
		level = 2,
	): string {

		return  '#'.repeat(level) + ' ' + title + '\n';
	}

	protected getRpgManagerCodeblock(
		funct: string,
	): string {
		return '```RpgManager\n' +
			funct + '\n' +
			'```\n';
	}

	protected getAbtPlot(
	): string {
		return '>\n>\n>\n>**AND** \n>\n>**BUT** \n>\n>**THEREFORE** \n>\n\n';
	}

	protected getAdditionalInformation(
	): string {
		return this.getHeader('Additional Information') + '\n';
	}

	protected getStoryCirclePlot(
	): string {
		return '>\n>**YOU**: \n>**NEED**: \n>**GO**: \n>**SEARCH**: \n>**FIND**: \n>**TAKE**: \n>**RETURN**: \n>**CHANGE**: \n>\n\n';
	}

	protected getNotes(
	): string {
		return this.getHeader('Notes') + '- \n\n';
	}

	protected getStory(
	): string {
		return this.getHeader('Story') + '\n\n';
	}

	protected getPlayerCharacterDetails(
	): string {
		return '## Backstory\n' +
		'\n' +
		'## Questionnaire\n' +
		'Where and when were you born?\n' +
		'>\n' +
		'\n' +
		'Who are/were your parents?\n' +
		'>1.  \n' +
		'>2.  \n' +
		'\n' +
		'Do you have any siblings?\n' +
		'>\n' +
		'\n' +
		'Write a full physical description of yourself.\n' +
		'>\n' +
		'\n' +
		'To which social class do you belong?\n' +
		'>\n' +
		'\n' +
		'Do you have any allergies, diseases or other physical or mental weaknesses?\n' +
		'>\n' +
		'\n' +
		'Are you right-handed or left-handed?\n' +
		'>\n' +
		'\n' +
		'What do you have in your pockets?\n' +
		'> 1. \n' +
		'> 2. \n' +
		'> 3. \n' +
		'> 4.\n' +
		'\n' +
		'Do you have any quirks, strange mannerism, annoying habits, or other defining characteristics?\n' +
		'>\n' +
		'\n' +
		'What are you afraid of?\n' +
		'>\n' +
		'\n' +
		'What defining moments have you experienced?\n' +
		'>\n' +
		'\n' +
		'What things matter to you?\n' +
		'>\n' +
		'\n' +
		'What do you believe in?\n' +
		'>\n' +
		'\n' +
		'What is your idol?\n' +
		'>\n' +
		'\n' +
		'What is your desire?\n' +
		'>\n' +
		'\n' +
		'What is your "normal"?\n' +
		'>\n' +
		'\n' +
		'What is your "secret"?\n' +
		'>\n' +
		'\n' +
		'What do you want to do when you "grow up"?\n' +
		'>\n' +
		'\n' +
		'Write and answer 5 questions about your character.\n' +
		' 1. \n' +
		' 2. \n' +
		' 3. \n' +
		' 4. \n' +
		'\n' +
		'Do you have any allergy?\n' +
		'>';
	}
}
