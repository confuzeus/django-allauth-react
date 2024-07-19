import { atom } from "jotai";
import { CurrentAction } from "./types";

const errorsAtom = atom<Error[]>([]);
const isLoadingAtom = atom(false);
const currentActionAtom = atom<CurrentAction>(CurrentAction.Signin);

export const genericStore = {
  errorsAtom,
  isLoadingAtom,
  currentActionAtom,
};
