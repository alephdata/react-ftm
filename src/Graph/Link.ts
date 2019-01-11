export interface ILinkDatum {
    source:any,
    target:any,
    id:any,
    value:any
}

interface ILinkConfiguration {
    linkDatum:ILinkDatum
}
export default class Link{
    constructor(configuration:ILinkConfiguration){

    }
}