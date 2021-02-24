import { useContext, useEffect, useState } from 'react';
import { ChallengeContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Countdown.module.css'

let cdTimeout : NodeJS.Timeout;

export default function Countdown() {
    const { startNewChallenge } = useContext(ChallengeContext)

    const [time, setTime] = useState(0.05*60);
    const [isCDActive, setIsCDActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const [displayMinuteLeft,displayMinuteRight] = String(minutes).padStart(2,'0').split('');
    const [displaySecondsLeft,displaySecondsRight] = String(seconds).padStart(2,'0').split('');

    const startCountdown = () =>{
        setIsCDActive(true);
    }

    const resetCountdown = () => {
        clearTimeout(cdTimeout);
        setIsCDActive(false);
        setTime(25 * 60);
    }

    useEffect(() => {
        if(isCDActive && time > 0){
            cdTimeout = setTimeout(() => {
            setTime(time - 1);
        }, 1000);
        } else if(isCDActive && time === 0){
            setHasFinished(true);
            setIsCDActive(false);
            startNewChallenge();
        }
    }, [isCDActive,time])

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
        {
            hasFinished ? (
            <button disabled className={styles.startCountdownButton}>
                Ciclo encerrado
            </button>)
        : (<>{ isCDActive ?
        (<button type="button" onClick={resetCountdown} className={`${styles.startCountdownButton} ${styles.stopCountdownButton}`}>
            Abandonar ciclo
        </button>)
        :
        (<button type="button" onClick={startCountdown} className={styles.startCountdownButton}>
            Iniciar um ciclo
        </button>)
        }</>)
        }
        </div>
    )
}
