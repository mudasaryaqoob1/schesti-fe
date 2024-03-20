import { SelectComponent } from '@/app/component/customSelect/Select.component';
import QuinaryHeading from '@/app/component/headings/quinary';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { Checkbox, Divider } from 'antd';
import data from './trades.json';
import { useState } from 'react';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';


type Props = {
    children?: React.ReactNode;
};
const tradeData = data.map((item, idx) => ({
    category: item.category,
    id: idx,
    services: item.services.map(service => ({ isChecked: false, name: service })),
    isSelectAll: false
}));

export function PostProjectTrades({ children }: Props) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const [trades, setTrades] = useState(tradeData);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedAll, setSelectAll] = useState(false);

    const tradeCategoryFilters = trades.map((trade) => {
        return {
            label: trade.category,
            value: trade.category,
        }
    });

    function updatedTrade(id: number, serviceName: string) {
        const updatedTrades = trades.map(trade => {
            if (trade.id === id) {
                trade.services = trade.services.map(service => {
                    if (service.name === serviceName) {
                        service.isChecked = !service.isChecked;
                    }
                    return service;
                });
            }
            return trade;
        });
        setTrades(updatedTrades);
    }

    function selectAllServices(id: number) {
        const updatedTrades = trades.map(trade => {
            if (trade.id === id) {
                trade.services = trade.services.map(service => {
                    service.isChecked = true;
                    return service;
                });
                trade.isSelectAll = true;
            }
            return trade;
        });
        setTrades(updatedTrades);
    }

    function deSelectAllServices(id: number) {
        const updatedTrades = trades.map(trade => {
            if (trade.id === id) {
                trade.services = trade.services.map(service => {
                    service.isChecked = false;
                    return service;
                });
                trade.isSelectAll = false;
            }
            return trade;
        });
        setTrades(updatedTrades);
    }

    function selectAllTrades() {
        const updatedTrades = trades.map(trade => {
            trade.services = trade.services.map(service => {
                service.isChecked = !service.isChecked;
                return service;
            });
            trade.isSelectAll = true;
            return trade;
        });
        setTrades(updatedTrades);
    }

    function deSelectAllTrades() {
        const updatedTrades = trades.map(trade => {
            trade.services = trade.services.map(service => {
                service.isChecked = false;
                return service;
            });
            trade.isSelectAll = false;
            return trade;
        });
        setTrades(updatedTrades);
    }

    return (
        <div className="">
            <div className='flex items-center justify-between'>
                <div className="flex items-center space-x-5">
                    <TertiaryHeading
                        title="Trades"
                        className="text-[20px] leading-[30px]"
                    />
                    <Checkbox checked={selectedAll}
                        onChange={e => {
                            setSelectAll(e.target.checked);
                            if (e.target.checked) {
                                selectAllTrades();
                            } else {
                                deSelectAllTrades();
                            }
                        }}>
                        <QuinaryHeading
                            title='Select All'
                            className='text-[#98A2B3]'
                        />
                    </Checkbox>
                </div>
                <SelectComponent
                    placeholder='Type'
                    label=''
                    name='type'
                    field={{
                        className: "!w-auto",
                        dropdownStyle: { width: 300 },
                        options: tradeCategoryFilters,
                        value: selectedCategory,
                        allowClear: true,
                        showSearch: true,
                        onChange(value) {
                            setSelectedCategory(value);
                        },
                    }}
                />
            </div>

            <div className='mt-5'>

                {trades.filter(trade => {
                    if (!selectedCategory) {
                        return trade
                    }
                    return trade.category.includes(selectedCategory);
                }).map((trade, idx) => {
                    return <div key={idx}>
                        <div className='flex items-center space-x-3 mt-3'>
                            <TertiaryHeading
                                title={trade.category}
                                className="text-[16px] leading-[30px] text-[#344054] font-medium"
                            />
                            <Checkbox
                                checked={trade.isSelectAll}
                                onChange={() => {
                                    if (trade.isSelectAll) {
                                        deSelectAllServices(trade.id);
                                    } else {
                                        selectAllServices(trade.id);
                                    }
                                }}
                            >
                                <QuinaryHeading
                                    title='All Categories'
                                    className='text-[#98A2B3]'
                                />
                            </Checkbox>
                        </div>
                        <Divider className='mt-1' />
                        <div className="flex flex-wrap gap-2 mt-3">
                            {trade.services.map(service => {
                                return service.isChecked ? <button key={service.name} className="inline-flex items-center justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 border rounded-full px-4 py-1 text-sm font-medium hover:text-gray-700 hover:bg-white cursor-pointer bg-[#F4EBFF] text-[#667085] "
                                    onClick={() => updatedTrade(trade.id, service.name)}
                                >
                                    {service.name}
                                    <CloseOutlined className="ml-2 font-bold text-lg" />
                                </button> :
                                    <button key={service.name} className="inline-flex items-center justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 bg-white border rounded-full px-4 py-1 text-sm font-medium text-gray-700 cursor-pointer hover:bg-[#F4EBFF] hover:text-[#667085] "
                                        onClick={() => updatedTrade(trade.id, service.name)}
                                    >
                                        {service.name}
                                        <PlusOutlined className="ml-2 font-bold text-lg" />
                                    </button>

                            })}



                        </div>
                    </div>
                })}
            </div>

            {children}
        </div>
    );
}
