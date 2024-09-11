import TertiaryHeading from '@/app/component/headings/tertiary';

export function AssetTotal() {
  return (
    <div className="w-full space-y-3">
      <div className="flex justify-end border p-3 rounded space-x-10">
        <TertiaryHeading
          title="Net Long Term Assets"
          className=" font-medium text-base"
        />
        <TertiaryHeading title="$45,873.12" className=" text-base" />
      </div>

      <div className="flex justify-end border p-3 rounded space-x-10">
        <TertiaryHeading title="Total Asset" className=" text-base" />
        <TertiaryHeading title="$4000.00" className=" text-base" />
      </div>
    </div>
  );
}
