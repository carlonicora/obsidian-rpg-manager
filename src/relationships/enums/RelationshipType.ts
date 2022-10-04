export enum RelationshipType {
	Reversed = 0b1, //1
	Biunivocal = 0b10, //2
	Univocal = 0b100, //4
	Parent = 0b1000, //8
	Child = 0b10000, //16
	Hierarchy = 0b100000, //32
}
