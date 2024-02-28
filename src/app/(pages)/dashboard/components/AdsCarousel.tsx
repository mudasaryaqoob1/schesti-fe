/* eslint-disable @next/next/no-img-element */
import { IAdManagement } from "@/app/interfaces/ad-management.interface"
import { useEffect, useState } from 'react';

type Props = {
    ads: IAdManagement[];
}
export function AdsCarousel({ ads }: Props) {
    const [currentAdIndex, setCurrentAdIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentAdIndex(prevIndex => (prevIndex + 1) % ads.length);
        }, ads[currentAdIndex].duration * 1000 || 5000);

        return () => clearInterval(interval);
    }, [currentAdIndex, ads]);

    return <div>
        {ads[currentAdIndex] && (
            <img
                src={ads[currentAdIndex].imageURL}
                alt={`Ad ${currentAdIndex + 1}`}
                style={{ width: '100%', height: 200, objectFit: 'cover' }}
                className="rounded-md shadow-md"
            />
        )}
    </div>
}