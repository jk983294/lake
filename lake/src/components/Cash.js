import React from 'react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Label } from 'recharts';
import moment from 'moment';

class Cash extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         cash_data: [],
         last_ts: -1
      }
   }
   async fetch_data() {
      const requestOptions = {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ last_ts: this.state.last_ts })
      };
      const response = await fetch('http://localhost:30010/cash', requestOptions);
      const data = await response.json();
      //console.log('fetch', data);
      if (data) {
         const arr3 = this.state.cash_data.concat(data.totals.map((item, i) =>
            Object.assign({ totals: item, time: data.times[i] / 1000. })));
         let last_ts_ = this.state.last_ts;
         if (data.times.length > 0) {
            //console.log('fetch', data.times.length, data.times[data.times.length - 1]);
            last_ts_ = data.times[data.times.length - 1];
         }

         this.setState({
            cash_data: arr3,
            last_ts: last_ts_
         });
      }

   }
   componentDidMount() {
      this.fetch_data();
      this.timerID = setInterval(
         () => this.fetch_data(),
         5000
      );
   }

   componentWillUnmount() {
      clearInterval(this.timerID);
      this.timerID = null;
   }
   render() {
      return (
         <div>
            <h1>Cash</h1>
            <ResponsiveContainer width="99%" height={800}>
               <LineChart data={this.state.cash_data}
                  margin={{ top: 30, right: 30, bottom: 30, left: 30 }} >
                  <Line type="natural" dot={false} dataKey="totals" stroke="#8884d8" />
                  <CartesianGrid stroke="#ccc" />
                  <Tooltip />

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
                        value={"Totals"}
                        position="left"
                        angle={-90}
                        style={{ textAnchor: "middle" }}
                     />
                  </YAxis>
               </LineChart>
            </ResponsiveContainer>
         </div>
      )
   }
}

export default Cash;