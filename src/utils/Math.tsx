export const Lerp = (start: number, end: number, amt: number) => {
  return (1 - amt) * start + amt * end;
};
