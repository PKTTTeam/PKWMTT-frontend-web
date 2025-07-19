import type { routing } from "@/i18n/routing";

export type NavigationItem = {
    href: keyof typeof routing.pathnames;
    label: string;
    icon: React.ReactNode;
};
