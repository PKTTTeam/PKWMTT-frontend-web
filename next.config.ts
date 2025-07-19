import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
    // Use standalone output only when building with Docker
    output: process.env.DOCKER_BUILD === "true" ? "standalone" : undefined,
};

const withNextIntl = createNextIntlPlugin({
    experimental: {
        createMessagesDeclaration: "./messages/en.json",
    },
});

export default withNextIntl(nextConfig);
