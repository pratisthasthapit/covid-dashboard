import React from 'react';
import SortAscIcon from '../../icons/sort/ascending'
import SortDescIcon from '../../icons/sort/descending';

export default function Tr({
    sortedBy,
    sort, 
    label
    }){

    function changeSort(direction){
        sort.changer((prev) => ({
            ...prev,
            sortedBy: {
                [sort.key]: direction,
            },
        }));
    }

    return  (
        <th>
            <div className='flex-container'>
                <div className='flex-full'>{label}</div>
                {sortedBy ? (
                    <div>
                        <SortAscIcon 
                            active={sortedBy && sortedBy[sort.key] === 'ascending'} 
                            onClick={() => changeSort('ascending')}
                        />
                        <SortDescIcon 
                            active={sortedBy && sortedBy[sort.key] === 'descending'} 
                            onClick={() => changeSort('descending')}
                        />
                    </div>
                ) : null}
            </div>
        </th> 
    )
}