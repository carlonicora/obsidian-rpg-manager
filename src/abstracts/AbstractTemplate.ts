import {TemplateInterface} from "../interfaces/TemplateInterface";
import {RpgManagerSettings} from "../main";

export abstract class AbstractTemplate  implements TemplateInterface{
	constructor(
		protected settings: RpgManagerSettings,
		protected campaignId: string,
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
}
