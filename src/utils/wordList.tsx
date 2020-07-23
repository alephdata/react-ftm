import React from 'react';

/*
 * https://stackoverflow.com/questions/23618744/rendering-comma-separated-list-of-links
 */
export function wordList(arr:Array<any>, sep:string) {
  if (arr.length === 0) {
    return [];
  }

  return arr.slice(1)
    .reduce((xs, x) => xs.concat([
      <span key={`${x}_sep`} className="separator">{sep}</span>,
      <span key={x}>{x}</span>
    ]), [arr[0]])
}
