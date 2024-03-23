import { InputComponent } from '@/app/component/customInput/Input';
import { SelectComponent } from '@/app/component/customSelect/Select.component';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { Country } from 'country-state-city'

type Props = {
  children?: React.ReactNode;
};

export function PostBasicInformation({ children }: Props) {

  const countries = Country.getAllCountries().map(country => ({ label: country.name, value: country.isoCode }));

  return (
    <div className=" bg-white shadow-2xl rounded-xl border p-4">
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

        <div className='flex items-center space-x-4'>
          <div className='flex-1'>
            <SelectComponent
              label='Country'
              placeholder='Country'
              name='country'
              field={{
                options: countries,
                showSearch: true
              }}
            />
          </div>
          <div className='flex-1'>
            <InputComponent
              label="Zip Code"
              name="zipCode"
              type="number"
              placeholder="Enter Zip Code"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <SelectComponent label="City" name="city" placeholder="City" />

          <SelectComponent label="State" name="state" placeholder="State" />
        </div>

        <SelectComponent
          label="Construction Types"
          name="constructionType"
          placeholder="Construction Types"
          field={{
            options: [
              {
                value: 'Civil',
                label: 'Civil',
              },
              {
                value: 'Commercial',
                label: 'Commercial',
              },
              { label: 'Government / Public', value: 'Government / Public' },
              { label: 'Industrial', value: 'Industrial' },
              { label: 'Residential', value: 'Residential' },
            ],
            showSearch: true,
            mode: "multiple"
          }}
        />
      </div>
      {children}
    </div>
  );
}
