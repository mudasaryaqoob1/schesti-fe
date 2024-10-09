'use client';
import React from 'react';
import Navbar from '../navbar';
import Footer from '../footer';
import Image from 'next/image';
export default function PrivacyCookies() {
  return (
    <>
      <Navbar />
      <div className="w-full">
        <div className="bg-[url('/term-conditin-imges/hero.png')] bg-cover bg-center bg-no-repeat w-full lg:h-[310px] ">
          {/* Add your content here if needed */}
          <div className="container">
            <div className="flex justify-center pt-[60px] lg:pt-[195px]">
              <div className="w-full max-w-[760px] px-4 md:px-0">
                <h1 className="font-Gilroy font-bold text-[24px] md:text-[60px] text-center tracking-[-2px] text-[#161C2D] md:leading-[65px] ">
                  Cookies Policy
                </h1>
                <p className="font-normal pt-[44px] font-Gilroy text-[15px] md:text-[18px] text-[#161C2D] leading-[32px] text-center">
                  Schesti Technologies, Inc. Cookie Notice
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* second section */}
      <div className="mt-7 lg:mt-[128px]">
        <div className=" container">
          <div className="px-6 lg:px-0">
            <div className="">
              <h1 className="font-Gilroy font-semibold text-[16px] md:text-[18px] text-left text-[#1D1D1DE5] md:leading-[32px] ">
                Last Updated: September 29,2024
              </h1>
              <p className="font-normal pt-[10px] font-Gilroy text-[15px] md:text-[18px] text-[#1D1D1DE5] leading-[32px] text-left">
                This Cookie Policy applies to the following websites operated by
                Schesti Technologies, Inc.:
                <li>Schesti.com</li>
                <li>Schesti.ai</li>
                <li>Shesti.com</li>
                <li>
                  And any other websites owned by Schesti Technologies, Inc.
                  that link to this Cookie Policy (collectively referred to as
                  "the Sites" or "our Sites").
                </li>
              </p>
              <p className="font-semibold font-Gilroy text-[15px] md:text-[18px] text-[#1D1D1DE5] leading-[32px] text-left">
                What Are Cookies?
              </p>
              <p className="font-normal pt-[10px] font-Gilroy text-[15px] md:text-[18px] text-[#1D1D1DE5] leading-[32px] text-left">
                Cookies are small text files that are stored on your device
                (computer, smartphone, etc.) to identify your browser and
                improve your experience on our Sites. We may use cookies and
                similar technologies, such as web beacons, to enhance your
                interactions with our services. These tools can help with things
                like auto-filling your username for quicker login, delivering
                personalized messages, and tailoring advertisements to your
                preferences. This Cookie Policy outlines how we use cookies and
                explains your options for managing them.
              </p>
              <h1 className="font-Gilroy pt-2 font-semibold text-[16px] md:text-[18px] text-left text-[#1D1D1DE5] md:leading-[32px] ">
                Types of Cookies We Use
              </h1>
              <p className=" font-normal pt-[10px] font-Gilroy text-[15px] md:text-[18px] text-[#1D1D1DE5] leading-[32px] text-left">
                <span className="font-semibold">
                  <li>Session Cookies:</li>
                </span>{' '}
                These are temporary cookies that only remain active while you
                browse the Sites. We use session cookies to keep track of the
                number of visitors to our Sites.
              </p>
              <p className=" font-normal pt-[10px] font-Gilroy text-[15px] md:text-[18px] text-[#1D1D1DE5] leading-[32px] text-left">
                <span className="font-semibold">
                  <li>Persistent Cookies:</li>
                </span>{' '}
                These cookies have a longer lifespan and stay on your browser
                after you leave our Sites. The specific lifespan of each cookie
                is provided in our Cookie Settings (see the link below).
              </p>

              <p className="font-normal pt-[10px] font-Gilroy text-[15px] md:text-[18px] text-[#1D1D1DE5] leading-[32px] text-left">
                We classify cookies into the following categories:
              </p>
              <h1 className="font-Gilroy pt-2 font-semibold text-[16px] md:text-[18px] text-left text-[#1D1D1DE5] md:leading-[32px] ">
                <li>Essential (Strictly Necessary) Cookies</li>
                <li>Performance Cookies</li>
                <li>Functional Cookies</li>
                <li>Targeting Cookies</li>
              </h1>
              <p className="font-normal pt-[10px] font-Gilroy text-[15px] md:text-[18px] text-[#1D1D1DE5] leading-[32px] text-left">
                You can manage your preferences for these cookies (except for
                essential cookies) by using the "Cookie Settings" button below:
              </p>
              <h1 className="font-Gilroy pt-2 font-semibold text-[16px] md:text-[18px] text-left text-[#1D1D1DE5] md:leading-[32px] ">
                Cookie Settings
              </h1>
              <p className="font-normal pt-[10px] font-Gilroy text-[15px] md:text-[18px] text-[#1D1D1DE5] leading-[32px] text-left">
                TIn addition, you can manage or delete cookies and adjust your
                privacy preferences through your browser’s settings. Please note
                that disabling or removing cookies may affect certain features
                on the Sites. Some of our service providers may also use their
                own cookies as part of the services they offer, as explained
                below.
              </p>
              <h1 className="font-Gilroy pt-2 font-semibold text-[16px] md:text-[18px] text-left text-[#1D1D1DE5] md:leading-[32px] ">
                Social Media Features
              </h1>
              <p className="font-normal pt-[10px] font-Gilroy text-[15px] md:text-[18px] text-[#1D1D1DE5] leading-[32px] text-left">
                Our Sites may include social media tools, such as the Facebook
                "Like" button, or interactive elements like the "Share" button.
                These features may collect information such as your IP address
                and the pages you visit on our Sites, and may set cookies to
                function properly. These social media features may be hosted by
                a third party or directly on our Sites. Your interactions with
                these features are governed by the privacy policies of the
                respective providers.
              </p>
              <h1 className="font-Gilroy pt-2 font-semibold text-[16px] md:text-[18px] text-left text-[#1D1D1DE5] md:leading-[32px] ">
                Cookie Usage: First-Party and Third-Party Cookies
              </h1>
              <p className="font-normal pt-[10px] font-Gilroy text-[15px] md:text-[18px] text-[#1D1D1DE5] leading-[32px] text-left">
                Cookies on our Sites may be either first-party or third-party.
              </p>
              <p className=" font-normal pt-[10px] font-Gilroy text-[15px] md:text-[18px] text-[#1D1D1DE5] leading-[32px] text-left">
                <span className="font-semibold">
                  <li>First-Party Cookies:</li>
                </span>{' '}
                These are set directly by the website you are visiting (e.g.,
                Schesti.com). We use these to store language settings, login
                details, and other user preferences.
              </p>
              <p className=" font-normal pt-[10px] font-Gilroy text-[15px] md:text-[18px] text-[#1D1D1DE5] leading-[32px] text-left">
                <span className="font-semibold">
                  <li>Third-Party Cookies:</li>
                </span>{' '}
                These are set by third parties, often for tracking and
                advertising purposes. For example, third-party advertisers or
                data analytics services may place cookies on your device to
                deliver relevant ads and analyze your browsing behavior on our
                Sites. These third-party partners may combine information
                gathered from our Sites with data from other sources. Our
                Privacy Policy does not cover how third-party cookies are used.
              </p>
              <p className="font-normal pt-[10px] font-Gilroy text-[15px] md:text-[18px] text-[#1D1D1DE5] leading-[32px] text-left">
                Here are some of the third-party partners that may place cookies
                on our Sites as of the effective date of this policy. You can
                visit their websites for further information on their data
                practices:
              </p>
              <table className="min-w-full mt-4 text-left border-[2px]">
                <thead>
                  <tr>
                    <th className="border-[1px] py-2 px-4 font-semibold text-[15px] md:text-[16px] text-[#1D1D1DE5]">
                      Third-Party Cookie Provider
                    </th>
                    <th className=" py-2 px-4 font-semibold text-[15px] md:text-[16px] text-[#1D1D1DE5]">
                      Third-Party Website
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      Adobe Analytics
                    </td>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      <a href="https://www.adobe.com" className="text-blue-500">
                        https://www.adobe.com
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      DoubleClick
                    </td>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      <a
                        href="https://www.google.com"
                        className="text-blue-500"
                      >
                        https://www.google.com
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      DemandBase
                    </td>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      <a
                        href="https://www.demandbase.com"
                        className="text-blue-500"
                      >
                        https://www.demandbase.com
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      Disqus
                    </td>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      <a href="https://disqus.com" className="text-blue-500">
                        https://disqus.com
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      Facebook
                    </td>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      <a
                        href="https://www.facebook.com"
                        className="text-blue-500"
                      >
                        https://www.facebook.com
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      Get Beamer
                    </td>
                    <td className="border-b py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      <a
                        href="https://www.getbeamer.com"
                        className="text-blue-500"
                      >
                        https://www.getbeamer.com
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      GitHub
                    </td>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      <a href="https://github.com" className="text-blue-500">
                        https://github.com
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      Google
                    </td>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      <a href="https://about.google" className="text-blue-500">
                        https://about.google
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      HotJar
                    </td>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      <a
                        href="https://www.hotjar.com"
                        className="text-blue-500"
                      >
                        https://www.hotjar.com
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      HubSpot
                    </td>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      <a href="http://hubspot.com" className="text-blue-500">
                        http://hubspot.com
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      LinkedIn
                    </td>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      <a
                        href="https://www.linkedin.com"
                        className="text-blue-500"
                      >
                        https://www.linkedin.com
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      Marketo
                    </td>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      <a
                        href="https://www.marketo.com"
                        className="text-blue-500"
                      >
                        https://www.marketo.com
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      Microsoft (Bing)
                    </td>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      <a
                        href="https://ads.microsoft.com"
                        className="text-blue-500"
                      >
                        https://ads.microsoft.com
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      New Relic
                    </td>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      <a href="https://newrelic.com" className="text-blue-500">
                        https://newrelic.com
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      SalesForce
                    </td>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      <a
                        href="https://www.salesforce.com"
                        className="text-blue-500"
                      >
                        https://www.salesforce.com
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      ScoreCard Research
                    </td>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      <a
                        href="https://www.scorecardresearch.com"
                        className="text-blue-500"
                      >
                        https://www.scorecardresearch.com
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      Shopify
                    </td>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      <a
                        href="https://www.shopify.com"
                        className="text-blue-500"
                      >
                        https://www.shopify.com
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      SmartVid
                    </td>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      <a
                        href="https://www.smartvid.io"
                        className="text-blue-500"
                      >
                        https://www.smartvid.io
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      Stackadapt
                    </td>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      <a
                        href="https://www.stackadapt.com"
                        className="text-blue-500"
                      >
                        https://www.stackadapt.com
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      Trade Desk
                    </td>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      <a
                        href="https://www.thetradedesk.com"
                        className="text-blue-500"
                      >
                        https://www.thetradedesk.com
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      Twitter
                    </td>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      <a href="https://twitter.com" className="text-blue-500">
                        https://twitter.com
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      YouTube
                    </td>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      <a
                        href="https://www.youtube.com"
                        className="text-blue-500"
                      >
                        https://www.youtube.com
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      VigLink
                    </td>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      <a
                        href="https://www.viglink.com"
                        className="text-blue-500"
                      >
                        https://www.viglink.com
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      Vimeo
                    </td>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      <a href="https://vimeo.com" className="text-blue-500">
                        https://vimeo.com
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      Wistia
                    </td>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      <a href="http://wistia.com" className="text-blue-500">
                        http://wistia.com
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      Zapier
                    </td>
                    <td className="border-[1px] py-2 px-4 text-[14px] md:text-[15px] text-[#1D1D1DE5]">
                      <a href="http://zapier.com" className="text-blue-500">
                        http://zapier.com
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
              <h1 className="font-Gilroy pt-2 font-semibold text-[16px] md:text-[18px] text-left text-[#1D1D1DE5] md:leading-[32px] ">
                How We Use Cookies
              </h1>
              <p className="font-normal pt-[10px] font-Gilroy text-[15px] md:text-[18px] text-[#1D1D1DE5] leading-[32px] text-left">
                We utilize cookies from third-party services, including Google
                and Facebook, to enhance your user experience, target ads, and
                support marketing efforts. Specifically, cookies are used for:
                <li>
                  Storing user preferences, such as language and country
                  settings.
                </li>
                <li>Maintaining login sessions across multiple visits.</li>
                <li>
                  Conducting marketing, research, and data analysis to better
                  understand our users.
                </li>
                <li>Improving the functionality and content of our Sites.</li>
                <li>Detecting and preventing fraudulent activities.</li>
                <li>Tracking consent for cookie usage.</li>
              </p>
              <h1 className="font-Gilroy pt-2 font-semibold text-[16px] md:text-[18px] text-left text-[#1D1D1DE5] md:leading-[32px] ">
                How You Can Manage Cookies
              </h1>
              <h1 className="font-Gilroy pt-2 font-semibold text-[16px] md:text-[18px] text-left text-[#1D1D1DE5] md:leading-[32px] ">
                Managing Cookie Preferences
              </h1>
              <p className="font-normal pt-[10px] font-Gilroy text-[15px] md:text-[18px] text-[#1D1D1DE5] leading-[32px] text-left">
                You can control and adjust your cookie settings (excluding
                strictly necessary cookies) by clicking on the "Cookie Settings"
                button below:
              </p>
              <h1 className="font-Gilroy pt-2 font-semibold text-[16px] md:text-[18px] text-left text-[#1D1D1DE5] md:leading-[32px] ">
                Cookie Settings
              </h1>
              <h1 className="font-Gilroy pt-2 font-semibold text-[16px] md:text-[18px] text-left text-[#1D1D1DE5] md:leading-[32px] ">
                Browser and Device Controls
              </h1>
              <p className="font-normal pt-[10px] font-Gilroy text-[15px] md:text-[18px] text-[#1D1D1DE5] leading-[32px] text-left">
                Your browser may offer options to block cookies, including
                third-party cookies, or manage them individually. You can find
                information about controlling cookies in your browser’s help
                section. Please be aware that blocking cookies may impact your
                ability to use certain features on our Sites.
              </p>
              <h1 className="font-Gilroy pt-2 font-semibold text-[16px] md:text-[18px] text-left text-[#1D1D1DE5] md:leading-[32px] ">
                Opting Out of Targeted Advertising
              </h1>
              <p className="font-normal pt-[10px] font-Gilroy text-[15px] md:text-[18px] text-[#1D1D1DE5] leading-[32px] text-left">
                To opt out of targeted advertising from third-party partners
                such as Google, you can use their opt-out tools or industry-wide
                initiatives like:
                <li>
                  <a href="">
                    Your Online Choices (EU): https://www.youronlinechoices.com/
                  </a>
                </li>
                <li>
                  <a href="">
                    Your Ad Choices (US): https://youradchoices.com/{' '}
                  </a>
                </li>
              </p>
              <h1 className="font-Gilroy pt-2 font-semibold text-[16px] md:text-[18px] text-left text-[#1D1D1DE5] md:leading-[32px] ">
                Updates to This Cookie Policy
              </h1>
              <p className="font-normal pt-[10px] font-Gilroy text-[15px] md:text-[18px] text-[#1D1D1DE5] leading-[32px] text-left">
                We may update this Cookie Policy from time to time. Any changes
                will be reflected by updating the "Last Updated" date at the top
                of this page. Significant changes may result in notifications
                being provided to you.
                <br />
                For the latest information on our use of cookies, please refer
                to this page regularly.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
