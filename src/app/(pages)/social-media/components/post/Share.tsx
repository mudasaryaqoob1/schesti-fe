import ModalComponent from '@/app/component/modal';
import Image from 'next/image';
import React, { useState } from 'react';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';
import { toast } from 'react-toastify';
import { useCopyToClipboard } from 'usehooks-ts';

const SharePost = ({ url }: { url: string }) => {
  const [showModal, setShowModal] = useState(false);
  const [, copyFn] = useCopyToClipboard();
  return (
    <>
      <ModalComponent
        destroyOnClose
        width="500px"
        open={showModal}
        setOpen={setShowModal}
      >
        <div className="bg-white px-6 py-4 rounded-lg">
          <div className="flex items-center justify-between ">
            <p className="text-graphiteGray text-lg font-bold">Share Post </p>
            <Image
              src="/closeicon.svg"
              alt="close"
              width={24}
              height={24}
              className="cursor-pointer"
              onClick={() => setShowModal(false)}
            />
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <FacebookShareButton url={url} className="flex gap-2 items-center">
              <FacebookIcon className="rounded-full size-7" />
              <p className="text-graphiteGray font-semibold text-md">
                Facebook
              </p>
            </FacebookShareButton>

            <TwitterShareButton url={url} className="flex gap-2 items-center">
              <TwitterIcon className="rounded-full size-7" />
              <p className="text-graphiteGray font-semibold text-md">X</p>
            </TwitterShareButton>

            <LinkedinShareButton url={url} className="flex gap-2 items-center">
              <LinkedinIcon className="rounded-full size-7" />
              <p className="text-graphiteGray font-semibold text-md">
                Linkedin
              </p>
            </LinkedinShareButton>
            <div
              className="flex gap-2 items-center cursor-pointer"
              onClick={() => {
                copyFn(url);
                toast.success('Copied', {
                  position: 'bottom-left',
                  hideProgressBar: true,
                });
              }}
            >
              <Image
                src="/link.svg"
                alt="close"
                width={24}
                height={24}
                className="cursor-pointer"
                onClick={() => setShowModal(false)}
              />
              <p className="text-graphiteGray font-semibold text-md">
                Copy link
              </p>
            </div>
          </div>
        </div>
      </ModalComponent>
      <div
        className="flex gap-1 items-center cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <Image src="/share-07.svg" width={20} height={20} alt="profile" />
        <p className="font-medium text-xs text-schestiPrimaryBlack">Share</p>
      </div>
    </>
  );
};

export default SharePost;
