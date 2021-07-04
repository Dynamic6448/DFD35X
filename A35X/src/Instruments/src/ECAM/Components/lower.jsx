import { useState } from 'react'
import { useUpdate } from '../../Hooks/hooks'

export const LowerEcam = () => {
    let [tatValue, setTatValue] = useState("XX");
    let [satValue, setSatValue] = useState("XX");
    let [isaValue, setIsaValue] = useState("XX");
    let [wgValue, setWgValue] = useState("XX");
    let [fobValue, setFobValue] = useState("XX");
    let [gwcgValue, setGwcgValue] = useState("XX");
    let [timeValue, setTimeValue] = useState("XX");
    let [flightTimeValue, setFlightTimeValue] = useState("XX");

    const LocalTime = () => {
      let value = SimVar.GetGlobalVarValue("LOCAL TIME", "seconds");
      if (value) {
          let seconds = Number.parseInt(value);
          setTimeValue(Simplane.getCurrentUTC())
          let time = Utils.SecondsToDisplayTime(seconds, true, true, false);
          return time.toString();
      }
      return ''
    }

    const getFlightTime = () => {
      let value = SimVar.GetGameVarValue("FLIGHT DURATION", "seconds");
      if (value) {
          let time = Utils.SecondsToDisplayTime(value, true, false, false);
          return time.toString();
      }
      return "";
  }

    useUpdate(dt => {
      setTatValue(Math.round(Simplane.getTotalAirTemperature()));
      setSatValue(Math.round(Simplane.getAmbientTemperature()));
      setWgValue(Math.round(Simplane.getWeight()));
      setFobValue(Math.round(Simplane.getTotalFuel()));
      setTimeValue(LocalTime());
      setFlightTimeValue(getFlightTime());
      setIsaValue(Math.round(SimVar.GetSimVarValue("STANDARD ATM TEMPERATURE", "celsius")))


    })

    return (
      <g id="lower">
        <text x="266" y="3235.08" fill="#fff" fontSize="85">TAT</text>
        <text x="262" y="3328.96" fill="#fff" fontSize="85">SAT</text>
        <text x="257" y="3427.34" fill="#fff" fontSize="85">ISA</text>
        <text x="715" y="3235.08" fill="#00fc00" fontSize="85" text-anchor="end">{tatValue}</text>
        <text x="715" y="3328.96" fill="#00fc00" fontSize="85" text-anchor="end">{satValue}</text>
        <text x="715" y="3427.34" fill="#00fc00" fontSize="85" text-anchor="end">{isaValue}</text>
        <text x="2490" y="3235.08" fill="#00fc00" fontSize="85" text-anchor="end">{wgValue}</text>
        <text x="2490" y="3328.96" fill="#00fc00" fontSize="85" text-anchor="end"></text>
        <text x="2490" y="3427.34" fill="#00fc00" fontSize="85" text-anchor="end">{fobValue}</text>
        <text x="2534" y="3235.08" fill="#0ff" fontSize="85">KG</text>
        <text x="2535" y="3328.96" fill="#0ff" fontSize="85">%</text>
        <text x="2534" y="3427.34" fill="#0ff" fontSize="85">KG</text>
        <text x="769" y="3235.08" fill="#0ff" fontSize="85">°C</text>
        <text x="769" y="3328.96" fill="#0ff" fontSize="85">°C</text>
        <text x="769" y="3427.34" fill="#0ff" fontSize="85">°C</text>
        <text x="1931" y="3235.08" fill="#fff" fontSize="85">GW</text>
        <text x="1922" y="3328.96" fill="#fff" fontSize="85">GWCG</text>
        <text x="1936" y="3427.34" fill="#fff" fontSize="85">FOB</text>
        <text x="1180" y="3273.93" fill="#fff" fontSize="80">FLT</text>
        <text x="1280" y="3404.6" fill="#00fc00" fontSize="88" text-anchor="center">{timeValue}</text>
        <text x="1350" y="3273.93" fill="#00fc00" fontSize="80" text-anchor="center">{flightTimeValue}</text>
      </g>
    )
}