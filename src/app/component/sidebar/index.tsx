import Image from "next/image";
import { forwardRef } from "react";
import { NavItem } from "./NavItem";
import { Divider } from "antd";
import { planFeatureOptions } from "@/app/utils/plans.utils";
import { usePathname } from "next/navigation";
type Props = {
    isHovering: boolean;
}

const HOVERED_WIDTH = "w-[240px]";
const UNHOVERED_WIDTH = "w-[80px]";
const ICON_WIDTH = 20;
const ICON_HEIGHT = 20;


export const AppSidebar = forwardRef<HTMLDivElement, Props>((props, ref) => {
    const { isHovering } = props;
    const pathname = usePathname();

    return <div ref={ref} className={`fixed h-full bg-schestiPrimary transition-all duration-300 ease-in-out ${isHovering ? HOVERED_WIDTH : UNHOVERED_WIDTH}`}>

        {/* Logo */}
        <div className="flex justify-center mt-4">
            <Image
                src={"/schest-logo.svg"}
                alt="Schest Logo"
                width={79}
                height={20}
                className={"px-1"}
            />
        </div>

        <div className="mt-6 flex flex-col space-y-3">
            <NavItem
                icon={{
                    height: ICON_HEIGHT,
                    width: ICON_WIDTH,
                    name: "home"
                }}
                iconName=""
                isParentHovered={isHovering}
                label="Dashboard"
                value="/dashboard"
                isActive={pathname.includes("dashboard")}
            />

            {planFeatureOptions.map(feature => {

                return <NavItem
                    key={feature.title}
                    isParentHovered={isHovering}
                    isActive={
                        feature.value ? pathname.includes(feature.value) : Boolean(feature.options?.find((option) =>
                            option.children?.find(child => child.value.includes(pathname)) || option.value.includes(pathname)
                        ))
                    }
                    icon={{
                        name: feature.iconName as any,
                        height: ICON_HEIGHT,
                        width: ICON_WIDTH
                    }}
                    {...feature}
                />
            })}


            <Divider className="border-white" />
            <NavItem
                isParentHovered={isHovering}
                label="Settings"
                value="/settings/general"
                icon={{
                    name: "setting",
                    height: ICON_HEIGHT,
                    width: ICON_WIDTH
                }}
                iconName=""
                isActive={pathname.includes("settings")}
            />
        </div>

    </div>
});
AppSidebar.displayName = "AppSidebar";
