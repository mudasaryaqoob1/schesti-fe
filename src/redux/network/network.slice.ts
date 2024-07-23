import { createSlice } from '@reduxjs/toolkit'

interface NetworkState {
    schestiNetwork: boolean;
    myNetwork: boolean;
    invited: boolean;
}

const initialState: NetworkState = { invited: false, myNetwork: false, schestiNetwork: false }

const networkSlice = createSlice({
    name: 'network',
    initialState,
    reducers: {
        SetInvitedClient: (state) => {
            state.invited = !state.invited
        },
        SetMyNetwork: (state) => {
            state.myNetwork = !state.myNetwork
        },
        SetSchestiNetwork: (state) => {
            state.schestiNetwork = !state.schestiNetwork
        }
    },
})

export const { SetInvitedClient, SetMyNetwork, SetSchestiNetwork, } = networkSlice.actions
export default networkSlice.reducer