import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

class Cash extends React.Component {
   render() {
      return (
         <div>
            <h1>cash page</h1>
            <div>
               <LineChart width={600} height={300} data={this.props.cash_data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }} >
               <Line type="monotone" dataKey="uv" stroke="#8884d8" />
               <CartesianGrid stroke="#ccc" />
               <XAxis dataKey="name" />
               <YAxis />
               <Tooltip />
               </LineChart>;
            </div>
         </div>
      )
   }
}

export default Cash;