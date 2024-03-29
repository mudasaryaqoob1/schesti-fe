import Image from "next/image";


import CustomButton from "@/app/component/customButton/button";
import WhiteButton from "@/app/component/customButton/white";
import { InputComponent } from "@/app/component/customInput/Input";
import { SelectComponent } from "@/app/component/customSelect/Select.component";
import SenaryHeading from "@/app/component/headings/senaryHeading";
import { useTrades } from "@/app/hooks/useTrades";
import { useState } from "react";

type Props = {
    onCancel?: () => void;
    onApply?: (_filters: { trades: string[], projectValue: number }) => void;
    isVisible: boolean;
}

export function BidFilters({ onApply, onCancel, isVisible, }: Props) {
    const { trades, tradeCategoryFilters, tradesQuery } = useTrades();
    const [filters, setFilters] = useState<{
        trades: string[],
        projectValue: number
    }>({
        trades: [],
        projectValue: 0,
    });

    if (!isVisible) return null;

    const tradesSubCategories = tradeCategoryFilters.map(parent => {
        return ({
            label: parent.label,
            title: parent.label,
            options: trades.filter(trade => trade.tradeCategoryId._id === parent.value).map(trade => ({
                label: trade.name,
                value: trade._id
            }))
        });
    })

    return <div className={`absolute
         bg-white w-[400px] right-12 z-10 opacity-0 top-14 border rounded-md transition-all ease-in-out
          duration-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
        <div className="p-3 bg-[#F9F5FF] flex items-center justify-between">
            <SenaryHeading
                title="Filters"
                className="text-[#101828] font-semibold text-[20px] leading-7"
            />
            <Image
                src="/closeicon.svg"
                width={20}
                height={20}
                alt="close icon"
                className="cursor-pointer"
                onClick={onCancel}
            />
        </div>
        <div className="p-4 mt-2 space-y-2">
            <SelectComponent
                label="Trades"
                name="trades"
                placeholder="Choose your trades"
                field={{
                    loading: tradesQuery.isLoading,
                    options: tradesSubCategories,
                    allowClear: true,
                    showSearch: true,
                    mode: "multiple",
                    value: filters.trades,
                    onChange: (value) => {
                        setFilters({
                            trades: value,
                            projectValue: filters.projectValue
                        });
                    }
                }}
            />
            <InputComponent
                label="Project Value"
                placeholder="Project Value"
                name="projectValue"
                type="number"
                field={{
                    min: 1,
                    value: filters.projectValue,
                    onChange: (e) => {
                        setFilters({
                            trades: filters.trades,
                            projectValue: parseInt(e.target.value)
                        });
                    }
                }}
            />

        </div>
        <div className="mb-2 p-4 flex items-center space-x-4">
            <WhiteButton
                text="Cancel"
                onClick={onCancel}
            />
            <CustomButton
                text="Apply"
                onClick={() => {
                    if (onApply) {
                        onApply(filters)
                    }
                }}
            />
        </div>
    </div>
}