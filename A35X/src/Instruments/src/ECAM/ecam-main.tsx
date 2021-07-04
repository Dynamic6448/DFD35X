import React from 'react'
import { render } from '../Hooks/index'
import { UpperEcam } from './Components/upper';
import { LowerEcam } from './Components/lower';
import { ApuEcam } from './Components/apu';
import { RightEcam } from './Components/right';
import { DoorsOxyEcam } from './Components/doors';
import './ecam-main-style.scss'

const ECAM_SCREEN = () => {
    return (
        <div id="wrapper">
            <svg xmlns="http://www.w3.org/2000/svg"  fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="1.5" clipRule="evenodd" viewBox="0 0 5625 3467" >
                <path fill="none" stroke="#979798" strokeWidth="14.31" d="M2754.39 1001.55l-2649.08 7.909"></path>
                <path fill="none" stroke="#979798" strokeWidth="14.31" d="M2754.39 3121.3l-2649.08 7.909"></path>
                <path fill="none" stroke="#979798" strokeWidth="14.31" d="M1001.76 3418.75v-289.537"></path>
                <path fill="none" stroke="#979798" strokeWidth="14.31" d="M1857.94 3418.75v-289.537"></path>
                <UpperEcam />
                <ApuEcam />
                <DoorsOxyEcam />
                <LowerEcam />
                <RightEcam />
            </svg>
        </div>
    )
}
render(<ECAM_SCREEN />)