declare module 'truncate' {
  export default function (str: string, maxLength:number, options:{
    keepImageTag: boolean,
    ellipsis: boolean | string
  }): string;
}
