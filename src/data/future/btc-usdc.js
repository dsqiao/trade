const DIRECTION = {
  OPEN: 0,
  CLOSE: 1,
};
const { CLOSE, OPEN } = DIRECTION;
const data = [
  { date: '2025.9.20', price: 115555, amount: 0.025, direction: OPEN },
  { date: '2025.9.22', price: 115000, amount: 0.030, direction: OPEN },
  { date: '2025.9.22', price: 114000, amount: 0.026, direction: OPEN },
  { date: '2025.9.22', price: 112800, amount: 0.026, direction: OPEN },
  { date: '2025.9.22', price: 112700, amount: 0.025, direction: OPEN, t: 1 },
  { date: '2025.9.22', price: 112900, amount: 0.025, direction: CLOSE, t: 1 },
  { date: '2025.9.23', price: 112700, amount: 0.025, direction: OPEN, t: 2 },
  { date: '2025.9.23', price: 112900, amount: 0.025, direction: CLOSE, t: 2 },
  { date: '2025.9.23', price: 112700, amount: 0.025, direction: OPEN, t: 5 },
  { date: '2025.9.23', price: 112300, amount: 0.020, direction: OPEN, t: 3 },
  { date: '2025.9.23', price: 112700, amount: 0.020, direction: CLOSE, t: 3 },
  { date: '2025.9.23', price: 112500, amount: 0.025, direction: OPEN, t: 4 },
  { date: '2025.9.23', price: 112200, amount: 0.026, direction: OPEN, t: 4 },
  { date: '2025.9.23', price: 112000, amount: 0.022, direction: OPEN },
  { date: '2025.9.23', price: 112700, amount: 0.051, direction: CLOSE, t: 4 },
  { date: '2025.9.23', price: 113000, amount: 0.025, direction: CLOSE, t: 5 },
  { date: '2025.9.23', price: 112750, amount: 0.025, direction: OPEN, },
  { date: '2025.9.23', price: 112400, amount: 0.025, direction: OPEN },
  { date: '2025.9.23', price: 112000, amount: 0.025, direction: OPEN, t: 6 },
  { date: '2025.9.23', price: 112250, amount: 0.025, direction: CLOSE, t: 6 },
];
export { data };