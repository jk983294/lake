import React from 'react';
import '../css/Table.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import moment from 'moment';

function rowClassNameFormat(row, rowIdx) {
   return row.dir < 0 ? 'Green-Row' : 'Red-Row';
}

function percentFormatter(cell, row) {
   let val = ((Number.parseFloat(cell) * 100).toFixed(2)).toString() + '%'
   let class_name = "td-Red-Cell";
   let value = Number.parseFloat(cell);
   if (value < 0) class_name = "td-Green-Cell";
   if (Math.abs(value) < 1e-9) class_name = "";
   return (<div class={class_name}>{val}</div>);
}

function dirFormatter(cell, row) {
   let value = Number.parseFloat(cell);
   let class_name = "";
   if (value < -1e-9) class_name = "td-Green-Cell";
   else if (value > 1e-9) class_name = "td-Red-Cell";
   return (<div class={class_name}>{cell}</div>);
}

function mainPdtCellFormatter(cell, row) {
   const words = cell.split('.');
   const main_pdt = words[0].toUpperCase();
   var url_1 = `https://finance.sina.com.cn/futures/quotes/${main_pdt}0.shtml`;
   return (<div><a href={url_1}>{cell}</a></div>);
}

function pdtCellFormatter(cell, row) {
   const lets = row.ins.split('.');
   const pdt_ = lets[0];
   const exch_ = lets[1];
   var _ins = cell.toUpperCase();
   let mat1 = 0, year1 = 0, month1 = 0;
   if (exch_ === 'CZCE') {
      mat1 = parseInt(_ins.slice(-3));
      var pdt1 = _ins.slice(0, -3);
      year1 = Math.floor(mat1 / 100);
      month1 = mat1 % 100;
      var date_ = new Date();
      var year2 = date_.getFullYear() % 100;
      var year2_first = Math.floor(year2 / 10);
      var mat2 = year2_first.toString() + mat1.toString();
      _ins = pdt1 + mat2;
      //console.log(_ins, pdt1, mat1, mat2, year2, year2_first);
   }
   var url_1 = `https://finance.sina.com.cn/futures/quotes/${_ins}.shtml`;
   return (<div><a href={url_1}>{cell}</a></div>);
}

class Strats extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         strats_data: [],
      }
   }
   async fetch_data() {
      const requestOptions = {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({})
      };
      const url_ = 'http://localhost:' + this.props.global_info.lake_server_port.toString() + '/strats';
      const response = await fetch(url_, requestOptions);
      const data = await response.json();
      // console.log('fetch', data);
      if (data) {
         this.setState({
            strats_data: data.records
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
            <h1>strats page</h1>
            <BootstrapTable data={this.state.strats_data} striped
               options={{ noDataText: 'empty strats data' }}
               // trClassName={rowClassNameFormat} 
               cellEdit={{ mode: 'dbclick', blurToSave: true }} version='4'>
               <TableHeaderColumn isKey dataField='ins' dataFormat={mainPdtCellFormatter} dataSort={true}>Name</TableHeaderColumn>
               <TableHeaderColumn dataField='mins' dataFormat={pdtCellFormatter} >mins</TableHeaderColumn>
               <TableHeaderColumn dataField='start_obv_di' >so_di</TableHeaderColumn>
               <TableHeaderColumn dataField='end_obv_di' >eo_di</TableHeaderColumn>
               <TableHeaderColumn dataField='hold_len' width="55" >len</TableHeaderColumn>
               <TableHeaderColumn dataField='day0' >day0</TableHeaderColumn>
               <TableHeaderColumn dataField='day1' >day1</TableHeaderColumn>
               <TableHeaderColumn dataField='obv_ret' dataFormat={percentFormatter} >obv_ret</TableHeaderColumn>
               <TableHeaderColumn dataField='max_drop_ratio' dataFormat={percentFormatter} >drop_ratio</TableHeaderColumn>
               <TableHeaderColumn dataField='ret' dataFormat={percentFormatter} >ret</TableHeaderColumn>
               <TableHeaderColumn dataField='ld_ret' dataFormat={percentFormatter} >ld_ret</TableHeaderColumn>
               <TableHeaderColumn dataField='dir' width="55" dataFormat={dirFormatter} >dir</TableHeaderColumn>
               <TableHeaderColumn dataField='sid' width="55" >sid</TableHeaderColumn>
               <TableHeaderColumn dataField='trend' width="55" >trend</TableHeaderColumn>
               <TableHeaderColumn dataField='c_oi5' dataFormat={percentFormatter} >oi5</TableHeaderColumn>
               <TableHeaderColumn dataField='c_oi1' dataFormat={percentFormatter} >oi1</TableHeaderColumn>
            </BootstrapTable>
         </div>
      )
   }
}

export default Strats;