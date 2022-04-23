import React from "react";
import {  useDispatch } from 'react-redux'
import {Link} from 'react-router-dom';
import { getDogs } from '../actions';
function Landing (){
    const dispatch = useDispatch();
   

    function handle(){
        dispatch(getDogs())
        
    }
    return (
        <div>
            <Link to={'/home'}>
                <button onClick={() => handle() }>Start</button>
            </Link>
            
            {/* <button>Chat Bot</button> */}
        </div>
    )
};

export default Landing;