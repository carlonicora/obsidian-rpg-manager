export enum TableField {
	/**
	 * DO NOT CHANGE OR REUSE THE IDS
	 * They are used in the configuration.
	 * If need to remove, do NOT reuse the same id
	 */
	Index=0,
	Image=1,
	Name=2,
	Age=3,
	Synopsis=4,
	Found=5,
	Date=6,
	Url=7,
	StoryCircleIndicator=8,
	StartTime=9,
	EndTime=10,
	Duration=11,
	SceneType=12,
	SceneExciting=13
}

export const tableFieldName: Map<TableField, string> = new Map<TableField, string>([
	[TableField.Index, 'Index'],
	[TableField.Image, 'Image'],
	[TableField.Name, 'Name'],
	[TableField.Age, 'Age'],
	[TableField.Synopsis, 'Synopsis'],
	[TableField.Found, 'Found'],
	[TableField.Date, 'Date'],
	[TableField.Url, 'Url'],
	[TableField.StoryCircleIndicator, 'Story Circle Indicator'],
	[TableField.StartTime, 'Start'],
	[TableField.EndTime, 'End'],
	[TableField.Duration, 'Duration'],
	[TableField.SceneType, 'Type'],
	[TableField.SceneExciting, 'Exciting?'],
]);
