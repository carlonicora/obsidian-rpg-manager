export class RpgMetadataValidator {
	public static validate(type: string, frontmatter: Record<string, unknown>): boolean{
		if (frontmatter === undefined || Object.keys(frontmatter).length === 0){
			return false;
		}

		return true;
	}
}
