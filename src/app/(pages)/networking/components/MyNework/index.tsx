import React from 'react'
import { Tabs, TabsProps } from 'antd';
import Layout from './Layout';

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Contractor',
        children: <Layout userRole='contractor' />
    },
    {
        key: '2',
        label: 'Sub-contractor',
        children: <Layout userRole='subcontractor' />
    },
    {
        key: '3',
        label: 'Estimator',
        children: <Layout userRole='estimator' />
    },
    {
        key: '4',
        label: 'Vendor',
        children: <Layout userRole='vendor' />
    }];

const MyNetwork = () => {

    const onChange = (key: string) => {
        console.log(key);
    };

    return (
        <Tabs defaultActiveKey="1" destroyInactiveTabPane className='text-slateGray text-sm' items={items} onChange={onChange} />
    )
}

export default MyNetwork