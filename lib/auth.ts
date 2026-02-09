

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import { env } from "./env";
import { emailOTP } from "better-auth/plugins"
import { resend } from "./resend";
import {admin} from "better-auth/plugins"

export const auth = betterAuth({
      database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    socialProviders: {
        github: {
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET,
        },

    },
    plugins: [
        emailOTP({
            async sendVerificationOTP({ email, otp }) {
            const { data, error } = await resend.emails.send({
            from: 'School of Marvel <onboarding@resend.dev>',
            to: [email],
            subject: 'School of Marvel - Your Login OTP',
            html:'<P>Your OTP code is: <strong>' + otp + '</strong></P><p>This code will expire in ~10 minutes.</p>',
        });
            },
        }),
        admin()
    ],
});