/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import PieStorage from '../../utils/pieStorage';
// Responsible for fetching all Pies from local storage
const usePies = async () => {
  // const initialPies = [
  //   {
  //     id: '1',
  //     dates: { startDate: '2001-02-15', endDate: '2001-02-24' },
  //     income: 1500,
  //     expenses: {
  //       Shopping: [
  //         { item: 'Makeup', cost: 150 },
  //         { item: 'Nothing', cost: 20 },
  //         { item: 'Test', cost: 50 },
  //       ],
  //       Bills: [
  //         { item: 'Electricity', cost: 400 },
  //         { item: 'Gas', cost: 220 },
  //       ],
  //       Extra: [{ item: 'Something else...', cost: 40 }],
  //     },
  //   },
  //   {
  //     id: '2',
  //     dates: { startDate: '2008-02-15', endDate: '2008-02-24' },
  //     income: 1500,
  //     expenses: {
  //       Shopping: [{ item: 'Handbag', cost: 150 }],
  //       Bills: [{ item: 'Phone', cost: 40 }],
  //       Other: [{ item: 'Something else...', cost: 400 }],
  //     },
  //   },
  //   {
  //     id: '3',
  //     dates: { startDate: '2019-07-15', endDate: '2019-07-24' },
  //     income: 1500,
  //     expenses: {
  //       Shopping: [
  //         { item: 'Makeup', cost: 150 },
  //         { item: 'Nothing', cost: 20 },
  //         { item: 'Test', cost: 50 },
  //       ],
  //       Bills: [
  //         { item: 'Electricity', cost: 400 },
  //         { item: 'Gas', cost: 220 },
  //       ],
  //       Savings: [{ item: 'Saving', cost: 300 }],
  //       Extra: [{ item: 'Something else...', cost: 40 }],
  //     },
  //   },
  // ];

  const data = new PieStorage();
  const initialPies = await data.getPies();
  return { initialPies };
};

export default usePies;
