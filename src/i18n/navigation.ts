import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const {
    Link,
    redirect,
    usePathname,
    permanentRedirect,
    useRouter,
    getPathname,
} = createNavigation(routing);
