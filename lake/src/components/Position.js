import React from 'react';
import '../css/Table.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import moment from 'moment';

function rowClassNameFormat(row, rowIdx) {
   return row.pos < 0 ? 'Green-Row' : 'Red-Row';
}

class Position extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         pos_data: [],
      }
   }
   async fetch_data() {
      const requestOptions = {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({})
      };
      const url_ = 'http://localhost:' + this.props.global_info.lake_server_port.toString() + '/position';
      const response = await fetch(url_, requestOptions);
      const data = await response.json();
      //console.log('fetch', data);
      if (data) {
         const arr3 = data.position.map(p => {
            if (p.last_ts > 0) {
               p.last_ts_str = moment(p.last_ts / 1000).format('HH:mm a');
            } else {
               p.last_ts_str = 'NA';
            }
            return p;
         });

         //console.log('arr3 ', arr3);
         this.setState({
            pos_data: arr3
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
            <h1>pos page</h1>
            <BootstrapTable data={this.state.pos_data} striped
               options={{ noDataText: 'empty pos data' }}
               trClassName={rowClassNameFormat} cellEdit={{ mode: 'dbclick', blurToSave: true }} version='4'>
               <TableHeaderColumn isKey dataField='ins' dataSort={true}>Name</TableHeaderColumn>
               <TableHeaderColumn dataField='pos'  >pos</TableHeaderColumn>
               <TableHeaderColumn dataField='price' >price</TableHeaderColumn>
               <TableHeaderColumn dataField='last_ts_str' >last_ts</TableHeaderColumn>
            </BootstrapTable>
         </div>
      )
   }
}

export default Position;