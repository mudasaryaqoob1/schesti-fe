import TertiaryHeading from "@/app/component/headings/tertiary";

export function AssetTotal() {
    return <div className="w-full space-y-3">
        <div className="flex justify-end border p-3 rounded space-x-10">
            <TertiaryHeading
                title="Net Long Term Assets"
                className="text-schestiPrimaryBlack font-medium"
            />
            <TertiaryHeading
                title="$45,873.12"
                className="text-schestiPrimaryBlack"
            />
        </div>

        <div className="flex justify-end border p-3 rounded space-x-10">
            <TertiaryHeading
                title="Total Asset"
                className="text-schestiPrimaryBlack"
            />
            <TertiaryHeading
                title="$4000.00"
                className="text-schestiPrimaryBlack"
            />
        </div>
    </div>
}