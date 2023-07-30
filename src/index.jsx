import React, {useState} from 'react';
import ReactDOM  from 'react-dom/client'
import GitSearch from './GitSearch'


 const App = ()=> {

    return <div className='container'>
    <GitSearch/>
    </div>
 }


ReactDOM.createRoot(document.getElementById("root")).render(<App/>)