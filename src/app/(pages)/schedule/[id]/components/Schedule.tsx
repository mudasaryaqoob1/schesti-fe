import CustomButton from "@/app/component/customButton/button";
import Description from "@/app/component/description";
import SecondaryHeading from "@/app/component/headings/Secondary";

export function Schedule() {
    return (
        <section className="mx-4 rounded-xl  grid items-center border border-solid border-silverGray shadow-secondaryTwist">
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
        </section>
    )
}