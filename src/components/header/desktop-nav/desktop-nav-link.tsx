"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Props = {
    href: "/" | "/calendar" | "/year-organization" | "/settings";
    children: React.ReactNode;
    ref: React.Ref<HTMLAnchorElement>;
};

export default function DesktopNavLink({ href, children, ref }: Props) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            ref={ref}
            href={href}
            className={cn(
                "hover:bg-button/50 hover:[&>svg]:fill-accent hover:text-foreground z-20 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                isActive
                    ? "[&>svg]:fill-accent text-accent-foreground"
                    : "[&>svg]:fill-accent/70 text-foreground/70",
            )}
        >
            {children}
        </Link>
    );
}
