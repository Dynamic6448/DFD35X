import { useState } from 'react'
import { useUpdate } from '../../Hooks/hooks'

export const UpperEcam = () => {
    const MAX_EGT = 1018;
    let [engineIsRuning, setEngineIsRuning] = useState([false, false]);
    let [ThrottleTextMode, setThrottleTextMode] = useState('XX');
    let [engineThrottleMaxThrustVal, setEngineThrottleMaxThrustVal] = useState('XX');
    let [enginesTHR, setenginesTHR] = useState(['XX', 'XX']);
    let [enginesEGT, setenginesEGT] = useState(['XX', 'XX']);
    let [enginesN1, setenginesN1] = useState(['XX', 'XX']);
    let [throttleValue, setThrottleValue] = useState([0, 0]);

    const isActive = (value)  => {
        return (value == 'XX') ? false : true;
    }

    const manageColor = (value) => {
        return (isActive(value)) ? '#00fc00' : '#feb136';
    }

    const manageColorGauge = (value) => {
        return (isActive(value)) ? '#FFF': '#feb136';
    }

    const getThrottleMode = () => {
        let currentThrottleMode = Math.max(Simplane.getEngineThrottleMode(0), Simplane.getEngineThrottleMode(1))
        switch (currentThrottleMode) {
            case ThrottleMode.TOGA:
                return "TOGA";
            case ThrottleMode.FLEX_MCT:
                if ((Simplane.getCurrentFlightPhase() < FlightPhase.FLIGHT_PHASE_CLIMB) && (Simplane.getFlexTemperature() > 0)) {
                    return "FLEX";
                }
                return "MCT";
            case ThrottleMode.CLIMB:
                return "CLB";
            case ThrottleMode.AUTO:
                return "AUTO";
            case ThrottleMode.IDLE:
                return "IDLE";
            case ThrottleMode.REVERSE:
                return "REV";
            default:
                return "XX";
        }
    }

    const getEngineThrottleMaxThrustVal =() => {
        let value = Simplane.getEngineThrottleMaxThrust(0)
        return (engineIsRuning[0] || engineIsRuning[1]) ?  value.toFixed(1) : "XX";
    }

    const getEGTValue = (engineId) => {
            if (Simplane.getEngineActive(engineId)) {
                let value = SimVar.GetSimVarValue("ENG EXHAUST GAS TEMPERATURE:" + (engineId + 1), "celsius");
                return Math.round(value);
            }
        return "XX";
    }

    const getN1Value = (engineId) => {
        if (Simplane.getEngineActive(engineId)) {
            let value =  SimVar.GetSimVarValue("ENG N1 RPM:" + (engineId + 1), "percent");
            return value.toFixed(1);
        }
        return "XX";
    }

    const getTHRValue = (engineId) => {
        if (Simplane.getEngineActive(engineId)) {
            let value =  getEngineThrottleMaxThrustVal() * (getN1Value(engineId)/100);
            return value.toFixed(1);
        }
        return "XX";
    }

    const getThrottleValue = (engineId) => {
        if (Simplane.getEngineActive(engineId)) {
            let value =  SimVar.GetSimVarValue("GENERAL ENG THROTTLE LEVER POSITION:" + (engineId + 1), "percent");
            return value.toFixed(1);
        }
        return 0;
    }
    

    useUpdate(dt => {
        setEngineIsRuning([Simplane.getEngineActive(0), Simplane.getEngineActive(1)])
        setThrottleTextMode(getThrottleMode())
        setEngineThrottleMaxThrustVal(getEngineThrottleMaxThrustVal())
        setenginesEGT([getEGTValue(0), getEGTValue(1)])
        setenginesN1([getN1Value(0), getN1Value(1)])
        setenginesTHR([getTHRValue(0), getTHRValue(1)])
        setThrottleValue([getThrottleValue(0), getThrottleValue(1)])
    })

    return (
        <g id="upper">
            <g id="thr1">
                <path fill="none" stroke={manageColorGauge(enginesTHR[0])} strokeWidth="8" d="M838.686 603.64s-16.69 13.677-16.874 13.46c-33.139-38.955-53.139-89.406-53.139-144.49 0-123.175 100.002-223.177 223.176-223.177 123.174 0 223.176 100.002 223.176 223.177 0 .175-23.709.249-23.709.249"></path>
                <text x="1234" y="626.573" fill={manageColor(enginesTHR[0])} fontSize="85" text-anchor="end" >{enginesTHR[0]}</text>
                <text x="918.666" y="348.035" visibility={engineIsRuning[0] ? "visible" : "hidden"} fill="#fff" fontSize="85">5</text>
                <text x="1093.66" y="499.596" visibility={engineIsRuning[0] ? "visible" : "hidden"} fill="#fff" fontSize="85">10</text>
                <text x="841.235" y="600.091" visibility={engineIsRuning[0] ? "visible" : "hidden"} fill="#fff" fontSize="85">0</text>
                <path fill="none" stroke="#fff" visibility={engineIsRuning[0] ? "visible" : "hidden"} strokeWidth="8" d="M776.355 416.339l21.414 5.736M921.888 260.448l5.696 21.258M1128.33 296.77l-12.604 15.872"></path>
                <path fill="none" stroke="#5c5c5c" strokeWidth="6" d="M954.321 538.995H1285.892V648.099H954.321z"  visibility={engineIsRuning[0] ? "visible" : "hidden"}></path>
                <circle cx="781.029" cy="613.565" r="20.43" fill="none" stroke="#0ff" strokeWidth="8" visibility={engineIsRuning[0] ? "visible" : "hidden"} transform={"rotate(" + (210 * (throttleValue[0]/100)) + ", 991.849, 478.421)"}></circle>
                <line x1="991.849" y1="478.421" x2="811.936" y2="617.749" fill="none" stroke='#00fc00' strokeWidth="10" visibility={engineIsRuning[0] ? "visible" : "hidden"} transform={engineIsRuning[0] ? "rotate(" + (216 * (enginesTHR[0]/100)) + ", 991.849, 478.421)" : ""} />
            </g>
            <g id="thr2">
                <path fill="none" stroke={manageColorGauge(enginesTHR[1])} strokeWidth="8" d="M1651.9 603.64s-16.69 13.677-16.875 13.46c-33.138-38.955-53.139-89.406-53.139-144.49 0-123.175 100.002-223.177 223.176-223.177 123.175 0 223.177 100.002 223.177 223.177 0 .175-23.709.249-23.709.249"></path>
                <text x="2048" y="626.573" fill={manageColor(enginesTHR[1])} fontSize="85" text-anchor="end" >{enginesTHR[1]}</text>
                <text x="1731.88" y="348.035" visibility={engineIsRuning[1] ? "visible" : "hidden"} fill="#fff" fontSize="85">5</text>
                <text x="1906.87" y="499.596" visibility={engineIsRuning[1] ? "visible" : "hidden"} fill="#fff" fontSize="85">10</text>
                <text x="1654.44" y="600.091" visibility={engineIsRuning[1] ? "visible" : "hidden"} fill="#fff" fontSize="85">0</text>
                <path fill="none" stroke="#fff" visibility={engineIsRuning[1] ? "visible" : "hidden"} strokeWidth="8" d="M1589.56 416.339l21.415 5.736M1735.1 260.448l5.696 21.258M1941.53 296.77l-12.604 15.872"></path>
                <path fill="none" stroke="#5c5c5c" strokeWidth="6" d="M1767.53 538.995H2099.101V648.099H1767.53z"  visibility={engineIsRuning[1] ? "visible" : "hidden"}></path>
                <circle cx="1594.24" cy="613.565" r="20.43" fill="none" stroke="#0ff" strokeWidth="8" visibility={engineIsRuning[1] ? "visible" : "hidden"} transform={"rotate(" + (210 * (throttleValue[1]/100)) + ", 1805.06, 478.421)"}></circle>
                <line x1="1805.06" y1="478.421" x2="1625.147" y2="617.749" fill="none" stroke='#00fc00' strokeWidth="10" visibility={engineIsRuning[1] ? "visible" : "hidden"} transform={engineIsRuning[1] ? "rotate(" + (216 * (enginesTHR[1]/100)) + ", 1805.06, 478.421)" : ""} />
            </g>
            <g id="egt1">
                <path fill="none" visibility={engineIsRuning[0] ? "visible" : "hidden"} stroke="#5c5c5c" strokeWidth="6" d="M345.269 840.389H597.799V939.803H345.269z"></path>
                <path fill="none" visibility={engineIsRuning[0] ? "visible" : "hidden"} stroke={manageColorGauge(enginesEGT[0])} strokeWidth="8" d="M276.063 889.933s-25.631.384-25.629-.028c.666-122.607 100.411-221.94 223.173-221.94 91.023 0 169.392 54.61 204.103 132.826"></path>
                <path fill="none" stroke={engineIsRuning[0] ? 'red' : '#FFF'} strokeLinecap="square" strokeWidth={engineIsRuning[0] ? 16 : 8} d="M677.71 800.791c12.26 27.627 19.073 58.199 19.073 90.35"></path>
                <path fill="none" visibility={engineIsRuning[0] ? "visible" : "hidden"} stroke="#feb136" strokeWidth="10" d="M662.535 802.248l27.329-11.929"></path>
                <path fill="none" visibility={engineIsRuning[0] ? "visible" : "hidden"} stroke="#fff" strokeWidth="8" d="M473.608 667.965v30.818"></path>
                <text x="580" y="926" fill={manageColor(enginesEGT[0])} fontSize="85" text-anchor="end">{enginesEGT[0]}</text>
                <line x1="302.636" y1="890.096" x2="215.629" y2="890.096" fill="none" stroke='#00fc00' strokeWidth="10" visibility={engineIsRuning[0] ? "visible" : "hidden"} transform={engineIsRuning[0] ? "rotate(" + (180 * (((100*enginesEGT[0])/MAX_EGT)/100)) + ", 473.608, 890.096)" : ""} />
            </g>
            <g id="egt2">
                <path fill="none" visibility={engineIsRuning[1] ? "visible" : "hidden"} stroke="#5c5c5c" strokeWidth="6" d="M2293.86 840.389H2546.3900000000003V939.803H2293.86z"></path>
                <path fill="none" visibility={engineIsRuning[1] ? "visible" : "hidden"} stroke={manageColorGauge(enginesEGT[1])} strokeWidth="8" d="M2224.65 889.933s-25.631.384-25.629-.028c.666-122.607 100.411-221.94 223.173-221.94 91.023 0 169.392 54.61 204.102 132.826"></path>
                <path fill="none" stroke={engineIsRuning[1] ? 'red' : '#FFF'} strokeLinecap="square" strokeWidth={engineIsRuning[1] ? 16 : 8} d="M2626.3 800.791c12.26 27.627 19.074 58.199 19.074 90.35"></path>
                <path fill="none" visibility={engineIsRuning[1] ? "visible" : "hidden"} stroke="#feb136" strokeWidth="10" d="M2611.12 802.248l27.328-11.929"></path>
                <path fill="none" visibility={engineIsRuning[1] ? "visible" : "hidden"} stroke="#fff" strokeWidth="8" d="M2422.2 667.965v30.818"></path>
                <text x="2530" y="926" fill={manageColor(enginesEGT[1])} fontSize="85" text-anchor="end">{enginesEGT[1]}</text>
                <line x1="2251.22" y1="890.096" x2="2164.218" y2="890.096" fill="none" stroke='#00fc00' strokeWidth="10" visibility={engineIsRuning[1] ? "visible" : "hidden"} transform={engineIsRuning[1] ? "rotate(" + (180 * (((100*enginesEGT[1])/MAX_EGT)/100)) + ", 2422.2, 890.096)" : ""} />
            </g>
            <text x="1343.87" y="457.355" fill="#fff" fontSize="91" >THR</text>
            <text x="1375.33" y="788.544" fill="#fff" fontSize="91" >N1</text>
            <text x="143.166" y="623.073" fill="#fff" fontSize="91" >EGT</text>
            <text x="2547.55" y="623.073" fill="#fff" fontSize="91" >EGT</text>
            <text x="994.044" y="159.993" fill="#0ff" fontSize="91">{ThrottleTextMode}</text>
            <text x="1530" y="161.112" fill={manageColor(engineThrottleMaxThrustVal)} fontSize="85" text-anchor="end">{engineThrottleMaxThrustVal}</text>
            <text x="1402.13" y="533.279" fill="#0ff" fontSize="75" >%</text>
            <text x="1402.13" y="867.298" fill="#0ff" fontSize="75" >%</text>
            <text x="188.768" y="698.348" fill="#0ff" fontSize="75" >°C</text>
            <text x="2593.15" y="698.348" fill="#0ff" fontSize="75" >°C</text>
            <text x="1586.32" y="161.112" fill="#0ff" fontSize="75" >%</text>
            <text x="1105" y="833.176" fill={manageColor(enginesN1[0])} fontSize="85" text-anchor="end" >{enginesN1[0]}</text>
            <text x="1912" y="833.176" fill={manageColor(enginesN1[1])} fontSize="85" text-anchor="end" >{enginesN1[1]}</text>
            <path fill="none" stroke="#4e4e4e" strokeWidth="10" d="M1242.82 767.613l81.272-.982M1535.61 766.631l81.272.982"></path>
        </g>
    )
}