"use client";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import useNavigationItems from "@/hooks/use-navigation-items";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import MobileNavLink from "./mobile-nav-link";

export default function MobileNavSheet() {
    const [open, setOpen] = useState<boolean>(false);

    const t = useTranslations("navigation");

    const { navigationItems } = useNavigationItems();

    const onOpenChange = useCallback(
        (open: boolean) => {
            setOpen(open);
        },
        [setOpen],
    );

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetTrigger className="ml-auto flex h-fit w-fit cursor-pointer flex-col space-y-1 p-2">
                <div className="h-0.5 w-6 bg-current"></div>
                <div className="h-0.5 w-6 bg-current"></div>
                <div className="h-0.5 w-6 bg-current"></div>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader className="border-b">
                    <SheetTitle className="text-left text-xl font-semibold">
                        {t("navigation")}
                    </SheetTitle>
                    <SheetDescription className="sr-only">
                        {t("navigation")}
                    </SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col gap-3 px-2">
                    {navigationItems.map(({ href, label, icon }) => (
                        <MobileNavLink
                            key={href}
                            href={href}
                            onOpenChange={onOpenChange}
                        >
                            {icon}
                            <span>{label}</span>
                        </MobileNavLink>
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    );
}
