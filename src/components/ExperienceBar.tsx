import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css'
export default function ExperienceBar() {
  const { currentExperience,xpToNextLevel } = useContext(ChallengeContext);
    const percentToNextLevel = Math.round(currentExperience * 100) / xpToNextLevel
    
    return (
        <header className={styles.experienceBar}>
            <span>0 xp</span>            
            <div>
                <div style={{width: `${percentToNextLevel}%`}}></div>
                <span className={styles.CurrentExperience} style={{left: `${percentToNextLevel}%`}}>{currentExperience} xp</span>
                </div>
            <span>{xpToNextLevel} xp</span>            
        </header>
    )
}
