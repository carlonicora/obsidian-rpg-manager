export enum RelationshipType {
	Reversed 		= 0b1, //1
	Bidirectional 	= 0b10, //2
	Unidirectional 	= 0b100, //4
	Parent 			= 0b1000, //8
	Child			= 0b10000, //16
	Hierarchy 		= 0b100000, //32
	Undefined 		= 0b1000000, //64
}
