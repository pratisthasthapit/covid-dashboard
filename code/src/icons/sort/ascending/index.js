import React from 'react';
import Icon from "../../base"

export default function AscendingIcon({active, onClick}){
    return(
        <Icon active={active} onClick={onClick}>
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12">
            </path>
        </Icon>
    )
}