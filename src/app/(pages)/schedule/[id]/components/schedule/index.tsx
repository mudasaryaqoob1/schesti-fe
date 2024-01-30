import CustomButton from '@/app/component/customButton/button';
import Description from '@/app/component/description';
import SecondaryHeading from '@/app/component/headings/Secondary';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { useState } from 'react';
import { CategoryModal } from './Category';
import { IWBSType, ScopeItem } from '../../type';
import {
  DownOutlined,
  EditOutlined,
  MoreOutlined,
  RightOutlined,
} from '@ant-design/icons';
import SenaryHeading from '@/app/component/headings/senaryHeading';
import { Collapse } from 'antd';
import { ScheduleTable } from './Table';

type Props = {
  updateWbsScopeItems: (_id: string, _scopeItems: ScopeItem[]) => void;
  addWbs: (_category: IWBSType['category'], _subCategory: IWBSType['subCategory']) => void;
  state: IWBSType[];
}

export function Schedule({ addWbs, state, updateWbsScopeItems }: Props) {
  const [materialModal, setMaterialModal] = useState(false);
  const [active, setActive] = useState<string | string[]>(['']);

  return (
    <section>
      <CategoryModal
        materialModal={materialModal}
        setMaterialModal={setMaterialModal}
        handleWbs={addWbs}
      />
      <div className=" flex items-center justify-between mt-4">
        <TertiaryHeading title="Schedule" className="text-lg tracking-wide" />
        <CustomButton
          text="Add New WBS"
          icon="/plus-yellow.svg"
          iconheight={20}
          iconwidth={20}
          className="!w-44 !bg-white !text-[#EF9F28] !border-[#EF9F28]"
          onClick={() => setMaterialModal(true)}
        />
      </div>
      <div className="mx-4 rounded-xl">
        {state.length > 0 ? (
          <div>
            <Collapse
              ghost
              onChange={(key) => {
                setActive(key);
              }}
              items={state.map((item, i) => {
                return {
                  key: i,
                  label: (
                    <div className="flex items-center space-x-2">
                      {Array.isArray(active) && active.includes(i.toString()) ? (
                        <DownOutlined className="text-obsidianBlack2 p-1 border rounded text-lg" />
                      ) : (
                        <RightOutlined className="text-obsidianBlack2 p-1 border rounded text-lg" />
                      )}
                      <div className="flex border flex-wrap justify-between w-[33%] px-4 rounded-full bg-[#F9FAFB] items-center">
                        <SenaryHeading
                          title={item.title}
                          className="text-obsidianBlack2 font-semibold text-base tracking-wider"
                        />
                        <div className="space-x-1">
                          <EditOutlined className="text-obsidianBlack2 border rounded bg-[#EAECF0] p-2 text-lg " />
                          <MoreOutlined className="text-obsidianBlack2 border rounded bg-[#EAECF0] p-2 text-lg " />
                        </div>
                      </div>
                    </div>
                  ),
                  showArrow: false,
                  children: <ScheduleTable updateWbsScopeItems={updateWbsScopeItems} wbs={item} />,
                }
              })}
            />
          </div>
        ) : (
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
                  text={'Create WBS'}
                  onClick={() => setMaterialModal(true)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
