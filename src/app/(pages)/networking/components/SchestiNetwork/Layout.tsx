import React, { useEffect, useState } from 'react'
import Search from '../Search'
import { Spin } from 'antd'
import SingleUserCard from '../SingleUserCard'
import axios from 'axios'
import { baseUrl } from '@/app/services/base.service'
import { networkingUrl } from '@/app/utils/apiUrls'
import NoData from '../NoData'
import { useSelector } from 'react-redux'

type Props = {
    userRole: string
}

const Layout = ({ userRole }: Props) => {
    const { schestiNetwork } = useSelector((state: any) => state.network);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<unknown>('');
    const [schestiUsers, setSchestiUsers] = useState({ users: [] });

    const getSchestiUsers = async () => {
        const { data: users } = await axios(baseUrl + networkingUrl + 'getSchestiUsers' + `?userRole=${userRole}`);
        setSchestiUsers(users.data);

    }
    useEffect(() => {
        try {
            setIsLoading(true);
            getSchestiUsers();
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setError(error);
        }
    }, [userRole, schestiNetwork])

    console.log(schestiUsers, 'schesti users...', error);

    return (
        <div>
            <Search />
            {
                isLoading ? <Spin /> : schestiUsers.users.length ? (
                    <div className="grid grid-cols-3 gap-4">
                        {
                            schestiUsers.users.map((userData: any) => (
                                <SingleUserCard {...userData} />
                            ))
                        }
                    </div>
                ) : <NoData />

            }

        </div>
    )
}

export default Layout