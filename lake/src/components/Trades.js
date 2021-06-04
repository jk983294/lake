import React from 'react';
import '../css/Table.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import moment from 'moment';

function rowClassNameFormat(row, rowIdx) {
   return row.Direction === '1' ? 'Green-Row' : 'Red-Row';
}

class Trades extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         trade_data: [],
      }
   }
   async fetch_data() {
      const requestOptions = {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({})
      };
      const url_ = 'http://localhost:' + this.props.global_info.lake_server_port.toString() + '/trades';
      const response = await fetch(url_, requestOptions);
      const data = await response.json();
      //console.log('fetch', data);
      if (data) {
         const arr3 = data.trades.map(p => {
            p.ts_str = moment(p.UpdateTime / 1000).format('HH:mm a');
            return p;
         });

         //console.log('arr3 ', arr3);
         this.setState({
            trade_data: arr3
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
            <BootstrapTable data={this.state.trade_data} striped
               options={{ noDataText: 'empty trade data' }}
               trClassName={rowClassNameFormat} cellEdit={{ mode: 'dbclick', blurToSave: true }} version='4'>
               <TableHeaderColumn isKey dataField='InstrumentID' dataSort={true}>Name</TableHeaderColumn>
               <TableHeaderColumn dataField='Direction'  >Direction</TableHeaderColumn>
               <TableHeaderColumn dataField='OffsetFlag' >OffsetFlag</TableHeaderColumn>
               <TableHeaderColumn dataField='TradePrice' >TradePrice</TableHeaderColumn>
               <TableHeaderColumn dataField='TradeVolume' >TradeVolume</TableHeaderColumn>
               <TableHeaderColumn dataField='ts_str' >time</TableHeaderColumn>
            </BootstrapTable>
         </div>
      )
   }
}

export default Trades;