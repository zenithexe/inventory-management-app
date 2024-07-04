'use client'
import React from 'react'
import DataTable from './DataTable'

function InventoryPage() {

  const data = [
      {
        itemId: 1,
        name: "Jalish",
        category:"B",
        quantity: 60,
        price: 100
      },
      {
        itemId: 2,
        name: "Ricku",
        category:"C",
        quantity: 50,
        price: 101
      },
      {
        itemId: 1,
        name: "Ricku",
        category:"A",
        quantity: 40,
        price: 120
      },
      {
        itemId: 2,
        name: "Ricku",
        category:"B",
        quantity: 30,
        price: 130
      },
      {
        itemId: 1,
        name: "Ricku",
        category:"N",
        quantity: 20,
        price: 150
      },
      {
        itemId: 2,
        name: "Ricku",
        category:"A",
        quantity: 10,
        price: 100
      },
      {
        itemId: 1,
        name: "Ricku",
        category:'Z',
        quantity: 10,
        price: 100
      },
    ];

    const category= ['A','B','C','Z','N','T','R']
  return (
    <div>
        <DataTable data={data} category={category}/>
    </div>
  )
}

export default InventoryPage
