import { useEffect, useState } from 'react';
import styles from '../styles/components/Countdown.module.css'

export default function Countdown() {
    const [time, setTime] = useState(25*60)
    const [cdState, setCdState] = useState(false)

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const [displayMinuteLeft,displayMinuteRight] = String(minutes).padStart(2,'0').split('')
    const [displaySecondsLeft,displaySecondsRight] = String(seconds).padStart(2,'0').split('')

    const startCountdown = () =>{
        setCdState(!cdState)
        console.log({cdState});
        
    }

    useEffect(() => {
        if(cdState && time > 0){
        let cdTimer = setTimeout(() => {
            setTime(time - 1)
        }, 1000);
        
        if(!cdState || time <= 0)
            clearTimeout(cdTimer);
        }
    }, [cdState,time])

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
        <button type="button" onClick={startCountdown} className={styles.startCountdownButton}>
            Iniciar um ciclo
        </button>
        </div>
    )
}
