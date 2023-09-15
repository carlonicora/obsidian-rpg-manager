import { ElementInterface } from "@/data/interfaces/ElementInterface";

export class HelperService {
	static extractPath(input: string): string {
		const regex = /\[\[(.*?)(?:\|.*?)?\]\]/;
		const match = input.match(regex);

		if (match && match[1]) {
			return match[1];
		}

		return undefined;
	}

	static getPositionInParent(elements: ElementInterface[]): number {
		if (elements.length === 0) return 1;

		const highestPositionInParent = Math.max(...elements.map((element: ElementInterface) => element.positionInParent));
		return highestPositionInParent + 1;
	}
}
