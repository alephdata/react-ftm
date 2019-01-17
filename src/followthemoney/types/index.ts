import { TypeCommon } from "./TypeCommon";
import { TypeString } from "./TypeString";
import { TypeNumber } from "./TypeNumber";



function registry(typeNameFromBackend:string):FUcTypeCommon   {
    if(typeNameFromBackend === 'string'){
        return TypeString
    }
    if(typeNameFromBackend === 'number'){
        return TypeString
    }
    return TypeCommon;
}


function test(){
    const pureValue = {
        type:'string',
        name:'lastName'
    };
    const ValueType = registry(type);
    const value:ValueType = new ValueType(pureValue);

    expect(value.setMyLastName).toExist();
}