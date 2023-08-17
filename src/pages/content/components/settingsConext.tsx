/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useState, ReactNode, FC } from "react";
import { ILanguage } from "@src/constants/supportedLanguages";

type SettingsContextType = {
  isSpeechOn: boolean;
  toggleSpeech: () => void;
  language: ILanguage;
  setLanguage: (language: ILanguage) => void;
  availableVoices: SpeechSynthesisVoice[];
  setAvailableVoices: (voices: SpeechSynthesisVoice[]) => void;
  volume: number;
  setVolume: (volume: number) => void;
  rate: number;
  setRate: (rate: number) => void;
  voice: SpeechSynthesisVoice | null;
  setVoice: (voice: SpeechSynthesisVoice) => void;
};

const defaultSettingsContext: SettingsContextType = {
  isSpeechOn: true,
  toggleSpeech: () => {},
  language: { label: "English", value: "en-US" },
  setLanguage: () => {},
  availableVoices: [],
  setAvailableVoices: () => {},
  volume: 1,
  setVolume: () => {},
  rate: 1,
  setRate: () => {},
  voice: null,
  setVoice: () => {},
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
  const [language, setLanguage] = useState<ILanguage>(
    defaultSettingsContext.language
  );
  const [volume, setVolume] = useState<number>(1);
  const [rate, setRate] = useState<number>(1);
  const [voice, setVoice] = useState<SpeechSynthesisVoice>(null);

  const toggleSpeech = () => {
    setIsSpeechOn((prevIsSpeechOn) => !prevIsSpeechOn);
  };

  return (
    <SettingsContext.Provider
      value={{
        isSpeechOn,
        toggleSpeech,
        language,
        setLanguage,
        availableVoices: speechSynthesis.getVoices(),
        setAvailableVoices: () => {},
        volume,
        setVolume,
        rate,
        setRate,
        voice,
        setVoice,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContextProvider;
