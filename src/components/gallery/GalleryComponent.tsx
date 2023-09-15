import { useApp } from "@/hooks/useApp";
import { App } from "obsidian";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { ImageInterface } from "src/data/interfaces/ImageInterface";
import { useApi } from "src/hooks/useApi";
import { FileUploadService } from "src/services/FileUploadService";
import { RpgManagerCodeblockService } from "src/services/RpgManagerCodeblockService";
import BrowseImagesComponent from "./BrowseImagesComponent";
import CurrentImagesComponent from "./CurrentImagesComponent";
import SingleImageComponent from "./SingleImageComponent";

export default function GalleryComponent({ element }: { element: ElementInterface }): React.ReactElement {
	const { t } = useTranslation();
	const app: App = useApp();

	const [currentImage, setCurrentImage] = React.useState<ImageInterface | undefined>(undefined);
	const [browseImages, setBrowseImages] = React.useState<boolean>(false);
	const [key, setKey] = React.useState<number>(Date.now());

	const api: RpgManagerInterface = useApi();

	const codeblockService = new RpgManagerCodeblockService(app, api, element.file);
	const fileUpload = new FileUploadService(app, api);

	const refresh = () => {
		setKey(Date.now());
		setBrowseImages(false);
	};

	const resetCurrentImage = () => {
		setTimeout(() => {
			refresh();
		}, 500);
		setCurrentImage(undefined);
	};

	const handleDragOver = (event: React.DragEvent) => {
		event.preventDefault();
	};

	const handleFileDrop = (event: React.DragEvent) => {
		event.preventDefault();
		fileUpload.uploadFileList(element, event.dataTransfer.files).then(() => {
			setTimeout(() => {
				refresh();
			}, 500);
		});
	};

	const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		fileUpload.uploadFileList(element, event.target.files).then(() => {
			setTimeout(() => {
				refresh();
			}, 500);
		});
	};

	const handleImageUrlChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		try {
			const response = await fetch(event.target.value, {
				method: "HEAD",
			});

			if (response.headers.get("Content-Type")?.startsWith("image/")) {
				codeblockService.addImage(event.target.value, "").then(() => {
					setTimeout(() => {
						refresh();
					}, 500);
				});
			}
		} catch (error) {
			//none
		}
	};

	let content;

	if (currentImage !== undefined) {
		content = (
			<SingleImageComponent key={key} element={element} image={currentImage} resetCurrentImage={resetCurrentImage} />
		);
	} else if (browseImages === true) {
		content = <BrowseImagesComponent key={key} element={element} selectImage={resetCurrentImage} />;
	} else {
		content = <CurrentImagesComponent key={key} element={element} setCurrentImage={setCurrentImage} />;
	}

	return (
		<div key={key}>
			<div className="flex justify-center items-center">
				<h2 className="!text-2xl !font-extralight">{t("gallery.title")}</h2>
			</div>
			<div className="border-2 p-4">
				<div className="grid grid-cols-4 space-x-4">
					<div className="flex-1">
						<h3 className="!text-xl !font-extralight">{t("gallery.drag")}</h3>
						<div
							className="border-2 border-dashed p-4 cursor-pointer flex-1"
							onDrop={handleFileDrop}
							onDragOver={handleDragOver}
						>
							{t("gallery.dragdrop")}
						</div>
					</div>
					<div className="flex-1">
						<h3 className="!text-xl !font-extralight">{t("gallery.upload")}</h3>
						<input type="file" onChange={handleFileSelect} accept="image/*" />
					</div>
					<div className="flex-1">
						<h3 className="!text-xl !font-extralight">{t("gallery.link")}</h3>
						<input
							type="text"
							onChange={handleImageUrlChange}
							className="border-2 p-2 w-full"
							placeholder="Enter image url"
						/>
					</div>
					<div className="flex-1">
						<h3 className="!text-xl !font-extralight">{t("gallery.browse")}</h3>
						<button className="rpgm-secondary" onClick={() => setBrowseImages(true)}>
							{t("gallery.browselocal")}
						</button>
					</div>
				</div>
			</div>
			<div>{content}</div>
		</div>
	);
}
