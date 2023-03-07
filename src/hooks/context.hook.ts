import { useContext } from "react";
import { GlobalContext } from "../stores/store";

export const useGlobalContext = () => useContext(GlobalContext);
