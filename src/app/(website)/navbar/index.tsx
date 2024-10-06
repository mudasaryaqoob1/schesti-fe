'use client';
import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import Image from 'next/image';
// import { IoMenu, IoClose } from 'react-icons/io5';
import Link from 'next/link';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Dropdown menu items
  const items = [
    {
      key: '1',
      label: (
        <Link href="/estimate" className="cursor-pointer ">
          Estimate
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link href="/contract" className="cursor-pointer ">
          Contracts
        </Link>
      ),
    },
    {
      key: '3',
      label: (
        <Link href="/takeoff" className="cursor-pointer ">
          Takeoff
        </Link>
      ),
    },
    {
      key: '4',
      label: (
        <Link href="/crm" className="cursor-pointer ">
          CRM
        </Link>
      ),
    },
    {
      key: '5',
      label: (
        <Link href="/financial-tools" className="cursor-pointer ">
          Financial Tools
        </Link>
      ),
    },
    {
      key: '6',
      label: (
        <Link href="/online-mettings" className="cursor-pointer ">
          Online meetings
        </Link>
      ),
    },
    {
      key: '7',
      label: (
        <Link href="/time-scheduling" className="cursor-pointer ">
          Time Scheduling
        </Link>
      ),
    },

    {
      key: '8',
      label: (
        <Link href="/bidding" className="cursor-pointer ">
          Bidding
        </Link>
      ),
    },
  ];
  return (
    <div className="relative flex flex-col md:mx-2  max-w-screen h-[50px] md:h-[80px] z-50">
      <div className="container flex flex-row items-center justify-between h-full">
        <Link href="/">
          <Image
            src="/images/logo.svg"
            width={122}
            height={32}
            alt="Logo"
            className="md:w-full md:h-full w-[120px] h-[25px]"
            priority
          />
        </Link>
        <div className="hidden lg:flex flex-row font-Gilroy font-normal text-[15px] leading-[26px] text-[#161C2D] w-[583px] gap-6 md:ml-3 ">
          <div className="cursor-pointer ">
            <Dropdown overlay={<Menu items={items} />} trigger={['click']}>
              <div onClick={(e) => e.preventDefault()}>
                <Space>
                  <span className="cursor-pointer">
                    <Link href="/services" className="cursor-pointer ">
                      Services
                    </Link>
                  </span>
                  <DownOutlined />
                </Space>
              </div>
            </Dropdown>
          </div>

          <Link href="/why-schesti" className="cursor-pointer ">
            Why Schesti?
          </Link>

          <div className="cursor-pointer ">
            <Link href="/pricing-page" className="cursor-pointer ">
              Pricing
            </Link>
          </div>
          <div className="cursor-pointer ">
            <Link href="/blogs" className="cursor-pointer ">
              Blogs
            </Link>
          </div>
          <div className="cursor-pointer ">
            <Link href="/resources" className="cursor-pointer ">
              Resources
            </Link>
          </div>
          <Link href="/apis" className="cursor-pointer ">
            APIs
          </Link>
          <Link href="/contact-us" className="cursor-pointer ">
            Contact us
          </Link>
        </div>

        <div className="hidden lg:flex justify-between w-[299px]">
          <div
            className="flex w-[105px] gap-[4px] justify-center items-center cursor-pointer"
            style={{ color: '#007AB6' }}
          >
            <div className="flex-none">
              <Image
                src="/images/phone.svg"
                width={24}
                height={24}
                alt="Phone"
                className="w-full h-full"
              />
            </div>
            <div className="ml-0 font-normal font-Gilroy text-[15px] leading-[26px]">
              Let’s Talk
            </div>
          </div>
          <Link href="/login">
          <button className="cursor-pointer bg-transparent  w-[77px] h-[40px] border-[#007AB6] border rounded-[24px] font-normal text-[15px] leading-[26px] text-[#007AB6] hover:bg-[#007AB6] hover:text-white transition-colors duration-300">
            Login
          </button>
          </Link>
        
          <button className="w-[105px] h-[40px] font-normal text-[15px] leading-[26px] bg-[#007AB6] text-white rounded-[300px] hover:bg-transparent hover:border-[#007AB6] hover:text-[#007AB6] border border-transparent transition-colors duration-300">
            Free trial
          </button>
        </div>

        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            {/* <IoMenu size={24} /> */}
            ___
            ___
            ___
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Menu</h2>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close Menu"
          >
            {/* <IoClose size={24} /> */}
            X
          </button>
        </div>
        <div className="flex flex-col mx-4 text-[15px] leading-[26px]  text-[#161C2D]">
          <Link href="/services" className="cursor-pointer ">
            <Dropdown overlay={<Menu items={items} />} trigger={['click']}>
              <div onClick={(e) => e.preventDefault()}>
                <Space>
                  <span className="cursor-pointer">Services</span>
                  <DownOutlined />
                </Space>
              </div>
            </Dropdown>
          </Link>
          <Link href="/why-schesti" className="py-2">
            Why Schesti?
          </Link>

          <div className="py-2"><Link href="/pricing-page" className="cursor-pointer ">
              Pricing
            </Link></div>
          <div className="py-2">
            <Link href="/blogs" className="cursor-pointer ">
              Blogs
            </Link>
          </div>
          <div className="py-2">Resources</div>
          <div className="py-2">
            <Link href="/apis" className="cursor-pointer ">
              APIs
            </Link>
          </div>
          <div className="py-2">
            <Link href="/contact-us" className="cursor-pointer ">
              Contact us
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-3 mx-3">

        <Link href="/contact-us" className="cursor-pointer ">
          <div className="flex items-center py-2 text-[#007AB6] border border-[#007AB6] rounded-[24px] justify-center">
      
          <Image
              src="/images/phone.svg"
              width={24}
              height={24}
              alt="Phone"
              className="w-6 h-6"
            />
            <span className="ml-2">Let’s Talk</span>
       
    
          </div>
          </Link>
          {/* <Link href="/login" className="cursor-pointer "> */}
          <Link href="/login"  className="cursor-pointer py-2 text-[#007AB6] border border-[#007AB6] rounded-full hover:bg-[#007AB6] hover:text-white transition-colors duration-300">
            Login
          </Link>
          {/* </Link> */}
      
          <button className="py-2 text-white bg-[#007AB6] rounded-full hover:bg-transparent hover:border-[#007AB6] hover:text-[#007AB6] border border-transparent transition-colors duration-300">
            Free trial
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
