import React from "react";

export default function DataTable({items, renderHead, renderRow}){
    return (
    <table>
        <thead>
            <tr>
                {
                    renderHead()
                }
            </tr>
        </thead>

        <tbody>
            {
                items.map((row) => renderRow(row))
            }
        </tbody>
    </table>
    )
};