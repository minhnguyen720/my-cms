import { ALERT_CODES } from "@/constant";
import { Project } from "@/interfaces/Project";
import { atom } from "jotai";

export const searchAtom = atom<string>("");

export const notFoundAtom = atom<boolean>(false);

export const datasourceAtom = atom<Project | boolean>(false);

export const datasourceDefaultAtom = atom<Project | boolean>(false);

export const baseUrlAtom = atom<string>("http://localhost:4000");

export const projectIdAtom = atom<string>("");

export const activeAlertAtom = atom<{
  activeFlag: boolean;
  message?: string;
  type?: string;
}>({
  activeFlag: false,
  message: "",
  type: ALERT_CODES.INFO,
});
