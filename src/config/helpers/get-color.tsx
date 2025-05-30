import axios from "axios";

export async function getColorFromImage(imageUrl: string): Promise<string | undefined> {
	try {
		const response = await axios.get(`https://api.microlink.io`, {
			params: {
				url: imageUrl,
				palette: true,
			},
		});
		const color = response.data.data.image.palette[0];
		return typeof color === "string" ? color : "";
	} catch (error) {
		console.error("Error getting color from image", error);
		return undefined;
	}
}
