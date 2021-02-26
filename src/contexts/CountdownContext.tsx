import {
  Children,
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ChallengeContext } from './ChallengesContext';

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isCDActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}
interface CountdownProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

let cdTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengeContext);

  const [time, setTime] = useState(25 * 60);
  const [isCDActive, setIsCDActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const startCountdown = () => {
    setIsCDActive(true);
  };

  const resetCountdown = () => {
    clearTimeout(cdTimeout);
    setIsCDActive(false);
    setHasFinished(false);
    setTime(25 * 60);
  };

  useEffect(() => {
    if (isCDActive && time > 0) {
      cdTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isCDActive && time === 0) {
      setHasFinished(true);
      setIsCDActive(false);
      startNewChallenge();
    }
  }, [isCDActive, time]);
  return (
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        hasFinished,
        isCDActive,
        startCountdown,
        resetCountdown,
      }}>
      {children}
    </CountdownContext.Provider>
  );
}
