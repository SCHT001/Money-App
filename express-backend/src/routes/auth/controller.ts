import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { handelError } from "../../errors/handelError";
import { prisma } from "../../providers/prisma.provider";
import { ProviderUserType, RequestUserType } from "../../types/user.types";

export const signIn = async (req: Request, res: Response) => {
	const data: RequestUserType = req.body;

	try {
		const user = await prisma.user.findFirst({
			where: {
				email: data.email,
			},
		});

		if (!user) return handelError(res, 404);

		if (await bcrypt.compare(data.password, user?.password!)) {
			const payload = {
				username: user?.username,
				email: user?.email,
			};
			const token = jwt.sign(payload, process.env.SECRET_KEY!);

			return res.status(200).send({
				status: "success",
				data: {
					token: token,
				},
				message: "Signed in sucessfuly",
			});
		} else return handelError(res, 401);
	} catch (error) {
		handelError(res, 500, error);
	}
};

export const providerSignIn = async (req: Request, res: Response) => {
	const data: ProviderUserType = req.body;

	try {
		const user = await prisma.user.findFirst({
			where: {
				email: data.email,
			},
		});

		if (!user) {
			const newUser = await prisma.user.create({
				data: data,
			});
		}

		const payload = {
			username: data.username,
			email: data.email,
		};

		const token = jwt.sign(payload, process.env.SECRET_KEY!);

		return res.status(201).send({
			status: "success",
			data: {
				token: token,
			},
			message: "Signed in sucessfuly",
		});
	} catch (error) {
		handelError(res, 500, error);
	}
};
