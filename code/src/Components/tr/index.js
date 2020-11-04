import React from 'react';
import SortAscIcon from '../../icons/sort/ascending'
import SortDescIcon from '../../icons/sort/descending';

export default function Tr({sortable = false, label}){
    return  (
        <th>
            <div className='flex-container'>
                <div className='flex-full'>{label}</div>
                {
                    sortable ? (<div>
                        <SortAscIcon active />
                        <SortDescIcon/>
                    </div>
                ) : null}
            </div>
        </th> 
    )
}