import create from 'zustand';

// Define the store
const useClientStore = create(set => ({
    clientData: null,
    setClientData: (data) => set({ clientData: data }),
    clearClientData: () => set({ clientData: null }),
}));

export default useClientStore;