export const handelError = (res: any, status: number, error?: any) => {
	if (status == 400)
		return res.status(400).send({
			status: "failed",
			data: [],
			error: error || "User not found",
		});

	if (status == 401) {
		return res.status(401).send({
			status: "failed",
			data: [],
			error: error || "Unauthorized",
		});
	}
	if (status == 404) {
		return res.status(404).send({
			status: "failed",
			data: [],
			error: error || "User not found",
		});
	}
	if (status == 409) {
		return res.status(409).send({
			status: "failed",
			data: [],
			error: error || "User already exists",
		});
	}
};
