import { atom } from "jotai";

export const selectionAtom = atom<string[]>([]);

export const statAtom = atom<{ title: string; value: string }[]>([]);
