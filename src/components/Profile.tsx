import React from 'react'
import styles from '../styles/components/Profile.module.css'

export default function Profile() {
    return (
        <div className={styles.profileContainer}>
            <img src="http://github.com/rawallon.png" alt=""/>
            <div>
                <strong>Rawallon Cardoso</strong>
                <p>
                    <img src="icons/level.svg" alt=""/>
                    Level 1</p>
            </div>
        </div>
    )
}
