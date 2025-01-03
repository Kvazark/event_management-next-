import { z } from 'zod';
export const email = z
	.string()
	.email()
	.transform((str) => str.toLowerCase().trim());

export const password = z
	.string()
	.min(5)
	.max(100)
	.transform((str) => str.trim());

export const ForgotPassword = z.object({
	email,
});

export const ResetPassword = z
	.object({
		password: password,
		passwordConfirmation: password,
		token: z.string().optional(),
	})
	.refine((data) => data.password === data.passwordConfirmation, {
		message: "Passwords don't match",
		path: ['passwordConfirmation'], // set the path of the error
	});
