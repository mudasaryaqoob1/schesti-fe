import React from 'react';
import Navbar from '../navbar';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '../footer'
import BlogFaqs from '@/app/constants/blogs.json';

const Blogs = () => {
  return (
    <div>
      <Navbar />
      <div className="container ">
        <div className="flex items-center justify-center mt-[80px]">
          <div className=" max-w-[760px] ">
            <div className="font-bold font-Gilroy text-3xl  md:text-[60px] leading-[65px] -tracking-[-2px] text-[#161C2D] text-center">
              Blogs & Articles
            </div>
            <div className="px-4 lg:px-0 font-regular font-Gilroy mx-4 md:mx-0 text-[16px] sm:text-lg md:text-[19px] -tracking-[0.2px] text-[#161C2D] text-center pt-1 md:pt-[44px]">
              Lorem ipsum dolor sit amet consectetur. Risus sit arcu condimentum
              non facilisis ultricies ut est tincidunt. Ornare interdum amet
              urna elementum in. Nulla tincidunt risus neque.
            </div>
          </div>
        </div>
        <div className=" relative pt-10">
          <div className="px-4 xl:px-0">
            <img src="/blogs-img/hero.png" className='w-full' alt="" />
          </div>
          <div className=" absolute bottom-10 w-full max-w-[720px] pl-10 ">
            <h1 className="font-sans font-semibold text-[24px] md:text-[36px]  text-white md:leading-[40px] ">
              How to win any job you want. Get started with 5 steps.
            </h1>
            <p className="font-Gilroy font-normal text-[14px] md:text-[16px] pt-6  text-white md:leading-[32px]">
              August 20, 2022
            </p>
          </div>
        </div>
        <div className=" mx-4 md:mx-0   mt-[65px]">
          <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4 xl:px-0 gap-6 lg:gap-9 mt-8">
            {BlogFaqs.map((blog: any) => (
              <Link href="/blog-read-page" className="py-2" key={blog.key}>
                <div className="max-w-[350px] ">
                  <Image
                    src={blog.img}
                    width={350} // This is still required
                    height={301} // Still required by Next.js
                    alt=" "
                    className="custom-image"
                  />
                  <div className="font-Gilroy font-regular text-[15px] leading-[26px] -tracking-[0.1] text-[#161C2D] opacity-70 md:mt-[22px] mt-2">
                    {blog.date}
                  </div>
                  <div className="font-bold font-Gilroy text-[21px] leading-[32px] text-[#161C2D] -tracking-[0.5px]  md:mt-[10px]">
                    {blog.title}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center mt-[72px]">
          <button className="w-[196px] h-[56px] rounded-full border border-[#007AB6] font-Gilroy font-bold text-[17px] leading-[22px] -tracking-[0.6px] text-[#007AB6] transition-transform duration-300 hover:scale-105">
            See more
          </button>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Blogs;
