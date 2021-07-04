import { useState } from 'react'
import { useUpdate } from '../../Hooks/hooks'

export const ApuEcam = () => {
  const HTZ = 400
  const MAX_EGT = 900
  const VOLT = 230
  let [ApuPctRpm, setApuPctRpm] = useState('XX')
  let [ApuEgt, setApuEgt] = useState('XX')
  let [ApuFlap, setApuFlap] = useState(false)

  // APU GEN %
  // APU FU KG
  // demi cercle gris

  const isApuIsActive = () => {
    return SimVar.GetSimVarValue("APU GENERATOR ACTIVE", "bool")
  }

  const isApuIsOn  = () => {
    return SimVar.GetSimVarValue("APU GENERATOR SWITCH", "bool")
  }

  const isApuProduce = () => {
    return (VOLT) ? true : false
  }

  const getApuEGT = (rpm) => {
    let ambient = 28;
    let currentTemperature = ambient

      let temperatures = [
        [0,5,0,20], 
        [5,15,20,125], 
        [15,25,125,575], 
        [25,35,575,660], 
        [35,45,660,620], 
        [45,55,620,545], 
        [55,65,545,520], 
        [65,75,520,465], 
        [75,85,465,410], 
        [85,95,410,355], 
        [95,100,355,350]
      ];
      
      temperatures.forEach((row) => {
        if(rpm > row[0] && rpm <= row[1] ){
          let k = (row[2] < row[3]) ? rpm - row[0] : row[1] - rpm
          currentTemperature = (((row[3]-row[2])/(row[1]-row[0]))*k)+row[2];
        }
      })
      return Math.round(currentTemperature + ambient)

  }

  const getApuRPM = () => {
    isApuIsOn() ? Math.round(SimVar.GetSimVarValue("APU PCT RPM", "percent")) : 'XX'
  }

  useUpdate(dt => {
    setApuPctRpm(getApuRPM())
    setApuEgt(getApuEGT())
    setApuFlap(isApuRun())
  })

  return (
    <g id="APU">
      <g id="apu_n">
        <text x="725.721" y="1941.09" fill="#fff" fontSize="80">10</text>
        <text x="565.681" y="2193.74" fill="#fff" fontSize="80">0</text>
        <text x="868.112" y="2247.75" fill="#00fc00" fontSize="80">{ApuPctRpm}</text>
        <text x="944.665" y="2127.77" fill="#fff" fontSize="91">N</text>
        <text x="947.993" y="2240.61" fill="#0ff" fontSize="75">%</text>
        <path fill="none" stroke="#fff" strokeWidth="8" d="M563.133 2197.29s-16.69 13.677-16.875 13.461c-33.138-38.956-53.139-89.406-53.139-144.491 0-123.174 100.002-223.176 223.177-223.176 56.352 0 107.855 20.931 147.144 55.432"></path>
        <path fill="none" stroke="red" strokeLinecap="square" strokeWidth="12.5" d="M802.145 1860.22c22.54 9.412 43.211 22.417 61.295 38.297"></path>
        <path fill="none" stroke="#00fc00" strokeWidth="10" d="M716.296 2072.07l-179.914 139.329"></path>
        <line x1="716.296" y1="2072.07" x2="536.382" y2="2211.399" fill="none" stroke='#00fc00' strokeWidth="10" transform={ isApuIsOn() ? "rotate("+ (145 * (ApuPctRpm/100)) +", 716.296, 2072.07)" : ""} />
        <path fill="none" stroke="#fff" strokeWidth="8" d="M511.329 1981.93l25.053 11.018M782.197 1854.1l-5.669 18.748"></path>
      </g>
      <g id="apu_egt">
        <text x="654.301" y="2578.27" fill="#fff" fontSize="80">5</text>
        <text x="816.005" y="2640.19" fill="#fff" fontSize="80">7</text>
        <text x="845.815" y="2777.71" fill="#fff" fontSize="80">9</text>
        <text x="565.681" y="2831.24" fill="#fff" fontSize="80">0</text>
        <text x="868.698" y="2913.82" fill="#00fc00" fontSize="80">{ApuEgt}</text>
        <text x="948.246" y="2794.68" fill="#fff" fontSize="91">EGT</text>
        <text x="926.607" y="2906.69" fill="#0ff" fontSize="75">°C</text>
        <path fill="none" stroke="#fff" strokeWidth="8" d="M569.22 2866.03c-46.625-40.74-76.101-100.636-76.101-167.361 0-122.635 99.565-222.2 222.2-222.2 122.635 0 222.199 99.565 222.199 222.2 0 43.412-12.477 83.934-34.032 118.161"></path>
        <path fill="none" stroke="red" strokeLinecap="square" strokeWidth="12.5" d="M892.918 2564.83c28.641 37.413 44.6 83.129 44.6 133.841 0 43.412-12.477 83.934-34.032 118.161"></path>
        <path fill="none" stroke="#00fc00" strokeWidth="10" d="M716.296 2709.57l-179.914 139.328"></path>
        <line x1="716.296" y1="2709.57" x2="536.382" y2="2848.898" fill="none" stroke='#00fc00' strokeWidth="10" transform={ isApuIsOn() ? "rotate("+ (238 * (((100*ApuEgt)/MAX_EGT)/100)) +", 716.296, 2709.57)" : ""} />
        <path fill="none" stroke="#fff" strokeWidth="8" d="M550.422 2555.91l18.272 16.928M550.422 2848.9l19.112-16.054M919.849 2783.46l-23.575-8.557M933.042 2672.83l-24.496 4.153M660.767 2484.53l6.029 24.434M784.993 2489.5l-7.44 23.833M891.033 2562.35l-19.103 16.095"></path>
      </g>
      <g>
        <g id="apu_gen" visibility={isApuProduce() ? 'visible' : 'hidden'} >
          <text x="740.237" y="1451.06" fill="#00fc00" fontSize="91">19</text>
          <text x="821.869" y="1451.06" fill="#0ff" fontSize="75">%</text>
          <text x="740.237" y="1545.73" fill="#00fc00" fontSize="91">{VOLT}</text>
          <text x="829.047" y="1562.15" fill="#0ff" fontSize="75">V</text>
          <text x="740.237" y="1643.39" fill="#00fc00" fontSize="91">{HTZ}</text>
          <text x="826.086" y="1643.39" fill="#0ff" fontSize="75">HZ</text>
          <path fill="none" stroke="#fff" strokeLinecap="square" strokeWidth="12" d="M500.997 1230.98H1010.3389999999999V1676.757H500.997z"></path>
        </g>
        <path fill="none" stroke={(VOLT === 230) ? "#00fc00": "#FFF"} strokeLinecap="square" strokeWidth="12" d="M754.566 1157.16l31.952 52.44h-63.903l31.951-52.44z"></path>
        <text x="563.349" y="1346.46" fill="#fff" fontSize="91">APU GEN</text>
      </g>
      <g id="apu_fu">
        <text x="1111.88" y="1880.65" fill="#fff" fontSize="91">APU FU</text>
        <text x="1684.62" y="1880.65" fill="#00fc00" fontSize="91">0</text>
        <text x="1770.76" y="1880.65" fill="#0ff" fontSize="75">KG</text>
      </g>
      <text x="1824.6" y="2406.53" fill="#00fc00" fontSize="91" visibility={ApuFlap ? 'visible' : 'hidden'} >FLAP OPEN</text>
      <path fill="none" stroke="#fff" strokeWidth="8" d="M334.961 1196.81H110.425" ></path>
      <path fill="none" stroke="#fff" strokeWidth="10" d="M214.922 1791.29l.302-58.198h2423.52l-.985 58.198"></path>
      <g fill="#fff" transform="translate(-23.56 76.251) scale(3.125)">
        <text x="42.617" y="353.291" fontSize="40">APU</text>
        <path d="M42.617 353.369H117.226V353.408H42.617z"></path>
      </g>
    </g>
  )
}