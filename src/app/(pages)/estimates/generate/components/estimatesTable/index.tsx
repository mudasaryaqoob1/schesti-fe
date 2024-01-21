import React from 'react';
import { Table } from 'antd';
import '../scopeStyle.css';

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


const calculateTotalCost = (record: DataType) => {
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
};


const confirmColumns: any = [
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    fixed: 'left',
    width: 300,
  },
  {
    title: 'Unit',
    dataIndex: 'unit',
    align: 'center',
    width: 100,
  },
  {
    title: 'Qty',
    dataIndex: 'qty',
    align: 'center',
    width: 100,
  },
  {
    title: 'Wastage',
    dataIndex: 'wastage',
    align: 'center',
    width: 100,
  },
  {
    title: 'Qty with wastage',
    dataIndex: 'qtyWithWastage',
    align: 'center',
    width: 150,
    render: (text: string, record: DataType) => {
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
    width: 150,
  },
  {
    title: 'Total Labor Cost',
    dataIndex: 'totalLaborCost',
    align: 'center',
    width: 150,
    render: (text: string, record: DataType) => {
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
    width: 150,
  },
  {
    title: 'Total Material Cost',
    dataIndex: 'totalMaterialCost',
    align: 'center',
    width: 150,
    render: (text: string, record: DataType) => {
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
    width: 150,
    render: (text: string, record: DataType) => {
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
    fixed: 'right',
    width: 150,
    render: (text: string, record: DataType) => {
      let result = calculateTotalCost(record);
      return result;
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
          columns={confirmColumns}
          dataSource={estimates as DataType[]}
          scroll={{ x: 1000 }}
          pagination={false}
        />
      )}
    </div>
  );
};

export default EstimatesTable;
