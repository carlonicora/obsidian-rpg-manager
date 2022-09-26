export enum TableField {
	Index,
	Image,
	Name,
	Age,
	Synopsis,
	Found,
	Date,
	Url,
	StoryCircleIndicator,
	StartTime,
	EndTime,
	Duration,
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
]);
