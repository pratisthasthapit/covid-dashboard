import React from 'react';
import Icon from "../../base"

export default function DescendingIcon({active, onClick}){
    return(
        <Icon active={active} onClick={onClick}>
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4">
            </path>
        </Icon>
    )
}