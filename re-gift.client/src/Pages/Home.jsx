//import React from 'react';
//import '../css/Home.css';
//export  default function Home() {
//    return (
//        <div className="container py-4" id="home">
//            <div className="bg-body-tertiary p-5 rounded">
//                <div className="col-sm-8 py-5 mx-auto">
//                    <h1 className="display-5 fw-normal">Welcome to Regift Card Website</h1>

//                </div>
//            </div>
//        </div>
//    );
//}

import React from 'react';
import '../css/Home.css';
import regiftLogo from '../IMG/REGIFT.png'; // Importera bilden

export default function Home() {
    return (
        <div className="container py-4" id="home">
            <div className="bg-body-tertiary p-5 rounded">
                <div className="col-sm-8 py-5 mx-auto text-center">
                    <img src={regiftLogo} alt="Regift Logo" className="img-fluid" width={250} height={250} style={{margin:0, padding: 0, border: 'none' }} />
                </div>
            </div>
        </div>
    );
}



