import CustomButton from '@/app/component/customButton/button';
import SenaryHeading from '@/app/component/headings/senaryHeading';
import { USCurrencyFormat } from '@/app/utils/format';
import Image from 'next/image';
import { Divider, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { isEmpty, size } from 'lodash';
import { useState } from 'react';
import { IProjectBidding } from '@/app/interfaces/bid-management/bid-management.interface';
import { Excel } from 'antd-table-saveas-excel';
import Link from 'next/link';

type Props = {
  bid: any;
  selectedBidProjectDetails: any;
};

export function BidDetails({ bid, selectedBidProjectDetails }: Props) {
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);

  const columns: ColumnsType<{ _id: string, quantity: number, price: number }> = [
    {
      key: 'description',
      title: 'Description',
      dataIndex: 'description',
    },
    {
      key: 'quantity',
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      key: 'unitPrice',
      title: 'Unit Price',
      dataIndex: 'price',
      render(value) {
        return value ? USCurrencyFormat.format(value) : null;
      },
    },
    {
      key: 'total',
      title: 'Total',
      dataIndex: 'total',
      render(value, record) {
        return USCurrencyFormat.format(record.quantity * record.price);
      },
    },
  ];

  const download = (url: string, name: string) => {
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
  }

  const downloadFile = () => {
    if (!isEmpty(selectedBidProjectDetails.file)) {
      setIsDownloadingAll(true);
      download(selectedBidProjectDetails.file.url, selectedBidProjectDetails.file.name);
      setIsDownloadingAll(false);
    }
  };

  const handleDownloadScope = (selectedBid: IProjectBidding) => {
    const excel = new Excel();
    excel
      .addSheet(bid.projectId?.projectName)
      .addColumns(columns as any)
      .addDataSource(selectedBid.projectScopes, {
        str2Percent: true,
      })
      .saveAs(
        `${bid.projectId?.projectName
        }-${Date.now()}.xlsx`
      );
  };

  return (
    <div className="col-span-4 mt-3">
      <div>
        <SenaryHeading
          title={'Company Name'}
          className="font-normal text-[#475467] text-xs leading-4"
        />
        <div className="flex mt-1 items-center space-x-3">
          {bid.user?.companyLogo ? <Image
            src={bid.user?.companyLogo}
            width={18}
            height={18}
            alt="trade icon"
          /> : null}
          <SenaryHeading
            title={bid.projectId?.projectName}
            className="font-medium text-[#001556] text-base leading-6"
          />
        </div>
      </div>

      <div className="mt-3 space-y-2">
        <div className="flex items-centers space-x-2">
          <SenaryHeading
            title={'Project Price:'}
            className="font-normal text-[#475467] text-xs leading-4"
          />

          <SenaryHeading
            title={bid.projectId?.projectValue}
            className="font-semibold text-[#475467] text-xs leading-4"
          />
        </div>
        <div className="flex items-centers space-x-2">
          <SenaryHeading
            title={'Deadline:'}
            className="font-normal text-[#475467] text-xs leading-4"
          />

          <SenaryHeading
            title={selectedBidProjectDetails?.projectDuration}
            className="font-semibold text-[#475467] text-xs leading-4"
          />
        </div>
        <div className="flex items-centers space-x-2">
          <SenaryHeading
            title={'Bid Time:'}
            className="font-normal text-[#475467] text-xs leading-4"
          />

          <SenaryHeading
            title={`${moment(selectedBidProjectDetails.createdAt).format(
              'DD MMM YYYY, hh:mm'
            )}`}
            className="font-semibold text-[#475467] text-xs leading-4"
          />
        </div>

        <Link
          href={`/bid-management/details/${bid.projectId?._id}`}
          className="text-[#7F56D9] hover:text-[#7F56D9] underline underline-offset-2 mt-4 text-[14px] leading-6 font-normal cursor-pointer"
        >
          View full details
        </Link>
      </div>

      <Divider />
      <div className="mt-3">
        <SenaryHeading
          title={selectedBidProjectDetails?.additionalDetails}
          className="font-normal text-[#475467] text-sm leading-6"
        />
      </div>

      <Divider />
      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <SenaryHeading
            title="How long this price will stay?"
            className="font-normal text-[#667085] text-xs leading-4"
          />
          <SenaryHeading
            title={selectedBidProjectDetails?.projectDuration}
            className="font-semibold text-[#101828] text-xs leading-4"
          />
        </div>
        <div className="flex items-center space-x-2">
          <SenaryHeading
            title="How much you want to increase?"
            className="font-normal text-[#667085] text-xs leading-4"
          />
          <SenaryHeading
            title={`${selectedBidProjectDetails?.increaseInPercentage} %`}
            className="font-semibold text-[#101828] text-xs leading-4"
          />
        </div>
      </div>
      <Divider />
      {size(selectedBidProjectDetails?.projectScopes) > 0 && (
        <div className="mt-2 space-y-3">
          <SenaryHeading
            title="Project Scope"
            className="font-semibold text-[#101828] text-xs leading-4"
          />

          <Table
            columns={columns}
            dataSource={selectedBidProjectDetails?.projectScopes?.map(
              (el: any) => ({
                description: el.description,
                quantity: el.quantity,
                price: el.price,
              })
            )}
            pagination={false}
            bordered
          />
        </div>
      )}
      <div className="px-4 mt-3 space-y-3">
        <CustomButton
          disabled={isDownloadingAll || isEmpty(selectedBidProjectDetails.file)}
          onClick={downloadFile}
          text="Download All Files"
        />

        <CustomButton
          onClick={() => handleDownloadScope(selectedBidProjectDetails)}
          text="Download Scopes"
        />
      </div>
    </div>
  );
}
