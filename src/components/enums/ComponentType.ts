export enum ComponentType {
	Campaign			=0b1, //1
	Adventure			=0b10, //2
	Act					=0b100, // 4
	Scene				=0b1000, // 8
	Session				=0b10000, // 16
	Character			=0b100000, // 32
	NonPlayerCharacter	=0b1000000, // 64
	Location			=0b10000000, // 128
	Event				=0b100000000, // 256
	Clue				=0b1000000000, // 512
	Faction				=0b10000000000, // 1024
	Music				=0b100000000000, // 2048
	Subplot				=0b1000000000000, // 4096
}
