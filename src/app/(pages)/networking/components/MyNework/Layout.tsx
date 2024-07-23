import React, { useEffect, useState } from 'react'
import Search from '../Search'
import axios from 'axios'
import { baseUrl, schestiAuthToken } from '@/app/services/base.service'
import { networkingUrl } from '@/app/utils/apiUrls'
import { Spin } from 'antd'
import SingleUserCard from '../SingleUserCard'
import NoData from '../NoData'
import { useSelector } from 'react-redux'

type Props = {
    userRole: string
}

const Layout = ({ userRole }: Props) => {
    const { myNetwork } = useSelector((state: any) => state.network);
    const [isLoading, setIsLoading] = useState(true);
    const [, setError] = useState<unknown>('');
    const [myNetworkUsers, setmyNetworkUsers] = useState({ user: { connections: [] } });

    const getMyNetworkUsers = async () => {
        const { data: users } = await axios(baseUrl + networkingUrl + 'getMyNetworkUsers', {
            headers: {
                Authorization: schestiAuthToken()
            }
        });
        setmyNetworkUsers(users.data);
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
                isLoading ? <Spin /> : myNetworkUsers.user.connections.length ? (
                    <div className="grid grid-cols-3 gap-4">
                        {
                            myNetworkUsers.user.connections.map((userData: any) => (
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