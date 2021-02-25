import { useContext, useEffect, useState } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';

export default function Countdown() {
  const {
    minutes,
    seconds,
    hasFinished,
    isCDActive,
    startCountdown,
    resetCountdown,
  } = useContext(CountdownContext);

  const [displayMinuteLeft, displayMinuteRight] = String(minutes)
    .padStart(2, '0')
    .split('');
  const [displaySecondsLeft, displaySecondsRight] = String(seconds)
    .padStart(2, '0')
    .split('');

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{displayMinuteLeft}</span>
          <span>{displayMinuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{displaySecondsLeft}</span>
          <span>{displaySecondsRight}</span>
        </div>
      </div>
      {hasFinished ? (
        <button disabled className={styles.startCountdownButton}>
          Ciclo encerrado
        </button>
      ) : (
        <>
          {isCDActive ? (
            <button
              type="button"
              onClick={resetCountdown}
              className={`${styles.startCountdownButton} ${styles.stopCountdownButton}`}>
              Abandonar ciclo
            </button>
          ) : (
            <button
              type="button"
              onClick={startCountdown}
              className={styles.startCountdownButton}>
              Iniciar um ciclo
            </button>
          )}
        </>
      )}
    </div>
  );
}
