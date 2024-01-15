import React from 'react';
import { Table } from 'antd';
import '../scopeStyle.css';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  category?: string;
  subCategory?: string;
  description: string;
  unit: string;
  qty: string;
  wastage: string;
  unitLabourHour: string;
  perHourLaborRate: string;
  unitMaterialCost: string;
  unitEquipments: string;
  tableKey: string;
  tableItemKey: string;
  Action: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Description',
    dataIndex: 'description',
  },
  {
    title: 'Unit',
    dataIndex: 'unit',
    align: 'center',
  },
  {
    title: 'Qty',
    dataIndex: 'qty',
    align: 'center',
  },
  {
    title: 'Wastage',
    dataIndex: 'wastage',
    align: 'center',
  },
  {
    title: 'Qty with wastage',
    dataIndex: 'qtyWithWastage',
    align: 'center',
    render: (text, record: DataType) => {
      let quantity = parseFloat(record.qty);
      let wastagePercentage = parseFloat(record.wastage);
      let result = quantity * (1 + wastagePercentage / 100);
      return result.toFixed(2);
    },
  },
  {
    title: 'Per Hours Labor Rate',
    dataIndex: 'perHourLaborRate',
    align: 'center',
  },
  {
    title: 'Total Labor Cost',
    dataIndex: 'totalLaborCost',
    align: 'center',
    render: (text, record: DataType) => {
      let unitLabourHour = parseFloat(record.unitLabourHour);
      let quantity = parseFloat(record.qty);
      let result = quantity * unitLabourHour;
      return result.toFixed(2);
    },
  },
  {
    title: 'Unit Material Cost',
    dataIndex: 'unitMaterialCost',
    align: 'center',
  },
  {
    title: 'Total Material Cost',
    dataIndex: 'totalMaterialCost',
    align: 'center',
    render: (text, record: DataType) => {
      let unitMaterialCost = parseFloat(record.unitMaterialCost);
      let quantity = parseFloat(record.qty);
      let wastagePercentage = parseFloat(record.wastage);
      let qtyWithWastage = quantity * (1 + wastagePercentage / 100);
      let result = unitMaterialCost * qtyWithWastage;
      return result.toFixed(2);
    },
  },
  {
    title: 'Total Equipment Cost',
    dataIndex: 'totalEquipmentCost',
    align: 'center',
    render: (text, record: DataType) => {
      let unitEquipments = parseFloat(record.unitEquipments);
      let quantity = parseFloat(record.qty);
      let result = unitEquipments * quantity;
      return result.toFixed(2);
    },
  },
  {
    title: 'Total Cost',
    dataIndex: 'totalCost',
    align: 'center',
    render: (text, record: DataType) => {
      let unitLabourHour = parseFloat(record.unitLabourHour);
      let quantity = parseFloat(record.qty);
      let totalLabourCost = quantity * unitLabourHour;
      let unitMaterialCost = parseFloat(record.unitMaterialCost);
      let wastagePercentage = parseFloat(record.wastage);
      let qtyWithWastage = quantity * (1 + wastagePercentage / 100);
      let totalMeterialCost = unitMaterialCost * qtyWithWastage;
      let unitEquipments = parseFloat(record.unitEquipments);
      let result = totalLabourCost * totalMeterialCost * unitEquipments;
      return result.toFixed(2);
    },
  },
];

interface IProps {
  category: string;
  subCategory: string;
  description: string;
  unit: string;
  qty: string;
  wastage: string;
  unitLabourHour: string;
  perHourLaborRate: string;
  unitMaterialCost: string;
  unitEquipments: string;
}

const EstimatesTable = ({ estimates }: { estimates: IProps[] }) => {
  return (
    <div className="estimateTable_container">
      {estimates?.length > 0 && (
        <Table
          className="mt-2"
          loading={false}
          columns={columns}
          dataSource={estimates as DataType[]}
          pagination={false}
        />
      )}
    </div>
  );
};

export default EstimatesTable;
