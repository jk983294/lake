import React from 'react';
import '../css/Table.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


function percentFormatter(cell, row) {
   let val = ((Number.parseFloat(cell) * 100).toFixed(2)).toString() + '%'
   let class_name = "td-Red-Cell";
   let value = Number.parseFloat(cell);
   if (value < 0) class_name = "td-Green-Cell";
   if (Math.abs(value) < 1e-9) class_name = "";
   return (<div class={class_name}>{val}</div>);
}

function bpFormatter(cell, row) {
   let val = ((Number.parseFloat(cell) * 10000).toFixed(2)).toString() + 'bp'
   let class_name = "td-Red-Cell";
   let value = Number.parseFloat(cell);
   if (value < 0) class_name = "td-Green-Cell";
   if (Math.abs(value) < 1e-9) class_name = "";
   return (<div class={class_name}>{val}</div>);
}

function mainPdtCellFormatter(cell, row) {
   const main_pdt = cell.toUpperCase();
   const name = main_pdt + "." + row.exch;
   var url_1 = `https://finance.sina.com.cn/futures/quotes/${main_pdt}0.shtml`;
   return (<div><a href={url_1}>{name}</a></div>);
}

function pdtCellFormatter(cell, row) {
   let mat = cell % 10000;
   let name = row.pdt + mat.toString();
   let url_name = row.pdt.toUpperCase();
   if (row.exch === 'CZCE') {
      var date_ = new Date();
      var year2 = date_.getFullYear() % 100;
      var year2_first = Math.floor(year2 / 10);
      var mat2 = year2_first.toString() + mat.toString();
      url_name = url_name + mat2.toString();
   } else {
      url_name = url_name + mat.toString();
   }
   
   var url_1 = `https://finance.sina.com.cn/futures/quotes/${url_name}.shtml`;
   return (<div><a href={url_1}>{name}</a></div>);
}

class FDStats extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         stats_data: [],
      }
   }
   async fetch_data() {
      const requestOptions = {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({})
      };
      const url_ = 'http://localhost:' + this.props.global_info.lake_server_port.toString() + '/fdstats';
      const response = await fetch(url_, requestOptions);
      const data = await response.json();
      // console.log('fetch', data);
      if (data) {
         this.setState({
            stats_data: data.records
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
            <h1>fdstats page</h1>
            <BootstrapTable data={this.state.stats_data} striped
               options={{ noDataText: 'empty fd stats data' }}
               // fields = ['pdt', 'main_ukey', 'date', 'last_day_ret', 'c_oi5', 'c_oi1', 'model0', 'volume']
               cellEdit={{ mode: 'dbclick', blurToSave: true }} version='4'>
               <TableHeaderColumn isKey dataField='pdt' dataFormat={mainPdtCellFormatter} dataSort={true}>pdt</TableHeaderColumn>
               <TableHeaderColumn dataField='main_ukey' dataFormat={pdtCellFormatter} >mins</TableHeaderColumn>
               <TableHeaderColumn dataField='date' >date</TableHeaderColumn>
               <TableHeaderColumn dataField='last_day_ret' dataFormat={percentFormatter} dataSort={true}>ld_ret</TableHeaderColumn>
               <TableHeaderColumn dataField='c_oi5' dataFormat={percentFormatter} dataSort={true}>oi5</TableHeaderColumn>
               <TableHeaderColumn dataField='c_oi1' dataFormat={percentFormatter} dataSort={true}>oi1</TableHeaderColumn>
               <TableHeaderColumn dataField='trend' dataSort={true}>trend</TableHeaderColumn>
               <TableHeaderColumn dataField='model0' dataFormat={bpFormatter} dataSort={true}>model0</TableHeaderColumn>
               <TableHeaderColumn dataField='volume' dataSort={true}>volume</TableHeaderColumn>
            </BootstrapTable>
         </div>
      )
   }
}

export default FDStats;