import { usePathname } from "@/i18n/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import useNavigationItems from "./use-navigation-items";

const useDesktopNavigation = () => {
    const pathname = usePathname();
    const [isMounted, setIsMounted] = useState(false);

    const navRef = useRef<HTMLElement>(null);
    const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

    const { navigationItems } = useNavigationItems();

    const activeIndex = navigationItems.findIndex(
        (item) => item.href === pathname,
    );

    const indicatorStyle = useMemo(() => {
        if (activeIndex === -1 || !isMounted) {
            return { left: 0, width: 0, opacity: 0 };
        }

        const linkElement = linkRefs.current[activeIndex];
        const navElement = navRef.current;

        if (!linkElement || !navElement) {
            return { left: 0, width: 0, opacity: 0 };
        }

        const navRect = navElement.getBoundingClientRect();
        const linkRect = linkElement.getBoundingClientRect();

        return {
            left: linkRect.left - navRect.left,
            width: linkRect.width,
            opacity: 1,
        };
    }, [activeIndex, pathname, isMounted]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return {
        indicatorStyle,
        navRef,
        linkRefs,
        isMounted,
        navigationItems,
    };
};

export default useDesktopNavigation;
