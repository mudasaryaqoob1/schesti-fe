import CustomButton from "@/app/component/customButton/button";
import Description from "@/app/component/description";
import SecondaryHeading from "@/app/component/headings/Secondary";
import TertiaryHeading from "@/app/component/headings/tertiary";

export function Schedule() {
    return (
        <section>
            <div className=" flex items-center justify-between mt-4">
                <TertiaryHeading
                    title="Schedule"
                    className="text-lg tracking-wide"
                />
                <CustomButton
                    text="Add New WBS"
                    icon="/plus-yellow.svg"
                    iconheight={20}
                    iconwidth={20}
                    className="!w-44 !bg-white !text-[#EF9F28] !border-[#EF9F28]"
                />
            </div>
            <div className="mx-4 rounded-xl h-[calc(100vh-450px)] grid items-center">
                <div className="grid place-items-center">
                    <div className="max-w-[500px] flex flex-col items-center p-4">
                        <SecondaryHeading
                            title="Create your project Schedule"
                            className="text-obsidianBlack2 mt-8"
                        />
                        <Description
                            title="Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content."
                            className="text-steelGray text-center font-normal"
                        />
                        <CustomButton
                            className="mt-7"
                            text={"Create WBS"}
                        />
                    </div>
                </div>
            </div>
        </section>

    )
}