import React, { Component } from 'react'
import yoga from './yoga.png'
import './App.css'
import Item from './Item'
// import gql from 'graphql-tag'
// import { graphql } from 'react-apollo'
import { useQuery, gql } from '@apollo/client';

// const getProperties = gql`
//   query GetExchangeRates {
//     rates(currency: "USD") {
//       currency
//       rate
//     }
//   }
// `;

const getProperties = gql`
  query getProperties {
    getProperties(area: "宝山", pageNumber: 1, pageSize: 100, name: "好") {
      date
      area
      village
      description
      room
      size
      price
    }
  }
`

export default function App() {
  // console.log(this.props)
  const { loading, error, data } = useQuery(getProperties);
  console.log('loading: ', loading);
  console.log('data: ', data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.getProperties.map(({ 
    date,
    area,
    village,
    description,
    room,
    size,
    price,
  }) => (
    <div key={description}>
      <p>
        date: { date }
        area: { area }
        village: { village }
        description: { description }
        room: { room }
        size: { size }
        price: { price }
      </p>
    </div>
  ));
}

// class App extends Component {
//   render() {
//     console.log(this.props)

//     if (this.props.data.loading) {
//       return <div>Loading</div>
//     }

//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={yoga} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to <code>graphql-yoga</code></h1>
//         </header>
//         <div className="App-intro">
//           <ul>
//             {this.props.data.items && this.props.data.items.map((item, index) => {
//               return <li key={index}><Item name={item.name} /></li>
//             })}
//           </ul>
//         </div>
//       </div>
//     )
//   }
// }

// const ITEMS_QUERY = gql`
//   query ItemsQuery {
//     items {
//       name
//     }
//   }
// `

// export default graphql(ITEMS_QUERY)(App)