import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
  selectCountData,
} from './counterSlice';
import styles from './Counter.module.css';

export function Counter() {
  const countData = useAppSelector(selectCountData);
  const dispatch = useAppDispatch();

  return (
    <div>
        <h3> Exchanges </h3>
        <ul>{countData.map(d => <li key={d.id}>{d.name}</li>)}</ul>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync())}
        >
          Fetch Exchanges
        </button>
    </div>
  );
}
