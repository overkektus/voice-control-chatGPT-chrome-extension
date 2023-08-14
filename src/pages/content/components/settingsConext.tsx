/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useState, ReactNode, FC, useContext } from "react";

type SettingsContextType = {
  isSpeechOn: boolean;
  toggleSpeech: () => void;
};

const defaultSettingsContext: SettingsContextType = {
  isSpeechOn: true,
  toggleSpeech: () => {},
};

export const SettingsContext = createContext<SettingsContextType>(
  defaultSettingsContext
);

type SettingsContextProviderProps = {
  children: ReactNode;
};

const SettingsContextProvider: FC<SettingsContextProviderProps> = ({
  children,
}) => {
  const [isSpeechOn, setIsSpeechOn] = useState<boolean>(true);

  const toggleSpeech = () => {
    setIsSpeechOn((prevIsSpeechOn) => !prevIsSpeechOn);
  };

  return (
    <SettingsContext.Provider value={{ isSpeechOn, toggleSpeech }}>
      {children}
    </SettingsContext.Provider>
  );
};

// Custom hook to access the SettingsContext
export const useSettingsContext = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error(
      "useSettingsContext must be used within a SettingsContextProvider"
    );
  }
  return context;
};

export default SettingsContextProvider;
