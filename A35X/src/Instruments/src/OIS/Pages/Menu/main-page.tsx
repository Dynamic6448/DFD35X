import React from 'react';
import { useContext, useState } from 'react';
import './main-page-style.scss';
import './main-page-buttons-style.scss';
import oisContext from '../../oisContext';
import '../../style.scss'

const OIS_MAIN_PAGE = (props) => {
    let context = useContext(oisContext);
    let lastOisPage = useState(0);
    return(
        <div>
            <div className="main_page">
                <div>
                    <button onClick={() => context.setOisPage(1)} className="btn-main-page company-com">COMPANY COM</button>
                    <button className="btn-main-page efb">EFB</button>
                    <button className="btn-main-page clear">CLEAR</button>
                    <button className="btn-main-page msg">30 MSG</button>
                    <button onClick={() => context.setOisPage(10)} className="btn-main-page to_perf">T.O PERF</button>
                    <button onClick={() => context.setOisPage(4)} className="btn-main-page flt_ops_sts">FLT OPS STS</button>
                    <button onClick={() => context.setOisPage(6)} className="btn-main-page ldg_perf">LDG PERF</button>
                    <button onClick={() => context.setOisPage(5)} className="btn-main-page in-flt_perf">IN-FLT PERF</button>
                    <button onClick={() => context.setOisPage(8)} className="btn-main-page loadsheet">LOADHSEET</button>
                    <button onClick={() => context.setOisPage(9)} className="btn-main-page ops_library">OPS LIBRARY</button>
                    <button className="btn-main-page enroute">ENROUTE</button>
                    <button className="btn-main-page terml_chart">TERML CHART</button>
                    <button onClick={() => context.setOisPage(7)} className="btn-main-page load_box">LOAD BOX</button>
                    <button className="btn-main-page export_box">EXPORT BOX</button>
                </div>
                <div>
                    <label className="lbl ois_menu">OIS MENU</label>
                    <label className="lbl avncs">AVNCS</label>
                    <label className="lbl company_com"></label>
                    <label className="lbl avncs-company_com"></label>
                    <label className="lbl btns"></label>
                    <label className="lbl efb-btns"></label>
                    <label className="lbl clr_msg"></label>
                    <label className="lbl clr_msg_btm"></label>
                </div>
            </div>
        </div>
    );
};

export default OIS_MAIN_PAGE;