/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
// Responsible for fetching all Pies from local storage
const usePies = () => {
  const data = [
    {
      weekStart: '13-11-2001',
      income: 1500,
      expenses: {
        Shopping: [
          { item: 'Makeup', cost: 150 },
          { item: 'Nothing', cost: 20 },
          { item: 'Test', cost: 50 },
        ],
        Bills: [
          { item: 'Electricity', cost: 400 },
          { item: 'Gas', cost: 220 },
        ],
        Extra: [{ item: 'Something else...', cost: 40 }],
      },
    },
    {
      weekStart: '12-11-1990',
      income: 1500,
      expenses: {
        Shopping: [{ item: 'Handbag', cost: 150 }],
        Bills: [{ item: 'Phone', cost: 40 }],
        Other: [{ item: 'Something else...', cost: 400 }],
      },
    },
    {
      weekStart: '13-11-2001',
      income: 1500,
      expenses: {
        Shopping: [
          { item: 'Makeup', cost: 150 },
          { item: 'Nothing', cost: 20 },
          { item: 'Test', cost: 50 },
        ],
        Bills: [
          { item: 'Electricity', cost: 400 },
          { item: 'Gas', cost: 220 },
        ],
        Savings: [{ item: 'Saving', cost: 300 }],
        Extra: [{ item: 'Something else...', cost: 40 }],
      },
    },
  ];

  const [pies, setPies] = useState(data);

  const addPie = (newPie) => {
    setPies([...pies, newPie]);
  };

  return { pies, addPie };
};

export default usePies;
