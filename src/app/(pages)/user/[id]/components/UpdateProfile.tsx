import React, { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';
import ModalComponent from '@/app/component/modal';
import CustomButton from '@/app/component/customButton/button';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { CloseOutlined } from '@ant-design/icons';
import { userService } from '@/app/services/user.service';
import filesUrlGenerator from '@/app/utils/filesUrlGenerator';
import { useParams } from 'next/navigation';
import { voidFc } from '@/app/utils/types';

type Props = {
  name: string;
  avatar: string;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  fetchUser: voidFc;
};
const UpdateProfile = ({
  name,
  avatar,
  showModal,
  setShowModal,
  fetchUser,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [profileName, setProfileName] = useState(name);
  const { id } = useParams();
  const [profileAvatar, setProfileAvatar] = useState<string | File>(avatar);

  async function updateProfileHandler() {
    setIsLoading(true);
    if (typeof profileAvatar === 'object') {
      const { mediaFiles } = await filesUrlGenerator([profileAvatar]);
      await userService.updateSocialProfile(id, {
        socialName: profileName,
        socialAvatar: mediaFiles[0].url,
      });
      setIsLoading(false);
    } else {
      await userService.updateSocialProfile(id, { socialName: profileName });
      setIsLoading(false);
    }
    setShowModal(false);
    fetchUser();
  }

  return (
    <ModalComponent setOpen={setShowModal} open={showModal} destroyOnClose>
      <div className="bg-white border border-solid border-elboneyGray rounded-[4px] z-50">
        <div className="flex px-6 py-2.5 justify-between bg-mistyWhite">
          <TertiaryHeading
            title="Update Profile"
            className="text-graphiteGray"
          />
          <CloseOutlined
            className="cursor-pointer"
            style={{ fontSize: '24px', height: '24px' }}
            onClick={() => setShowModal(false)}
          />
        </div>

        <div className="px-6 py-3 flex items-center flex-col gap-4">
          <label
            htmlFor="avatar"
            className="flex justify-center cursor-pointer max-w-16"
          >
            <Image
              className="rounded-full"
              width={60}
              height={60}
              src={
                !profileAvatar
                  ? '/profileAvatar.svg'
                  : typeof profileAvatar === 'string'
                    ? avatar
                    : URL.createObjectURL(profileAvatar as File)
              }
              alt={name}
            />
          </label>
          <input
            className="hidden"
            id="avatar"
            type="file"
            onChange={({ target }) => {
              if (target.files) {
                setProfileAvatar(target.files[0]);
              }
            }}
          />
          <input
            type="text"
            className="w-full border !rounded-lg focus:border-blue-500 !px-3.5 !py-2.5 !mt-1.5  p-3"
            placeholder="Enter Name"
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
          />
          <div className="flex justify-center">
            <CustomButton
              text="Update"
              className="w-40"
              isLoading={isLoading}
              onClick={updateProfileHandler}
            />
          </div>
        </div>
      </div>
    </ModalComponent>
  );
};

export default UpdateProfile;
