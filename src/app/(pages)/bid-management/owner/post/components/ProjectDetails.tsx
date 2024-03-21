import { InputComponent } from '@/app/component/customInput/Input';
import { SelectComponent } from '@/app/component/customSelect/Select.component';
import { DateInputComponent } from '@/app/component/cutomDate/CustomDateInput';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { TextAreaComponent } from '@/app/component/textarea';

type Props = {
  children?: React.ReactNode;
};

export function PostProjectDetails({ children }: Props) {
  return (
    <div className="shadow-2xl rounded-xl border p-4">
      <TertiaryHeading
        title="Project Details"
        className="text-[20px] leading-[30px]"
      />

      <div className=" mt-4 space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <SelectComponent
            label="Project Type"
            name="projectType"
            placeholder="Project Type"
            field={{
              options: [
                { label: 'Addition', value: 'Addition' },
                { label: 'Demolition', value: 'Demolition' },
                {
                  label: 'New Construction with Site Work',
                  value: 'New Construction with Site Work',
                },
                {
                  label: 'New Construction no Site Work',
                  value: 'New Construction no Site Work',
                },
                {
                  label: 'Renovation/Remodel/Repair',
                  value: 'Renovation/Remodel/Repair',
                },
                { label: 'Site Work Only', value: 'Site Work Only' },
                { label: 'Tenant Build-Out', value: 'Tenant Build-Out' },
              ],
            }}
          />

          <SelectComponent
            label="Project Building Use"
            name="projectBuildingUse"
            placeholder="Project Building Use"
            field={{
              options: [
                { label: 'Arena/Stadium', value: 'Arena/Stadium' },
                {
                  label: 'Assisted Living Facility/Elder Care',
                  value: 'Assisted Living Facility/Elder Care',
                },
                { label: 'Auto Dealership', value: 'Auto Dealership' },
                { label: 'Bank/Financial', value: 'Bank/Financial' },
                { label: 'Casino', value: 'Casino' },
                {
                  label: 'Clinic/Hospital/Medical',
                  value: 'Clinic/Hospital/Medical',
                },
                { label: 'Clubhouse', value: 'Clubhouse' },
                {
                  label: 'Conference/Convention Center',
                  value: 'Conference/Convention Center',
                },
                {
                  label: 'Convenience Store/Gas Station',
                  value: 'Convenience Store/Gas Station',
                },
                { label: 'Day Care Center', value: 'Day Care Center' },
                { label: 'Fitness Center', value: 'Fitness Center' },
                { label: 'Golf Course', value: 'Golf Course' },
                { label: 'Grocery Store', value: 'Grocery Store' },
                { label: 'Hotel/Motel', value: 'Hotel/Motel' },
                { label: 'Laboratory', value: 'Laboratory' },
                { label: 'Medical', value: 'Medical' },
                { label: 'Mixed-Use', value: 'Mixed-Use' },
                { label: 'Office', value: 'Office' },
                { label: 'Other', value: 'Other' },
                { label: 'Private School', value: 'Private School' },
                { label: 'Religious/Funeral', value: 'Religious/Funeral' },
                { label: 'Restaurant', value: 'Restaurant' },
                { label: 'Retail Store', value: 'Retail Store' },
                { label: 'Salon', value: 'Salon' },
                {
                  label: 'Service Station/Car Wash',
                  value: 'Service Station/Car Wash',
                },
                { label: 'Shell Building', value: 'Shell Building' },
                { label: 'Shopping Center', value: 'Shopping Center' },
                { label: 'Storage Facility', value: 'Storage Facility' },
                { label: 'Theater/Auditorium', value: 'Theater/Auditorium' },
                {
                  label: 'Warehouse/Distribution',
                  value: 'Warehouse/Distribution',
                },
                { label: 'Bridges/Tunnels', value: 'Bridges/Tunnels' },
                { label: 'Bus Station', value: 'Bus Station' },
                { label: 'Canal', value: 'Canal' },
                { label: 'Docks/Marina', value: 'Docks/Marina' },
                { label: 'Other', value: 'Other' },
                { label: 'Parking Garage', value: 'Parking Garage' },
                { label: 'Pipeline', value: 'Pipeline' },
                { label: 'Road/Highway', value: 'Road/Highway' },
                { label: 'Seawall', value: 'Seawall' },
                {
                  label: 'Sidewalk/Parking Lot',
                  value: 'Sidewalk/Parking Lot',
                },
                { label: 'Solid Waste Station', value: 'Solid Waste Station' },
                { label: 'Train Station', value: 'Train Station' },
                {
                  label: 'Transportation Terminal',
                  value: 'Transportation Terminal',
                },
                {
                  label: 'Waste Water Treatment',
                  value: 'Waste Water Treatment',
                },
                { label: 'Water/Sewer', value: 'Water/Sewer' },
              ],
            }}
          />
        </div>

        <SelectComponent
          label="Stage"
          name="stage"
          placeholder="Stage"
          field={{
            options: [
              {
                value: 'GC and Sub Bidding',
                label: 'GC and Sub Bidding',
              },
              {
                value: 'Budgeting/Planning',
                label: 'Budgeting/Planning',
              },
              {
                label: 'GC Awarded/Sub Bidding',
                value: 'GC Awarded/Sub Bidding',
              },
              {
                label: 'Closed/Subcontractor Awarded',
                value: 'Closed/Subcontractor Awarded',
              },
              { label: 'Residential', value: 'Residential' },
            ],
          }}
        />

        <div className="grid grid-cols-2 gap-4">
          <DateInputComponent
            label="Estimated Start Date"
            name="estimatedStartDate"
          />

          <InputComponent
            label="Duration"
            name="duration"
            placeholder="Duration"
            type=""
            field={{
              styles: {
                input: {
                  padding: 10,
                },
              },
              className: '!py-1.5',
              addonAfter: (
                <SelectComponent
                  label=""
                  name="durationType"
                  field={{
                    className: '!w-28',
                    options: [
                      { label: 'Days', value: 'days' },
                      { label: 'Months', value: 'months' },
                      { label: 'Years', value: 'years' },
                    ],
                    dropdownStyle: {
                      width: 100,
                    },
                    defaultValue: 'days',
                  }}
                />
              ),
            }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <TextAreaComponent
            label="Project Description"
            name="projectDescription"
            placeholder="Enter Project Description"
            field={{
              rows: 5,
            }}
          />

          <TextAreaComponent
            label="Special Instructions"
            name="specialInstructions"
            placeholder="Enter Special Instructions"
            field={{
              rows: 5,
            }}
          />
        </div>
      </div>
      {children}
    </div>
  );
}
