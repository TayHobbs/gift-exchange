// A mock function to mimic making an async request for data
export function fetchCount() {
    return fetch('exchanges');
  // return new Promise<{ data: number }>((resolve) =>
  //   setTimeout(() => resolve({ data: amount }), 500)
  // );
}