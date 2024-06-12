import { forwardRef } from "react";

type Props = {
    isHovering: boolean;
}
export const AppSidebar = forwardRef<HTMLDivElement, Props>((props, ref) => {
    const { isHovering } = props;
    return <div ref={ref} className={`fixed h-full bg-schestiPrimary ${isHovering ? "w-[240px]" : "w-[80px]"}`}>
        Sidebar
    </div>
});
AppSidebar.displayName = "AppSidebar";
