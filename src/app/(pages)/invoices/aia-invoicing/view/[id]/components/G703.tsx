import React from 'react';
import {
  DatePicker,
  Divider,
  Input,
  Select,
  Table,
} from 'antd';
import PrimaryHeading from '@/app/component/headings/primary';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import ColumnGroup from 'antd/es/table/ColumnGroup';
import Column from 'antd/es/table/Column';
import SenaryHeading from '@/app/component/headings/senaryHeading';
import {
  G7State,
  IClientInvoice,
} from '@/app/interfaces/client-invoice.interface';
import dayjs from 'dayjs';
import moment from 'moment';
import { disabledDate } from '@/app/utils/date.utils';

type Props = {
  phases: IClientInvoice[];
  selectedPhase: IClientInvoice | null;
  setSelectedPhase: (_value: string) => void;
  state: G7State;
  // eslint-disable-next-line no-unused-vars
  handleState<K extends keyof G7State>(key: K, value: G7State[K]): void;
  // eslint-disable-next-line no-unused-vars
  sumColumns(rows: Array<string[]>, column: number): number;
  children?: React.ReactNode;
};

export function G703Component({
  phases,
  selectedPhase,
  setSelectedPhase,
  state,
  sumColumns,
  children,
}: Props) {
  function getCellValue(row: string[], column: number) {
    return row[column];
  }



  return (
    <section>
      <div className="flex justify-between items-center">
        <div>
          <QuaternaryHeading title="AIA Document G703, - 1992" />
          <PrimaryHeading title="Continuation Sheet" className="font-normal" />
        </div>
        <div>
          <Select
            placeholder="Select Previous Phase"
            options={phases.map((phase, index) => ({
              label: `${index + 1}. Pay Application: ${moment(phase.applicationDate).format('DD MMM-YYYY')} - ${moment(phase.periodTo).format('DD MMM-YYYY')}`,
              value: phase._id,
            }))}
            value={selectedPhase?._id}
            onChange={(value) => {
              setSelectedPhase(value);
            }}
            style={{ width: 400 }}
            size="large"
          />
        </div>
      </div>
      <Divider className="!mt-6 !m-0" />

      <div className="flex justify-between">
        <div>
          <QuaternaryHeading
            title={`AIA Document G702, APPLICATION AND CERTIFICATION FOR PAYMENT, containing
                                        Contractor's signed certification is attached.

                                        In tabulations below, amounts are stated to the nearest dollar.

                                        Use Column I on Contracts where variable retainage for line items may apply.`}
            className="max-w-2xl"
          />
        </div>

        <div className="flex flex-col p-4 space-y-3 bg-white flex-1">
          <div className="grid grid-cols-6 space-x-3">
            <label className="text-right col-span-4 text-graphiteGray font-normal">
              APPLICATION NO:
            </label>
            <div className="col-span-2">
              <Input
                className="px-2 py-1  border border-gray-300 "
                type="text"
                value={state.applicationNo}
              />
            </div>
          </div>

          <div className="grid grid-cols-6 space-x-3">
            <label className="text-right col-span-4 text-graphiteGray font-normal">
              APPLICATION DATE:
            </label>
            <div className="col-span-2">
              <DatePicker
                id="application-date"
                className="px-2 w-full rounded-none py-[7px] border border-gray-300 outline-none"
                value={
                  state.applicationDate
                    ? dayjs(state.applicationDate)
                    : undefined
                }
                disabledDate={disabledDate}
                disabled
              />
            </div>
          </div>

          <div className="grid grid-cols-6 space-x-3">
            <label className="text-right col-span-4 text-graphiteGray font-normal">
              PERIOD TO:
            </label>

            <div className="col-span-2">
              <DatePicker
                id="application-date"
                className="px-4 w-full rounded-none py-[7px] border border-gray-300 outline-none"
                value={state.periodTo
                  ? dayjs(state.periodTo)
                  : undefined}
                disabledDate={disabledDate}
                disabled
              />
            </div>
          </div>

          <div className="grid grid-cols-6 space-x-3">
            <label className="text-right col-span-4 text-graphiteGray font-normal">
              PROJECT NO:
            </label>

            <div className="col-span-2">
              <Input
                className="px-2 py-1  border border-gray-300 "
                type="text"
                value={state.projectNo}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Spreadsheet */}
      <div className="px-4 space-y-2">
        <Table
          bordered
          dataSource={[
            ...state.data,
            [
              '',
              'Grand Total',
              `$ ${sumColumns(state.data, 2).toFixed(2)}`,
              `$ ${sumColumns(state.data, 3).toFixed(2)}`,
              `$ ${sumColumns(state.data, 4).toFixed(2)}`,
              `$ ${sumColumns(state.data, 5).toFixed(2)}`,
              `$ ${sumColumns(state.data, 6).toFixed(2)}`,
              `% ${sumColumns(state.data, 7).toFixed(2)}`,
              `$ ${sumColumns(state.data, 8).toFixed(2)}`,
              `$ ${sumColumns(state.data, 9).toFixed(2)}`,
            ],
          ]}
          pagination={false}
          scroll={{ x: 1300, y: 240 }}
        >
          <Column
            title={<SenaryHeading title="#" className="px-3 text-[12px]" />}
            dataIndex={0}
            render={(value, record: string[], index) => {
              return index === state.data.length ? null : (
                <div className="px-3">{index + 1}</div>
              );
            }}
            width={40}
          />
          <Column
            title={<SenaryHeading title="Description Of Work" />}
            dataIndex={1}
            width={300}
            render={(value, record: string[], index) => {
              if (index === state.data.length) {
                return <div className="px-3">{value}</div>;
              }
              return (
                <Input
                  value={getCellValue(record, 1)}
                  placeholder="Enter description of work"
                />
              );
            }}
          />
          <Column
            title={<SenaryHeading title="Scheduled value" />}
            dataIndex={2}
            render={(value, record: string[], index) => {
              if (index === state.data.length) {
                return <div className="px-3 font-bold">{value}</div>;
              }
              return (
                <Input
                  value={getCellValue(record, 2)}
                  type="number"
                  prefix="$"
                />
              );
            }}
          />
          <ColumnGroup title={<SenaryHeading title="Work Completed" />}>
            <Column
              title={<SenaryHeading title="From previous application (D+E)" />}
              dataIndex={3}
              render={(value, record: string[], index) => {
                if (index === state.data.length) {
                  return <div className="px-3">{value}</div>;
                }
                let columnF = Number(getCellValue(record, 3));
                return (
                  <Input value={columnF} prefix="$" type="number" disabled />
                );
              }}
            />
            <Column
              title={<SenaryHeading title="This period" />}
              dataIndex={4}
              render={(value, record: string[], index) => {
                if (index === state.data.length) {
                  return <div className="px-3">{value}</div>;
                }
                return (
                  <Input
                    value={value}
                    prefix="$"
                    type="number"
                  />
                );
              }}
            />
          </ColumnGroup>
          <Column
            title={
              <SenaryHeading title="Materials presently stored (not in D or E)" />
            }
            dataIndex={5}
            render={(value, record, index) => {
              if (index === state.data.length) {
                return <div className="px-3">{value}</div>;
              }
              return (
                <Input
                  value={value}
                  type="number"
                  prefix="$"
                />
              );
            }}
          />
          <ColumnGroup title={<SenaryHeading title="Work Completed" />}>
            <Column
              title={
                <SenaryHeading title="TOTAL COMPLETED AND STORED TO DATE (D+E+F)" />
              }
              dataIndex={6}
              render={(value, record: string[], index) => {
                if (index === state.data.length) {
                  return <div className="px-3">{value}</div>;
                }
                let columnD = Number(getCellValue(record, 3));
                let columnE = Number(getCellValue(record, 4));
                let columnF = Number(getCellValue(record, 5));

                return (
                  <Input
                    value={`${(columnD + columnE + columnF).toFixed(2)}`}
                    type="number"
                    prefix="$"
                  />
                );
              }}
            />
            <Column
              title={<SenaryHeading title="% (G ÷ C)" />}
              dataIndex={7}
              render={(value, record: string[], index) => {
                if (index === state.data.length) {
                  return <div className="px-3">{value}</div>;
                }
                return (
                  <Input
                    type="number"
                    prefix="%"
                    value={`${Number(record[7]).toFixed(2)}`}
                  />
                );
              }}
            />
          </ColumnGroup>
          <Column
            title={<SenaryHeading title="BALANCE (C - G)" />}
            dataIndex={8}
            render={(value, record: string[], index) => {
              if (index === state.data.length) {
                return <div className="px-3">{value}</div>;
              }
              return (
                <Input
                  prefix="$"
                  value={Number(record[8]).toFixed(2)}
                  type="number"
                />
              );
            }}
          />
          <Column
            title={
              <SenaryHeading
                title={`RETAINAGE (IF VARIABLE RATE) ${state.p5aPercentage}%`}
              />
            }
            dataIndex={9}
            render={(value, record: string[], index) => {
              if (index === state.data.length) {
                return <div className="px-3">{value}</div>;
              }
              return (
                <Input
                  type="number"
                  prefix="$"
                  value={`${Number(record[9]).toFixed(2)}`}
                />
              );
            }}
          />


        </Table>
      </div>
      {/* END Spreadsheet */}

      <div className="flex justify-end space-x-4 mt-8">{children}</div>
    </section>
  );
}
