import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { handelError } from "../../errors/handelError";
import { prisma } from "../../providers/prisma.provider";
import { ProviderUserType, RequestUserType } from "../../types/user.types";

const storeToken = async (id: string, token: string) => {
	try {
		const currentToken = await prisma.token.findFirst({
			where: {
				user_id: id,
			},
		});

		if (!currentToken) {
			await prisma.token.create({
				data: {
					user_id: id,
					token: token,
				},
			});
			return;
		}

		return await prisma.token.update({
			where: {
				user_id: id,
			},
			data: {
				user_id: id,
				token: token,
			},
		});
	} catch (error) {
		return;
	}
};

export const signIn = async (req: Request, res: Response) => {
	const data: RequestUserType = req.body;

	try {
		const user = await prisma.user.findFirst({
			where: {
				email: data.email,
			},
		});

		if (!user) return handelError(res, 404);

		if (!user.password) return handelError(res, 401, "Invalid sign in method");

		if (await bcrypt.compare(data.password, user?.password!)) {
			const payload = {
				username: user?.username,
				email: user?.email,
			};
			const token = jwt.sign(payload, process.env.SECRET_KEY!);

			// Store user token
			await storeToken(user.id, token);

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

			const payload = {
				username: data.username,
				email: data.email,
			};

			const token = jwt.sign(payload, process.env.SECRET_KEY!);
			await storeToken(newUser?.id, token);
			return res.status(201).send({
				status: "success",
				data: {
					token: token,
				},
				message: "Signed in sucessfuly",
			});
		} else {
			const payload = {
				username: data.username,
				email: data.email,
			};

			const token = jwt.sign(payload, process.env.SECRET_KEY!);

			await storeToken(user.id, token);

			return res.status(201).send({
				status: "success",
				data: {
					token: token,
				},
				message: "Signed in sucessfuly",
			});
		}
	} catch (error) {
		handelError(res, 500, error);
	}
};
