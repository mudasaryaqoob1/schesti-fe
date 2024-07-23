import React, { useEffect, useState } from 'react'
import Search from '../Search'
import InvitedCard from './SingleCard'
import axios from 'axios';
import { baseUrl, schestiAuthToken } from '@/app/services/base.service';
import { networkingUrl } from '@/app/utils/apiUrls'
import { Spin } from 'antd';
import NoData from '../NoData';
import { useSelector } from 'react-redux';

const InvitedClients = () => {
    const { invited } = useSelector((state: any) => state.network);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<unknown>('');
    const [invitedUsers, setinvitedUsers] = useState({ user: { invited: [] } });

    const getInvitedUsers = async () => {
        const { data: users } = await axios(baseUrl + networkingUrl + 'getInvitedClients', {
            headers: {
                Authorization: schestiAuthToken()
            }
        });
        setinvitedUsers(users.data);

    }
    useEffect(() => {
        try {
            setIsLoading(true);
            getInvitedUsers();
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setError(error);
        }
    }, [invited])

    console.log(invitedUsers, 'invited users...', error);

    return (
        <div>
            <Search />
            {
                isLoading ? <Spin /> : invitedUsers.user.invited.length ? (
                    <div className="grid grid-cols-3 gap-4">
                        {
                            invitedUsers.user.invited.map((userData: any) => (
                                <div className="col-span-1">
                                    <InvitedCard {...userData} />
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <NoData />
                )
            }

        </div>
    )
}

export default InvitedClients