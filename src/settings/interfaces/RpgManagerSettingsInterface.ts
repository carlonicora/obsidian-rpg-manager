import {TableField} from "../../services/relationshipsService/enums/TableField";
import {RpgManagerAdvanceSettingsSettingListInterface} from "./RpgManagerAdvanceSettingsSettingListInterface";

export interface RpgManagerSettingsInterface {
	templateFolder: string;
	imagesFolder: string;
	automaticMove: boolean;
	YouTubeKey: string;
	previousVersion: string;
	usePlotStructures: boolean;
	useSceneAnalyser: boolean;
	advanced: RpgManagerAdvanceSettingsSettingListInterface;
}

export const rpgManagerDefaultSettings: RpgManagerSettingsInterface = {
	automaticMove: true,
	templateFolder: '',
	imagesFolder: '',
	YouTubeKey: '',
	previousVersion: '',
	usePlotStructures: false,
	useSceneAnalyser: false,
	advanced: {
		Agnostic: {
			ActList: {
				title: 'Acts',
				defaultVisible: true,
				fields: [
					{field: TableField.Index, checked: true, required: false},
					{field:  TableField.Name, checked: true, required: true},
					{field:  TableField.Synopsis, checked: true, required: false},
				]
			},
			AdventureList: {
				title: 'Adventures',
				defaultVisible: true,
				fields: [
					{field:  TableField.Index, checked: true, required: false},
					{field:  TableField.Name, checked: true, required: true},
					{field:  TableField.Synopsis, checked: true, required: false},
				]
			},
			CharacterList: {
				title: 'Player Characters',
				defaultVisible: true,
				fields: [
					{field:  TableField.Image, checked: true, required: false},
					{field:  TableField.Name, checked: true, required: true},
					{field:  TableField.Age, checked: true, required: false},
					{field:  TableField.Synopsis, checked: true, required: false},
				]
			},
			ClueList: {
				title: 'Clues',
				defaultVisible: true,
				fields: [
					{field:  TableField.Image, checked: true, required: false},
					{field:  TableField.Name, checked: true, required: true},
					{field:  TableField.Found, checked: true, required: false},
					{field:  TableField.Synopsis, checked: true, required: false},
				]
			},
			EventList: {
				title: 'Events',
				defaultVisible: true,
				fields: [
					{field:  TableField.Image, checked: false, required: false},
					{field:  TableField.Name, checked: true, required: true},
					{field:  TableField.Date, checked: true, required: false},
					{field:  TableField.Synopsis, checked: true, required: false},
				]
			},
			FactionList: {
				title: 'Factions',
				defaultVisible: true,
				fields: [
					{field:  TableField.Image, checked: false, required: false},
					{field:  TableField.Name, checked: true, required: true},
					{field:  TableField.Synopsis, checked: true, required: false},
				]
			},
			LocationList: {
				title: 'Locations',
				defaultVisible: true,
				fields: [
					{field:  TableField.Image, checked: true, required: false},
					{field:  TableField.Name, checked: true, required: true},
					{field:  TableField.Synopsis, checked: true, required: false},
				]
			},
			MusicList: {
				title: 'Musics',
				defaultVisible: true,
				fields: [
					{field:  TableField.Image, checked: true, required: false},
					{field:  TableField.Name, checked: true, required: true},
					{field:  TableField.Url, checked: true, required: true},
					{field:  TableField.Synopsis, checked: true, required: false},
				]
			},
			NonPlayerCharacterList: {
				title: 'Non Player Characters',
				defaultVisible: true,
				fields: [
					{field:  TableField.Image, checked: true, required: false},
					{field:  TableField.Name, checked: true, required: true},
					{field:  TableField.Age, checked: true, required: false},
					{field:  TableField.Synopsis, checked: true, required: false},
				]
			},
			SceneList: {
				title: 'Scenes',
				defaultVisible: true,
				fields: [
					{field:  TableField.Index, checked: true, required: false},
					{field:  TableField.StoryCircleIndicator, checked: true, required: false},
					{field:  TableField.Name, checked: true, required: true},
					{field:  TableField.Synopsis, checked: true, required: false},
					{field:  TableField.Date, checked: true, required: false},
					{field:  TableField.Duration, checked: false, required: false},
					{field:  TableField.SceneType, checked: false, required: false},
					{field:  TableField.SceneExciting, checked: false, required: false},
				]
			},
			SessionList: {
				title: 'Sessions',
				defaultVisible: true,
				fields: [
					{field:  TableField.Index, checked: true, required: false},
					{field:  TableField.Name, checked: true, required: true},
					{field:  TableField.Date, checked: true, required: false},
					{field:  TableField.Synopsis, checked: true, required: false},
				]
			},
			SubplotList: {
				title: 'Subplots',
				defaultVisible: false,
				fields: [
					{field:  TableField.Name, checked: true, required: true},
					{field:  TableField.Synopsis, checked: true, required: false},
				]
			}
		}
	}
};
