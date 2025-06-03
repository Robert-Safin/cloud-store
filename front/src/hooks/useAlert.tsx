import { create } from "zustand";

type Alert = {
  show: boolean;
  msg: string;
  type: "error" | "info";
};

type AlertStore = {
  alert?: Alert;
  trigger: (msg: string, type: Alert["type"]) => void;
};

const useAlertStore = create<AlertStore>((set) => ({
  alert: undefined,
  trigger: (msg, type) => {
    set({ alert: { show: true, msg, type } });

    setTimeout(() => {
      set({ alert: { show: false, msg, type } });
    }, 3000);
  },
}));

export default useAlertStore;
