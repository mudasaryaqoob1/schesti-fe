'use client';
import { bg_style, senaryHeading } from '@/globals/tailwindvariables';
import { useRouter, usePathname, useParams } from 'next/navigation';

const Index = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { id } = useParams();
  const active =
    'bg-cosmicGray  text-rotalPurple w-full rounded-[6px] font-semibold';
  const tabs = [
    { id: 1, name: 'General Settings', route: ['/settings/general'] },
    { id: 2, name: 'Plans', route: ['/settings/plans'] },
    {
      id: 3,
      name: 'User Managements',
      route: ['/settings/companyUser', '/settings/companyUser/addCompanyUser'],
    },
    { id: 4, name: 'Material Settings', route: ['/settings/MeterialSettings'] },
    { id: 5, name: 'Materials', route: ['/settings/meterials'] },
    { id: 6, name: 'Target', route: ['/settings/target'] },
    {
      id: 7,
      name: 'Support Ticket',
      route: [
        '/settings/supporttickets',
        '/settings/supporttickets/create',
        `/settings/supporttickets/edit/${id}`,
        `/settings/supporttickets/${id}`,
      ],
    },
  ];

  return (
    <div
      className={`${bg_style} md:min-w-[222px] p-3 sticky top-0 left-0 right-0`}
    >
      <div className="flex flex-col gap-2">
        {tabs.map((tab) => (
          <p
            key={tab.id}
            className={`py-3 px-3 !text-sm cursor-pointer transition-colors ${senaryHeading} ${
              tab.route.includes(pathname) ? active : ''
            } `}
            onClick={() => router.push(tab.route[0])}
          >
            {tab.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Index;
