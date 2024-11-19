import { create, SetState } from 'zustand';

interface CategoryStore {
  category: string;
  setCategory: (category: string) => void;
  promptValue: any;
  setPromptValue: (promptValue: any) => void;
}

const useCategoryStore = create<CategoryStore>((set: SetState<CategoryStore>) => ({
  category: "Productivity",
  setCategory: (newCategory: string) => set({ category: newCategory }),

  promptValue: {},
  setPromptValue: (value: any) => set({ promptValue: value }),
}));

export default useCategoryStore;
