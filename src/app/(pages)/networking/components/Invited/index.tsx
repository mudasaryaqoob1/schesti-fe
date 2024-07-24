import React, { useEffect, useState } from 'react'
import Search from '../Search'
import InvitedCard from './SingleCard'
import { Spin } from 'antd';
import NoData from '../NoData';
import { useSelector } from 'react-redux';
import { networkingService } from '@/app/services/networking.service';

const InvitedClients = () => {
    const { invited } = useSelector((state: any) => state.network);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<unknown>('');
    const [invitedUsers, setinvitedUsers] = useState({ invited: [] });

    const getInvitedUsers = async () => {
        const { data } = await networkingService.httpGetInvitedClients();
        console.log(data, 'data of schesti users...');
        setinvitedUsers(data.user);

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
                isLoading ? <Spin /> : invitedUsers.invited.length ? (
                    <div className="grid grid-cols-3 gap-4">
                        {
                            invitedUsers.invited.map((userData: any) => (
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