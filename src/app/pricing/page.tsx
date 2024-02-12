'use client';
import Image from 'next/image';
import { LandingNavbar } from '../component/navbar/LandingNavbar';
import ToggleBtn from '@/app/(pages)/settings/plans/oldSubscriptions/components/toggleBtn';
import SwitchBtn from '@/app/(pages)/settings/plans/oldSubscriptions/components/switchbtn';
import CustomButton from '../component/customButton/white';
import LandingFooter from '../component/footer/LandingFooter';
import { Collapse, ConfigProvider, Skeleton, theme } from 'antd';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { IPricingPlan } from '../interfaces/pricing-plan.interface';
import {
  selectPricingPlans,
  selectPricingPlansError,
  selectPricingPlansLoading,
} from '@/redux/pricingPlanSlice/pricingPlan.selector';
import { fetchPricingPlan } from '@/redux/pricingPlanSlice/pricingPlan.thunk';
import SinglePlan from '../(pages)/settings/plans/oldSubscriptions/components/plan/plan';
import { useRouter } from 'next/navigation';

export default function PricingPage() {
  const router = useRouter();
  const { token } = theme.useToken();
  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };
  const [planType, setPlanType] = useState('Individual');
  const dispatch = useDispatch<AppDispatch>();
  const [pricingPlansData, setPricingPlansData] = useState(
    [] as IPricingPlan[]
  );
  const [isDuration, setIsDuration] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState<any>();
  const plansData = useSelector(selectPricingPlans);
  const isLoading = useSelector(selectPricingPlansLoading);
  const isError = useSelector(selectPricingPlansError);

  const handlePlanType = (event: ChangeEvent<HTMLInputElement>) => {
    const currentPlanType = event.target.checked ? 'Individual' : 'Enterprise';
    const newPlansData = plansData.pricingPlans.filter(
      ({ type, duration }: IPricingPlan) =>
        type === currentPlanType && duration === isDuration
    );
    setPlanType(currentPlanType);
    setPricingPlansData(newPlansData);
  };

  const handlePlanDuration = (event: ChangeEvent<HTMLInputElement>) => {
    const currentPlanDuration = event.target.checked ? 'yearly' : 'monthly';
    const newPlansData = plansData.pricingPlans.filter(
      ({ duration, type }: IPricingPlan) =>
        duration === currentPlanDuration && type === planType
    );
    setIsDuration(currentPlanDuration);
    setPricingPlansData(newPlansData);
  };

  const pricingPlansHandler = useCallback(async () => {
    const {
      payload: {
        statusCode,
        data: { pricingPlans },
      },
    }: any = await dispatch(fetchPricingPlan({ page: 1, limit: 10 }));
    if (statusCode === 200) {
      setPricingPlansData(
        pricingPlans.filter(
          ({ type, duration }: IPricingPlan) =>
            type === 'Individual' && duration === isDuration
        )
      );
    }
  }, []);

  useEffect(() => {
    pricingPlansHandler();
  }, []);

  console.log({ selectedPlan });

  return (
    <section>
      <main
        style={{
          background: 'linear-gradient(180deg, #8449EB 0%, #6A56F6 100%)',
        }}
        className="h-[501px] relative"
      >
        <LandingNavbar />
        <div className="mt-[101px] mx-auto w-[1063px]">
          <h1 className="text-center font-extrabold text-white text-[64px] leading-[80px]">
            Pricing
          </h1>
          <p className="text-center text-white w-[774px] leading-[44px] font-light text-[24px] mx-auto my-[26px]">
            Pricing built for businesses of all sizes.
            <br />
            Free 14-day trial • No credit card required • Cancel anytime
          </p>
        </div>
      </main>

      <div className="px-[200px] mt-[151px]">
        <div className="w-[966.356px] mx-auto">
          <h1 className="text-center text-[21.672px] text-[#7138DF] leading-[21.672px ]">
            Craft Your Success
          </h1>
          <h1 className="mx-auto text-[#1D2939] text-center font-bold mt-[15px] leading-[54.181px] text-[36.121px]">
            Exclusive Schesti Subscriptions, A gateway to Unparalleled
            Excellence in Field Service Dynamics.
          </h1>
        </div>

        <div className="pt-[65px]">
          <div>
            <div className="flex  align-items-center justify-center">
              <ToggleBtn planType={planType} onChange={handlePlanType} />
            </div>
            <div className="flex mt-[32px] justify-center items-center">
              <SwitchBtn
                isDuration={isDuration}
                onChange={handlePlanDuration}
              />
            </div>
          </div>

          <div className="mt-6">
            {isLoading ? (
              <Skeleton />
            ) : isError ? (
              <p>Something Went Wrong</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-5">
                {pricingPlansData?.map(
                  (plan: IPricingPlan, index: React.Key | null | undefined) => {
                    return (
                      <SinglePlan
                        key={index}
                        {...plan}
                        setSelectedPlan={setSelectedPlan}
                      />
                    );
                  }
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-20 bg-[#344054]">
        <div className="px-[200px] py-8">
          <div className="flex space-x-16">
            <div className="mt-4 space-y-7">
              <div>
                <h1 className="text-white pb-[16px] text-[40px] leading-[60px]">
                  Schedule estimates and create gantt charts
                </h1>
                <p className="text-white text-[20px] leading-[38px] w-[696.986px]">
                  Unlock a prime advertising space for your company! Schesti
                  offers exclusive opportunities for our valued partners to
                  showcase their
                  <br /> brand or promotions here.
                </p>
              </div>
              <CustomButton
                text="Request for post"
                className="!rounded-full !w-48 mt-[48px] !text-[#8449EB]"
                onClick={() => router.push('/contact')}
              />
            </div>
            <div>
              <Image
                src={'/request-for-post-img.svg'}
                height={309}
                width={277.65}
                alt="dashboard"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 px-[200px]">
        <h1 className="text-center font-normal text-[24px] leading-[24px] text-[#1D2939]">
          FAQ
        </h1>
        <h1 className="text-center font-bold pt-[20px] text-[40px] leading-[60px] text-[#1D2939]">
          {"You've"} got questions. {"We've"} got answers.
        </h1>

        <div className="p-2 rounded-lg mt-[57px]">
          <ConfigProvider
            theme={{
              components: {
                Collapse: {
                  headerBg: 'white',
                },
              },
            }}
          >
            <Collapse
              bordered={false}
              style={{ background: token.colorBgContainer }}
              items={[
                {
                  key: '0',
                  label: (
                    <h3 className="text-[#344054] text-[17px] leading-[36px] font-normal">
                      How do I update my payment information?
                    </h3>
                  ),
                  style: panelStyle,
                },
                {
                  key: '1',
                  label: (
                    <h3 className="text-[#344054] text-[17px] leading-[36px] font-normal">
                      How do I update my payment information?
                    </h3>
                  ),
                  style: panelStyle,
                },
                {
                  key: '2',
                  label: (
                    <h3 className="text-[#344054] text-[17px] leading-[36px] font-normal">
                      How do I update my payment information?
                    </h3>
                  ),
                  style: panelStyle,
                },
                {
                  key: '3',
                  label: (
                    <h3 className="text-[#344054] text-[17px] leading-[36px] font-normal">
                      How do I update my payment information?
                    </h3>
                  ),
                  style: panelStyle,
                },
                {
                  key: '4',
                  label: (
                    <h3 className="text-[#344054] text-[17px] leading-[36px] font-normal">
                      How do I update my payment information?
                    </h3>
                  ),
                  style: panelStyle,
                },
                {
                  key: '5',
                  label: (
                    <h3 className="text-[#344054] text-[17px] leading-[36px] font-normal">
                      How do I update my payment information?
                    </h3>
                  ),
                  style: panelStyle,
                },
              ]}
              expandIconPosition="end"
            />
          </ConfigProvider>
        </div>
      </div>

      <div
        style={{
          background: 'linear-gradient(180deg, #8449EB 0%, #6A56F6 100%)',
        }}
      >
        <div className="px-[200px] py-8">
          <div>
            <div className="mt-4 space-y-7">
              <div>
                <h1 className="text-white text-center text-[40px] leading-[60px]">
                  Schesti: Your Gateway to Unmatched Efficiency
                </h1>
                <p className="text-white pt-[13px] text-[20px] leading-[38px]  text-center w-[924px] mx-auto">
                  Empower Your Projects with Schesti: Your Comprehensive
                  Solution for Achieving Exceptional Efficiency in Field Service
                  Excellence
                </p>
              </div>
              <div className="flex mt-[42px] justify-center space-x-4">
                <CustomButton
                  text="Get start with Schesti"
                  className="!rounded-full !bg-white !w-48 !text-[#8449EB]"
                  onClick={() => router.push('/login')}
                />

                <CustomButton
                  text="Contact Us"
                  className="!rounded-full !w-48 !bg-transparent !border-white  !text-white"
                  onClick={() => router.push('/contact')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <LandingFooter />
    </section>
  );
}
