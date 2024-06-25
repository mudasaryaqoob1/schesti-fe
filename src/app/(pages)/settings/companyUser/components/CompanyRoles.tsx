import Button from '@/app/component/customButton/button';
import { useRouterHook } from '@/app/hooks/useRouterHook';
import { OtherRoutes, Plans } from '@/app/utils/plans.utils';
import { RootState } from '@/redux/store';
import { Checkbox, Collapse, Skeleton } from 'antd';
import Image from 'next/image';
import { useState } from 'react';
import { useSelector } from 'react-redux';


export function CompanyRoles() {
    const [search, setSearch] = useState('');
    const router = useRouterHook();
    const companyRolesState = useSelector((state: RootState) => state.companyRoles);

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

        <div className='mt-4'>
            {companyRolesState.loading ? <div>
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
            </div> : companyRolesState.data.map(role => {
                return <Collapse key={role._id} collapsible='header' items={[
                    {
                        key: role._id, label: role.name, children: <div className="grid mt-3 grid-cols-3 gap-3">
                            {Object.keys(Plans).map((planKey) => {
                                const value = Plans[planKey as keyof typeof Plans];
                                const isChecked = role.permissions.includes(value);
                                return <Checkbox
                                    key={planKey}
                                    checked={isChecked}
                                    className="text-schestiPrimaryBlack font-normal"
                                >
                                    {planKey}
                                </Checkbox>
                            })}
                        </div>
                    }
                ]}

                />
            })}

        </div>
    </div>
}