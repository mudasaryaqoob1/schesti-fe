import WhiteButton from '@/app/component/customButton/white';
import Description from "@/app/component/description";
import SecondaryHeading from "@/app/component/headings/Secondary";
import { CloseOutlined } from "@ant-design/icons";


type Props = {
    onClose(): void;
    title: string;
    description: string;
    children?: React.ReactNode;
}

export function LinkMessage({ description, onClose, title, children }: Props) {
    return <section className="mt-20 mx-4 rounded-xl bg-white h-[calc(100vh-700px)] grid items-center border border-solid border-silverGray shadow-secondaryTwist">
        <div className="flex items-start gap-4">
            <div className='ml-2 px-2 py-1 self-center bg-red-500 border rounded-full' >
                <CloseOutlined
                    className="cursor-pointer text-white"
                    width={24}
                    height={24}
                />
            </div>
            <div className='-space-y-2'>
                <SecondaryHeading
                    title={title}
                    className="text-black"
                />
                <Description
                    title={description}
                    className="text-black text-center font-normal"
                />
            </div>
        </div>
        <div className='flex justify-end px-2'>
            {children}
            <WhiteButton
                text='Okay'
                className='!w-40'
                onClick={onClose}
            />
        </div>
    </section>
}