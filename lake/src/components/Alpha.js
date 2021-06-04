import React from 'react';
import '../css/Table.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Label } from 'recharts';
import moment from 'moment';

function rowClassNameFormat(row, rowIdx) {
   return row.curr_alpha < 0 ? 'Green-Row' : 'Red-Row';
}

function absSortFunc(a, b, order) {   // order is desc or asc
   //console.log('absSortFunc', a, b, order);
   if (order === 'desc') {
      return Math.abs(a.curr_alpha) - Math.abs(b.curr_alpha);
   } else {
      return Math.abs(b.curr_alpha) - Math.abs(a.curr_alpha);
   }
}

class Alpha extends React.Component {
   constructor(props) {
      super(props);
      this.AlphaRowDoubleClick = this.AlphaRowDoubleClick.bind(this);
      this.state = {
         alpha_data: [],
         ts: [],
         plot_data: [],
         plot_ins: ''
      }
   }
   async fetch_data() {
      const requestOptions = {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({})
      };
      const url_ = 'http://localhost:' + this.props.global_info.lake_server_port.toString() + '/alpha';
      const response = await fetch(url_, requestOptions);
      const data = await response.json();
      //console.log('fetch', data);
      if (data) {
         const arr3 = data.alpha.ins_alpha.map((ins_a) => {
            const plot_data = ins_a.alpha.map((item, i) => Object.assign({ alpha: item, time: data.alpha.ts[i] * 1000. }));
            ins_a.plot_data = plot_data;
            return ins_a;
         }
         );

         //console.log('arr3 ', arr3);
         this.setState({
            alpha_data: arr3,
            ts: data.alpha.ts
         });
      }
   }
   AlphaRowDoubleClick(row) {
      //console.log('You double click row', row);
      //console.log(this.state.ts);
      this.setState({
         plot_data: row.plot_data,
         plot_ins: row.ins
      });
   }
   componentDidMount() {
      this.fetch_data();
      this.timerID = setInterval(
         () => this.fetch_data(),
         55000
      );
   }

   componentWillUnmount() {
      clearInterval(this.timerID);
      this.timerID = null;
   }
   render() {
      return (
         <div>
            <h1>alpha page</h1>
            <ResponsiveContainer width="99%" height={300}>
               <LineChart data={this.state.plot_data}
                  margin={{ top: 30, right: 30, bottom: 30, left: 30 }} >
                  <Line type="natural" dot={false} dataKey="alpha" stroke="#8884d8" />
                  <CartesianGrid stroke="#ccc" />
                  <Tooltip labelFormatter={function (unixTime) {
                     return moment(unixTime).format('HH:mm a');
                  }} />

                  <XAxis type="number" dataKey="time" domain={['dataMin', 'dataMax']}
                     tickFormatter={(unixTime) => moment(unixTime).format('HH:mm a')}>
                     <Label
                        value={"Time"}
                        position="bottom"
                        style={{ textAnchor: "middle" }}
                     />
                  </XAxis>
                  <YAxis domain={["auto", "auto"]}>
                     <Label
                        value={this.state.plot_ins + " Totals"}
                        position="left"
                        angle={-90}
                        style={{ textAnchor: "middle" }}
                     />
                  </YAxis>
               </LineChart>
            </ResponsiveContainer>

            <BootstrapTable data={this.state.alpha_data} striped
               options={{ noDataText: 'empty alpha data', onRowDoubleClick: this.AlphaRowDoubleClick }}
               trClassName={rowClassNameFormat} version='4'>
               <TableHeaderColumn isKey dataField='ins' dataSort>ins</TableHeaderColumn>
               <TableHeaderColumn dataField='curr_alpha' dataSort={true} sortFunc={absSortFunc}  >curr_alpha</TableHeaderColumn>
            </BootstrapTable>
         </div>
      )
   }
}

export default Alpha;