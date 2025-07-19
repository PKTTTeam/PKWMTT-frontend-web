"use client";

import useDesktopNavigation from "@/hooks/use-deskop-navigation";
import DesktopNavLink from "./desktop-nav-link";

export default function DesktopNav() {
    const { indicatorStyle, navRef, isMounted, linkRefs, navigationItems } =
        useDesktopNavigation();

    return (
        <nav
            ref={navRef}
            className="relative hidden items-center gap-2 md:flex"
        >
            {/* animated active indicator - only render after mount */}
            {isMounted && (
                <div
                    className="bg-button pointer-events-none absolute top-0 h-full rounded-lg transition-all duration-300 ease-out"
                    style={{
                        left: `${indicatorStyle.left}px`,
                        width: `${indicatorStyle.width}px`,
                        opacity: indicatorStyle.opacity,
                    }}
                />
            )}

            {/* navigation links */}
            {navigationItems.map(({ href, label, icon }, index) => (
                <DesktopNavLink
                    key={href}
                    href={href}
                    ref={(el) => {
                        linkRefs.current[index] = el;
                    }}
                >
                    {icon}
                    <span>{label}</span>
                </DesktopNavLink>
            ))}
        </nav>
    );
}
