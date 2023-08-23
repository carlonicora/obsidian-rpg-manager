export class HelperService {
	static extractPath(input: string): string {
		const regex = /\[\[(.*?)(?:\|.*?)?\]\]/;
		const match = input.match(regex);

		if (match && match[1]) {
			return match[1];
		}

		return undefined;
	}
}
