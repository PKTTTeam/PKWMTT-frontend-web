import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { type NextRequest } from "next/server";

import { env } from "@/env";
import { getPathname } from "@/i18n/navigation";
import { appRouter } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";
import { getLocale } from "next-intl/server";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */
const createContext = async (req: NextRequest) => {
    return createTRPCContext({
        headers: req.headers,
    });
};

const handler = async (req: NextRequest) => {
    return fetchRequestHandler({
        endpoint: getPathname({
            href: "/api/trpc",
            locale: await getLocale(),
            forcePrefix: true,
        }),
        req,
        router: appRouter,
        createContext: () => createContext(req),
        onError: env.NEXT_PUBLIC_IS_DEV
            ? ({ path, error }) => {
                  console.error(
                      `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
                  );
              }
            : undefined,
    });
};
export { handler as GET, handler as POST };
