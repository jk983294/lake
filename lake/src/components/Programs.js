import React from 'react';
import '../css/Table.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import moment from 'moment';

function rowClassNameFormat(row, rowIdx) {
   return row.status ? 'Green-Row' : 'Red-Row';
}

class Programs extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         program_data: [],
      }
   }
   async fetch_data() {
      const requestOptions = {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({})
      };
      const url_ = 'http://localhost:' + this.props.global_info.lake_server_port.toString() + '/programs';
      const response = await fetch(url_, requestOptions);
      const data = await response.json();
      //console.log('fetch', data);
      if (data) {
         const arr3 = data.programs.map(p => {
            if (p.start_time > 0) {
               p.start_time_str = moment(p.start_time / 1000).format('HH:mm a');
            } else {
               p.start_time_str = 'NA';
            }
            return p;
         });

         //console.log('arr3 ', arr3);
         this.setState({
            program_data: arr3
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
            <h1>programs page</h1>
            <BootstrapTable data={this.state.program_data} striped
               options={{ noDataText: 'empty program data' }}
               trClassName={rowClassNameFormat} cellEdit={{ mode: 'dbclick', blurToSave: true }} version='4'>
               <TableHeaderColumn isKey dataField='tag' dataSort={true}>Name</TableHeaderColumn>
               <TableHeaderColumn dataField='status' width='80' >Status</TableHeaderColumn>
               <TableHeaderColumn dataField='pid' width='80' >PID</TableHeaderColumn>
               <TableHeaderColumn dataField='start_time_str' width='100' >start_time</TableHeaderColumn>
               <TableHeaderColumn dataField='log_file' width='400'>log</TableHeaderColumn>
               <TableHeaderColumn dataField='cmdline' width='450' >cmd</TableHeaderColumn>
            </BootstrapTable>
         </div>
      )
   }
}

export default Programs;