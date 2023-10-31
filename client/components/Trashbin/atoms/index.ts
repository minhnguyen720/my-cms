import { Folder, Page } from "@/interfaces/Project";
import { atom } from "jotai";

export const removedItemAtom = atom<Page[] | Folder[] | []>([]);

export const selectedAtom = atom<string[]>([]);
