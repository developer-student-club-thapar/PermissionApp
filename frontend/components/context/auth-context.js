import { createContext } from "react";

export const AuthContext = createContext({
	isLoggedIn: false,
	userId: null,
	token: null,
	login: () => {},
	logout: () => {},
	name: null,
	category: null,
});
