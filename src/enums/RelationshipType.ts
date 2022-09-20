export enum RelationshipType {
	Direct=0b1,
	DirectInFrontmatter=0b10,
	Reverse=0b100,
	ReverseInFrontmatter=0b1000,
	All=0b1111,
}
