import { useApp } from "@/hooks/useApp";
import { App } from "obsidian";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import { ElementType } from "src/data/enums/ElementType";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { ImageInterface } from "src/data/interfaces/ImageInterface";
import { useApi } from "src/hooks/useApi";
import { RpgManagerCodeblockService } from "src/services/RpgManagerCodeblockService";
import MarkdownEditorComponent from "../editors/MarkdownEditorComponent";

export default function SingleImageComponent({
	element,
	image,
	resetCurrentImage,
}: {
	element: ElementInterface;
	image: ImageInterface;
	resetCurrentImage: () => void;
}): React.ReactElement {
	const { t } = useTranslation();
	const api: RpgManagerInterface = useApi();
	const app: App = useApp();

	const [caption, setCaption] = React.useState<string>(image.caption);

	const codeblockService = new RpgManagerCodeblockService(app, api, element.file);

	const saveCaption = () => {
		codeblockService.updateImage(image.path, caption).then(() => {
			resetCurrentImage();
		});
	};

	const deleteImage = () => {
		codeblockService.removeImage(image.path).then(() => {
			resetCurrentImage();
		});
	};

	return (
		<div className="mt-3">
			<div>
				<a
					href="#"
					className="!no-underline cursor-pointer text-[--text-normal] hover:text-[--text-accent-hover]"
					onClick={resetCurrentImage}
				>
					&lt; back
				</a>
			</div>
			<div className="flex items-start">
				<div className="flex items-start justify-start w-[350px] h-[350px]">
					<img src={image.src} alt={caption} className="object-contain rounded-lg" />
				</div>
				<div className="ml-3 w-full">
					<div>
						<h3 className="!m-0 !text-xl !font-extralight">{t("gallery.caption")}</h3>
						<div className="w-full">
							<MarkdownEditorComponent
								initialValue={caption}
								onChange={setCaption}
								campaignPath={element.type === ElementType.Campaign ? element.path : element.campaignPath}
								className="w-full"
							/>
						</div>
						<div className="flex w-full justify-end">
							<button className="rpgm-danger" onClick={deleteImage}>
								{t("buttons.delete")}
							</button>
							<button className="rpgm-primary" onClick={saveCaption}>
								{t("buttons.save")}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
