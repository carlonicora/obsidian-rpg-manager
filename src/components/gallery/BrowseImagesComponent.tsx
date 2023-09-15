import { useApp } from "@/hooks/useApp";
import { App, TAbstractFile, TFile } from "obsidian";
import * as React from "react";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { ImageInterface } from "src/data/interfaces/ImageInterface";
import { useApi } from "src/hooks/useApi";
import { ImageService } from "src/services/ImageService";
import { RpgManagerCodeblockService } from "src/services/RpgManagerCodeblockService";

export default function BrowseImagesComponent({
	element,
	selectImage,
}: {
	element: ElementInterface;
	selectImage: () => void;
}): React.ReactElement {
	const api: RpgManagerInterface = useApi();
	const app: App = useApp();

	const [searchTerm, setSearchTerm] = React.useState<string>("");

	let allImages: TAbstractFile[] = app.vault.getAllLoadedFiles();

	if (api.settings.assetsFolder !== undefined && api.settings.assetsFolder !== "") {
		allImages = allImages.filter((file: TAbstractFile) => file.path.startsWith(api.settings.assetsFolder ?? "Assets"));
	}

	allImages = allImages.filter(
		(file: TFile) =>
			file.extension === "png" || file.extension === "jpg" || file.extension === "jpeg" || file.extension === "webp"
	);

	if (searchTerm !== "") {
		allImages = allImages.filter((file: TFile) => file.path.toLowerCase().includes(searchTerm.toLowerCase()));
	}

	const handleAddExistingImage = async (image: ImageInterface) => {
		const codeblockService = new RpgManagerCodeblockService(app, api, element.file);
		codeblockService.addImage(image.path, "").then(() => {
			selectImage();
		});
	};

	return (
		<div className="mt-3">
			<div className="grid mb-3 grid-cols-1 md:grid-cols-4 items-center justify-center">
				<div className="col-span-1">
					<a
						href="#"
						className="!no-underline cursor-pointer text-[--text-normal] hover:text-[--text-accent-hover]"
						onClick={selectImage}
					>
						&lt;back
					</a>
				</div>
				<div className="col-span-3 w-full">
					<input type="text" className="w-full" placeholder="Search" onChange={(e) => setSearchTerm(e.target.value)} />
				</div>
			</div>
			<div className="grid grid-cols-4 justify-center gap-3">
				{allImages.map((imageFile: TAbstractFile, index: number) => {
					let path;
					if (
						api.settings.assetsFolder !== undefined &&
						api.settings.assetsFolder !== "" &&
						imageFile.path.startsWith(api.settings.assetsFolder)
					) {
						path = imageFile.path.substring((api.settings.assetsFolder ?? "Assets").length + 1);
					} else {
						path = imageFile.path;
					}

					if (path.length === 0) return null;

					const imageData = { path: path };
					const image: ImageInterface | undefined = ImageService.createImage(app, api, imageData);

					if (!image) return null;

					return (
						<div key={index} className="flex justify-center relative" onClick={() => handleAddExistingImage(image)}>
							<div className="w-full relative pb-[100%]">
								<div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-lg">
									<img src={image.src} alt={image.caption} className="w-full h-auto object-contain !cursor-pointer" />
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
