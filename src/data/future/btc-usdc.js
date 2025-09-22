const DIRECTION = {
  OPEN: 0,
  CLOSE: 1,
};
const { CLOSE, OPEN } = DIRECTION;
const data = [
  { price: 115555, amount: 0.025, direction: OPEN },
  { price: 115000, amount: 0.030, direction: OPEN },
  { price: 114000, amount: 0.026, direction: OPEN },
  { price: 112800, amount: 0.026, direction: OPEN },
  { price: 112700, amount: 0.025, direction: OPEN, t: 1 },
  { price: 112900, amount: 0.025, direction: CLOSE, t: 1 },
  { price: 112700, amount: 0.025, direction: OPEN, t: 2 },
  { price: 112900, amount: 0.025, direction: CLOSE, t: 2 },
  { price: 112700, amount: 0.025, direction: OPEN },
  { price: 112300, amount: 0.020, direction: OPEN, t: 3 },
  { price: 112700, amount: 0.020, direction: CLOSE, t: 3 },
];
export { data };