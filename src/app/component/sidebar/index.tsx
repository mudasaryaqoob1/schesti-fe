import Image from "next/image";
import { forwardRef } from "react";
import { NavItem } from "./NavItem";
import { Divider } from "antd";

type Props = {
    isHovering: boolean;
}

const HOVERED_WIDTH = "w-[240px]";
const UNHOVERED_WIDTH = "w-[80px]";
const ICON_WIDTH = 20;
const ICON_HEIGHT = 20;


export const AppSidebar = forwardRef<HTMLDivElement, Props>((props, ref) => {
    const { isHovering } = props;
    return <div ref={ref} className={`fixed h-full bg-schestiPrimary ${isHovering ? HOVERED_WIDTH : UNHOVERED_WIDTH}`}>

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
                isParentHovered={isHovering}
                title="Dashboard"
                href="/dashboard"
                icon={{
                    name: "home",
                    height: ICON_HEIGHT,
                    width: ICON_WIDTH
                }}
                isActive
            />

            <NavItem
                isParentHovered={isHovering}
                title="Bid Management"
                href="/bid-management"
                icon={{
                    name: "bid",
                    height: ICON_HEIGHT,
                    width: ICON_WIDTH
                }}
                nestedItems={[
                    { title: "Find Project", href: "" },
                    { title: "Bidding Projects", href: "" },
                    { title: "Posted Projects", href: "" },
                    { title: "Post a project", href: "" },
                ]}
            />

            <NavItem
                isParentHovered={isHovering}
                title="CRM"
                href="/bid-management"
                icon={{
                    name: "crm",
                    height: ICON_HEIGHT,
                    width: ICON_WIDTH
                }}
            />

            <NavItem
                isParentHovered={isHovering}
                title="Quantity Takeoff"
                href="/bid-management"
                icon={{
                    name: "quantity",
                    height: ICON_HEIGHT,
                    width: ICON_WIDTH
                }}
            />

            <NavItem
                isParentHovered={isHovering}
                title="Estimate"
                href="/bid-management"
                icon={{
                    name: "estimate",
                    height: ICON_HEIGHT,
                    width: ICON_WIDTH
                }}
            />

            <NavItem
                isParentHovered={isHovering}
                title="Schedule"
                href="/bid-management"
                icon={{
                    name: "schedule",
                    height: ICON_HEIGHT,
                    width: ICON_WIDTH
                }}
            />

            <NavItem
                isParentHovered={isHovering}
                title="Finance"
                href="/bid-management"
                icon={{
                    name: "financial",
                    height: ICON_HEIGHT,
                    width: ICON_WIDTH
                }}
            />
            <NavItem
                isParentHovered={isHovering}
                title="Meeting"
                href="/bid-management"
                icon={{
                    name: "meeting",
                    height: ICON_HEIGHT,
                    width: ICON_WIDTH
                }}
            />
            <NavItem
                isParentHovered={isHovering}
                title="Networking"
                href="/bid-management"
                icon={{
                    name: "networking",
                    height: ICON_HEIGHT,
                    width: ICON_WIDTH
                }}
            />

            <NavItem
                isParentHovered={isHovering}
                title="Social Media"
                href="/bid-management"
                icon={{
                    name: "social",
                    height: ICON_HEIGHT,
                    width: ICON_WIDTH
                }}
            />


            <Divider className="border-white" />
            <NavItem
                isParentHovered={isHovering}
                title="Settings"
                href="/bid-management"
                icon={{
                    name: "setting",
                    height: ICON_HEIGHT,
                    width: ICON_WIDTH
                }}
            />
        </div>

    </div>
});
AppSidebar.displayName = "AppSidebar";
