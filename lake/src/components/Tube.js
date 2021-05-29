import React from 'react';
import '../css/Table.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

function rowClassNameFormat(row, rowIdx) {
   return row.usage < 0.6 ? 'Green-Row' : 'Red-Row';
}

class Tube extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         channel_data: [],
      }
   }
   async fetch_data() {
      const requestOptions = {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({})
      };
      const response = await fetch('http://localhost:30010/tube', requestOptions);
      const data = await response.json();
      //console.log('fetch', data);
      if (data) {
         const arr3 = data.channels.map(p => {
            p.usage_str = (Math.round(p.usage * 10000) / 100).toString() + "%";
            return p;
         });

         //console.log('arr3 ', arr3);
         this.setState({
            channel_data: arr3
         });
      }
   }
   componentDidMount() {
      this.fetch_data();
      this.timerID = setInterval(
         () => this.fetch_data(),
         45000
      );
   }

   componentWillUnmount() {
      clearInterval(this.timerID);
      this.timerID = null;
   }
   render() {
      return (
         <div>
            <h1>tube page</h1>
            <BootstrapTable data={this.state.channel_data} striped
               options={{ noDataText: 'empty channel data' }}
               trClassName={rowClassNameFormat} cellEdit={{ mode: 'dbclick', blurToSave: true }} version='4'>
               <TableHeaderColumn isKey dataField='name' dataSort={true}>Name</TableHeaderColumn>
               <TableHeaderColumn dataField='total'  >total</TableHeaderColumn>
               <TableHeaderColumn dataField='last_idx' >last_idx</TableHeaderColumn>
               <TableHeaderColumn dataField='usage_str' >usage</TableHeaderColumn>
            </BootstrapTable>
         </div>
      )
   }
}

export default Tube;