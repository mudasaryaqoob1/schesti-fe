import React, { useEffect, useState } from 'react'
import Search from '../Search'
import { Spin } from 'antd'
import SingleUserCard from '../SingleUserCard'
import NoData from '../NoData'
import { useSelector } from 'react-redux'
import { networkingService } from '@/app/services/networking.service'

type Props = {
    userRole: string
}

const Layout = ({ userRole }: Props) => {
    const { myNetwork } = useSelector((state: any) => state.network);
    const [isLoading, setIsLoading] = useState(true);
    const [, setError] = useState<unknown>('');
    const [myNetworkUsers, setMyNetworkUsers] = useState({ connections: [] });

    const getMyNetworkUsers = async () => {
        const { data } = await networkingService.httpGetMyNetworkUsers(userRole);
        setMyNetworkUsers(data.user);
    }
    useEffect(() => {
        try {
            setIsLoading(true);
            getMyNetworkUsers();
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setError(error);
        }
    }, [userRole, myNetwork])

    return (
        <div>
            <Search />
            {
                isLoading ? <Spin /> : myNetworkUsers.connections.length ? (
                    <div className="grid grid-cols-3 gap-4">
                        {
                            myNetworkUsers.connections.map((userData: any) => (
                                <SingleUserCard {...userData} myNetwork />
                            ))
                        }
                    </div>
                ) : <NoData />
            }
        </div>
    )
}

export default Layout