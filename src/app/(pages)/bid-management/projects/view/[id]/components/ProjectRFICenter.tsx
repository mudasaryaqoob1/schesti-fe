import WhiteButton from '@/app/component/customButton/white';
import { InputComponent } from '@/app/component/customInput/Input';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { IRFI } from '@/app/interfaces/rfi.interface';
import { rfiService } from '@/app/services/rfi.service';
import { SearchOutlined } from '@ant-design/icons';
import { Avatar, Skeleton, } from 'antd';
import { AxiosError } from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { RFIReply } from './RFIReply';
import { CreateRFI } from '@/app/(pages)/bid-management/sub-contractor/components/CreateRFI';

type Props = {
  projectId: string
};


export function ProjectRFICenter({ projectId }: Props) {
  const [rfis, setRfis] = useState<IRFI[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [search, setSearch] = useState('');




  useEffect(() => {
    fetchRFIs();
  }, [projectId])

  async function fetchRFIs() {
    if (projectId) {
      setIsFetching(true);
      rfiService.httpGetAllProjectRFIs(projectId)
        .then(res => {
          if (res.data) {
            setRfis(res.data.rfis);
          }
        })
        .catch(err => {
          const error = err as AxiosError<{ message: string }>;
          toast.error(error.response?.data.message || 'An error occurred');
        })
        .finally(() => {
          setIsFetching(false);
        });
    }
  }





  if (isFetching) {
    return <Skeleton />
  }

  return (
    <div className="mb-4 md:ms-[69px] md:me-[59px] mx-4  ">
      <div className="flex items-center justify-between">
        <TertiaryHeading
          title="RFI Centerppp"
          className="text-[20px] leading-[30px]"
        />

        <div className="flex items-center space-x-2">
          <div className="pt-1">
            <WhiteButton
              text="Export"
              icon="/uploadcloud.svg"
              iconwidth={20}
              iconheight={20}
            />
          </div>

          <div className="w-96">
            <InputComponent
              label=""
              placeholder="Search"
              name="search"
              type="text"
              field={{
                prefix: <SearchOutlined className="text-xl" />,
                value: search,
                onChange: (e) => {
                  setSearch(e.target.value);
                },
              }}
            />
          </div>
        </div>
      </div>

      {rfis.filter(rfi => {
        if (!search) {
          return true;
        }
        return rfi.description.toLowerCase().includes(search.toLowerCase());
      }).map(rfi => {
        const user = rfi.user;

        return <div key={rfi._id} className="mt-4 px-2 flex bg-white rounded-lg shadow">
          <Avatar
            src={typeof rfi.user !== 'string' ? rfi.user.avatar || rfi.user.companyLogo : ""}
            size={40}
            className='mt-4'
          />

          <div className="py-4 flex-1 px-4 space-y-2">
            <div className="flex justify-between">
              <TertiaryHeading
                title={`${typeof user !== 'string' ? user.companyName || user.organizationName || user.name: ""} | ${moment(rfi.createdAt).format('MMM DD, YYYY, hh:mm A')}`}
                className="text-[14px] leading-5 font-semibold text-[#667085]"
              />
              <div className="flex items-center space-x-4">
                {rfi.type === 'private' ? <p className="py-[5px] rounded-full px-[11px] bg-[#E9EBF8] text-[#7138DF] text-xs leading-4">
                  Private
                </p> : null}

                {/* current date === createdAt then display */}

                {moment().isSame(rfi.createdAt, 'day') ? <p className="py-[5px] rounded-full px-[11px] bg-[#E9EBF8] text-[#7138DF] text-xs leading-4">
                  <CreateRFI isProjectOwner={true} onSuccess={() => {}} projectId={projectId} />
                </p> : null
                }
                <RFIReply
                  key={rfi._id}
                  onSuccess={(rfi) => {
                    setRfis([rfi, ...rfis]);
                  }}
                  projectId={rfi.projectId}
                  messageId={rfi._id}
                />
              </div>
            </div>
            <TertiaryHeading
              title={rfi.description}
              className="text-[#475467] text-[14px] leading-6 font-normal "
            />
          </div>
        </div>
      })}
    </div>
  );
}
