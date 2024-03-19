import { InputComponent } from "@/app/component/customInput/Input";
import { SelectComponent } from "@/app/component/customSelect/Select.component";
import TertiaryHeading from "@/app/component/headings/tertiary";


type Props = {
    children?: React.ReactNode;
}

export function PostBasicInformation({ children }: Props) {
    return <div className="shadow-2xl rounded-xl border p-4">
        <TertiaryHeading
            title="Basic Information"
            className="text-[20px] leading-[30px]"
        />

        <div className=" mt-4 space-y-3">
            <div className="grid grid-cols-2 gap-4">
                <InputComponent
                    label="Project Name"
                    name="projectName"
                    type="text"
                    placeholder="Enter Project Name"
                />

                <InputComponent
                    label="Address"
                    name="address"
                    type="text"
                    placeholder="Enter Address"
                />

            </div>

            <InputComponent
                label="Zip Code"
                name="zipCode"
                type="number"
                placeholder="Enter Zip Code"
            />
            <div className="grid grid-cols-2 gap-4">
                <SelectComponent
                    label="City"
                    name="city"
                    placeholder="City"
                />

                <SelectComponent
                    label="State"
                    name="state"
                    placeholder="State"
                />
            </div>


            <SelectComponent
                label="Construction Types"
                name="constructionType"
                placeholder="Construction Types"
                field={{
                    options: [
                        {
                            value: "Civil",
                            label: "Civil"
                        },
                        {
                            value: "Commercial",
                            label: "Commercial"
                        },
                        { label: "Government / Public", value: "Government / Public" },
                        { label: "Industrial", value: "Industrial" },
                        { label: "Residential", value: "Residential" }
                    ]
                }}
            />
        </div>
        {children}
    </div>
}