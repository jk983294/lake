import React from 'react';
import '../css/Table.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

function rowClassNameFormat(row, rowIdx) {
   return rowIdx % 2 === 0 ? 'Gold-Row' : 'Silver-Row';
}

class Programs extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         program_data: [{ name: "TP", status: true }, { name: "DP", status: true }],
      }
   }
   render() {
      return (
         <div>
            <h1>programs page</h1>
            <h1>programs page</h1>
            <BootstrapTable data={this.state.program_data} trClassName={rowClassNameFormat}>
               <TableHeaderColumn isKey dataField='name'></TableHeaderColumn>
               <TableHeaderColumn dataField='status'></TableHeaderColumn>
            </BootstrapTable>
         </div>
      )
   }
}

export default Programs;