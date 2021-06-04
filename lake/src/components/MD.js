import React from 'react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Label } from 'recharts';
import moment from 'moment';
import { Form, Button, Row, Col } from 'react-bootstrap';

class MD extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         plot_data: [],
         ins: ''
      };
      this.updateIns = this.updateIns.bind(this);
      this.fetch_data = this.fetch_data.bind(this);
   }
   updateIns(e) {
      this.setState({ ins: e.target.value });
   }
   async fetch_data() {
      const requestOptions = {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ ins: this.state.ins })
      };
      const url_ = 'http://localhost:' + this.props.global_info.lake_server_port.toString() + '/md';
      const response = await fetch(url_, requestOptions);
      const data = await response.json();
      //console.log('fetch', data);
      if (data) {
         const arr3 = data.md.prices.map((item, i) =>
            Object.assign({ price: item, time: data.md.ts[i] / 1000. }));

         //console.log('arr3 ', arr3);
         this.setState({
            plot_data: arr3
         });
      }
   }
   render() {
      return (
         <div>
            <h1>md page</h1>
            <Form>
               <Row>
                  <Col>
                     <Form.Control placeholder="Instrument" value={this.state.ins} onChange={this.updateIns} />
                  </Col>
                  <Col>
                     <Button variant="primary" onClick={this.fetch_data} >Fetch</Button>
                  </Col>
               </Row>
            </Form>

            <ResponsiveContainer width="99%" height={800}>
               <LineChart data={this.state.plot_data}
                  margin={{ top: 30, right: 30, bottom: 30, left: 30 }} >
                  <Line type="natural" dot={false} dataKey="price" stroke="#8884d8" />
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
                        value={this.state.ins + " Price"}
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

export default MD;