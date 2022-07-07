import React from 'react'
import './FilesSidebar.css'

export default function FilesSidebar(props) {
    const show = props.show;
    return (
        <>
        {show && <div className='files-sidebar'>FilesSidebar</div>}
        </>
        
    )
}
