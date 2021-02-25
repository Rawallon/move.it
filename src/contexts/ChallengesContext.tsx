import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../challenges.json';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  completedChallenges: number;
  levelup: () => void;
  startNewChallenge: () => void;
  activeChallenge: Challenge;
  resetChallenge: () => void;
  completedChallenge: () => void;
  xpToNextLevel: number;
}

interface ChallengesProviderProps {
  children: ReactNode;
}

export const ChallengeContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);

  const xpToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() =>{
    Notification.requestPermission();
  },[] )

  function levelup() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randomIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomIndex];
    setActiveChallenge(challenge);


      new Audio('/notification.mp3').play();

    if(Notification.permission === 'granted'){
      new Notification('Novo desafio!',{
        body: `Valendo ${challenge.amount}xp!`
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }
  function completedChallenge() {
    if (!activeChallenge) return;

    let finalExp = currentExperience + activeChallenge.amount;
    if (finalExp >= xpToNextLevel) {
      finalExp = finalExp - xpToNextLevel;
      levelup();
    }

    setCompletedChallenges(completedChallenges + 1);
    setCurrentExperience(finalExp);
    setActiveChallenge(null);
  }
  return (
    <ChallengeContext.Provider
      value={{
        level,
        levelup,
        currentExperience,
        completedChallenges,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        completedChallenge,
        xpToNextLevel,
      }}>
      {children}
    </ChallengeContext.Provider>
  );
}
