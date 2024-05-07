import React from 'react';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

import ModalComponent from '@/app/component/modal';

interface IProps {
  viewUserRoleModal: boolean;
  setViewUserRoleModal: Dispatch<SetStateAction<boolean>>;
}

const UserRolesModel = ({
  viewUserRoleModal,
  setViewUserRoleModal,
}: IProps) => {
  let planDocuments = [null];
  return (
    <div>
      <ModalComponent open={viewUserRoleModal} setOpen={setViewUserRoleModal}>
        <div
          className="bg-white !rounded-t-xl"
          style={{ borderRadius: '12px' }}
        >
          <div className="flex justify-between p-4 bg-[#F5F4FF] rounded-t-xl">
            <p className="text=[#344054] font-semibold text=[18px]">
              {' '}
              Select User’s{' '}
            </p>

            <Image
              className="cursor-pointer"
              src={'/closeicon.svg'}
              alt="close icon"
              width={20}
              height={20}
              onClick={() => setViewUserRoleModal(false)}
            />
          </div>
          <div className="p-4">
            <div>
              {planDocuments?.map(() => (
                <div
                  key={'doc.name'}
                  className={`p-4  border-2 border-[#D0D5DD] rounded-lg w-full`}
                >
                  <div className="grid grid-cols-3 gap-4">
                    <Image
                      src={'/documentIcon.svg'}
                      alt="documentIcon icon"
                      width={20}
                      height={20}
                    />

                    <div className="flex flex-col items-start justify-start gap-[8px]">
                      <div className="leading-[20px] font-semibold">
                        General-contractor
                      </div>
                      <div className="text-sm leading-[24px] text-gray-400">
                        It is a long established fact that a reader will be
                        distracted by the readable content of
                      </div>
                    </div>
                    <Image
                      src={'/documentIcon.svg'}
                      alt="documentIcon icon"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ModalComponent>
    </div>
  );
};

export default UserRolesModel;
