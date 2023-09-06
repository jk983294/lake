import React from 'react';
import '../css/Table.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

function percentFormatter(cell, row) {
   let val = ((Number.parseFloat(cell) * 100).toFixed(2)).toString() + '%'
   return `${val}`;
}

function floatFormatter(cell, row) {
   let val = ((Number.parseFloat(cell)).toFixed(2)).toString()
   return `${val}`;
}

function intFormatter(cell, row) {
   let val = Math.floor(cell).toString()
   return `${val}`;
}

function linkCellFormatter(cell, row) {
   const words = cell.split('.');
   let val = 'SZ' + words[0];
   if (words[1] == 'SSE') {
      val = 'SH' + words[0];
   }
   var url_1 = `https://xueqiu.com/S/${val}`;
   //console.log(words, val);
   return (<div><a href={url_1}>{cell}</a></div>);
}

class Jsl extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         jsl_data: [],
      }
   }
   async fetch_data() {
      const requestOptions = {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({})
      };
      const url_ = 'http://localhost:' + this.props.global_info.lake_server_port.toString() + '/jsl';
      const response = await fetch(url_, requestOptions);
      const data = await response.json();
      if (data) {
         this.setState({
            jsl_data: data.records
         });
      }
   }
   componentDidMount() {
      console.log('componentDidMount ');
      this.fetch_data();
   }

   componentWillUnmount() {
      console.log('componentWillUnmount ');
   }
   render() {
      return (
         <div>
            <h1>jsl page</h1>
            <BootstrapTable data={this.state.jsl_data} striped
               options={{ noDataText: 'empty jsl data' }}
               cellEdit={{ mode: 'dbclick', blurToSave: true }} version='4'>
               <TableHeaderColumn isKey dataField='code' dataFormat={linkCellFormatter}>code</TableHeaderColumn>
               <TableHeaderColumn dataField='name' >name</TableHeaderColumn>
               <TableHeaderColumn dataField='price' width="70" dataSort={true} >price</TableHeaderColumn>
               <TableHeaderColumn dataField='market_value' dataFormat={intFormatter} width="50" dataSort={true} >mv</TableHeaderColumn>
               <TableHeaderColumn dataField='pettm' dataFormat={floatFormatter} width="55" dataSort={true}>pettm</TableHeaderColumn>
               <TableHeaderColumn dataField='pe_temp' dataFormat={floatFormatter} width="55" dataSort={true}>pe_temp</TableHeaderColumn>
               <TableHeaderColumn dataField='pb' dataFormat={floatFormatter} width="50" dataSort={true}>pb</TableHeaderColumn>
               <TableHeaderColumn dataField='pb_temp' dataFormat={floatFormatter} width="55" dataSort={true}>pb_temp</TableHeaderColumn>
               <TableHeaderColumn dataField='dividend_ratio_5y' dataFormat={percentFormatter} width="55" dataSort={true}>dividend5y</TableHeaderColumn>
               <TableHeaderColumn dataField='roe_ratio_5y' dataFormat={percentFormatter} width="75" dataSort={true}>roe5y</TableHeaderColumn>
               <TableHeaderColumn dataField='revenue_growth_5y' dataFormat={percentFormatter} width="70" dataSort={true}>revenue5y</TableHeaderColumn>
               <TableHeaderColumn dataField='profit_growth_5y' dataFormat={percentFormatter} width="70" dataSort={true}>profit5y</TableHeaderColumn>
               <TableHeaderColumn dataField='money_flow_5y' dataFormat={percentFormatter} width="70" dataSort={true}>mf_5y</TableHeaderColumn>
               <TableHeaderColumn dataField='industry' dataSort={true}>ind</TableHeaderColumn>
               <TableHeaderColumn dataField='region' width="50" dataSort={true}>region</TableHeaderColumn>
               <TableHeaderColumn dataField='cnt' width="40" dataSort={true}>cnt</TableHeaderColumn>
               <TableHeaderColumn dataField='min_cob' dataSort={true}>min_cob</TableHeaderColumn>
            </BootstrapTable>
         </div>
      )
   }
}

export default Jsl;