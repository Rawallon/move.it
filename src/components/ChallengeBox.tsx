import { symlink } from 'fs';
import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export default function ChallengeBox() {
  const { activeChallenge, resetChallenge, completedChallenge } = useContext(
    ChallengeContext,
  );
  const { resetCountdown } = useContext(CountdownContext);

  function handleChallengeSuccess() {
    resetCountdown();
    completedChallenge();
  }
  function handleChallengeFailed() {
    resetCountdown();
    resetChallenge();
  }

  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>
          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt="" />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>
          <footer>
            <button
              type="button"
              onClick={handleChallengeFailed}
              className={styles.challengeButtonFailed}>
              Falhei
            </button>
            <button
              type="button"
              onClick={handleChallengeSuccess}
              className={styles.challengeButtonCompleted}>
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Finalize um ciclo para receber um desafio</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level up" />
            Avance de level completando desafios
          </p>
        </div>
      )}
    </div>
  );
}
