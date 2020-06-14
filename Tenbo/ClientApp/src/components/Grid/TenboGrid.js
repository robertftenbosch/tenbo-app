import React, {Component, useEffect, useState} from 'react';
import '../../App.css';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

function TenboGrid(props) {
    const [columnDefs, setColumnDefs] = useState([]);
    const [rowData, setRowData] = useState([]);
    useEffect(() => {
        setColumnDefs([{
            headerName: "Make", field: "make", sortable: true, filter: true
        }, {
            headerName: "Model", field: "model", sortable: true, filter: true
        }, {
            headerName: "Price", field: "price", sortable: true, filter: true
        }]);

        fetch('https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/sample-data/smallRowData.json')
            .then(result => result.json())
            .then(rowData => setRowData(rowData));

        // setRowData([{
        //     make: "Toyota", model: "Celica", price: 39000
        // }, {
        //     make: "Ford", model: "Mondeo", price: 39000
        // }, {
        //     make: "Porsche", model: "Boxter", price: 79000
        // }]);

    }, []);


    return (
        <div
            className="ag-theme-alpine"
            style={{
                height: '250px',
                width: '600px'
            }}
        >
            <AgGridReact
                columnDefs={columnDefs}
                rowData={rowData}>
            </AgGridReact>
        </div>
    );
}

export default TenboGrid;