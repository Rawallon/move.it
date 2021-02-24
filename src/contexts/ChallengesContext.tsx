import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../challenges.json';

interface Challenge{
    type: 'body' | 'eye';
    description: string;
    amount: number
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

    const xpToNextLevel = Math.pow((level + 1) * 4,2)
    
useEffect(() => {
    if(currentExperience >= xpToNextLevel){
        console.log({xpToNextLevel, currentExperience});
        setCurrentExperience( currentExperience - xpToNextLevel)
        levelup();
    }
}, [currentExperience])

  function levelup() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randomIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomIndex];
    setActiveChallenge(challenge);
  }

  function resetChallenge(){
      setActiveChallenge(null);
  }
  function completedChallenge(){
    setCompletedChallenges(completedChallenges + 1);
      setCurrentExperience(currentExperience + activeChallenge.amount)
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
        xpToNextLevel
      }}>
      {children}
    </ChallengeContext.Provider>
  );
}
