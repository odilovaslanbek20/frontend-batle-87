import { create } from 'zustand'
import { persist } from "zustand/middleware";

export const useStore = create(
	persist(
		set => ({
			isOpen: false,
			isOpenModal: () => set(state => ({ isOpen: !state.isOpen })),
		}),
		{
			name: 'isOpen',
			getStorage: () => localStorage,
		}
	)
)
