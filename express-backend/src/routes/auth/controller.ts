import { Request, Response } from "express";
import { prisma } from "../../providers/prisma.provider";
import { RequestUserType } from "../../types/user.types";

export const signIn = async (req: Request, res: Response) => {
	const data: RequestUserType = req.body;
	const user = await prisma.user.findFirst({
		where: {
			email: data.email,
		},
	});
};
