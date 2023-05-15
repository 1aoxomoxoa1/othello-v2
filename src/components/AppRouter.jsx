import React from "react";
import { BrowserRouter, Route, Routes,  } from 'react-router-dom';
import Lobby from "./Lobby/Lobby";
import Game from "./Game/Game";

function AppRouter({}){ 

    return( 
        <BrowserRouter>
            <Routes> 
                <Route path='/' element={<Lobby />} /> 
                <Route path='/game' element={<Game />} /> 
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;
