import { TypeCommon } from "./TypeCommon";
import { TypeString } from "./TypeString";



function registry(typeNameFromBackend:string):any   {
    if(typeNameFromBackend === 'string'){
        return TypeString
    }
    if(typeNameFromBackend === 'number'){
        return TypeString
    }
    return TypeCommon;
}

