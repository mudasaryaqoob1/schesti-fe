import {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from 'react';
import Image from 'next/image';
import {useDispatch} from 'react-redux'
import { useSearchParams } from 'next/navigation';

import CustomButton from '@/app/component/customButton/button';
import CustomWhiteButton from '@/app/component/customButton/white';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import TertiaryHeading from '@/app/component/headings/tertiary';
import MinDesc from '@/app/component/description/minDesc';
import {saveEstimateDetail} from '@/redux/estimate/estimateRequest.slice'
import {
  bg_style,
  minHeading,
  senaryHeading,
} from '@/globals/tailwindvariables';
import { estimateRequestService } from '@/app/services/estimateRequest.service';
import { selectToken } from '@/redux/authSlices/auth.selector';
import { useSelector } from 'react-redux';
import { HttpService } from '@/app/services/base.service';

interface Props {
  setPrevNext: Dispatch<SetStateAction<number>>;
  pevNext: number;
}


const TakeOff = ({ setPrevNext, pevNext }: Props) => {
  const dispatch = useDispatch()
  const searchParams = useSearchParams();
  const estimateId: null | string = searchParams.get('estimateId');

  const token = useSelector(selectToken);

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);

  const [showEstimateDetails, setShowEstimateDetails] = useState(true);
  const [showTakeoffDocs, setShowTakeoffDocs] = useState(true);
  const [estimateRequestDetail, setEstimateRequestDetail] = useState<any>({});

  const fetchEstimateDetail = useCallback(async () => {
    const result =
      await estimateRequestService.httpGetEstimateDetail(estimateId);
    setEstimateRequestDetail(result.data.estimateDetail);
  }, []);

  useEffect(() => {
    fetchEstimateDetail();
  }, []);


  const nextStepHandler = () => {
    setPrevNext((prev) => prev + 1)
    dispatch(saveEstimateDetail({takeOffDetail : estimateRequestDetail}))
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <TertiaryHeading
          title="Take Off Measurements"
          className="text-graphiteGray font-semibold"
        />
        <div className="flex gap-3 items-center">
          {pevNext !== 0 && (
            <CustomWhiteButton text="Previous" className="md:w-32" />
          )}

          <CustomButton
            text="Next"
            className="md:w-32"
            onClick={nextStepHandler}
          />
        </div>
      </div>

      <div className={`${bg_style} p-5 mt-4`}>
        <div className="flex justify-between items-center ">
          <QuaternaryHeading
            title="Estimate Details"
            className="text-graphiteGray font-bold"
          />
          <div
            className="bg-silverGray rounded-s border border-solid border-Gainsboro cursor-pointer p-1"
            onClick={() => setShowEstimateDetails((prev) => !prev)}
          >
            <Image src="/chevron-down.svg" alt="icon" width={16} height={16} />
          </div>
        </div>
        <div
          className={`mt-4 md:grid-cols-4 md:grid-rows-2 gap-y-6 ${
            showEstimateDetails ? 'grid' : 'hidden'
          }`}
        >
          <div>
            <MinDesc
              title="Client Name"
              className="font-popin text-base text-lightyGray font-normal"
            />
            <MinDesc
              title={estimateRequestDetail?.clientName}
              className="font-popin text-base text-midnightBlue mt-2"
            />
          </div>

          <div>
            <MinDesc
              title="Company Name"
              className="font-popin font-normal text-base text-lightyGray"
            />
            <MinDesc
              title={estimateRequestDetail?.companyName}
              className="font-popin text-base text-midnightBlue mt-2"
            />
          </div>

          <div>
            <MinDesc
              title="Phone Number"
              className="font-popin text-base font-normal text-lightyGray"
            />
            <MinDesc
              title={estimateRequestDetail?.phone}
              className="font-popin text-base text-midnightBlue my-2"
            />
            {/* <div className="flex items-center gap-1">
              <MinDesc
                title="(938) 861-8764"
                className="font-popin text-base text-midnightBlue "
              />
              <MinDesc
                title="(Alternate)"
                className="font-popin text-base text-lightyGray"
              />
            </div> */}
          </div>
          {/* 4 */}
          <div>
            <MinDesc
              title="Email"
              className="font-popin text-base font-normal text-lightyGray"
            />
            <MinDesc
              title={estimateRequestDetail?.email}
              className="font-popin text-base text-midnightBlue my-2"
            />
          </div>
          {/* 5 */}
          <div>
            <MinDesc
              title="Project name"
              className="font-popin font-normal text-base text-lightyGray"
            />
            <MinDesc
              title={estimateRequestDetail?.projectName}
              className="font-popin text-base text-midnightBlue mt-2"
            />
          </div>
          {/* 6 */}
          <div>
            <MinDesc
              title="Sale person"
              className="font-popin font-normal text-base text-lightyGray"
            />
            <MinDesc
              title={`${estimateRequestDetail?.salePerson?.firstName} ${estimateRequestDetail?.salePerson?.lastName}`}
              className="font-popin text-base text-midnightBlue mt-2"
            />
          </div>
          {/* 7 */}
          <div>
            <MinDesc
              title="Estimator"
              className="font-popin  font-normal text-base text-lightyGray"
            />
            <MinDesc
              title={`${estimateRequestDetail?.estimator?.firstName} ${estimateRequestDetail?.estimator?.lastName}`}
              className="font-popin text-base text-midnightBlue mt-2"
            />
          </div>
          {/* 8 */}
          <div>
            <MinDesc
              title="Address"
              className="font-popin font-normal text-base text-lightyGray"
            />
            <MinDesc
              title="2118 Thornridge Cir. Syracuse, Connecticut 35624"
              className="font-popin text-base text-midnightBlue mt-2"
            />
          </div>
        </div>
      </div>
      <div className={`${bg_style} p-5 mt-6`}>
        <div className="flex justify-between">
          <QuaternaryHeading
            title="Take off"
            className="text-graphiteGray font-bold"
          />
          <div
            className="bg-silverGray rounded-s border border-solid border-Gainsboro cursor-pointer p-1"
            onClick={() => setShowTakeoffDocs((prev) => !prev)}
          >
            <Image
              src={'/chevron-down.svg'}
              alt="icon"
              width={16}
              height={16}
            />
          </div>
        </div>
        <div
          className={`grid-cols-3 gap-3 mt-4 ${
            showTakeoffDocs ? 'grid' : 'hidden'
          }`}
        >
          <div>
            <p className={`${senaryHeading} text-midnightBlue font-popin mb-2`}>
              Drawings
            </p>
            <div
              className={`p-4 flex items-center flex-col gap-2 border-2 border-silverGray pb-4 rounded-lg mb-3`}
            >
              <div className="p-4 flex flex-col items-center gap-3">
                <div className="bg-lightGrayish rounded-[28px] border border-solid border-paleblueGray flex justify-center items-center p-2.5">
                  <Image
                    src={'/uploadcloud.svg'}
                    alt="upload icon"
                    width={20}
                    height={20}
                  />
                </div>
                {estimateRequestDetail?.drawingsDocuments?.map((doc: any) => (
                  <a
                    key={doc._id}
                    href={doc.url}
                    className={`text-steelGray ${minHeading}`}
                  >
                    {doc.name}
                    <span className="text-goldenrodYellow cursor-pointer ml-2">
                      View
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div>
            <p className={`${senaryHeading} text-midnightBlue font-popin mb-2`}>
              Takeoff Reports
            </p>
            <div className="p-4 flex items-center flex-col gap-2 border-2 border-silverGray pb-4 rounded-lg">
              <div className="p-4 flex flex-col items-center gap-3">
                <div className="bg-lightGrayish rounded-[28px] border border-solid border-paleblueGray flex justify-center items-center p-2.5">
                  <Image
                    src={'/uploadcloud.svg'}
                    alt="upload icon"
                    width={20}
                    height={20}
                  />
                </div>
                {estimateRequestDetail?.takeOffReports?.map((doc: any) => (
                  <a
                    key={doc._id}
                    href={doc.url}
                    className={`text-steelGray ${minHeading}`}
                  >
                    {doc.name}
                    <span className="text-goldenrodYellow cursor-pointer ml-2">
                      View
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div>
            <p className={`${senaryHeading} text-midnightBlue font-popin mb-2`}>
              Other Documents
            </p>
            <div className="p-4 flex items-center flex-col gap-2 border-2 border-silverGray pb-4 rounded-lg">
              <div className={`px-6 py-4 flex flex-col items-center gap-3 `}>
                <div className="bg-lightGrayish rounded-[28px] border border-solid border-paleblueGray flex justify-center items-center p-2.5">
                  <Image
                    src={'/uploadcloud.svg'}
                    alt="upload icon"
                    width={20}
                    height={20}
                  />
                </div>
                {estimateRequestDetail?.otherDocuments?.map((doc: any) => (
                  <a
                    key={doc._id}
                    href={doc.url}
                    className={`text-steelGray ${minHeading}`}
                  >
                    {doc.name}
                    <span className="text-goldenrodYellow cursor-pointer ml-2">
                      View
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TakeOff;
