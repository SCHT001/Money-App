export const handelError = (error: any, res: any) => {
	res.status(500).send({ error: error.message });
};
