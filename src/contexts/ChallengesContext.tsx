import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import LevelUpModal from '../components/LevelUpModal';

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
  closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
  level: number,
  currentExperience: number,
  completedChallenges: number,
}

export const ChallengeContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children,...rest }: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [completedChallenges, setCompletedChallenges] = useState(rest.completedChallenges ?? 0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const xpToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() =>{
    Notification.requestPermission();
  },[] )


  useEffect(()=>{
    Cookies.set('level', String(level))
    Cookies.set('currentExperience', String(currentExperience))
    Cookies.set('completedChallenges', String(completedChallenges))
  },[level,currentExperience,completedChallenges])

  function levelup() {
    setLevel(level + 1);
    setIsModalOpen(true)
  }
  function closeLevelUpModal(){
    setIsModalOpen(false)
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
        closeLevelUpModal
      }}>
      {children}

      {isModalOpen && <LevelUpModal />}
    </ChallengeContext.Provider>
  );
}
