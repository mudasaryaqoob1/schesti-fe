import React, { useEffect, useState } from 'react'
import Search from '../Search'
import { Pagination, Spin } from 'antd'
import SingleUserCard from '../SingleUserCard'
import NoData from '../NoData'
import { useSelector } from 'react-redux'
import { networkingService } from '@/app/services/networking.service'
import { NetworkSearchTypes } from '../../page'

type Props = {
    userRole: string
}

const Layout = ({ userRole }: Props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<unknown>('');
    const [schestiUsers, setSchestiUsers] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [locationText, setLocationText] = useState('');
    const { schestiNetwork } = useSelector((state: any) => state.network);
    const [filters, setFilters] = useState({
        page: 1,
        limit: 10,
        totalPages: 0,
        totalRecords: 0
    });

    const getSchestiUsers = async () => {
        const { data } = await networkingService.httpGetSchestiUsers({ userRole, page: filters.page - 1, limit: filters.limit, searchText, locationText });
        const {
            users,
            totalPages,
            totalRecords,
        } = data;
        setSchestiUsers(users);
        setFilters({ ...filters, totalRecords, totalPages })
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
    }, [userRole, schestiNetwork, searchText, locationText, filters.page])

    return (
        <div>
            <Search searchValuesHandler={({ searchText, locationText }: NetworkSearchTypes) => {
                setSearchText(searchText);
                setLocationText(locationText)
            }} />
            {
                isLoading ? <Spin /> : schestiUsers.length > 0 ? (
                    <div className="grid grid-cols-3 gap-4">
                        {
                            schestiUsers.map((userData: any) => (
                                <SingleUserCard {...userData} />
                            ))
                        }
                    </div>
                ) : <NoData />

            }
            {
                filters.totalPages > 0 && (
                    <div className="mt-1 flex justify-center">
                        <Pagination
                            current={filters.page}
                            pageSize={filters.limit}
                            showPrevNextJumpers={false}
                            total={filters.totalRecords}
                            onChange={(page) => {
                                setFilters({ ...filters, page })
                            }
                            }
                        />
                    </div>
                )
            }
        </div>
    )
}

export default Layout