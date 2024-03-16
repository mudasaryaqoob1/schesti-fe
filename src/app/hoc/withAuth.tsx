'use client';

import { selectToken } from "@/redux/authSlices/auth.selector";
import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HttpService } from "../services/base.service";
import { AppDispatch, RootState } from "@/redux/store";
import { useQuery } from "react-query";
import { IResponseInterface } from "../interfaces/api-response.interface";
import { IPricingPlan } from "../interfaces/pricing-plan.interface";
import { AxiosError } from "axios";
import { pricingPlanService } from "../services/pricingPlan.service";
import { setUserPricingPlan } from "@/redux/pricingPlanSlice/pricingPlanSlice";
import { useRouter } from "next/navigation";
import { IUser } from "../interfaces/companyEmployeeInterfaces/user.interface";
import { NotAuthorized } from "../component/NotAuthorized";
import { Skeleton } from "antd";
import _ from "lodash";

export const withAuth = (WrappedComponent: React.FunctionComponent, requiredRoles: string[] = []) => {
    const WrappedComponentWithAuth = (props: any) => {
        const token = useSelector(selectToken);
        const userPlan = useSelector((state: RootState) => state.pricingPlan.userPlan);
        const dispatch = useDispatch<AppDispatch>();
        const router = useRouter();
        const user = useSelector((state: RootState) => state.auth.user as { user?: IUser });
        requiredRoles = requiredRoles.length > 0 ? _.map(requiredRoles, _.capitalize) : [];
        useLayoutEffect(() => {
            if (token) {
                HttpService.setToken(token);
            }
        }, [token]);

        const query = useQuery<IResponseInterface<{ plan: IPricingPlan }>, AxiosError<{ message: string, statusCode: number }>>(['userPricing'], () => pricingPlanService.httpGetUserPricingPlan(), {
            onSuccess(data) {
                if (data.data?.plan) {
                    dispatch(setUserPricingPlan(data.data.plan));
                }
            },
            onError(err) {
                console.log("User Pricing Plan Error", err.response?.data);
                if (err.response && err.response.data.statusCode >= 400) {
                    router.push("/login");
                }
            },
            staleTime: 60 * 5000
        });

        const userRoles: string[] = user.user?.roles || [];

        // if the query is not loaded, show skeleton
        if (query.isLoading) {
            return <Skeleton />
        }

        // if the required roles is empty; and there is already and a user with the plan
        if (userPlan && !requiredRoles.length) {
            return <WrappedComponent {...props} />;
        }

        const hasRoles = _.every(requiredRoles, (role) => userRoles.includes(role));
        if (userPlan && hasRoles) {
            return <WrappedComponent {...props} />;
        }

        if (userPlan && !hasRoles) {
            return <NotAuthorized />;
        }

        return <NotAuthorized />;
    };

    return WrappedComponentWithAuth;
};
