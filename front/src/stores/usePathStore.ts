import { create } from "zustand";

type PathStore = {
  path: string;
  setPath: (p: string) => void;
  forward: (target: string) => void;
  back: () => void;
};

const usePathStore = create<PathStore>((set, get) => ({
  path: "root",
  setPath: (p) => set({ path: p }),
  forward: (target) => {
    const current = get().path;
    set({ path: `${current}/${target}` });
  },
  back: () => {
    const current = get().path;
    if (current === "root") return;
    const split = current.split("/");
    split.pop();
    set({ path: split.join("/") });
  },
}));

export default usePathStore;
