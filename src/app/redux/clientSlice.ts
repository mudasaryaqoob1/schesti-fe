
import { createSlice } from '@reduxjs/toolkit'
import { clientsData } from '../constants/constant';

export interface ClientState {
    clients: {
        id: number;
        firstName: string
        lastName: string
        email: string
        phoneNumber: string
        companyName: string
        address: string
        address2?: string
        status?: string
    }[],
    editID: number
}
// const data = JSON.parse(localStorage.getItem("clientData"))
const initialState: ClientState = {
    clients: clientsData,
    editID: 0

}
export const counterSlice = createSlice({
    name: 'clientsData',
    initialState,
    reducers: {
        addClient: (state, action) => {
            state.clients.push(action.payload)
            localStorage.setItem("clientData", JSON.stringify(state.clients))
        },
        deleteClient: (state, { payload }) => {
            return {
                ...state,
                clients: state.clients.filter((item) => item.id !== payload)
            }
        },
        editClient: (state, { payload }) => {
            const index = state.clients.findIndex((item) => item.id === +payload.id);
            if (index !== -1) {
                state.clients[index] = { ...state.clients[index], ...payload.updatedClient };

            }
        },
    }
})

// Action creators are generated for each case reducer function
export const { addClient, deleteClient, editClient } = counterSlice.actions

export default counterSlice.reducer