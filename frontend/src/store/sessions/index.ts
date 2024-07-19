import { atom } from "jotai";
import { SessionUser } from "./types";

const isAuthenticatedAtom = atom(false);
const userAtom = atom<SessionUser | null>(null);

export const sessionStore = { isAuthenticatedAtom, userAtom };
