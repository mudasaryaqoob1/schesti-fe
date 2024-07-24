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
    const { schestiNetwork } = useSelector((state: any) => state.network);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<unknown>('');
    const [schestiUsers, setSchestiUsers] = useState([]);

    const getSchestiUsers = async () => {

        const { data } = await networkingService.httpGetSchestiUsers(userRole);
        setSchestiUsers(data.users);

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
                isLoading ? <Spin /> : schestiUsers.length ? (
                    <div className="grid grid-cols-3 gap-4">
                        {
                            schestiUsers.map((userData: any) => (
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