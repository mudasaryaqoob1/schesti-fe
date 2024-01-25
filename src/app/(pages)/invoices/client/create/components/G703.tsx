'use client';
import React, { Dispatch, SetStateAction, } from 'react';
import { Divider, Input, InputNumber, Select, Table, } from 'antd';

import CustomButton from '@/app/component/customButton/button';
import WhiteButton from '@/app/component/customButton/white';
import PrimaryHeading from '@/app/component/headings/primary';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import { G703State, rowTemplate, } from '../utils';
import ColumnGroup from 'antd/es/table/ColumnGroup';
import Column from 'antd/es/table/Column';
import SenaryHeading from '@/app/component/headings/senaryHeading';
import { DeleteOutlined } from '@ant-design/icons';

type Props = {
  state: G703State;
  setState: Dispatch<SetStateAction<G703State>>;
};

export function G703Component({ setState, state }: Props) {

  function handleState<K extends keyof G703State>(key: K, value: typeof state[K]) {
    setState({ ...state, [key]: value });
  }

  function sumColumn(rows: Array<string[]>, column: number) {
    let sum = 0;
    rows.forEach(row => {
      sum += Number(row[column])
    })
    return isNaN(sum) ? 0 : sum;
  }

  function getCellValue(row: string[], column: number) {
    return row[column]
  }

  function updateCellValue(row: number, column: number, value: number | string) {
    let newData = [...state.data]
    newData[row][column] = `${value}`;
    newData = updateColumn6(newData, row);
    newData = updateColumn7(newData, row);
    newData = updateColumn8(newData, row);
    newData = updateColumn9(newData, row);
    handleState('data', newData);
  }

  function updateColumn6(data: Array<string[]>, rowIndex: number) {
    const newData = [...data];
    const row = newData[rowIndex];
    let columnD = row[3];
    let columnE = row[4];
    let columnF = row[5];
    let sum = Number(columnD) + Number(columnE) + Number(columnF);
    newData[rowIndex][6] = `${sum}`;
    return newData;
  }

  function updateColumn7(data: Array<string[]>, rowIndex: number) {
    const newData = [...data];
    const row = newData[rowIndex];
    let columnC = Number(row[2]);
    let columnG = Number(row[6]);
    // % (G ÷ C)
    let result = (columnG / columnC) * 100;
    newData[rowIndex][7] = `${isNaN(result) ? 0 : result}`;
    return newData;
  }

  function updateColumn8(data: Array<string[]>, rowIndex: number) {
    const newData = [...data];
    const row = newData[rowIndex];
    let columnG = Number(row[6]);
    let columnC = Number(row[2]);
    let result = columnC - columnG;
    newData[rowIndex][8] = `${isNaN(result) ? 0 : result}`;
    return newData;
  }

  function updateColumn9(data: Array<string[]>, rowIndex: number) {
    const newData = [...data];
    const row = newData[rowIndex];
    let columnF = row[5];
    // 10% of F
    let result = (10 / 100) * Number(columnF);
    newData[rowIndex][9] = `${isNaN(result) ? 0 : result}`;
    return newData;
  }

  function deleteRow(rowIndex: number) {
    const newData = [...state.data];
    newData.splice(rowIndex, 1);
    handleState('data', newData);
  }


  console.log(state);
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
            options={[
              { value: 'phase1', label: 'Phase 1' },
              { value: 'phase2', label: 'Phase 2' },
              { value: 'phase3', label: 'Phase 3' },
            ]}
            style={{ width: 250 }}
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
          <div className="flex self-end space-x-3 items-center">
            <label
              className="text-right text-graphiteGray font-normal"

            >
              APPLICATION NO:
            </label>
            <input
              id="application-date"
              className="px-2 py-1 border border-gray-300 outline-none"
              type="text"
              value={state.applicationNo}
              onChange={e => handleState('applicationNo', e.target.value)}
            />
          </div>
          <div className="flex self-end space-x-3 items-center">
            <label
              className="text-right text-graphiteGray font-normal"

            >
              APPLICATION DATE:
            </label>
            <input
              id="application-date"
              className="px-2 py-1 border border-gray-300 outline-none"
              type="text"
              value={state.applicationDate}
              onChange={e => handleState('applicationDate', e.target.value)}
            />
          </div>
          <div className="flex self-end space-x-3 items-center">
            <label
              className="text-right text-graphiteGray font-normal"

            >
              PERIOD TO:
            </label>
            <input
              id="application-date"
              className="px-2 py-1 border border-gray-300 outline-none"
              type="text"
              value={state.periodTo}
              onChange={e => handleState('periodTo', e.target.value)}
            />
          </div>
          <div className="flex self-end space-x-3 items-center">
            <label
              className="text-right text-graphiteGray font-normal"

            >
              PROJECT NO:
            </label>
            <input
              id="application-date"
              className="px-2 py-1 border border-gray-300 outline-none"
              type="text"
              value={state.projectNo}
              onChange={e => handleState('projectNo', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Spreadsheet */}
      <div className="px-4 space-y-2">
        <CustomButton
          text='Add Row'
          onClick={() => {
            handleState('data', [...state.data, rowTemplate(state.data.length)])
          }}
          className='!w-40'
        />
        <Table bordered dataSource={[
          ...state.data,
          ['', 'Grand Total', `${sumColumn(state.data, 2)}`, `${sumColumn(state.data, 3)}`, `${sumColumn(state.data, 4)}`, `${sumColumn(state.data, 5)}`, `${sumColumn(state.data, 6)}`, `${sumColumn(state.data, 7).toFixed(2)}`, `${sumColumn(state.data, 8)}`, `${sumColumn(state.data, 9)}`]
        ]}
          pagination={false}
        >
          <Column
            title={<SenaryHeading title='Item No' />}
            dataIndex={0} />
          <Column title={<SenaryHeading title="Description Of Work" />} dataIndex={1}
            render={(value, record: string[], index) => {
              if (index === state.data.length) {
                return value;
              }
              return <Input
                value={getCellValue(record, 1)}
                onChange={e => {
                  updateCellValue(index, 1, e.target.value)
                }}
              />
            }}
          />
          <Column
            title={<SenaryHeading title="Scheduled value" />}
            dataIndex={2}
            render={(value, record: string[], index) => {
              if (index === state.data.length) {
                return value;
              }
              return <Input
                value={getCellValue(record, 2)}
                type='number'
                onChange={e => {
                  updateCellValue(index, 2, Number(e.target.value));
                }
                }
              />
            }}
          />
          <ColumnGroup
            title={<SenaryHeading title="Work Completed" />}
          >
            <Column
              title={<SenaryHeading title="From previous application (D+E)" />}
              dataIndex={3}
              render={(value, record: string[], index) => {
                if (index === state.data.length) {
                  return value;
                }
                let columnE = Number(getCellValue(record, 4));
                return <Input
                  value={columnE}
                  type='number'
                  disabled
                />
              }}
            />
            <Column
              title={<SenaryHeading title="This period" />}
              dataIndex={4}
              render={(value, record, index) => {
                if (index === state.data.length) {
                  return value;
                }
                return <Input
                  value={value}
                  type='number'
                  onChange={e => {
                    updateCellValue(index, 4, Number(e.target.value));
                    updateCellValue(index, 3, Number(e.target.value));
                  }
                  }
                />
              }}
            />
          </ColumnGroup>
          <Column
            title={<SenaryHeading title="Materials presently stored (not in D or E)" />}
            dataIndex={5}
            render={(value, record, index) => {
              if (index === state.data.length) {
                return value;
              }
              return <Input
                value={value}
                type='number'
                onChange={e => {
                  updateCellValue(index, 5, Number(e.target.value));
                }
                }
              />
            }}
          />
          <ColumnGroup
            title={<SenaryHeading title="Work Completed" />}
          >
            <Column
              title={<SenaryHeading title="TOTAL COMPLETED AND STORED TO DATE (D+E+F)" />}
              dataIndex={6}
              render={(value, record: string[], index) => {
                if (index === state.data.length) {
                  return value;
                }
                let columnD = Number(getCellValue(record, 3));
                let columnE = Number(getCellValue(record, 4));
                let columnF = Number(getCellValue(record, 5));

                return <Input
                  value={columnD + columnE + columnF}
                  type='number'
                  disabled
                  onChange={e => {
                    updateCellValue(index, 6, Number(e.target.value));
                  }
                  }
                />
              }}
            />
            <Column
              title={<SenaryHeading title="% (G ÷ C)" />}
              dataIndex={7}
              render={(value, record: string[], index) => {
                if (index === state.data.length) {
                  return value;
                }
                return <InputNumber
                  value={record[7]}
                  precision={2}
                />
              }}
            />
          </ColumnGroup>
          <Column
            title={<SenaryHeading title="BALANCE (C - G)" />}
            dataIndex={8}
            render={(value, record: string[], index) => {
              if (index === state.data.length) {
                return value;
              }
              return <Input
                value={record[8]}
                type='number'
              />
            }}
          />
          <Column
            title={<SenaryHeading title="RETAINAGE (IF VARIABLE RATE) 5%" />}
            dataIndex={9}
            render={(value, record: string[], index) => {
              if (index === state.data.length) {
                return value;
              }
              return <InputNumber
                value={record[9]}
                precision={2}
                onChange={e => {
                  updateCellValue(index, 9, String(e));
                }
                }
              />
            }}
          />

          <Column
            title=""
            className='border-none border-b'
            render={(value, record: string[], index) => {
              if (index === state.data.length) {
                return null;
              }
              return <DeleteOutlined
                className='text-xl text-red-500 cursor-pointer'
                onClick={() => {
                  deleteRow(index);
                }}
              />
            }}
          />
        </Table>
      </div>
      {/* END Spreadsheet */}

      <div className="flex justify-end space-x-4 mt-2">
        <WhiteButton text="Cancel" className="!w-40" />
        <CustomButton text="Next" className="!w-40" />
      </div>
    </section>
  );
}
