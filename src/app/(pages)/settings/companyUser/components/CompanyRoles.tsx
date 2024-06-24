import Button from '@/app/component/customButton/button';
import { useRouterHook } from '@/app/hooks/useRouterHook';
import { OtherRoutes } from '@/app/utils/plans.utils';
import Image from 'next/image';
import { useState } from 'react';


export function CompanyRoles() {
    const [search, setSearch] = useState('');
    const router = useRouterHook();
    return <div>
        <div className="flex justify-between items-center mb-3">
            <div
                className="rounded-lg border border-Gainsboro
                      w-[464px] h-[40px] 
                      my-5 flex items-center gap-2 px-3.5 py-2.5"
            >
                <Image
                    src={'/search.svg'}
                    alt="search icon "
                    width={16}
                    height={16}
                    className="cursor-pointer"
                />
                <input
                    type="search"
                    name=""
                    id=""
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full h-full bg-transparent outline-none"
                />
            </div>
            <Button
                text="Create new role"
                className="!w-auto "
                icon="/plus.svg"
                iconwidth={20}
                iconheight={20}
                onClick={() => {
                    router.push(`${OtherRoutes.Settings.Company_Roles}`)
                }}
            />
        </div>
    </div>
}