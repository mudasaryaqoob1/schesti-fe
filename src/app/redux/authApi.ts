// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { LoginInfo } from '@/app/(pages)/(auth)/login/page';
import { base_url, login_url, signup_url } from '../utils/apiUrls';
import { SignupInfo } from '../(pages)/(auth)/register/page';

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: base_url }),
    endpoints: (builder) => ({
        signup: builder.mutation<void, SignupInfo>({
            // note: an optional `queryFn` may be used in place of `query`
            query: (data: SignupInfo) => ({
                url: signup_url,
                method: 'POST',
                body: data,
            }),
        }),
        login: builder.mutation<void, LoginInfo>({
            // note: an optional `queryFn` may be used in place of `query`
            query: (data: LoginInfo) => ({
                url: login_url,
                method: 'POST',
                body: data,
            }),
        }),
    })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useSignupMutation, useLoginMutation } = authApi