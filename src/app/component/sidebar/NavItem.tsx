import { useHover } from "ahooks";
import Image from "next/image";
import { useRef } from "react";

type IconName = "bid" | "crm" | "estimate" | "financial" | "home" | "meeting" | "networking" | "quantity" | "schedule" | "setting" | "social";

type IconProps = {
    name: IconName,
    width: number,
    height: number,
}

type Props = {
    isParentHovered: boolean;
    icon: IconProps,
    title: string,
    href: string,
    nestedItems?: Array<{
        title: string,
        href: string,
    }>,
    isActive?: boolean,
}

const ACTIVE_ICON_COLOR = 'cyan';
const DEACTIVE_ICON_COLOR = 'white';


export function NavItem({
    href,
    isParentHovered,
    title,
    nestedItems,
    isActive,
    icon,
}: Props) {
    const hoveredIcon = {
        src: `/sidebar/${icon.name}-${ACTIVE_ICON_COLOR}.svg`,
        width: icon.width,
        height: icon.height
    }

    const unhoveredIcon = {
        src: `/sidebar/${icon.name}-${DEACTIVE_ICON_COLOR}.svg`,
        width: icon.width,
        height: icon.height
    }
    return <div className="px-[14px]">
        {isParentHovered ? <HoverItem
            hoveredIcon={hoveredIcon}
            href={href}
            nestedItems={nestedItems}
            unhoveredIcon={unhoveredIcon}
            title={title}
            isActive={isActive}
        />
            : <UnHoverItem
                hoveredIcon={hoveredIcon}
                unhoveredIcon={unhoveredIcon}
                isActive={isActive}
            />
        }
    </div>
}

function HoverItem({
    nestedItems,
    title,
    href,
    hoveredIcon,
    unhoveredIcon,
    isActive
}: {
    nestedItems?: Array<{
        title: string,
        href: string,
    }>,
    title: string,
    href: string,
    hoveredIcon: {
        src: string,
        width: number,
        height: number,
    },
    unhoveredIcon: {
        src: string,
        width: number,
        height: number,
    },
    isActive?: boolean,
}) {

    const ref = useRef<HTMLDivElement>(null);
    const isHover = useHover(ref);

    const ChevronIconSrc = isHover ? "/chevron-right-cyan.svg" : "/chevron-right-white.svg";

    if (isActive) {
        return <div className="flex cursor-pointer items-center justify-between  py-[14px] px-4 bg-white rounded-md">
            <div className="flex items-center space-x-2">
                <Image
                    src={hoveredIcon.src}
                    alt={"Nav Item"}
                    width={hoveredIcon.width}
                    height={hoveredIcon.height}
                />

                <p className={"text-[14px] font-medium text-schestiPrimary leading-5"}>{title}</p>
            </div>
            {nestedItems && nestedItems.length ?
                <Image
                    src={ChevronIconSrc}
                    alt={"right"}
                    width={24}
                    height={24}
                /> : null}
        </div>
    }

    return <div ref={ref} className={`flex items-center cursor-pointer justify-between  py-[14px] px-4 ${isHover ? "bg-white rounded-md" : ""}`}>
        {isHover ? <div className="flex items-center space-x-2">
            <Image
                src={hoveredIcon.src}
                alt={"Nav Item"}
                width={hoveredIcon.width}
                height={hoveredIcon.height}
            />

            <p className={"text-[14px] font-medium text-schestiPrimary leading-5"}>{title}</p>
        </div> : <div className="flex items-center space-x-2">
            <Image
                src={unhoveredIcon.src}
                alt={"Nav Item"}
                width={unhoveredIcon.width}
                height={unhoveredIcon.height}
            />

            <p className={"text-[14px] font-medium text-white leading-5"}>{title}</p>
        </div>}
        {nestedItems && nestedItems.length ?
            <Image
                src={ChevronIconSrc}
                alt={"right"}
                width={24}
                height={24}
            /> : null}
    </div>
}

function UnHoverItem({ isActive, unhoveredIcon, hoveredIcon }: {
    unhoveredIcon: {
        src: string,
        width: number,
        height: number,
    },
    isActive?: boolean,
    hoveredIcon: {
        src: string,
        width: number,
        height: number,
    },
}) {
    return <div className={`flex justify-center rounded-md py-2 px-4 ${isActive ? "bg-white" : ""}`}>
        <div>
            {isActive ? <Image
                alt="Nav Item"
                src={hoveredIcon.src}
                width={hoveredIcon.width}
                height={hoveredIcon.height}
            /> : <Image
                alt="Nav Item"
                src={unhoveredIcon.src}
                width={unhoveredIcon.width}
                height={unhoveredIcon.height}

            />}
        </div>
    </div>
}