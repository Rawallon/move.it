import React, { useContext } from 'react'
import { ChallengeContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/Profile.module.css'

export default function Profile() {
    const { level } = useContext(ChallengeContext)

    return (
        <div className={styles.profileContainer}>
            <img src="http://github.com/rawallon.png" alt=""/>
            <div>
                <strong>Rawallon Cardoso</strong>
                <p>
                    <img src="icons/level.svg" alt=""/>
                    Level {level}</p>
            </div>
        </div>
    )
}
