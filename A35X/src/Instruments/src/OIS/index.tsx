/*
 *   Copyright (c) 2021 Digital Flight Dynamics and its contributors

 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.

 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.

 *   You should have received a copy of the GNU General Public License
 *   along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import React from 'react'
import { useState } from 'react'
import { render } from '../Hooks/index'
import oisContext from "./oisContext"
import './style.scss'

// Import OIS pages
import OIS_MAIN_PAGE from './Pages/Menu/main-page'
import OIS_AVNCS_COMPANY_COM from './Pages/AVNCS/COMPANY COM/company-com'
import OIS_EFB_FLT_FOLDER from './Pages/EFB/FLT FOLDER/flt-folder'
import OIS_EFB_FLT_OPS_MENU from './Pages/EFB/FLT OPS MENU/flt-ops-menu'
import OIS_EFB_FLT_OPS_STS from './Pages/EFB/FLT OPS STS/flt-ops-sts'
import OIS_EFB_IN_FLT_PERF from './Pages/EFB/IN-FLT PERF/in-flt-perf'
import OIS_EFB_LDG_PERF from './Pages/EFB/LDG PERF/ldg-perf'
import OIS_EFB_LOAD_BOX from './Pages/EFB/LOAD BOX/load-box'
import OIS_EFB_LOADSHEET from './Pages/EFB/LOADSHEET/loadsheet'
import OIS_EFB_OPS_LIBRARY from './Pages/EFB/OPS LIBRARY/ops-library'
import OIS_EFB_TO_PERF from './Pages/EFB/T.O PERF/to-perf'
import OIS_TEST from './test'


function OIS_DISPLAY() {
    let [oisPage, setOisPage] = useState(0)
    
    let context = {
        oisPage: oisPage,
        setOisPage: setOisPage
    }

    /* INDEX
    * 0 = MAIN PAGE
    * 1 = COMPANY COM
    * 2 = FLT FOLDER
    * 3 = FLT OPS MENU
    * 4 = FLT OPS STS
    * 5 = IN-FLT PERF
    * 6 = LDG PERF
    * 7 = LOAD BOX
    * 8 = LOADSHEET
    * 9 = OPS LIBRARY
    * 10 = T.O PERF
    */
    
    switch (oisPage) {
        case 0 : {
            return(
               <oisContext.Provider value={context}>
                    <OIS_MAIN_PAGE />
               </oisContext.Provider>
            ) 
        }
        case 1 : {
            return(
               <oisContext.Provider value={context}>
                    <OIS_AVNCS_COMPANY_COM />
               </oisContext.Provider>
            ) 
        }
        case 2 : {
            return(
               <oisContext.Provider value={context}>
                    <OIS_EFB_FLT_FOLDER />
               </oisContext.Provider>
            ) 
        }
        case 3 : {
            return(
               <oisContext.Provider value={context}>
                    <OIS_EFB_FLT_OPS_MENU />
               </oisContext.Provider>
            ) 
        }
        case 4 : {
            return(
               <oisContext.Provider value={context}>
                    <OIS_EFB_FLT_OPS_STS />
               </oisContext.Provider>
            ) 
        }
        case 5 : {
            return(
               <oisContext.Provider value={context}>
                    <OIS_EFB_IN_FLT_PERF />
               </oisContext.Provider>
            ) 
        }
        case 6 : {
            return(
               <oisContext.Provider value={context}>
                    <OIS_EFB_LDG_PERF />
               </oisContext.Provider>
            ) 
        }
        case 7 : {
            return(
               <oisContext.Provider value={context}>
                    <OIS_EFB_LOAD_BOX />
               </oisContext.Provider>
            ) 
        }
        case 8 : {
            return(
               <oisContext.Provider value={context}>
                    <OIS_EFB_LOADSHEET />
               </oisContext.Provider>
            ) 
        }
        case 9 : {
            return(
               <oisContext.Provider value={context}>
                    <OIS_EFB_OPS_LIBRARY />
               </oisContext.Provider>
            ) 
        }
        case 10 : {
            return(
               <oisContext.Provider value={context}>
                    <OIS_EFB_TO_PERF />
               </oisContext.Provider>
            ) 
        }
        default: {
            return(
                <div>
                    <h1 style={{color:"red"}}>ERROR</h1>
                </div>
            )
        }
    }
        
}

render(<OIS_DISPLAY />);