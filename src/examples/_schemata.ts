import {ISchemataDatum} from "../followthemoney/model";

export const schemata:ISchemataDatum = {
    "Representation": {
        "label": "Representation",
        "plural": "Representation",
        "uri": "https://w3id.org/ftm#Representation",
        "schemata": ["Representation", "Interval", "Interest"],
        "extends": ["Interest"],
        "abstract": false,
        "matchable": false,
        "description": "A mediatory, intermediary, middleman, or broker acting on behalf of a legal entity.",
        "featured": ["agent", "client", "role"],
        "properties": {
            "agent": {
                "name": "agent",
                "qname": "Representation:agent",
                "label": "Agent",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Representation:agent",
                "type": "entity",
                "schema": "LegalEntity",
                "reverse": "agencyClient"
            },
            "client": {
                "name": "client",
                "qname": "Representation:client",
                "label": "Client",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Representation:client",
                "type": "entity",
                "schema": "LegalEntity",
                "reverse": "agentRepresentation"
            },
            "role": {
                "name": "role",
                "qname": "Interest:role",
                "label": "Role",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interest:role",
                "type": "string"
            },
            "status": {
                "name": "status",
                "qname": "Interest:status",
                "label": "Status",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interest:status",
                "type": "string"
            },
            "startDate": {
                "name": "startDate",
                "qname": "Interval:startDate",
                "label": "Start date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:startDate",
                "type": "date"
            },
            "endDate": {
                "name": "endDate",
                "qname": "Interval:endDate",
                "label": "End date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:endDate",
                "type": "date"
            },
            "date": {
                "name": "date",
                "qname": "Interval:date",
                "label": "Date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:date",
                "type": "date"
            },
            "summary": {
                "name": "summary",
                "qname": "Interval:summary",
                "label": "Summary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:summary",
                "type": "text"
            },
            "recordId": {
                "name": "recordId",
                "qname": "Interval:recordId",
                "label": "Record ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:recordId",
                "type": "string"
            },
            "sourceUrl": {
                "name": "sourceUrl",
                "qname": "Interval:sourceUrl",
                "label": "Source URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:sourceUrl",
                "type": "url"
            },
            "alephUrl": {
                "name": "alephUrl",
                "qname": "Interval:alephUrl",
                "label": "Aleph URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:alephUrl",
                "type": "url"
            },
            "modifiedAt": {
                "name": "modifiedAt",
                "qname": "Interval:modifiedAt",
                "label": "Modified on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:modifiedAt",
                "type": "date"
            },
            "retrievedAt": {
                "name": "retrievedAt",
                "qname": "Interval:retrievedAt",
                "label": "Retrieved on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:retrievedAt",
                "type": "date"
            }
        }
    },
    "Value": {
        "label": "Value",
        "plural": "Value",
        "uri": "https://w3id.org/ftm#Value",
        "schemata": ["Value"],
        "extends": [],
        "abstract": true,
        "matchable": false,
        "description": null,
        "featured": [],
        "properties": {
            "amount": {
                "name": "amount",
                "qname": "Value:amount",
                "label": "Amount",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:amount",
                "type": "number"
            },
            "currency": {
                "name": "currency",
                "qname": "Value:currency",
                "label": "Currency",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:currency",
                "type": "string"
            },
            "amountUsd": {
                "name": "amountUsd",
                "qname": "Value:amountUsd",
                "label": "Amount in USD",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:amountUsd",
                "type": "number"
            },
            "amountEur": {
                "name": "amountEur",
                "qname": "Value:amountEur",
                "label": "Amount in EUR",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:amountEur",
                "type": "number"
            }
        }
    },
    "Interval": {
        "label": "Interval",
        "plural": "Interval",
        "uri": "https://w3id.org/ftm#Interval",
        "schemata": ["Interval"],
        "extends": [],
        "abstract": false,
        "matchable": false,
        "description": null,
        "featured": ["startDate", "endDate"],
        "properties": {
            "startDate": {
                "name": "startDate",
                "qname": "Interval:startDate",
                "label": "Start date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:startDate",
                "type": "date"
            },
            "endDate": {
                "name": "endDate",
                "qname": "Interval:endDate",
                "label": "End date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:endDate",
                "type": "date"
            },
            "date": {
                "name": "date",
                "qname": "Interval:date",
                "label": "Date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:date",
                "type": "date"
            },
            "summary": {
                "name": "summary",
                "qname": "Interval:summary",
                "label": "Summary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:summary",
                "type": "text"
            },
            "recordId": {
                "name": "recordId",
                "qname": "Interval:recordId",
                "label": "Record ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:recordId",
                "type": "string"
            },
            "sourceUrl": {
                "name": "sourceUrl",
                "qname": "Interval:sourceUrl",
                "label": "Source URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:sourceUrl",
                "type": "url"
            },
            "alephUrl": {
                "name": "alephUrl",
                "qname": "Interval:alephUrl",
                "label": "Aleph URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:alephUrl",
                "type": "url"
            },
            "modifiedAt": {
                "name": "modifiedAt",
                "qname": "Interval:modifiedAt",
                "label": "Modified on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:modifiedAt",
                "type": "date"
            },
            "retrievedAt": {
                "name": "retrievedAt",
                "qname": "Interval:retrievedAt",
                "label": "Retrieved on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:retrievedAt",
                "type": "date"
            }
        }
    },
    "RealEstate": {
        "label": "Real estate",
        "plural": "Real estates",
        "uri": "https://w3id.org/ftm#RealEstate",
        "schemata": ["RealEstate", "Value", "Asset", "Thing"],
        "extends": ["Asset"],
        "abstract": false,
        "matchable": false,
        "description": "A piece of land or property.",
        "featured": ["registrationNumber", "address", "country"],
        "properties": {
            "latitude": {
                "name": "latitude",
                "qname": "RealEstate:latitude",
                "label": "Latitude",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#RealEstate:latitude",
                "type": "number"
            },
            "longitude": {
                "name": "longitude",
                "qname": "RealEstate:longitude",
                "label": "Longitude",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#RealEstate:longitude",
                "type": "number"
            },
            "censusBlock": {
                "name": "censusBlock",
                "qname": "RealEstate:censusBlock",
                "label": "Census block",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#RealEstate:censusBlock",
                "type": "string"
            },
            "cadastralCode": {
                "name": "cadastralCode",
                "qname": "RealEstate:cadastralCode",
                "label": "Cadastral code",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#RealEstate:cadastralCode",
                "type": "identifier"
            },
            "area": {
                "name": "area",
                "qname": "RealEstate:area",
                "label": "Area",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#RealEstate:area",
                "type": "number"
            },
            "registrationNumber": {
                "name": "registrationNumber",
                "qname": "RealEstate:registrationNumber",
                "label": "Registration number",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#RealEstate:registrationNumber",
                "type": "identifier"
            },
            "titleNumber": {
                "name": "titleNumber",
                "qname": "RealEstate:titleNumber",
                "label": "Title number",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#RealEstate:titleNumber",
                "type": "identifier"
            },
            "tenure": {
                "name": "tenure",
                "qname": "RealEstate:tenure",
                "label": "Tenure",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#RealEstate:tenure",
                "type": "string"
            },
            "encumbrance": {
                "name": "encumbrance",
                "qname": "RealEstate:encumbrance",
                "label": "Encumbrance",
                "description": "An encumbrance is a right to, interest in, or legal liability on real property that does not prohibit passing title to the property but that diminishes its value.\n",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#RealEstate:encumbrance",
                "type": "string"
            },
            "propertyType": {
                "name": "propertyType",
                "qname": "RealEstate:propertyType",
                "label": "Property type",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#RealEstate:propertyType",
                "type": "string"
            },
            "landType": {
                "name": "landType",
                "qname": "RealEstate:landType",
                "label": "Land type",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#RealEstate:landType",
                "type": "string"
            },
            "createDate": {
                "name": "createDate",
                "qname": "RealEstate:createDate",
                "label": "Record date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#RealEstate:createDate",
                "type": "date"
            },
            "name": {
                "name": "name",
                "qname": "Thing:name",
                "label": "Name",
                "description": null,
                "caption": true,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#prefLabel",
                "type": "name"
            },
            "sameAs": {
                "name": "sameAs",
                "qname": "Thing:sameAs",
                "label": "Same as",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2002/07/owl#sameAs",
                "type": "entity",
                "schema": "Thing",
                "reverse": "sameAs"
            },
            "summary": {
                "name": "summary",
                "qname": "Thing:summary",
                "label": "Summary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:summary",
                "type": "text"
            },
            "description": {
                "name": "description",
                "qname": "Thing:description",
                "label": "Description",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:description",
                "type": "string"
            },
            "country": {
                "name": "country",
                "qname": "Thing:country",
                "label": "Country",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:country",
                "type": "country"
            },
            "alias": {
                "name": "alias",
                "qname": "Thing:alias",
                "label": "Other name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#altLabel",
                "type": "name"
            },
            "previousName": {
                "name": "previousName",
                "qname": "Thing:previousName",
                "label": "Previous name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:previousName",
                "type": "name"
            },
            "weakAlias": {
                "name": "weakAlias",
                "qname": "Thing:weakAlias",
                "label": "Weak alias",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:weakAlias",
                "type": "string"
            },
            "sourceUrl": {
                "name": "sourceUrl",
                "qname": "Thing:sourceUrl",
                "label": "Source link",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:sourceUrl",
                "type": "url"
            },
            "alephUrl": {
                "name": "alephUrl",
                "qname": "Thing:alephUrl",
                "label": "Aleph URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:alephUrl",
                "type": "url"
            },
            "wikipediaUrl": {
                "name": "wikipediaUrl",
                "qname": "Thing:wikipediaUrl",
                "label": "Wikipedia Article",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikipediaUrl",
                "type": "url"
            },
            "wikidataId": {
                "name": "wikidataId",
                "qname": "Thing:wikidataId",
                "label": "Wikidata ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikidataId",
                "type": "identifier"
            },
            "keywords": {
                "name": "keywords",
                "qname": "Thing:keywords",
                "label": "Keywords",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:keywords",
                "type": "string"
            },
            "address": {
                "name": "address",
                "qname": "Thing:address",
                "label": "Address",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:address",
                "type": "address"
            },
            "program": {
                "name": "program",
                "qname": "Thing:program",
                "label": "Program",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:program",
                "type": "string"
            },
            "notes": {
                "name": "notes",
                "qname": "Thing:notes",
                "label": "Notes",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:notes",
                "type": "text"
            },
            "modifiedAt": {
                "name": "modifiedAt",
                "qname": "Thing:modifiedAt",
                "label": "Modified on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:modifiedAt",
                "type": "date"
            },
            "retrievedAt": {
                "name": "retrievedAt",
                "qname": "Thing:retrievedAt",
                "label": "Retrieved on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:retrievedAt",
                "type": "date"
            },
            "amount": {
                "name": "amount",
                "qname": "Value:amount",
                "label": "Amount",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:amount",
                "type": "number"
            },
            "currency": {
                "name": "currency",
                "qname": "Value:currency",
                "label": "Currency",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:currency",
                "type": "string"
            },
            "amountUsd": {
                "name": "amountUsd",
                "qname": "Value:amountUsd",
                "label": "Amount in USD",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:amountUsd",
                "type": "number"
            },
            "amountEur": {
                "name": "amountEur",
                "qname": "Value:amountEur",
                "label": "Amount in EUR",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:amountEur",
                "type": "number"
            }
        }
    },
    "Land": {
        "label": "Land",
        "plural": "Lands",
        "uri": "https://w3id.org/ftm#Land",
        "schemata": ["Thing", "Value", "Land", "Asset", "RealEstate"],
        "extends": ["RealEstate"],
        "abstract": false,
        "matchable": false,
        "description": null,
        "featured": ["registrationNumber"],
        "properties": {
            "latitude": {
                "name": "latitude",
                "qname": "RealEstate:latitude",
                "label": "Latitude",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#RealEstate:latitude",
                "type": "number"
            },
            "longitude": {
                "name": "longitude",
                "qname": "RealEstate:longitude",
                "label": "Longitude",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#RealEstate:longitude",
                "type": "number"
            },
            "censusBlock": {
                "name": "censusBlock",
                "qname": "RealEstate:censusBlock",
                "label": "Census block",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#RealEstate:censusBlock",
                "type": "string"
            },
            "cadastralCode": {
                "name": "cadastralCode",
                "qname": "RealEstate:cadastralCode",
                "label": "Cadastral code",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#RealEstate:cadastralCode",
                "type": "identifier"
            },
            "area": {
                "name": "area",
                "qname": "RealEstate:area",
                "label": "Area",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#RealEstate:area",
                "type": "number"
            },
            "registrationNumber": {
                "name": "registrationNumber",
                "qname": "RealEstate:registrationNumber",
                "label": "Registration number",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#RealEstate:registrationNumber",
                "type": "identifier"
            },
            "titleNumber": {
                "name": "titleNumber",
                "qname": "RealEstate:titleNumber",
                "label": "Title number",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#RealEstate:titleNumber",
                "type": "identifier"
            },
            "tenure": {
                "name": "tenure",
                "qname": "RealEstate:tenure",
                "label": "Tenure",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#RealEstate:tenure",
                "type": "string"
            },
            "encumbrance": {
                "name": "encumbrance",
                "qname": "RealEstate:encumbrance",
                "label": "Encumbrance",
                "description": "An encumbrance is a right to, interest in, or legal liability on real property that does not prohibit passing title to the property but that diminishes its value.\n",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#RealEstate:encumbrance",
                "type": "string"
            },
            "propertyType": {
                "name": "propertyType",
                "qname": "RealEstate:propertyType",
                "label": "Property type",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#RealEstate:propertyType",
                "type": "string"
            },
            "landType": {
                "name": "landType",
                "qname": "RealEstate:landType",
                "label": "Land type",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#RealEstate:landType",
                "type": "string"
            },
            "createDate": {
                "name": "createDate",
                "qname": "RealEstate:createDate",
                "label": "Record date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#RealEstate:createDate",
                "type": "date"
            },
            "name": {
                "name": "name",
                "qname": "Thing:name",
                "label": "Name",
                "description": null,
                "caption": true,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#prefLabel",
                "type": "name"
            },
            "sameAs": {
                "name": "sameAs",
                "qname": "Thing:sameAs",
                "label": "Same as",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2002/07/owl#sameAs",
                "type": "entity",
                "schema": "Thing",
                "reverse": "sameAs"
            },
            "summary": {
                "name": "summary",
                "qname": "Thing:summary",
                "label": "Summary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:summary",
                "type": "text"
            },
            "description": {
                "name": "description",
                "qname": "Thing:description",
                "label": "Description",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:description",
                "type": "string"
            },
            "country": {
                "name": "country",
                "qname": "Thing:country",
                "label": "Country",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:country",
                "type": "country"
            },
            "alias": {
                "name": "alias",
                "qname": "Thing:alias",
                "label": "Other name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#altLabel",
                "type": "name"
            },
            "previousName": {
                "name": "previousName",
                "qname": "Thing:previousName",
                "label": "Previous name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:previousName",
                "type": "name"
            },
            "weakAlias": {
                "name": "weakAlias",
                "qname": "Thing:weakAlias",
                "label": "Weak alias",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:weakAlias",
                "type": "string"
            },
            "sourceUrl": {
                "name": "sourceUrl",
                "qname": "Thing:sourceUrl",
                "label": "Source link",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:sourceUrl",
                "type": "url"
            },
            "alephUrl": {
                "name": "alephUrl",
                "qname": "Thing:alephUrl",
                "label": "Aleph URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:alephUrl",
                "type": "url"
            },
            "wikipediaUrl": {
                "name": "wikipediaUrl",
                "qname": "Thing:wikipediaUrl",
                "label": "Wikipedia Article",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikipediaUrl",
                "type": "url"
            },
            "wikidataId": {
                "name": "wikidataId",
                "qname": "Thing:wikidataId",
                "label": "Wikidata ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikidataId",
                "type": "identifier"
            },
            "keywords": {
                "name": "keywords",
                "qname": "Thing:keywords",
                "label": "Keywords",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:keywords",
                "type": "string"
            },
            "address": {
                "name": "address",
                "qname": "Thing:address",
                "label": "Address",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:address",
                "type": "address"
            },
            "program": {
                "name": "program",
                "qname": "Thing:program",
                "label": "Program",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:program",
                "type": "string"
            },
            "notes": {
                "name": "notes",
                "qname": "Thing:notes",
                "label": "Notes",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:notes",
                "type": "text"
            },
            "modifiedAt": {
                "name": "modifiedAt",
                "qname": "Thing:modifiedAt",
                "label": "Modified on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:modifiedAt",
                "type": "date"
            },
            "retrievedAt": {
                "name": "retrievedAt",
                "qname": "Thing:retrievedAt",
                "label": "Retrieved on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:retrievedAt",
                "type": "date"
            },
            "amount": {
                "name": "amount",
                "qname": "Value:amount",
                "label": "Amount",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:amount",
                "type": "number"
            },
            "currency": {
                "name": "currency",
                "qname": "Value:currency",
                "label": "Currency",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:currency",
                "type": "string"
            },
            "amountUsd": {
                "name": "amountUsd",
                "qname": "Value:amountUsd",
                "label": "Amount in USD",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:amountUsd",
                "type": "number"
            },
            "amountEur": {
                "name": "amountEur",
                "qname": "Value:amountEur",
                "label": "Amount in EUR",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:amountEur",
                "type": "number"
            }
        }
    },
    "Contract": {
        "label": "Contract",
        "plural": "Contracts",
        "uri": "https://w3id.org/ftm#Contract",
        "schemata": ["Contract", "Value", "Asset", "Thing"],
        "extends": ["Asset"],
        "abstract": false,
        "matchable": false,
        "description": "An contract or contract lot issued by an authority. Multiple lots may be awarded to different suppliers (see ContractAward).\n",
        "featured": ["name", "amount", "authority", "contractDate"],
        "properties": {
            "authority": {
                "name": "authority",
                "qname": "Contract:authority",
                "label": "Contract authority",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Contract:authority",
                "type": "entity",
                "schema": "LegalEntity",
                "reverse": "contractAuthority"
            },
            "type": {
                "name": "type",
                "qname": "Contract:type",
                "label": "Type",
                "description": "Type of contract. Potentially W (Works), U (Supplies), S (Services).\n",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Contract:type",
                "type": "string"
            },
            "contractDate": {
                "name": "contractDate",
                "qname": "Contract:contractDate",
                "label": "Contract date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Contract:contractDate",
                "type": "date"
            },
            "procedureNumber": {
                "name": "procedureNumber",
                "qname": "Contract:procedureNumber",
                "label": "Procedure number",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Contract:procedureNumber",
                "type": "string"
            },
            "noticeId": {
                "name": "noticeId",
                "qname": "Contract:noticeId",
                "label": "Contract Award Notice ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Contract:noticeId",
                "type": "string"
            },
            "numberAwards": {
                "name": "numberAwards",
                "qname": "Contract:numberAwards",
                "label": "Number of awards",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Contract:numberAwards",
                "type": "string"
            },
            "cancelled": {
                "name": "cancelled",
                "qname": "Contract:cancelled",
                "label": "Cancelled?",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Contract:cancelled",
                "type": "string"
            },
            "name": {
                "name": "name",
                "qname": "Thing:name",
                "label": "Name",
                "description": null,
                "caption": true,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#prefLabel",
                "type": "name"
            },
            "sameAs": {
                "name": "sameAs",
                "qname": "Thing:sameAs",
                "label": "Same as",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2002/07/owl#sameAs",
                "type": "entity",
                "schema": "Thing",
                "reverse": "sameAs"
            },
            "summary": {
                "name": "summary",
                "qname": "Thing:summary",
                "label": "Summary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:summary",
                "type": "text"
            },
            "description": {
                "name": "description",
                "qname": "Thing:description",
                "label": "Description",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:description",
                "type": "string"
            },
            "country": {
                "name": "country",
                "qname": "Thing:country",
                "label": "Country",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:country",
                "type": "country"
            },
            "alias": {
                "name": "alias",
                "qname": "Thing:alias",
                "label": "Other name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#altLabel",
                "type": "name"
            },
            "previousName": {
                "name": "previousName",
                "qname": "Thing:previousName",
                "label": "Previous name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:previousName",
                "type": "name"
            },
            "weakAlias": {
                "name": "weakAlias",
                "qname": "Thing:weakAlias",
                "label": "Weak alias",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:weakAlias",
                "type": "string"
            },
            "sourceUrl": {
                "name": "sourceUrl",
                "qname": "Thing:sourceUrl",
                "label": "Source link",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:sourceUrl",
                "type": "url"
            },
            "alephUrl": {
                "name": "alephUrl",
                "qname": "Thing:alephUrl",
                "label": "Aleph URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:alephUrl",
                "type": "url"
            },
            "wikipediaUrl": {
                "name": "wikipediaUrl",
                "qname": "Thing:wikipediaUrl",
                "label": "Wikipedia Article",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikipediaUrl",
                "type": "url"
            },
            "wikidataId": {
                "name": "wikidataId",
                "qname": "Thing:wikidataId",
                "label": "Wikidata ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikidataId",
                "type": "identifier"
            },
            "keywords": {
                "name": "keywords",
                "qname": "Thing:keywords",
                "label": "Keywords",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:keywords",
                "type": "string"
            },
            "address": {
                "name": "address",
                "qname": "Thing:address",
                "label": "Address",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:address",
                "type": "address"
            },
            "program": {
                "name": "program",
                "qname": "Thing:program",
                "label": "Program",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:program",
                "type": "string"
            },
            "notes": {
                "name": "notes",
                "qname": "Thing:notes",
                "label": "Notes",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:notes",
                "type": "text"
            },
            "modifiedAt": {
                "name": "modifiedAt",
                "qname": "Thing:modifiedAt",
                "label": "Modified on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:modifiedAt",
                "type": "date"
            },
            "retrievedAt": {
                "name": "retrievedAt",
                "qname": "Thing:retrievedAt",
                "label": "Retrieved on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:retrievedAt",
                "type": "date"
            },
            "amount": {
                "name": "amount",
                "qname": "Value:amount",
                "label": "Amount",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:amount",
                "type": "number"
            },
            "currency": {
                "name": "currency",
                "qname": "Value:currency",
                "label": "Currency",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:currency",
                "type": "string"
            },
            "amountUsd": {
                "name": "amountUsd",
                "qname": "Value:amountUsd",
                "label": "Amount in USD",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:amountUsd",
                "type": "number"
            },
            "amountEur": {
                "name": "amountEur",
                "qname": "Value:amountEur",
                "label": "Amount in EUR",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:amountEur",
                "type": "number"
            },
            "ownershipAsset": {
                "name": "ownershipAsset",
                "qname": "Asset:ownershipAsset",
                "label": "Owners",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Asset:ownershipAsset",
                "type": "entity",
                "schema": "Ownership",
                "reverse": "asset"
            },
            "courtCase": {
                "name": "courtCase",
                "qname": "Thing:courtCase",
                "label": "Court cases",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Thing:courtCase",
                "type": "entity",
                "schema": "CourtCaseParty",
                "reverse": "party"
            },
            "awards": {
                "name": "awards",
                "qname": "Contract:awards",
                "label": "Lots awarded",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Contract:awards",
                "type": "entity",
                "schema": "ContractAward",
                "reverse": "contract"
            }
        }
    },
    "LegalEntity": {
        "label": "Legal entity",
        "plural": "Legal entities",
        "uri": "https://w3id.org/ftm#LegalEntity",
        "schemata": ["LegalEntity", "Thing"],
        "extends": ["Thing"],
        "abstract": false,
        "matchable": true,
        "description": "A legal entity may be a person or a company.",
        "featured": ["name", "legalForm", "country"],
        "properties": {
            "email": {
                "name": "email",
                "qname": "LegalEntity:email",
                "label": "E-Mail",
                "description": "Email address",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:email",
                "type": "email"
            },
            "phone": {
                "name": "phone",
                "qname": "LegalEntity:phone",
                "label": "Phone",
                "description": "Phone number",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:phone",
                "type": "phone"
            },
            "website": {
                "name": "website",
                "qname": "LegalEntity:website",
                "label": "Website",
                "description": "Website address",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:website",
                "type": "url"
            },
            "legalForm": {
                "name": "legalForm",
                "qname": "LegalEntity:legalForm",
                "label": "Legal form",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:legalForm",
                "type": "string"
            },
            "incorporationDate": {
                "name": "incorporationDate",
                "qname": "LegalEntity:incorporationDate",
                "label": "Incorporation date",
                "description": "The date the legal entity was incorporated",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:incorporationDate",
                "type": "date"
            },
            "dissolutionDate": {
                "name": "dissolutionDate",
                "qname": "LegalEntity:dissolutionDate",
                "label": "Dissolution date",
                "description": "The date the legal entity was dissolved, if applicable",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:dissolutionDate",
                "type": "date"
            },
            "taxStatus": {
                "name": "taxStatus",
                "qname": "LegalEntity:taxStatus",
                "label": "Tax status",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:taxStatus",
                "type": "string"
            },
            "status": {
                "name": "status",
                "qname": "LegalEntity:status",
                "label": "Status",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:status",
                "type": "string"
            },
            "sector": {
                "name": "sector",
                "qname": "LegalEntity:sector",
                "label": "Sector",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:sector",
                "type": "string"
            },
            "classification": {
                "name": "classification",
                "qname": "LegalEntity:classification",
                "label": "Classification",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:classification",
                "type": "string"
            },
            "registrationNumber": {
                "name": "registrationNumber",
                "qname": "LegalEntity:registrationNumber",
                "label": "Registration number",
                "description": "Company registration number",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:registrationNumber",
                "type": "identifier"
            },
            "idNumber": {
                "name": "idNumber",
                "qname": "LegalEntity:idNumber",
                "label": "ID Number",
                "description": "ID number of any applicable ID",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:idNumber",
                "type": "identifier"
            },
            "taxNumber": {
                "name": "taxNumber",
                "qname": "LegalEntity:taxNumber",
                "label": "Tax ID Number",
                "description": "Tax ID number",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:taxNumber",
                "type": "identifier"
            },
            "vatCode": {
                "name": "vatCode",
                "qname": "LegalEntity:vatCode",
                "label": "V.A.T. Identifier",
                "description": "(EU) VAT number",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:vatCode",
                "type": "identifier"
            },
            "jurisdiction": {
                "name": "jurisdiction",
                "qname": "LegalEntity:jurisdiction",
                "label": "Jurisdiction",
                "description": "Country or region in which this entity operates",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:jurisdiction",
                "type": "country"
            },
            "mainCountry": {
                "name": "mainCountry",
                "qname": "LegalEntity:mainCountry",
                "label": "Country of origin",
                "description": "Primary country of this entity",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:mainCountry",
                "type": "country"
            },
            "opencorporatesUrl": {
                "name": "opencorporatesUrl",
                "qname": "LegalEntity:opencorporatesUrl",
                "label": "OpenCorporates URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:opencorporatesUrl",
                "type": "url"
            },
            "bvdId": {
                "name": "bvdId",
                "qname": "LegalEntity:bvdId",
                "label": "Bureau van Dijk ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:bvdId",
                "type": "identifier"
            },
            "icijId": {
                "name": "icijId",
                "qname": "LegalEntity:icijId",
                "label": "ICIJ ID",
                "description": "ID according to International Consortium for Investigative Journalists",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:icijId",
                "type": "string"
            },
            "okpoCode": {
                "name": "okpoCode",
                "qname": "LegalEntity:okpoCode",
                "label": "OKPO",
                "description": "Russian industry classifier",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:okpoCode",
                "type": "identifier"
            },
            "innCode": {
                "name": "innCode",
                "qname": "LegalEntity:innCode",
                "label": "INN",
                "description": "Russian company ID",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:innCode",
                "type": "identifier"
            },
            "dunsCode": {
                "name": "dunsCode",
                "qname": "LegalEntity:dunsCode",
                "label": "D-U-N-S",
                "description": "Dun & Bradstreet identifier",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:dunsCode",
                "type": "identifier"
            },
            "swiftBic": {
                "name": "swiftBic",
                "qname": "LegalEntity:swiftBic",
                "label": "SWIFT/BIC",
                "description": "Bank identifier code",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:swiftBic",
                "type": "identifier"
            },
            "parent": {
                "name": "parent",
                "qname": "LegalEntity:parent",
                "label": "Parent company",
                "description": "If this entity is a subsidiary, another entity (company or organisation) is its parent",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:parent",
                "type": "entity",
                "schema": "LegalEntity",
                "reverse": "subsidiaries"
            },
            "subsidiaries": {
                "name": "subsidiaries",
                "qname": "LegalEntity:subsidiaries",
                "label": "Subsidiaries",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:subsidiaries",
                "type": "entity",
                "schema": "LegalEntity",
                "reverse": "parent"
            },
            "passport": {
                "name": "passport",
                "qname": "LegalEntity:passport",
                "label": "Passports",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:passport",
                "type": "entity",
                "schema": "Passport",
                "reverse": "holder"
            },
            "agencyClient": {
                "name": "agencyClient",
                "qname": "LegalEntity:agencyClient",
                "label": "Agency clients",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#LegalEntity:agencyClient",
                "type": "entity",
                "schema": "Representation",
                "reverse": "agent"
            },
            "agentRepresentation": {
                "name": "agentRepresentation",
                "qname": "LegalEntity:agentRepresentation",
                "label": "Agents",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#LegalEntity:agentRepresentation",
                "type": "entity",
                "schema": "Representation",
                "reverse": "client"
            },
            "contractAuthority": {
                "name": "contractAuthority",
                "qname": "LegalEntity:contractAuthority",
                "label": "Contracts issued",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#LegalEntity:contractAuthority",
                "type": "entity",
                "schema": "Contract",
                "reverse": "authority"
            },
            "name": {
                "name": "name",
                "qname": "Thing:name",
                "label": "Name",
                "description": null,
                "caption": true,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#prefLabel",
                "type": "name"
            },
            "sameAs": {
                "name": "sameAs",
                "qname": "Thing:sameAs",
                "label": "Same as",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2002/07/owl#sameAs",
                "type": "entity",
                "schema": "Thing",
                "reverse": "sameAs"
            },
            "summary": {
                "name": "summary",
                "qname": "Thing:summary",
                "label": "Summary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:summary",
                "type": "text"
            },
            "description": {
                "name": "description",
                "qname": "Thing:description",
                "label": "Description",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:description",
                "type": "string"
            },
            "country": {
                "name": "country",
                "qname": "Thing:country",
                "label": "Country",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:country",
                "type": "country"
            },
            "alias": {
                "name": "alias",
                "qname": "Thing:alias",
                "label": "Other name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#altLabel",
                "type": "name"
            },
            "previousName": {
                "name": "previousName",
                "qname": "Thing:previousName",
                "label": "Previous name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:previousName",
                "type": "name"
            },
            "weakAlias": {
                "name": "weakAlias",
                "qname": "Thing:weakAlias",
                "label": "Weak alias",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:weakAlias",
                "type": "string"
            },
            "sourceUrl": {
                "name": "sourceUrl",
                "qname": "Thing:sourceUrl",
                "label": "Source link",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:sourceUrl",
                "type": "url"
            },
            "alephUrl": {
                "name": "alephUrl",
                "qname": "Thing:alephUrl",
                "label": "Aleph URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:alephUrl",
                "type": "url"
            },
            "wikipediaUrl": {
                "name": "wikipediaUrl",
                "qname": "Thing:wikipediaUrl",
                "label": "Wikipedia Article",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikipediaUrl",
                "type": "url"
            },
            "wikidataId": {
                "name": "wikidataId",
                "qname": "Thing:wikidataId",
                "label": "Wikidata ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikidataId",
                "type": "identifier"
            },
            "keywords": {
                "name": "keywords",
                "qname": "Thing:keywords",
                "label": "Keywords",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:keywords",
                "type": "string"
            },
            "address": {
                "name": "address",
                "qname": "Thing:address",
                "label": "Address",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:address",
                "type": "address"
            },
            "program": {
                "name": "program",
                "qname": "Thing:program",
                "label": "Program",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:program",
                "type": "string"
            },
            "notes": {
                "name": "notes",
                "qname": "Thing:notes",
                "label": "Notes",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:notes",
                "type": "text"
            },
            "modifiedAt": {
                "name": "modifiedAt",
                "qname": "Thing:modifiedAt",
                "label": "Modified on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:modifiedAt",
                "type": "date"
            },
            "retrievedAt": {
                "name": "retrievedAt",
                "qname": "Thing:retrievedAt",
                "label": "Retrieved on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:retrievedAt",
                "type": "date"
            },
            "successors": {
                "name": "successors",
                "qname": "LegalEntity:successors",
                "label": "Successors",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#LegalEntity:successors",
                "type": "entity",
                "schema": "Succession",
                "reverse": "predecessor"
            },
            "predecessors": {
                "name": "predecessors",
                "qname": "LegalEntity:predecessors",
                "label": "Predecessors",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#LegalEntity:predecessors",
                "type": "entity",
                "schema": "Succession",
                "reverse": "successor"
            },
            "ownershipOwner": {
                "name": "ownershipOwner",
                "qname": "LegalEntity:ownershipOwner",
                "label": "Assets and shares",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#LegalEntity:ownershipOwner",
                "type": "entity",
                "schema": "Ownership",
                "reverse": "owner"
            },
            "courtCase": {
                "name": "courtCase",
                "qname": "Thing:courtCase",
                "label": "Court cases",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Thing:courtCase",
                "type": "entity",
                "schema": "CourtCaseParty",
                "reverse": "party"
            },
            "contractAwardSupplier": {
                "name": "contractAwardSupplier",
                "qname": "LegalEntity:contractAwardSupplier",
                "label": "Contracts awarded",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#LegalEntity:contractAwardSupplier",
                "type": "entity",
                "schema": "ContractAward",
                "reverse": "supplier"
            },
            "paymentPayer": {
                "name": "paymentPayer",
                "qname": "LegalEntity:paymentPayer",
                "label": "Payments made",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#LegalEntity:paymentPayer",
                "type": "entity",
                "schema": "Payment",
                "reverse": "payer"
            },
            "paymentBeneficiary": {
                "name": "paymentBeneficiary",
                "qname": "LegalEntity:paymentBeneficiary",
                "label": "Payments received",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#LegalEntity:paymentBeneficiary",
                "type": "entity",
                "schema": "Payment",
                "reverse": "beneficiary"
            },
            "membershipMember": {
                "name": "membershipMember",
                "qname": "LegalEntity:membershipMember",
                "label": "Memberships",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#LegalEntity:membershipMember",
                "type": "entity",
                "schema": "Membership",
                "reverse": "member"
            },
            "sanctionEntity": {
                "name": "sanctionEntity",
                "qname": "Thing:sanctionEntity",
                "label": "Sanctions",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Thing:sanctionEntity",
                "type": "entity",
                "schema": "Sanction",
                "reverse": "entity"
            },
            "directorshipDirector": {
                "name": "directorshipDirector",
                "qname": "LegalEntity:directorshipDirector",
                "label": "Directorships",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#LegalEntity:directorshipDirector",
                "type": "entity",
                "schema": "Directorship",
                "reverse": "director"
            }
        }
    },
    "Airplane": {
        "label": "Airplane",
        "plural": "Airplanes",
        "uri": "https://w3id.org/ftm#Airplane",
        "schemata": ["Thing", "Airplane", "Value", "Asset", "Vehicle"],
        "extends": ["Vehicle"],
        "abstract": false,
        "matchable": false,
        "description": null,
        "featured": ["type", "registrationNumber", "country", "operator", "owner"],
        "properties": {
            "serialNumber": {
                "name": "serialNumber",
                "qname": "Airplane:serialNumber",
                "label": "Serial Number",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Airplane:serialNumber",
                "type": "identifier"
            },
            "icaoCode": {
                "name": "icaoCode",
                "qname": "Airplane:icaoCode",
                "label": "ICAO aircraft type designator",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Airplane:icaoCode",
                "type": "string"
            },
            "manufacturer": {
                "name": "manufacturer",
                "qname": "Airplane:manufacturer",
                "label": "Manufacturer",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Airplane:manufacturer",
                "type": "string"
            },
            "registrationNumber": {
                "name": "registrationNumber",
                "qname": "Vehicle:registrationNumber",
                "label": "Registration Number",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Vehicle:registrationNumber",
                "type": "identifier"
            },
            "type": {
                "name": "type",
                "qname": "Vehicle:type",
                "label": "Type",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Vehicle:type",
                "type": "string"
            },
            "model": {
                "name": "model",
                "qname": "Vehicle:model",
                "label": "Model",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Vehicle:model",
                "type": "string"
            },
            "owner": {
                "name": "owner",
                "qname": "Vehicle:owner",
                "label": "Owner",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Vehicle:owner",
                "type": "entity"
            },
            "operator": {
                "name": "operator",
                "qname": "Vehicle:operator",
                "label": "Operator",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Vehicle:operator",
                "type": "entity"
            },
            "buildDate": {
                "name": "buildDate",
                "qname": "Vehicle:buildDate",
                "label": "Build Date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Vehicle:buildDate",
                "type": "date"
            },
            "country": {
                "name": "country",
                "qname": "Vehicle:country",
                "label": "Country",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Vehicle:country",
                "type": "country"
            },
            "registrationDate": {
                "name": "registrationDate",
                "qname": "Vehicle:registrationDate",
                "label": "Registration Date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Vehicle:registrationDate",
                "type": "date"
            },
            "name": {
                "name": "name",
                "qname": "Thing:name",
                "label": "Name",
                "description": null,
                "caption": true,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#prefLabel",
                "type": "name"
            },
            "sameAs": {
                "name": "sameAs",
                "qname": "Thing:sameAs",
                "label": "Same as",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2002/07/owl#sameAs",
                "type": "entity",
                "schema": "Thing",
                "reverse": "sameAs"
            },
            "summary": {
                "name": "summary",
                "qname": "Thing:summary",
                "label": "Summary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:summary",
                "type": "text"
            },
            "description": {
                "name": "description",
                "qname": "Thing:description",
                "label": "Description",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:description",
                "type": "string"
            },
            "alias": {
                "name": "alias",
                "qname": "Thing:alias",
                "label": "Other name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#altLabel",
                "type": "name"
            },
            "previousName": {
                "name": "previousName",
                "qname": "Thing:previousName",
                "label": "Previous name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:previousName",
                "type": "name"
            },
            "weakAlias": {
                "name": "weakAlias",
                "qname": "Thing:weakAlias",
                "label": "Weak alias",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:weakAlias",
                "type": "string"
            },
            "sourceUrl": {
                "name": "sourceUrl",
                "qname": "Thing:sourceUrl",
                "label": "Source link",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:sourceUrl",
                "type": "url"
            },
            "alephUrl": {
                "name": "alephUrl",
                "qname": "Thing:alephUrl",
                "label": "Aleph URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:alephUrl",
                "type": "url"
            },
            "wikipediaUrl": {
                "name": "wikipediaUrl",
                "qname": "Thing:wikipediaUrl",
                "label": "Wikipedia Article",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikipediaUrl",
                "type": "url"
            },
            "wikidataId": {
                "name": "wikidataId",
                "qname": "Thing:wikidataId",
                "label": "Wikidata ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikidataId",
                "type": "identifier"
            },
            "keywords": {
                "name": "keywords",
                "qname": "Thing:keywords",
                "label": "Keywords",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:keywords",
                "type": "string"
            },
            "address": {
                "name": "address",
                "qname": "Thing:address",
                "label": "Address",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:address",
                "type": "address"
            },
            "program": {
                "name": "program",
                "qname": "Thing:program",
                "label": "Program",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:program",
                "type": "string"
            },
            "notes": {
                "name": "notes",
                "qname": "Thing:notes",
                "label": "Notes",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:notes",
                "type": "text"
            },
            "modifiedAt": {
                "name": "modifiedAt",
                "qname": "Thing:modifiedAt",
                "label": "Modified on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:modifiedAt",
                "type": "date"
            },
            "retrievedAt": {
                "name": "retrievedAt",
                "qname": "Thing:retrievedAt",
                "label": "Retrieved on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:retrievedAt",
                "type": "date"
            },
            "amount": {
                "name": "amount",
                "qname": "Value:amount",
                "label": "Amount",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:amount",
                "type": "number"
            },
            "currency": {
                "name": "currency",
                "qname": "Value:currency",
                "label": "Currency",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:currency",
                "type": "string"
            },
            "amountUsd": {
                "name": "amountUsd",
                "qname": "Value:amountUsd",
                "label": "Amount in USD",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:amountUsd",
                "type": "number"
            },
            "amountEur": {
                "name": "amountEur",
                "qname": "Value:amountEur",
                "label": "Amount in EUR",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:amountEur",
                "type": "number"
            }
        }
    },
    "Succession": {
        "label": "Succession",
        "plural": "Successions",
        "uri": "https://w3id.org/ftm#Succession",
        "schemata": ["Interval", "Succession", "Interest"],
        "extends": ["Interest"],
        "abstract": false,
        "matchable": false,
        "description": "Two entities that legally succeed each other.",
        "featured": ["predecessor", "successor", "date"],
        "properties": {
            "predecessor": {
                "name": "predecessor",
                "qname": "Succession:predecessor",
                "label": "Predecessor",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Succession:predecessor",
                "type": "entity",
                "schema": "LegalEntity",
                "reverse": "successors"
            },
            "successor": {
                "name": "successor",
                "qname": "Succession:successor",
                "label": "Successor",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Succession:successor",
                "type": "entity",
                "schema": "LegalEntity",
                "reverse": "predecessors"
            },
            "role": {
                "name": "role",
                "qname": "Interest:role",
                "label": "Role",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interest:role",
                "type": "string"
            },
            "status": {
                "name": "status",
                "qname": "Interest:status",
                "label": "Status",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interest:status",
                "type": "string"
            },
            "startDate": {
                "name": "startDate",
                "qname": "Interval:startDate",
                "label": "Start date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:startDate",
                "type": "date"
            },
            "endDate": {
                "name": "endDate",
                "qname": "Interval:endDate",
                "label": "End date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:endDate",
                "type": "date"
            },
            "date": {
                "name": "date",
                "qname": "Interval:date",
                "label": "Date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:date",
                "type": "date"
            },
            "summary": {
                "name": "summary",
                "qname": "Interval:summary",
                "label": "Summary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:summary",
                "type": "text"
            },
            "recordId": {
                "name": "recordId",
                "qname": "Interval:recordId",
                "label": "Record ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:recordId",
                "type": "string"
            },
            "sourceUrl": {
                "name": "sourceUrl",
                "qname": "Interval:sourceUrl",
                "label": "Source URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:sourceUrl",
                "type": "url"
            },
            "alephUrl": {
                "name": "alephUrl",
                "qname": "Interval:alephUrl",
                "label": "Aleph URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:alephUrl",
                "type": "url"
            },
            "modifiedAt": {
                "name": "modifiedAt",
                "qname": "Interval:modifiedAt",
                "label": "Modified on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:modifiedAt",
                "type": "date"
            },
            "retrievedAt": {
                "name": "retrievedAt",
                "qname": "Interval:retrievedAt",
                "label": "Retrieved on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:retrievedAt",
                "type": "date"
            }
        }
    },
    "Ownership": {
        "label": "Ownership",
        "plural": "Ownerships",
        "uri": "https://w3id.org/ftm#Ownership",
        "schemata": ["Interval", "Ownership", "Interest"],
        "extends": ["Interest"],
        "abstract": false,
        "matchable": false,
        "description": null,
        "featured": ["owner", "asset", "percentage", "startDate", "endDate"],
        "properties": {
            "owner": {
                "name": "owner",
                "qname": "Ownership:owner",
                "label": "Owner",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Ownership:owner",
                "type": "entity",
                "schema": "LegalEntity",
                "reverse": "ownershipOwner"
            },
            "asset": {
                "name": "asset",
                "qname": "Ownership:asset",
                "label": "Asset",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Ownership:asset",
                "type": "entity",
                "schema": "Asset",
                "reverse": "ownershipAsset"
            },
            "percentage": {
                "name": "percentage",
                "qname": "Ownership:percentage",
                "label": "Percentage held",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Ownership:percentage",
                "type": "string"
            },
            "sharesCount": {
                "name": "sharesCount",
                "qname": "Ownership:sharesCount",
                "label": "Number of shares",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Ownership:sharesCount",
                "type": "string"
            },
            "sharesValue": {
                "name": "sharesValue",
                "qname": "Ownership:sharesValue",
                "label": "Value of shares",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Ownership:sharesValue",
                "type": "string"
            },
            "sharesCurrency": {
                "name": "sharesCurrency",
                "qname": "Ownership:sharesCurrency",
                "label": "Currency of shares",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Ownership:sharesCurrency",
                "type": "string"
            },
            "sharesType": {
                "name": "sharesType",
                "qname": "Ownership:sharesType",
                "label": "Type of shares",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Ownership:sharesType",
                "type": "string"
            },
            "legalBasis": {
                "name": "legalBasis",
                "qname": "Ownership:legalBasis",
                "label": "Legal basis",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Ownership:legalBasis",
                "type": "string"
            },
            "ownershipType": {
                "name": "ownershipType",
                "qname": "Ownership:ownershipType",
                "label": "Type of ownership",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Ownership:ownershipType",
                "type": "string"
            },
            "role": {
                "name": "role",
                "qname": "Interest:role",
                "label": "Role",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interest:role",
                "type": "string"
            },
            "status": {
                "name": "status",
                "qname": "Interest:status",
                "label": "Status",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interest:status",
                "type": "string"
            },
            "startDate": {
                "name": "startDate",
                "qname": "Interval:startDate",
                "label": "Start date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:startDate",
                "type": "date"
            },
            "endDate": {
                "name": "endDate",
                "qname": "Interval:endDate",
                "label": "End date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:endDate",
                "type": "date"
            },
            "date": {
                "name": "date",
                "qname": "Interval:date",
                "label": "Date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:date",
                "type": "date"
            },
            "summary": {
                "name": "summary",
                "qname": "Interval:summary",
                "label": "Summary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:summary",
                "type": "text"
            },
            "recordId": {
                "name": "recordId",
                "qname": "Interval:recordId",
                "label": "Record ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:recordId",
                "type": "string"
            },
            "sourceUrl": {
                "name": "sourceUrl",
                "qname": "Interval:sourceUrl",
                "label": "Source URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:sourceUrl",
                "type": "url"
            },
            "alephUrl": {
                "name": "alephUrl",
                "qname": "Interval:alephUrl",
                "label": "Aleph URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:alephUrl",
                "type": "url"
            },
            "modifiedAt": {
                "name": "modifiedAt",
                "qname": "Interval:modifiedAt",
                "label": "Modified on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:modifiedAt",
                "type": "date"
            },
            "retrievedAt": {
                "name": "retrievedAt",
                "qname": "Interval:retrievedAt",
                "label": "Retrieved on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:retrievedAt",
                "type": "date"
            }
        }
    },
    "Record": {
        "label": "Record",
        "plural": "Records",
        "uri": "https://w3id.org/ftm#Record",
        "schemata": ["Record"],
        "extends": [],
        "abstract": true,
        "matchable": false,
        "description": null,
        "featured": [],
        "properties": {
            "index": {
                "name": "index",
                "qname": "Record:index",
                "label": "Index",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Record:index",
                "type": "number"
            }
        }
    },
    "Row": {
        "label": "Row",
        "plural": "Rows",
        "uri": "https://w3id.org/ftm#Row",
        "schemata": ["Record", "Row"],
        "extends": ["Record"],
        "abstract": false,
        "matchable": true,
        "description": null,
        "featured": [],
        "properties": {
            "cells": {
                "name": "cells",
                "qname": "Row:cells",
                "label": "Cells",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Row:cells",
                "type": "string"
            },
            "table": {
                "name": "table",
                "qname": "Row:table",
                "label": "Table",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/terms/isPartOf",
                "type": "entity",
                "schema": "Table",
                "reverse": "rows"
            },
            "index": {
                "name": "index",
                "qname": "Record:index",
                "label": "Index",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Record:index",
                "type": "number"
            }
        }
    },
    "Page": {
        "label": "Page",
        "plural": "Pages",
        "uri": "https://w3id.org/ftm#Page",
        "schemata": ["Record", "Page"],
        "extends": ["Record"],
        "abstract": false,
        "matchable": true,
        "description": null,
        "featured": [],
        "properties": {
            "bodyText": {
                "name": "bodyText",
                "qname": "Page:bodyText",
                "label": "Text",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Page:bodyText",
                "type": "text"
            },
            "document": {
                "name": "document",
                "qname": "Page:document",
                "label": "Document",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/terms/isPartOf",
                "type": "entity",
                "schema": "Pages",
                "reverse": "pages"
            },
            "index": {
                "name": "index",
                "qname": "Record:index",
                "label": "Index",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Record:index",
                "type": "number"
            }
        }
    },
    "PublicBody": {
        "label": "Public body",
        "plural": "Public bodies",
        "uri": "https://w3id.org/ftm#PublicBody",
        "schemata": ["Organization", "LegalEntity", "PublicBody", "Thing"],
        "extends": ["Organization"],
        "abstract": false,
        "matchable": true,
        "description": "A public body, such as a ministry, department or state company.",
        "featured": [],
        "properties": {
            "email": {
                "name": "email",
                "qname": "LegalEntity:email",
                "label": "E-Mail",
                "description": "Email address",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:email",
                "type": "email"
            },
            "phone": {
                "name": "phone",
                "qname": "LegalEntity:phone",
                "label": "Phone",
                "description": "Phone number",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:phone",
                "type": "phone"
            },
            "website": {
                "name": "website",
                "qname": "LegalEntity:website",
                "label": "Website",
                "description": "Website address",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:website",
                "type": "url"
            },
            "legalForm": {
                "name": "legalForm",
                "qname": "LegalEntity:legalForm",
                "label": "Legal form",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:legalForm",
                "type": "string"
            },
            "incorporationDate": {
                "name": "incorporationDate",
                "qname": "LegalEntity:incorporationDate",
                "label": "Incorporation date",
                "description": "The date the legal entity was incorporated",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:incorporationDate",
                "type": "date"
            },
            "dissolutionDate": {
                "name": "dissolutionDate",
                "qname": "LegalEntity:dissolutionDate",
                "label": "Dissolution date",
                "description": "The date the legal entity was dissolved, if applicable",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:dissolutionDate",
                "type": "date"
            },
            "taxStatus": {
                "name": "taxStatus",
                "qname": "LegalEntity:taxStatus",
                "label": "Tax status",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:taxStatus",
                "type": "string"
            },
            "status": {
                "name": "status",
                "qname": "LegalEntity:status",
                "label": "Status",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:status",
                "type": "string"
            },
            "sector": {
                "name": "sector",
                "qname": "LegalEntity:sector",
                "label": "Sector",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:sector",
                "type": "string"
            },
            "classification": {
                "name": "classification",
                "qname": "LegalEntity:classification",
                "label": "Classification",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:classification",
                "type": "string"
            },
            "registrationNumber": {
                "name": "registrationNumber",
                "qname": "LegalEntity:registrationNumber",
                "label": "Registration number",
                "description": "Company registration number",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:registrationNumber",
                "type": "identifier"
            },
            "idNumber": {
                "name": "idNumber",
                "qname": "LegalEntity:idNumber",
                "label": "ID Number",
                "description": "ID number of any applicable ID",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:idNumber",
                "type": "identifier"
            },
            "taxNumber": {
                "name": "taxNumber",
                "qname": "LegalEntity:taxNumber",
                "label": "Tax ID Number",
                "description": "Tax ID number",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:taxNumber",
                "type": "identifier"
            },
            "vatCode": {
                "name": "vatCode",
                "qname": "LegalEntity:vatCode",
                "label": "V.A.T. Identifier",
                "description": "(EU) VAT number",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:vatCode",
                "type": "identifier"
            },
            "jurisdiction": {
                "name": "jurisdiction",
                "qname": "LegalEntity:jurisdiction",
                "label": "Jurisdiction",
                "description": "Country or region in which this entity operates",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:jurisdiction",
                "type": "country"
            },
            "mainCountry": {
                "name": "mainCountry",
                "qname": "LegalEntity:mainCountry",
                "label": "Country of origin",
                "description": "Primary country of this entity",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:mainCountry",
                "type": "country"
            },
            "opencorporatesUrl": {
                "name": "opencorporatesUrl",
                "qname": "LegalEntity:opencorporatesUrl",
                "label": "OpenCorporates URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:opencorporatesUrl",
                "type": "url"
            },
            "bvdId": {
                "name": "bvdId",
                "qname": "LegalEntity:bvdId",
                "label": "Bureau van Dijk ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:bvdId",
                "type": "identifier"
            },
            "icijId": {
                "name": "icijId",
                "qname": "LegalEntity:icijId",
                "label": "ICIJ ID",
                "description": "ID according to International Consortium for Investigative Journalists",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:icijId",
                "type": "string"
            },
            "okpoCode": {
                "name": "okpoCode",
                "qname": "LegalEntity:okpoCode",
                "label": "OKPO",
                "description": "Russian industry classifier",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:okpoCode",
                "type": "identifier"
            },
            "innCode": {
                "name": "innCode",
                "qname": "LegalEntity:innCode",
                "label": "INN",
                "description": "Russian company ID",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:innCode",
                "type": "identifier"
            },
            "dunsCode": {
                "name": "dunsCode",
                "qname": "LegalEntity:dunsCode",
                "label": "D-U-N-S",
                "description": "Dun & Bradstreet identifier",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:dunsCode",
                "type": "identifier"
            },
            "swiftBic": {
                "name": "swiftBic",
                "qname": "LegalEntity:swiftBic",
                "label": "SWIFT/BIC",
                "description": "Bank identifier code",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:swiftBic",
                "type": "identifier"
            },
            "parent": {
                "name": "parent",
                "qname": "LegalEntity:parent",
                "label": "Parent company",
                "description": "If this entity is a subsidiary, another entity (company or organisation) is its parent",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:parent",
                "type": "entity",
                "schema": "LegalEntity",
                "reverse": "subsidiaries"
            },
            "subsidiaries": {
                "name": "subsidiaries",
                "qname": "LegalEntity:subsidiaries",
                "label": "Subsidiaries",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:subsidiaries",
                "type": "entity",
                "schema": "LegalEntity",
                "reverse": "parent"
            },
            "passport": {
                "name": "passport",
                "qname": "LegalEntity:passport",
                "label": "Passports",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:passport",
                "type": "entity",
                "schema": "Passport",
                "reverse": "holder"
            },
            "agencyClient": {
                "name": "agencyClient",
                "qname": "LegalEntity:agencyClient",
                "label": "Agency clients",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#LegalEntity:agencyClient",
                "type": "entity",
                "schema": "Representation",
                "reverse": "agent"
            },
            "agentRepresentation": {
                "name": "agentRepresentation",
                "qname": "LegalEntity:agentRepresentation",
                "label": "Agents",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#LegalEntity:agentRepresentation",
                "type": "entity",
                "schema": "Representation",
                "reverse": "client"
            },
            "contractAuthority": {
                "name": "contractAuthority",
                "qname": "LegalEntity:contractAuthority",
                "label": "Contracts issued",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#LegalEntity:contractAuthority",
                "type": "entity",
                "schema": "Contract",
                "reverse": "authority"
            },
            "name": {
                "name": "name",
                "qname": "Thing:name",
                "label": "Name",
                "description": null,
                "caption": true,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#prefLabel",
                "type": "name"
            },
            "sameAs": {
                "name": "sameAs",
                "qname": "Thing:sameAs",
                "label": "Same as",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2002/07/owl#sameAs",
                "type": "entity",
                "schema": "Thing",
                "reverse": "sameAs"
            },
            "summary": {
                "name": "summary",
                "qname": "Thing:summary",
                "label": "Summary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:summary",
                "type": "text"
            },
            "description": {
                "name": "description",
                "qname": "Thing:description",
                "label": "Description",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:description",
                "type": "string"
            },
            "country": {
                "name": "country",
                "qname": "Thing:country",
                "label": "Country",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:country",
                "type": "country"
            },
            "alias": {
                "name": "alias",
                "qname": "Thing:alias",
                "label": "Other name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#altLabel",
                "type": "name"
            },
            "previousName": {
                "name": "previousName",
                "qname": "Thing:previousName",
                "label": "Previous name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:previousName",
                "type": "name"
            },
            "weakAlias": {
                "name": "weakAlias",
                "qname": "Thing:weakAlias",
                "label": "Weak alias",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:weakAlias",
                "type": "string"
            },
            "sourceUrl": {
                "name": "sourceUrl",
                "qname": "Thing:sourceUrl",
                "label": "Source link",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:sourceUrl",
                "type": "url"
            },
            "alephUrl": {
                "name": "alephUrl",
                "qname": "Thing:alephUrl",
                "label": "Aleph URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:alephUrl",
                "type": "url"
            },
            "wikipediaUrl": {
                "name": "wikipediaUrl",
                "qname": "Thing:wikipediaUrl",
                "label": "Wikipedia Article",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikipediaUrl",
                "type": "url"
            },
            "wikidataId": {
                "name": "wikidataId",
                "qname": "Thing:wikidataId",
                "label": "Wikidata ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikidataId",
                "type": "identifier"
            },
            "keywords": {
                "name": "keywords",
                "qname": "Thing:keywords",
                "label": "Keywords",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:keywords",
                "type": "string"
            },
            "address": {
                "name": "address",
                "qname": "Thing:address",
                "label": "Address",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:address",
                "type": "address"
            },
            "program": {
                "name": "program",
                "qname": "Thing:program",
                "label": "Program",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:program",
                "type": "string"
            },
            "notes": {
                "name": "notes",
                "qname": "Thing:notes",
                "label": "Notes",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:notes",
                "type": "text"
            },
            "modifiedAt": {
                "name": "modifiedAt",
                "qname": "Thing:modifiedAt",
                "label": "Modified on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:modifiedAt",
                "type": "date"
            },
            "retrievedAt": {
                "name": "retrievedAt",
                "qname": "Thing:retrievedAt",
                "label": "Retrieved on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:retrievedAt",
                "type": "date"
            },
            "successors": {
                "name": "successors",
                "qname": "LegalEntity:successors",
                "label": "Successors",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#LegalEntity:successors",
                "type": "entity",
                "schema": "Succession",
                "reverse": "predecessor"
            },
            "predecessors": {
                "name": "predecessors",
                "qname": "LegalEntity:predecessors",
                "label": "Predecessors",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#LegalEntity:predecessors",
                "type": "entity",
                "schema": "Succession",
                "reverse": "successor"
            },
            "ownershipOwner": {
                "name": "ownershipOwner",
                "qname": "LegalEntity:ownershipOwner",
                "label": "Assets and shares",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#LegalEntity:ownershipOwner",
                "type": "entity",
                "schema": "Ownership",
                "reverse": "owner"
            }
        }
    },
    "Vehicle": {
        "label": "Vehicle",
        "plural": "Vehicles",
        "uri": "https://w3id.org/ftm#Vehicle",
        "schemata": ["Vehicle", "Value", "Asset", "Thing"],
        "extends": ["Asset"],
        "abstract": false,
        "matchable": false,
        "description": null,
        "featured": ["type", "name", "registrationNumber", "country", "owner"],
        "properties": {
            "registrationNumber": {
                "name": "registrationNumber",
                "qname": "Vehicle:registrationNumber",
                "label": "Registration Number",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Vehicle:registrationNumber",
                "type": "identifier"
            },
            "type": {
                "name": "type",
                "qname": "Vehicle:type",
                "label": "Type",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Vehicle:type",
                "type": "string"
            },
            "model": {
                "name": "model",
                "qname": "Vehicle:model",
                "label": "Model",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Vehicle:model",
                "type": "string"
            },
            "owner": {
                "name": "owner",
                "qname": "Vehicle:owner",
                "label": "Owner",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Vehicle:owner",
                "type": "entity"
            },
            "operator": {
                "name": "operator",
                "qname": "Vehicle:operator",
                "label": "Operator",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Vehicle:operator",
                "type": "entity"
            },
            "buildDate": {
                "name": "buildDate",
                "qname": "Vehicle:buildDate",
                "label": "Build Date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Vehicle:buildDate",
                "type": "date"
            },
            "country": {
                "name": "country",
                "qname": "Vehicle:country",
                "label": "Country",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Vehicle:country",
                "type": "country"
            },
            "registrationDate": {
                "name": "registrationDate",
                "qname": "Vehicle:registrationDate",
                "label": "Registration Date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Vehicle:registrationDate",
                "type": "date"
            },
            "name": {
                "name": "name",
                "qname": "Thing:name",
                "label": "Name",
                "description": null,
                "caption": true,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#prefLabel",
                "type": "name"
            },
            "sameAs": {
                "name": "sameAs",
                "qname": "Thing:sameAs",
                "label": "Same as",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2002/07/owl#sameAs",
                "type": "entity",
                "schema": "Thing",
                "reverse": "sameAs"
            },
            "summary": {
                "name": "summary",
                "qname": "Thing:summary",
                "label": "Summary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:summary",
                "type": "text"
            },
            "description": {
                "name": "description",
                "qname": "Thing:description",
                "label": "Description",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:description",
                "type": "string"
            },
            "alias": {
                "name": "alias",
                "qname": "Thing:alias",
                "label": "Other name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#altLabel",
                "type": "name"
            },
            "previousName": {
                "name": "previousName",
                "qname": "Thing:previousName",
                "label": "Previous name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:previousName",
                "type": "name"
            },
            "weakAlias": {
                "name": "weakAlias",
                "qname": "Thing:weakAlias",
                "label": "Weak alias",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:weakAlias",
                "type": "string"
            },
            "sourceUrl": {
                "name": "sourceUrl",
                "qname": "Thing:sourceUrl",
                "label": "Source link",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:sourceUrl",
                "type": "url"
            },
            "alephUrl": {
                "name": "alephUrl",
                "qname": "Thing:alephUrl",
                "label": "Aleph URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:alephUrl",
                "type": "url"
            },
            "wikipediaUrl": {
                "name": "wikipediaUrl",
                "qname": "Thing:wikipediaUrl",
                "label": "Wikipedia Article",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikipediaUrl",
                "type": "url"
            },
            "wikidataId": {
                "name": "wikidataId",
                "qname": "Thing:wikidataId",
                "label": "Wikidata ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikidataId",
                "type": "identifier"
            },
            "keywords": {
                "name": "keywords",
                "qname": "Thing:keywords",
                "label": "Keywords",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:keywords",
                "type": "string"
            },
            "address": {
                "name": "address",
                "qname": "Thing:address",
                "label": "Address",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:address",
                "type": "address"
            },
            "program": {
                "name": "program",
                "qname": "Thing:program",
                "label": "Program",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:program",
                "type": "string"
            },
            "notes": {
                "name": "notes",
                "qname": "Thing:notes",
                "label": "Notes",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:notes",
                "type": "text"
            },
            "modifiedAt": {
                "name": "modifiedAt",
                "qname": "Thing:modifiedAt",
                "label": "Modified on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:modifiedAt",
                "type": "date"
            },
            "retrievedAt": {
                "name": "retrievedAt",
                "qname": "Thing:retrievedAt",
                "label": "Retrieved on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:retrievedAt",
                "type": "date"
            },
            "amount": {
                "name": "amount",
                "qname": "Value:amount",
                "label": "Amount",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:amount",
                "type": "number"
            },
            "currency": {
                "name": "currency",
                "qname": "Value:currency",
                "label": "Currency",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:currency",
                "type": "string"
            },
            "amountUsd": {
                "name": "amountUsd",
                "qname": "Value:amountUsd",
                "label": "Amount in USD",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:amountUsd",
                "type": "number"
            },
            "amountEur": {
                "name": "amountEur",
                "qname": "Value:amountEur",
                "label": "Amount in EUR",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:amountEur",
                "type": "number"
            },
            "ownershipAsset": {
                "name": "ownershipAsset",
                "qname": "Asset:ownershipAsset",
                "label": "Owners",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Asset:ownershipAsset",
                "type": "entity",
                "schema": "Ownership",
                "reverse": "asset"
            },
            "courtCase": {
                "name": "courtCase",
                "qname": "Thing:courtCase",
                "label": "Court cases",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Thing:courtCase",
                "type": "entity",
                "schema": "CourtCaseParty",
                "reverse": "party"
            },
            "sanctionEntity": {
                "name": "sanctionEntity",
                "qname": "Thing:sanctionEntity",
                "label": "Sanctions",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Thing:sanctionEntity",
                "type": "entity",
                "schema": "Sanction",
                "reverse": "entity"
            }
        }
    },
    "CourtCaseParty": {
        "label": "Party",
        "plural": "Party",
        "uri": "https://w3id.org/ftm#CourtCaseParty",
        "schemata": ["Interval", "CourtCaseParty", "Interest"],
        "extends": ["Interest"],
        "abstract": false,
        "matchable": false,
        "description": null,
        "featured": ["party", "case", "role"],
        "properties": {
            "party": {
                "name": "party",
                "qname": "CourtCaseParty:party",
                "label": "Party",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#CourtCaseParty:party",
                "type": "entity",
                "schema": "Thing",
                "reverse": "courtCase"
            },
            "case": {
                "name": "case",
                "qname": "CourtCaseParty:case",
                "label": "Case",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#CourtCaseParty:case",
                "type": "entity",
                "schema": "CourtCase",
                "reverse": "parties"
            },
            "role": {
                "name": "role",
                "qname": "Interest:role",
                "label": "Role",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interest:role",
                "type": "string"
            },
            "status": {
                "name": "status",
                "qname": "Interest:status",
                "label": "Status",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interest:status",
                "type": "string"
            },
            "startDate": {
                "name": "startDate",
                "qname": "Interval:startDate",
                "label": "Start date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:startDate",
                "type": "date"
            },
            "endDate": {
                "name": "endDate",
                "qname": "Interval:endDate",
                "label": "End date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:endDate",
                "type": "date"
            },
            "date": {
                "name": "date",
                "qname": "Interval:date",
                "label": "Date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:date",
                "type": "date"
            },
            "summary": {
                "name": "summary",
                "qname": "Interval:summary",
                "label": "Summary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:summary",
                "type": "text"
            },
            "recordId": {
                "name": "recordId",
                "qname": "Interval:recordId",
                "label": "Record ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:recordId",
                "type": "string"
            },
            "sourceUrl": {
                "name": "sourceUrl",
                "qname": "Interval:sourceUrl",
                "label": "Source URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:sourceUrl",
                "type": "url"
            },
            "alephUrl": {
                "name": "alephUrl",
                "qname": "Interval:alephUrl",
                "label": "Aleph URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:alephUrl",
                "type": "url"
            },
            "modifiedAt": {
                "name": "modifiedAt",
                "qname": "Interval:modifiedAt",
                "label": "Modified on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:modifiedAt",
                "type": "date"
            },
            "retrievedAt": {
                "name": "retrievedAt",
                "qname": "Interval:retrievedAt",
                "label": "Retrieved on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:retrievedAt",
                "type": "date"
            }
        }
    },
    "Event": {
        "label": "Event",
        "plural": "Event",
        "uri": "https://w3id.org/ftm#Event",
        "schemata": ["Event", "Interval"],
        "extends": ["Interval"],
        "abstract": false,
        "matchable": false,
        "description": null,
        "featured": [],
        "properties": {
            "location": {
                "name": "location",
                "qname": "Event:location",
                "label": "Location",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Event:location",
                "type": "string"
            },
            "country": {
                "name": "country",
                "qname": "Event:country",
                "label": "Country",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Event:country",
                "type": "country"
            },
            "startDate": {
                "name": "startDate",
                "qname": "Interval:startDate",
                "label": "Start date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:startDate",
                "type": "date"
            },
            "endDate": {
                "name": "endDate",
                "qname": "Interval:endDate",
                "label": "End date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:endDate",
                "type": "date"
            },
            "date": {
                "name": "date",
                "qname": "Interval:date",
                "label": "Date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:date",
                "type": "date"
            },
            "summary": {
                "name": "summary",
                "qname": "Interval:summary",
                "label": "Summary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:summary",
                "type": "text"
            },
            "recordId": {
                "name": "recordId",
                "qname": "Interval:recordId",
                "label": "Record ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:recordId",
                "type": "string"
            },
            "sourceUrl": {
                "name": "sourceUrl",
                "qname": "Interval:sourceUrl",
                "label": "Source URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:sourceUrl",
                "type": "url"
            },
            "alephUrl": {
                "name": "alephUrl",
                "qname": "Interval:alephUrl",
                "label": "Aleph URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:alephUrl",
                "type": "url"
            },
            "modifiedAt": {
                "name": "modifiedAt",
                "qname": "Interval:modifiedAt",
                "label": "Modified on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:modifiedAt",
                "type": "date"
            },
            "retrievedAt": {
                "name": "retrievedAt",
                "qname": "Interval:retrievedAt",
                "label": "Retrieved on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:retrievedAt",
                "type": "date"
            }
        }
    },
    "TaxRoll": {
        "label": "Tax Roll",
        "plural": "Tax Rolls",
        "uri": "https://w3id.org/ftm#TaxRoll",
        "schemata": ["TaxRoll", "Thing"],
        "extends": ["Thing"],
        "abstract": false,
        "matchable": false,
        "description": "A tax declaration of an individual",
        "featured": ["name", "income", "wealth", "taxPaid"],
        "properties": {
            "person": {
                "name": "person",
                "qname": "TaxRoll:person",
                "label": "Person",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#TaxRoll:person",
                "type": "entity",
                "schema": "Person"
            },
            "income": {
                "name": "income",
                "qname": "TaxRoll:income",
                "label": "Registered income",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#TaxRoll:income",
                "type": "string"
            },
            "taxPaid": {
                "name": "taxPaid",
                "qname": "TaxRoll:taxPaid",
                "label": "Amount of tax paid",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#TaxRoll:taxPaid",
                "type": "string"
            },
            "wealth": {
                "name": "wealth",
                "qname": "TaxRoll:wealth",
                "label": "Registered wealth",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#TaxRoll:wealth",
                "type": "string"
            },
            "name": {
                "name": "name",
                "qname": "Thing:name",
                "label": "Name",
                "description": null,
                "caption": true,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#prefLabel",
                "type": "name"
            },
            "sameAs": {
                "name": "sameAs",
                "qname": "Thing:sameAs",
                "label": "Same as",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2002/07/owl#sameAs",
                "type": "entity",
                "schema": "Thing",
                "reverse": "sameAs"
            },
            "summary": {
                "name": "summary",
                "qname": "Thing:summary",
                "label": "Summary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:summary",
                "type": "text"
            },
            "description": {
                "name": "description",
                "qname": "Thing:description",
                "label": "Description",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:description",
                "type": "string"
            },
            "country": {
                "name": "country",
                "qname": "Thing:country",
                "label": "Country",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:country",
                "type": "country"
            },
            "alias": {
                "name": "alias",
                "qname": "Thing:alias",
                "label": "Other name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#altLabel",
                "type": "name"
            },
            "previousName": {
                "name": "previousName",
                "qname": "Thing:previousName",
                "label": "Previous name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:previousName",
                "type": "name"
            },
            "weakAlias": {
                "name": "weakAlias",
                "qname": "Thing:weakAlias",
                "label": "Weak alias",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:weakAlias",
                "type": "string"
            },
            "sourceUrl": {
                "name": "sourceUrl",
                "qname": "Thing:sourceUrl",
                "label": "Source link",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:sourceUrl",
                "type": "url"
            },
            "alephUrl": {
                "name": "alephUrl",
                "qname": "Thing:alephUrl",
                "label": "Aleph URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:alephUrl",
                "type": "url"
            },
            "wikipediaUrl": {
                "name": "wikipediaUrl",
                "qname": "Thing:wikipediaUrl",
                "label": "Wikipedia Article",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikipediaUrl",
                "type": "url"
            },
            "wikidataId": {
                "name": "wikidataId",
                "qname": "Thing:wikidataId",
                "label": "Wikidata ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikidataId",
                "type": "identifier"
            },
            "keywords": {
                "name": "keywords",
                "qname": "Thing:keywords",
                "label": "Keywords",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:keywords",
                "type": "string"
            },
            "address": {
                "name": "address",
                "qname": "Thing:address",
                "label": "Address",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:address",
                "type": "address"
            },
            "program": {
                "name": "program",
                "qname": "Thing:program",
                "label": "Program",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:program",
                "type": "string"
            },
            "notes": {
                "name": "notes",
                "qname": "Thing:notes",
                "label": "Notes",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:notes",
                "type": "text"
            },
            "modifiedAt": {
                "name": "modifiedAt",
                "qname": "Thing:modifiedAt",
                "label": "Modified on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:modifiedAt",
                "type": "date"
            },
            "retrievedAt": {
                "name": "retrievedAt",
                "qname": "Thing:retrievedAt",
                "label": "Retrieved on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:retrievedAt",
                "type": "date"
            },
            "courtCase": {
                "name": "courtCase",
                "qname": "Thing:courtCase",
                "label": "Court cases",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Thing:courtCase",
                "type": "entity",
                "schema": "CourtCaseParty",
                "reverse": "party"
            }
        }
    },
    "Organization": {
        "label": "Organization",
        "plural": "Organizations",
        "uri": "https://w3id.org/ftm#Organization",
        "schemata": ["Organization", "LegalEntity", "Thing"],
        "extends": ["LegalEntity"],
        "abstract": false,
        "matchable": true,
        "description": null,
        "featured": [],
        "properties": {
            "email": {
                "name": "email",
                "qname": "LegalEntity:email",
                "label": "E-Mail",
                "description": "Email address",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:email",
                "type": "email"
            },
            "phone": {
                "name": "phone",
                "qname": "LegalEntity:phone",
                "label": "Phone",
                "description": "Phone number",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:phone",
                "type": "phone"
            },
            "website": {
                "name": "website",
                "qname": "LegalEntity:website",
                "label": "Website",
                "description": "Website address",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:website",
                "type": "url"
            },
            "legalForm": {
                "name": "legalForm",
                "qname": "LegalEntity:legalForm",
                "label": "Legal form",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:legalForm",
                "type": "string"
            },
            "incorporationDate": {
                "name": "incorporationDate",
                "qname": "LegalEntity:incorporationDate",
                "label": "Incorporation date",
                "description": "The date the legal entity was incorporated",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:incorporationDate",
                "type": "date"
            },
            "dissolutionDate": {
                "name": "dissolutionDate",
                "qname": "LegalEntity:dissolutionDate",
                "label": "Dissolution date",
                "description": "The date the legal entity was dissolved, if applicable",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:dissolutionDate",
                "type": "date"
            },
            "taxStatus": {
                "name": "taxStatus",
                "qname": "LegalEntity:taxStatus",
                "label": "Tax status",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:taxStatus",
                "type": "string"
            },
            "status": {
                "name": "status",
                "qname": "LegalEntity:status",
                "label": "Status",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:status",
                "type": "string"
            },
            "sector": {
                "name": "sector",
                "qname": "LegalEntity:sector",
                "label": "Sector",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:sector",
                "type": "string"
            },
            "classification": {
                "name": "classification",
                "qname": "LegalEntity:classification",
                "label": "Classification",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:classification",
                "type": "string"
            },
            "registrationNumber": {
                "name": "registrationNumber",
                "qname": "LegalEntity:registrationNumber",
                "label": "Registration number",
                "description": "Company registration number",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:registrationNumber",
                "type": "identifier"
            },
            "idNumber": {
                "name": "idNumber",
                "qname": "LegalEntity:idNumber",
                "label": "ID Number",
                "description": "ID number of any applicable ID",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:idNumber",
                "type": "identifier"
            },
            "taxNumber": {
                "name": "taxNumber",
                "qname": "LegalEntity:taxNumber",
                "label": "Tax ID Number",
                "description": "Tax ID number",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:taxNumber",
                "type": "identifier"
            },
            "vatCode": {
                "name": "vatCode",
                "qname": "LegalEntity:vatCode",
                "label": "V.A.T. Identifier",
                "description": "(EU) VAT number",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:vatCode",
                "type": "identifier"
            },
            "jurisdiction": {
                "name": "jurisdiction",
                "qname": "LegalEntity:jurisdiction",
                "label": "Jurisdiction",
                "description": "Country or region in which this entity operates",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:jurisdiction",
                "type": "country"
            },
            "mainCountry": {
                "name": "mainCountry",
                "qname": "LegalEntity:mainCountry",
                "label": "Country of origin",
                "description": "Primary country of this entity",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:mainCountry",
                "type": "country"
            },
            "opencorporatesUrl": {
                "name": "opencorporatesUrl",
                "qname": "LegalEntity:opencorporatesUrl",
                "label": "OpenCorporates URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:opencorporatesUrl",
                "type": "url"
            },
            "bvdId": {
                "name": "bvdId",
                "qname": "LegalEntity:bvdId",
                "label": "Bureau van Dijk ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:bvdId",
                "type": "identifier"
            },
            "icijId": {
                "name": "icijId",
                "qname": "LegalEntity:icijId",
                "label": "ICIJ ID",
                "description": "ID according to International Consortium for Investigative Journalists",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:icijId",
                "type": "string"
            },
            "okpoCode": {
                "name": "okpoCode",
                "qname": "LegalEntity:okpoCode",
                "label": "OKPO",
                "description": "Russian industry classifier",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:okpoCode",
                "type": "identifier"
            },
            "innCode": {
                "name": "innCode",
                "qname": "LegalEntity:innCode",
                "label": "INN",
                "description": "Russian company ID",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:innCode",
                "type": "identifier"
            },
            "dunsCode": {
                "name": "dunsCode",
                "qname": "LegalEntity:dunsCode",
                "label": "D-U-N-S",
                "description": "Dun & Bradstreet identifier",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:dunsCode",
                "type": "identifier"
            },
            "swiftBic": {
                "name": "swiftBic",
                "qname": "LegalEntity:swiftBic",
                "label": "SWIFT/BIC",
                "description": "Bank identifier code",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:swiftBic",
                "type": "identifier"
            },
            "parent": {
                "name": "parent",
                "qname": "LegalEntity:parent",
                "label": "Parent company",
                "description": "If this entity is a subsidiary, another entity (company or organisation) is its parent",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:parent",
                "type": "entity",
                "schema": "LegalEntity",
                "reverse": "subsidiaries"
            },
            "subsidiaries": {
                "name": "subsidiaries",
                "qname": "LegalEntity:subsidiaries",
                "label": "Subsidiaries",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:subsidiaries",
                "type": "entity",
                "schema": "LegalEntity",
                "reverse": "parent"
            },
            "passport": {
                "name": "passport",
                "qname": "LegalEntity:passport",
                "label": "Passports",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:passport",
                "type": "entity",
                "schema": "Passport",
                "reverse": "holder"
            },
            "agencyClient": {
                "name": "agencyClient",
                "qname": "LegalEntity:agencyClient",
                "label": "Agency clients",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#LegalEntity:agencyClient",
                "type": "entity",
                "schema": "Representation",
                "reverse": "agent"
            },
            "agentRepresentation": {
                "name": "agentRepresentation",
                "qname": "LegalEntity:agentRepresentation",
                "label": "Agents",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#LegalEntity:agentRepresentation",
                "type": "entity",
                "schema": "Representation",
                "reverse": "client"
            },
            "contractAuthority": {
                "name": "contractAuthority",
                "qname": "LegalEntity:contractAuthority",
                "label": "Contracts issued",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#LegalEntity:contractAuthority",
                "type": "entity",
                "schema": "Contract",
                "reverse": "authority"
            },
            "name": {
                "name": "name",
                "qname": "Thing:name",
                "label": "Name",
                "description": null,
                "caption": true,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#prefLabel",
                "type": "name"
            },
            "sameAs": {
                "name": "sameAs",
                "qname": "Thing:sameAs",
                "label": "Same as",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2002/07/owl#sameAs",
                "type": "entity",
                "schema": "Thing",
                "reverse": "sameAs"
            },
            "summary": {
                "name": "summary",
                "qname": "Thing:summary",
                "label": "Summary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:summary",
                "type": "text"
            },
            "description": {
                "name": "description",
                "qname": "Thing:description",
                "label": "Description",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:description",
                "type": "string"
            },
            "country": {
                "name": "country",
                "qname": "Thing:country",
                "label": "Country",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:country",
                "type": "country"
            },
            "alias": {
                "name": "alias",
                "qname": "Thing:alias",
                "label": "Other name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#altLabel",
                "type": "name"
            },
            "previousName": {
                "name": "previousName",
                "qname": "Thing:previousName",
                "label": "Previous name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:previousName",
                "type": "name"
            },
            "weakAlias": {
                "name": "weakAlias",
                "qname": "Thing:weakAlias",
                "label": "Weak alias",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:weakAlias",
                "type": "string"
            },
            "sourceUrl": {
                "name": "sourceUrl",
                "qname": "Thing:sourceUrl",
                "label": "Source link",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:sourceUrl",
                "type": "url"
            },
            "alephUrl": {
                "name": "alephUrl",
                "qname": "Thing:alephUrl",
                "label": "Aleph URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:alephUrl",
                "type": "url"
            },
            "wikipediaUrl": {
                "name": "wikipediaUrl",
                "qname": "Thing:wikipediaUrl",
                "label": "Wikipedia Article",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikipediaUrl",
                "type": "url"
            },
            "wikidataId": {
                "name": "wikidataId",
                "qname": "Thing:wikidataId",
                "label": "Wikidata ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikidataId",
                "type": "identifier"
            },
            "keywords": {
                "name": "keywords",
                "qname": "Thing:keywords",
                "label": "Keywords",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:keywords",
                "type": "string"
            },
            "address": {
                "name": "address",
                "qname": "Thing:address",
                "label": "Address",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:address",
                "type": "address"
            },
            "program": {
                "name": "program",
                "qname": "Thing:program",
                "label": "Program",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:program",
                "type": "string"
            },
            "notes": {
                "name": "notes",
                "qname": "Thing:notes",
                "label": "Notes",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:notes",
                "type": "text"
            },
            "modifiedAt": {
                "name": "modifiedAt",
                "qname": "Thing:modifiedAt",
                "label": "Modified on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:modifiedAt",
                "type": "date"
            },
            "retrievedAt": {
                "name": "retrievedAt",
                "qname": "Thing:retrievedAt",
                "label": "Retrieved on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:retrievedAt",
                "type": "date"
            },
            "successors": {
                "name": "successors",
                "qname": "LegalEntity:successors",
                "label": "Successors",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#LegalEntity:successors",
                "type": "entity",
                "schema": "Succession",
                "reverse": "predecessor"
            },
            "predecessors": {
                "name": "predecessors",
                "qname": "LegalEntity:predecessors",
                "label": "Predecessors",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#LegalEntity:predecessors",
                "type": "entity",
                "schema": "Succession",
                "reverse": "successor"
            },
            "ownershipOwner": {
                "name": "ownershipOwner",
                "qname": "LegalEntity:ownershipOwner",
                "label": "Assets and shares",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#LegalEntity:ownershipOwner",
                "type": "entity",
                "schema": "Ownership",
                "reverse": "owner"
            },
            "courtCase": {
                "name": "courtCase",
                "qname": "Thing:courtCase",
                "label": "Court cases",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Thing:courtCase",
                "type": "entity",
                "schema": "CourtCaseParty",
                "reverse": "party"
            },
            "membershipOrganization": {
                "name": "membershipOrganization",
                "qname": "Organization:membershipOrganization",
                "label": "Members",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Organization:membershipOrganization",
                "type": "entity",
                "schema": "Membership",
                "reverse": "organization"
            },
            "contractAwardSupplier": {
                "name": "contractAwardSupplier",
                "qname": "LegalEntity:contractAwardSupplier",
                "label": "Contracts awarded",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#LegalEntity:contractAwardSupplier",
                "type": "entity",
                "schema": "ContractAward",
                "reverse": "supplier"
            },
            "paymentPayer": {
                "name": "paymentPayer",
                "qname": "LegalEntity:paymentPayer",
                "label": "Payments made",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#LegalEntity:paymentPayer",
                "type": "entity",
                "schema": "Payment",
                "reverse": "payer"
            },
            "paymentBeneficiary": {
                "name": "paymentBeneficiary",
                "qname": "LegalEntity:paymentBeneficiary",
                "label": "Payments received",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#LegalEntity:paymentBeneficiary",
                "type": "entity",
                "schema": "Payment",
                "reverse": "beneficiary"
            },
            "membershipMember": {
                "name": "membershipMember",
                "qname": "LegalEntity:membershipMember",
                "label": "Memberships",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#LegalEntity:membershipMember",
                "type": "entity",
                "schema": "Membership",
                "reverse": "member"
            },
            "sanctionEntity": {
                "name": "sanctionEntity",
                "qname": "Thing:sanctionEntity",
                "label": "Sanctions",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Thing:sanctionEntity",
                "type": "entity",
                "schema": "Sanction",
                "reverse": "entity"
            },
            "directorshipOrganization": {
                "name": "directorshipOrganization",
                "qname": "Organization:directorshipOrganization",
                "label": "Directors",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Organization:directorshipOrganization",
                "type": "entity",
                "schema": "Directorship",
                "reverse": "organization"
            }
        }
    },
    "Associate": {
        "label": "Associate",
        "plural": "Associate",
        "uri": "https://w3id.org/ftm#Associate",
        "schemata": ["Interval", "Relationship", "Associate"],
        "extends": ["Relationship"],
        "abstract": false,
        "matchable": false,
        "description": "Non-family association between two people",
        "featured": ["person", "associate", "relationship"],
        "properties": {
            "associate": {
                "name": "associate",
                "qname": "Associate:associate",
                "label": "Associate",
                "description": "An associate of the subject person.",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Associate:associate",
                "type": "entity",
                "schema": "Person",
                "reverse": "associates"
            },
            "person": {
                "name": "person",
                "qname": "Relationship:person",
                "label": "Person",
                "description": "The subject of the familial relation.",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Relationship:person",
                "type": "entity",
                "schema": "Person",
                "reverse": "relationshipPerson"
            },
            "relationship": {
                "name": "relationship",
                "qname": "Relationship:relationship",
                "label": "Relationship",
                "description": "Nature of the relationship, from the *person's* perspective eg. 'mother', where 'relative' is mother of 'person'.",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Relationship:relationship",
                "type": "string"
            },
            "supportingDocumentType": {
                "name": "supportingDocumentType",
                "qname": "Relationship:supportingDocumentType",
                "label": "Supporting document",
                "description": "Eg. birth certificate, marriage license. This is *not* just the data source.",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Relationship:supportingDocumentType",
                "type": "string"
            },
            "supportingDocumentNumber": {
                "name": "supportingDocumentNumber",
                "qname": "Relationship:supportingDocumentNumber",
                "label": "Supporting document number",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Relationship:supportingDocumentNumber",
                "type": "string"
            },
            "startDate": {
                "name": "startDate",
                "qname": "Interval:startDate",
                "label": "Start date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:startDate",
                "type": "date"
            },
            "endDate": {
                "name": "endDate",
                "qname": "Interval:endDate",
                "label": "End date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:endDate",
                "type": "date"
            },
            "date": {
                "name": "date",
                "qname": "Interval:date",
                "label": "Date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:date",
                "type": "date"
            },
            "summary": {
                "name": "summary",
                "qname": "Interval:summary",
                "label": "Summary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:summary",
                "type": "text"
            },
            "recordId": {
                "name": "recordId",
                "qname": "Interval:recordId",
                "label": "Record ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:recordId",
                "type": "string"
            },
            "sourceUrl": {
                "name": "sourceUrl",
                "qname": "Interval:sourceUrl",
                "label": "Source URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:sourceUrl",
                "type": "url"
            },
            "alephUrl": {
                "name": "alephUrl",
                "qname": "Interval:alephUrl",
                "label": "Aleph URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:alephUrl",
                "type": "url"
            },
            "modifiedAt": {
                "name": "modifiedAt",
                "qname": "Interval:modifiedAt",
                "label": "Modified on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:modifiedAt",
                "type": "date"
            },
            "retrievedAt": {
                "name": "retrievedAt",
                "qname": "Interval:retrievedAt",
                "label": "Retrieved on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:retrievedAt",
                "type": "date"
            }
        }
    },
    "Interest": {
        "label": "Interest",
        "plural": "Interest",
        "uri": "https://w3id.org/ftm#Interest",
        "schemata": ["Interval", "Interest"],
        "extends": ["Interval"],
        "abstract": false,
        "matchable": false,
        "description": null,
        "featured": ["role", "startDate", "endDate"],
        "properties": {
            "role": {
                "name": "role",
                "qname": "Interest:role",
                "label": "Role",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interest:role",
                "type": "string"
            },
            "status": {
                "name": "status",
                "qname": "Interest:status",
                "label": "Status",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interest:status",
                "type": "string"
            },
            "startDate": {
                "name": "startDate",
                "qname": "Interval:startDate",
                "label": "Start date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:startDate",
                "type": "date"
            },
            "endDate": {
                "name": "endDate",
                "qname": "Interval:endDate",
                "label": "End date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:endDate",
                "type": "date"
            },
            "date": {
                "name": "date",
                "qname": "Interval:date",
                "label": "Date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:date",
                "type": "date"
            },
            "summary": {
                "name": "summary",
                "qname": "Interval:summary",
                "label": "Summary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:summary",
                "type": "text"
            },
            "recordId": {
                "name": "recordId",
                "qname": "Interval:recordId",
                "label": "Record ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:recordId",
                "type": "string"
            },
            "sourceUrl": {
                "name": "sourceUrl",
                "qname": "Interval:sourceUrl",
                "label": "Source URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:sourceUrl",
                "type": "url"
            },
            "alephUrl": {
                "name": "alephUrl",
                "qname": "Interval:alephUrl",
                "label": "Aleph URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:alephUrl",
                "type": "url"
            },
            "modifiedAt": {
                "name": "modifiedAt",
                "qname": "Interval:modifiedAt",
                "label": "Modified on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:modifiedAt",
                "type": "date"
            },
            "retrievedAt": {
                "name": "retrievedAt",
                "qname": "Interval:retrievedAt",
                "label": "Retrieved on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:retrievedAt",
                "type": "date"
            }
        }
    },
    "Document": {
        "label": "File",
        "plural": "Files",
        "uri": "https://w3id.org/ftm#Document",
        "schemata": ["Thing", "Document"],
        "extends": ["Thing"],
        "abstract": false,
        "matchable": false,
        "description": null,
        "featured": [],
        "properties": {
            "contentHash": {
                "name": "contentHash",
                "qname": "Document:contentHash",
                "label": "Content checksum",
                "description": "SHA1 hash of the data",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:contentHash",
                "type": "identifier"
            },
            "title": {
                "name": "title",
                "qname": "Document:title",
                "label": "Title",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/elements/1.1/title",
                "type": "string"
            },
            "processingStatus": {
                "name": "processingStatus",
                "qname": "Document:processingStatus",
                "label": "Processing status",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:processingStatus",
                "type": "string"
            },
            "processingError": {
                "name": "processingError",
                "qname": "Document:processingError",
                "label": "Error message",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:processingError",
                "type": "string"
            },
            "author": {
                "name": "author",
                "qname": "Document:author",
                "label": "Author",
                "description": "The original author, not the uploader",
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/elements/1.1/creator",
                "type": "string"
            },
            "generator": {
                "name": "generator",
                "qname": "Document:generator",
                "label": "Generator",
                "description": "The program used to generate this file",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:generator",
                "type": "string"
            },
            "crawler": {
                "name": "crawler",
                "qname": "Document:crawler",
                "label": "Crawler",
                "description": "The crawler used to acquire this file",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:crawler",
                "type": "string"
            },
            "fileSize": {
                "name": "fileSize",
                "qname": "Document:fileSize",
                "label": "File size",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:fileSize",
                "type": "number"
            },
            "fileName": {
                "name": "fileName",
                "qname": "Document:fileName",
                "label": "File name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:fileName",
                "type": "string"
            },
            "extension": {
                "name": "extension",
                "qname": "Document:extension",
                "label": "File extension",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:extension",
                "type": "string"
            },
            "encoding": {
                "name": "encoding",
                "qname": "Document:encoding",
                "label": "File encoding",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:encoding",
                "type": "string"
            },
            "messageId": {
                "name": "messageId",
                "qname": "Document:messageId",
                "label": "Message ID",
                "description": "Message ID of a document; unique in most cases",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:messageId",
                "type": "identifier"
            },
            "headers": {
                "name": "headers",
                "qname": "Document:headers",
                "label": "Raw headers",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:headers",
                "type": "string"
            },
            "mimeType": {
                "name": "mimeType",
                "qname": "Document:mimeType",
                "label": "MIME type",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/terms/format",
                "type": "mimetype"
            },
            "language": {
                "name": "language",
                "qname": "Document:language",
                "label": "Language",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/terms/language",
                "type": "string"
            },
            "date": {
                "name": "date",
                "qname": "Document:date",
                "label": "Date",
                "description": "If not otherwise specified",
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/elements/1.1/date",
                "type": "date"
            },
            "authoredAt": {
                "name": "authoredAt",
                "qname": "Document:authoredAt",
                "label": "Authored on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:authoredAt",
                "type": "date"
            },
            "publishedAt": {
                "name": "publishedAt",
                "qname": "Document:publishedAt",
                "label": "Published on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:publishedAt",
                "type": "date"
            },
            "parent": {
                "name": "parent",
                "qname": "Document:parent",
                "label": "Parent document",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/terms/isPartOf",
                "type": "entity",
                "schema": "Folder",
                "reverse": "children"
            },
            "namesMentioned": {
                "name": "namesMentioned",
                "qname": "Document:namesMentioned",
                "label": "Mentioned names",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:namesMentioned",
                "type": "name"
            },
            "ibanMentioned": {
                "name": "ibanMentioned",
                "qname": "Document:ibanMentioned",
                "label": "IBANs",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:ibanMentioned",
                "type": "iban"
            },
            "ipMentioned": {
                "name": "ipMentioned",
                "qname": "Document:ipMentioned",
                "label": "IP addresses",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:ipMentioned",
                "type": "ip"
            },
            "locationMentioned": {
                "name": "locationMentioned",
                "qname": "Document:locationMentioned",
                "label": "Locations",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:locationMentioned",
                "type": "address"
            },
            "phoneMentioned": {
                "name": "phoneMentioned",
                "qname": "Document:phoneMentioned",
                "label": "Phone numbers",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:phoneMentioned",
                "type": "phone"
            },
            "emailMentioned": {
                "name": "emailMentioned",
                "qname": "Document:emailMentioned",
                "label": "E-Mail addresses",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:emailMentioned",
                "type": "email"
            },
            "pdfAlternativeHash": {
                "name": "pdfAlternativeHash",
                "qname": "Document:pdfAlternativeHash",
                "label": "PDF alternative version checksum",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:pdfAlternativeHash",
                "type": "identifier"
            },
            "name": {
                "name": "name",
                "qname": "Thing:name",
                "label": "Name",
                "description": null,
                "caption": true,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#prefLabel",
                "type": "name"
            },
            "sameAs": {
                "name": "sameAs",
                "qname": "Thing:sameAs",
                "label": "Same as",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2002/07/owl#sameAs",
                "type": "entity",
                "schema": "Thing",
                "reverse": "sameAs"
            },
            "summary": {
                "name": "summary",
                "qname": "Thing:summary",
                "label": "Summary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:summary",
                "type": "text"
            },
            "description": {
                "name": "description",
                "qname": "Thing:description",
                "label": "Description",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:description",
                "type": "string"
            },
            "country": {
                "name": "country",
                "qname": "Thing:country",
                "label": "Country",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:country",
                "type": "country"
            },
            "alias": {
                "name": "alias",
                "qname": "Thing:alias",
                "label": "Other name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#altLabel",
                "type": "name"
            },
            "previousName": {
                "name": "previousName",
                "qname": "Thing:previousName",
                "label": "Previous name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:previousName",
                "type": "name"
            },
            "weakAlias": {
                "name": "weakAlias",
                "qname": "Thing:weakAlias",
                "label": "Weak alias",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:weakAlias",
                "type": "string"
            },
            "sourceUrl": {
                "name": "sourceUrl",
                "qname": "Thing:sourceUrl",
                "label": "Source link",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:sourceUrl",
                "type": "url"
            },
            "alephUrl": {
                "name": "alephUrl",
                "qname": "Thing:alephUrl",
                "label": "Aleph URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:alephUrl",
                "type": "url"
            },
            "wikipediaUrl": {
                "name": "wikipediaUrl",
                "qname": "Thing:wikipediaUrl",
                "label": "Wikipedia Article",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikipediaUrl",
                "type": "url"
            },
            "wikidataId": {
                "name": "wikidataId",
                "qname": "Thing:wikidataId",
                "label": "Wikidata ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikidataId",
                "type": "identifier"
            },
            "keywords": {
                "name": "keywords",
                "qname": "Thing:keywords",
                "label": "Keywords",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:keywords",
                "type": "string"
            },
            "address": {
                "name": "address",
                "qname": "Thing:address",
                "label": "Address",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:address",
                "type": "address"
            },
            "program": {
                "name": "program",
                "qname": "Thing:program",
                "label": "Program",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:program",
                "type": "string"
            },
            "notes": {
                "name": "notes",
                "qname": "Thing:notes",
                "label": "Notes",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:notes",
                "type": "text"
            },
            "modifiedAt": {
                "name": "modifiedAt",
                "qname": "Thing:modifiedAt",
                "label": "Modified on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:modifiedAt",
                "type": "date"
            },
            "retrievedAt": {
                "name": "retrievedAt",
                "qname": "Thing:retrievedAt",
                "label": "Retrieved on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:retrievedAt",
                "type": "date"
            },
            "courtCase": {
                "name": "courtCase",
                "qname": "Thing:courtCase",
                "label": "Court cases",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Thing:courtCase",
                "type": "entity",
                "schema": "CourtCaseParty",
                "reverse": "party"
            }
        }
    },
    "PlainText": {
        "label": "Text file",
        "plural": "Text files",
        "uri": "https://w3id.org/ftm#PlainText",
        "schemata": ["Document", "Thing", "PlainText"],
        "extends": ["Document"],
        "abstract": false,
        "matchable": false,
        "description": null,
        "featured": [],
        "properties": {
            "bodyText": {
                "name": "bodyText",
                "qname": "PlainText:bodyText",
                "label": "Text",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#PlainText:bodyText",
                "type": "text"
            },
            "contentHash": {
                "name": "contentHash",
                "qname": "Document:contentHash",
                "label": "Content checksum",
                "description": "SHA1 hash of the data",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:contentHash",
                "type": "identifier"
            },
            "title": {
                "name": "title",
                "qname": "Document:title",
                "label": "Title",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/elements/1.1/title",
                "type": "string"
            },
            "processingStatus": {
                "name": "processingStatus",
                "qname": "Document:processingStatus",
                "label": "Processing status",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:processingStatus",
                "type": "string"
            },
            "processingError": {
                "name": "processingError",
                "qname": "Document:processingError",
                "label": "Error message",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:processingError",
                "type": "string"
            },
            "author": {
                "name": "author",
                "qname": "Document:author",
                "label": "Author",
                "description": "The original author, not the uploader",
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/elements/1.1/creator",
                "type": "string"
            },
            "generator": {
                "name": "generator",
                "qname": "Document:generator",
                "label": "Generator",
                "description": "The program used to generate this file",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:generator",
                "type": "string"
            },
            "crawler": {
                "name": "crawler",
                "qname": "Document:crawler",
                "label": "Crawler",
                "description": "The crawler used to acquire this file",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:crawler",
                "type": "string"
            },
            "fileSize": {
                "name": "fileSize",
                "qname": "Document:fileSize",
                "label": "File size",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:fileSize",
                "type": "number"
            },
            "fileName": {
                "name": "fileName",
                "qname": "Document:fileName",
                "label": "File name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:fileName",
                "type": "string"
            },
            "extension": {
                "name": "extension",
                "qname": "Document:extension",
                "label": "File extension",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:extension",
                "type": "string"
            },
            "encoding": {
                "name": "encoding",
                "qname": "Document:encoding",
                "label": "File encoding",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:encoding",
                "type": "string"
            },
            "messageId": {
                "name": "messageId",
                "qname": "Document:messageId",
                "label": "Message ID",
                "description": "Message ID of a document; unique in most cases",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:messageId",
                "type": "identifier"
            },
            "headers": {
                "name": "headers",
                "qname": "Document:headers",
                "label": "Raw headers",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:headers",
                "type": "string"
            },
            "mimeType": {
                "name": "mimeType",
                "qname": "Document:mimeType",
                "label": "MIME type",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/terms/format",
                "type": "mimetype"
            },
            "language": {
                "name": "language",
                "qname": "Document:language",
                "label": "Language",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/terms/language",
                "type": "string"
            },
            "date": {
                "name": "date",
                "qname": "Document:date",
                "label": "Date",
                "description": "If not otherwise specified",
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/elements/1.1/date",
                "type": "date"
            },
            "authoredAt": {
                "name": "authoredAt",
                "qname": "Document:authoredAt",
                "label": "Authored on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:authoredAt",
                "type": "date"
            },
            "publishedAt": {
                "name": "publishedAt",
                "qname": "Document:publishedAt",
                "label": "Published on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:publishedAt",
                "type": "date"
            },
            "parent": {
                "name": "parent",
                "qname": "Document:parent",
                "label": "Parent document",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/terms/isPartOf",
                "type": "entity",
                "schema": "Folder",
                "reverse": "children"
            },
            "namesMentioned": {
                "name": "namesMentioned",
                "qname": "Document:namesMentioned",
                "label": "Mentioned names",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:namesMentioned",
                "type": "name"
            },
            "ibanMentioned": {
                "name": "ibanMentioned",
                "qname": "Document:ibanMentioned",
                "label": "IBANs",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:ibanMentioned",
                "type": "iban"
            },
            "ipMentioned": {
                "name": "ipMentioned",
                "qname": "Document:ipMentioned",
                "label": "IP addresses",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:ipMentioned",
                "type": "ip"
            },
            "locationMentioned": {
                "name": "locationMentioned",
                "qname": "Document:locationMentioned",
                "label": "Locations",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:locationMentioned",
                "type": "address"
            },
            "phoneMentioned": {
                "name": "phoneMentioned",
                "qname": "Document:phoneMentioned",
                "label": "Phone numbers",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:phoneMentioned",
                "type": "phone"
            },
            "emailMentioned": {
                "name": "emailMentioned",
                "qname": "Document:emailMentioned",
                "label": "E-Mail addresses",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:emailMentioned",
                "type": "email"
            },
            "pdfAlternativeHash": {
                "name": "pdfAlternativeHash",
                "qname": "Document:pdfAlternativeHash",
                "label": "PDF alternative version checksum",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:pdfAlternativeHash",
                "type": "identifier"
            },
            "name": {
                "name": "name",
                "qname": "Thing:name",
                "label": "Name",
                "description": null,
                "caption": true,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#prefLabel",
                "type": "name"
            },
            "sameAs": {
                "name": "sameAs",
                "qname": "Thing:sameAs",
                "label": "Same as",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2002/07/owl#sameAs",
                "type": "entity",
                "schema": "Thing",
                "reverse": "sameAs"
            },
            "summary": {
                "name": "summary",
                "qname": "Thing:summary",
                "label": "Summary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:summary",
                "type": "text"
            },
            "description": {
                "name": "description",
                "qname": "Thing:description",
                "label": "Description",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:description",
                "type": "string"
            },
            "country": {
                "name": "country",
                "qname": "Thing:country",
                "label": "Country",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:country",
                "type": "country"
            },
            "alias": {
                "name": "alias",
                "qname": "Thing:alias",
                "label": "Other name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#altLabel",
                "type": "name"
            },
            "previousName": {
                "name": "previousName",
                "qname": "Thing:previousName",
                "label": "Previous name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:previousName",
                "type": "name"
            },
            "weakAlias": {
                "name": "weakAlias",
                "qname": "Thing:weakAlias",
                "label": "Weak alias",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:weakAlias",
                "type": "string"
            },
            "sourceUrl": {
                "name": "sourceUrl",
                "qname": "Thing:sourceUrl",
                "label": "Source link",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:sourceUrl",
                "type": "url"
            },
            "alephUrl": {
                "name": "alephUrl",
                "qname": "Thing:alephUrl",
                "label": "Aleph URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:alephUrl",
                "type": "url"
            },
            "wikipediaUrl": {
                "name": "wikipediaUrl",
                "qname": "Thing:wikipediaUrl",
                "label": "Wikipedia Article",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikipediaUrl",
                "type": "url"
            },
            "wikidataId": {
                "name": "wikidataId",
                "qname": "Thing:wikidataId",
                "label": "Wikidata ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikidataId",
                "type": "identifier"
            },
            "keywords": {
                "name": "keywords",
                "qname": "Thing:keywords",
                "label": "Keywords",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:keywords",
                "type": "string"
            },
            "address": {
                "name": "address",
                "qname": "Thing:address",
                "label": "Address",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:address",
                "type": "address"
            },
            "program": {
                "name": "program",
                "qname": "Thing:program",
                "label": "Program",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:program",
                "type": "string"
            },
            "notes": {
                "name": "notes",
                "qname": "Thing:notes",
                "label": "Notes",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:notes",
                "type": "text"
            },
            "modifiedAt": {
                "name": "modifiedAt",
                "qname": "Thing:modifiedAt",
                "label": "Modified on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:modifiedAt",
                "type": "date"
            },
            "retrievedAt": {
                "name": "retrievedAt",
                "qname": "Thing:retrievedAt",
                "label": "Retrieved on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:retrievedAt",
                "type": "date"
            },
            "courtCase": {
                "name": "courtCase",
                "qname": "Thing:courtCase",
                "label": "Court cases",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Thing:courtCase",
                "type": "entity",
                "schema": "CourtCaseParty",
                "reverse": "party"
            }
        }
    },
    "Pages": {
        "label": "Document",
        "plural": "Documents",
        "uri": "https://w3id.org/ftm#Pages",
        "schemata": ["Document", "Thing", "Pages"],
        "extends": ["Document"],
        "abstract": false,
        "matchable": false,
        "description": null,
        "featured": [],
        "properties": {
            "pages": {
                "name": "pages",
                "qname": "Pages:pages",
                "label": "Pages",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Pages:pages",
                "type": "entity",
                "schema": "Page",
                "reverse": "document"
            },
            "contentHash": {
                "name": "contentHash",
                "qname": "Document:contentHash",
                "label": "Content checksum",
                "description": "SHA1 hash of the data",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:contentHash",
                "type": "identifier"
            },
            "title": {
                "name": "title",
                "qname": "Document:title",
                "label": "Title",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/elements/1.1/title",
                "type": "string"
            },
            "processingStatus": {
                "name": "processingStatus",
                "qname": "Document:processingStatus",
                "label": "Processing status",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:processingStatus",
                "type": "string"
            },
            "processingError": {
                "name": "processingError",
                "qname": "Document:processingError",
                "label": "Error message",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:processingError",
                "type": "string"
            },
            "author": {
                "name": "author",
                "qname": "Document:author",
                "label": "Author",
                "description": "The original author, not the uploader",
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/elements/1.1/creator",
                "type": "string"
            },
            "generator": {
                "name": "generator",
                "qname": "Document:generator",
                "label": "Generator",
                "description": "The program used to generate this file",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:generator",
                "type": "string"
            },
            "crawler": {
                "name": "crawler",
                "qname": "Document:crawler",
                "label": "Crawler",
                "description": "The crawler used to acquire this file",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:crawler",
                "type": "string"
            },
            "fileSize": {
                "name": "fileSize",
                "qname": "Document:fileSize",
                "label": "File size",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:fileSize",
                "type": "number"
            },
            "fileName": {
                "name": "fileName",
                "qname": "Document:fileName",
                "label": "File name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:fileName",
                "type": "string"
            },
            "extension": {
                "name": "extension",
                "qname": "Document:extension",
                "label": "File extension",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:extension",
                "type": "string"
            },
            "encoding": {
                "name": "encoding",
                "qname": "Document:encoding",
                "label": "File encoding",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:encoding",
                "type": "string"
            },
            "messageId": {
                "name": "messageId",
                "qname": "Document:messageId",
                "label": "Message ID",
                "description": "Message ID of a document; unique in most cases",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:messageId",
                "type": "identifier"
            },
            "headers": {
                "name": "headers",
                "qname": "Document:headers",
                "label": "Raw headers",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:headers",
                "type": "string"
            },
            "mimeType": {
                "name": "mimeType",
                "qname": "Document:mimeType",
                "label": "MIME type",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/terms/format",
                "type": "mimetype"
            },
            "language": {
                "name": "language",
                "qname": "Document:language",
                "label": "Language",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/terms/language",
                "type": "string"
            },
            "date": {
                "name": "date",
                "qname": "Document:date",
                "label": "Date",
                "description": "If not otherwise specified",
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/elements/1.1/date",
                "type": "date"
            },
            "authoredAt": {
                "name": "authoredAt",
                "qname": "Document:authoredAt",
                "label": "Authored on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:authoredAt",
                "type": "date"
            },
            "publishedAt": {
                "name": "publishedAt",
                "qname": "Document:publishedAt",
                "label": "Published on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:publishedAt",
                "type": "date"
            },
            "parent": {
                "name": "parent",
                "qname": "Document:parent",
                "label": "Parent document",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/terms/isPartOf",
                "type": "entity",
                "schema": "Folder",
                "reverse": "children"
            },
            "namesMentioned": {
                "name": "namesMentioned",
                "qname": "Document:namesMentioned",
                "label": "Mentioned names",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:namesMentioned",
                "type": "name"
            },
            "ibanMentioned": {
                "name": "ibanMentioned",
                "qname": "Document:ibanMentioned",
                "label": "IBANs",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:ibanMentioned",
                "type": "iban"
            },
            "ipMentioned": {
                "name": "ipMentioned",
                "qname": "Document:ipMentioned",
                "label": "IP addresses",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:ipMentioned",
                "type": "ip"
            },
            "locationMentioned": {
                "name": "locationMentioned",
                "qname": "Document:locationMentioned",
                "label": "Locations",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:locationMentioned",
                "type": "address"
            },
            "phoneMentioned": {
                "name": "phoneMentioned",
                "qname": "Document:phoneMentioned",
                "label": "Phone numbers",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:phoneMentioned",
                "type": "phone"
            },
            "emailMentioned": {
                "name": "emailMentioned",
                "qname": "Document:emailMentioned",
                "label": "E-Mail addresses",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:emailMentioned",
                "type": "email"
            },
            "pdfAlternativeHash": {
                "name": "pdfAlternativeHash",
                "qname": "Document:pdfAlternativeHash",
                "label": "PDF alternative version checksum",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:pdfAlternativeHash",
                "type": "identifier"
            },
            "name": {
                "name": "name",
                "qname": "Thing:name",
                "label": "Name",
                "description": null,
                "caption": true,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#prefLabel",
                "type": "name"
            },
            "sameAs": {
                "name": "sameAs",
                "qname": "Thing:sameAs",
                "label": "Same as",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2002/07/owl#sameAs",
                "type": "entity",
                "schema": "Thing",
                "reverse": "sameAs"
            },
            "summary": {
                "name": "summary",
                "qname": "Thing:summary",
                "label": "Summary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:summary",
                "type": "text"
            },
            "description": {
                "name": "description",
                "qname": "Thing:description",
                "label": "Description",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:description",
                "type": "string"
            },
            "country": {
                "name": "country",
                "qname": "Thing:country",
                "label": "Country",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:country",
                "type": "country"
            },
            "alias": {
                "name": "alias",
                "qname": "Thing:alias",
                "label": "Other name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#altLabel",
                "type": "name"
            },
            "previousName": {
                "name": "previousName",
                "qname": "Thing:previousName",
                "label": "Previous name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:previousName",
                "type": "name"
            },
            "weakAlias": {
                "name": "weakAlias",
                "qname": "Thing:weakAlias",
                "label": "Weak alias",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:weakAlias",
                "type": "string"
            },
            "sourceUrl": {
                "name": "sourceUrl",
                "qname": "Thing:sourceUrl",
                "label": "Source link",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:sourceUrl",
                "type": "url"
            },
            "alephUrl": {
                "name": "alephUrl",
                "qname": "Thing:alephUrl",
                "label": "Aleph URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:alephUrl",
                "type": "url"
            },
            "wikipediaUrl": {
                "name": "wikipediaUrl",
                "qname": "Thing:wikipediaUrl",
                "label": "Wikipedia Article",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikipediaUrl",
                "type": "url"
            },
            "wikidataId": {
                "name": "wikidataId",
                "qname": "Thing:wikidataId",
                "label": "Wikidata ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikidataId",
                "type": "identifier"
            },
            "keywords": {
                "name": "keywords",
                "qname": "Thing:keywords",
                "label": "Keywords",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:keywords",
                "type": "string"
            },
            "address": {
                "name": "address",
                "qname": "Thing:address",
                "label": "Address",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:address",
                "type": "address"
            },
            "program": {
                "name": "program",
                "qname": "Thing:program",
                "label": "Program",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:program",
                "type": "string"
            },
            "notes": {
                "name": "notes",
                "qname": "Thing:notes",
                "label": "Notes",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:notes",
                "type": "text"
            },
            "modifiedAt": {
                "name": "modifiedAt",
                "qname": "Thing:modifiedAt",
                "label": "Modified on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:modifiedAt",
                "type": "date"
            },
            "retrievedAt": {
                "name": "retrievedAt",
                "qname": "Thing:retrievedAt",
                "label": "Retrieved on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:retrievedAt",
                "type": "date"
            },
            "courtCase": {
                "name": "courtCase",
                "qname": "Thing:courtCase",
                "label": "Court cases",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Thing:courtCase",
                "type": "entity",
                "schema": "CourtCaseParty",
                "reverse": "party"
            }
        }
    },
    "Folder": {
        "label": "Folder",
        "plural": "Folders",
        "uri": "https://w3id.org/ftm#Folder",
        "schemata": ["Thing", "Folder", "Document"],
        "extends": ["Document"],
        "abstract": false,
        "matchable": false,
        "description": null,
        "featured": [],
        "properties": {
            "children": {
                "name": "children",
                "qname": "Folder:children",
                "label": "Child documents",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Folder:children",
                "type": "entity",
                "schema": "Document",
                "reverse": "parent"
            },
            "contentHash": {
                "name": "contentHash",
                "qname": "Document:contentHash",
                "label": "Content checksum",
                "description": "SHA1 hash of the data",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:contentHash",
                "type": "identifier"
            },
            "title": {
                "name": "title",
                "qname": "Document:title",
                "label": "Title",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/elements/1.1/title",
                "type": "string"
            },
            "processingStatus": {
                "name": "processingStatus",
                "qname": "Document:processingStatus",
                "label": "Processing status",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:processingStatus",
                "type": "string"
            },
            "processingError": {
                "name": "processingError",
                "qname": "Document:processingError",
                "label": "Error message",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:processingError",
                "type": "string"
            },
            "author": {
                "name": "author",
                "qname": "Document:author",
                "label": "Author",
                "description": "The original author, not the uploader",
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/elements/1.1/creator",
                "type": "string"
            },
            "generator": {
                "name": "generator",
                "qname": "Document:generator",
                "label": "Generator",
                "description": "The program used to generate this file",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:generator",
                "type": "string"
            },
            "crawler": {
                "name": "crawler",
                "qname": "Document:crawler",
                "label": "Crawler",
                "description": "The crawler used to acquire this file",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:crawler",
                "type": "string"
            },
            "fileSize": {
                "name": "fileSize",
                "qname": "Document:fileSize",
                "label": "File size",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:fileSize",
                "type": "number"
            },
            "fileName": {
                "name": "fileName",
                "qname": "Document:fileName",
                "label": "File name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:fileName",
                "type": "string"
            },
            "extension": {
                "name": "extension",
                "qname": "Document:extension",
                "label": "File extension",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:extension",
                "type": "string"
            },
            "encoding": {
                "name": "encoding",
                "qname": "Document:encoding",
                "label": "File encoding",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:encoding",
                "type": "string"
            },
            "messageId": {
                "name": "messageId",
                "qname": "Document:messageId",
                "label": "Message ID",
                "description": "Message ID of a document; unique in most cases",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:messageId",
                "type": "identifier"
            },
            "headers": {
                "name": "headers",
                "qname": "Document:headers",
                "label": "Raw headers",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:headers",
                "type": "string"
            },
            "mimeType": {
                "name": "mimeType",
                "qname": "Document:mimeType",
                "label": "MIME type",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/terms/format",
                "type": "mimetype"
            },
            "language": {
                "name": "language",
                "qname": "Document:language",
                "label": "Language",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/terms/language",
                "type": "string"
            },
            "date": {
                "name": "date",
                "qname": "Document:date",
                "label": "Date",
                "description": "If not otherwise specified",
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/elements/1.1/date",
                "type": "date"
            },
            "authoredAt": {
                "name": "authoredAt",
                "qname": "Document:authoredAt",
                "label": "Authored on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:authoredAt",
                "type": "date"
            },
            "publishedAt": {
                "name": "publishedAt",
                "qname": "Document:publishedAt",
                "label": "Published on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:publishedAt",
                "type": "date"
            },
            "parent": {
                "name": "parent",
                "qname": "Document:parent",
                "label": "Parent document",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/terms/isPartOf",
                "type": "entity",
                "schema": "Folder",
                "reverse": "children"
            },
            "namesMentioned": {
                "name": "namesMentioned",
                "qname": "Document:namesMentioned",
                "label": "Mentioned names",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:namesMentioned",
                "type": "name"
            },
            "ibanMentioned": {
                "name": "ibanMentioned",
                "qname": "Document:ibanMentioned",
                "label": "IBANs",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:ibanMentioned",
                "type": "iban"
            },
            "ipMentioned": {
                "name": "ipMentioned",
                "qname": "Document:ipMentioned",
                "label": "IP addresses",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:ipMentioned",
                "type": "ip"
            },
            "locationMentioned": {
                "name": "locationMentioned",
                "qname": "Document:locationMentioned",
                "label": "Locations",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:locationMentioned",
                "type": "address"
            },
            "phoneMentioned": {
                "name": "phoneMentioned",
                "qname": "Document:phoneMentioned",
                "label": "Phone numbers",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:phoneMentioned",
                "type": "phone"
            },
            "emailMentioned": {
                "name": "emailMentioned",
                "qname": "Document:emailMentioned",
                "label": "E-Mail addresses",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:emailMentioned",
                "type": "email"
            },
            "pdfAlternativeHash": {
                "name": "pdfAlternativeHash",
                "qname": "Document:pdfAlternativeHash",
                "label": "PDF alternative version checksum",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:pdfAlternativeHash",
                "type": "identifier"
            },
            "name": {
                "name": "name",
                "qname": "Thing:name",
                "label": "Name",
                "description": null,
                "caption": true,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#prefLabel",
                "type": "name"
            },
            "sameAs": {
                "name": "sameAs",
                "qname": "Thing:sameAs",
                "label": "Same as",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2002/07/owl#sameAs",
                "type": "entity",
                "schema": "Thing",
                "reverse": "sameAs"
            },
            "summary": {
                "name": "summary",
                "qname": "Thing:summary",
                "label": "Summary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:summary",
                "type": "text"
            },
            "description": {
                "name": "description",
                "qname": "Thing:description",
                "label": "Description",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:description",
                "type": "string"
            },
            "country": {
                "name": "country",
                "qname": "Thing:country",
                "label": "Country",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:country",
                "type": "country"
            },
            "alias": {
                "name": "alias",
                "qname": "Thing:alias",
                "label": "Other name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#altLabel",
                "type": "name"
            },
            "previousName": {
                "name": "previousName",
                "qname": "Thing:previousName",
                "label": "Previous name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:previousName",
                "type": "name"
            },
            "weakAlias": {
                "name": "weakAlias",
                "qname": "Thing:weakAlias",
                "label": "Weak alias",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:weakAlias",
                "type": "string"
            },
            "sourceUrl": {
                "name": "sourceUrl",
                "qname": "Thing:sourceUrl",
                "label": "Source link",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:sourceUrl",
                "type": "url"
            },
            "alephUrl": {
                "name": "alephUrl",
                "qname": "Thing:alephUrl",
                "label": "Aleph URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:alephUrl",
                "type": "url"
            },
            "wikipediaUrl": {
                "name": "wikipediaUrl",
                "qname": "Thing:wikipediaUrl",
                "label": "Wikipedia Article",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikipediaUrl",
                "type": "url"
            },
            "wikidataId": {
                "name": "wikidataId",
                "qname": "Thing:wikidataId",
                "label": "Wikidata ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikidataId",
                "type": "identifier"
            },
            "keywords": {
                "name": "keywords",
                "qname": "Thing:keywords",
                "label": "Keywords",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:keywords",
                "type": "string"
            },
            "address": {
                "name": "address",
                "qname": "Thing:address",
                "label": "Address",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:address",
                "type": "address"
            },
            "program": {
                "name": "program",
                "qname": "Thing:program",
                "label": "Program",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:program",
                "type": "string"
            },
            "notes": {
                "name": "notes",
                "qname": "Thing:notes",
                "label": "Notes",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:notes",
                "type": "text"
            },
            "modifiedAt": {
                "name": "modifiedAt",
                "qname": "Thing:modifiedAt",
                "label": "Modified on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:modifiedAt",
                "type": "date"
            },
            "retrievedAt": {
                "name": "retrievedAt",
                "qname": "Thing:retrievedAt",
                "label": "Retrieved on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:retrievedAt",
                "type": "date"
            },
            "courtCase": {
                "name": "courtCase",
                "qname": "Thing:courtCase",
                "label": "Court cases",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Thing:courtCase",
                "type": "entity",
                "schema": "CourtCaseParty",
                "reverse": "party"
            }
        }
    },
    "Package": {
        "label": "Package",
        "plural": "Packages",
        "uri": "https://w3id.org/ftm#Package",
        "schemata": ["Document", "Thing", "Folder", "Package"],
        "extends": ["Folder"],
        "abstract": false,
        "matchable": false,
        "description": null,
        "featured": [],
        "properties": {
            "children": {
                "name": "children",
                "qname": "Folder:children",
                "label": "Child documents",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Folder:children",
                "type": "entity",
                "schema": "Document",
                "reverse": "parent"
            },
            "contentHash": {
                "name": "contentHash",
                "qname": "Document:contentHash",
                "label": "Content checksum",
                "description": "SHA1 hash of the data",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:contentHash",
                "type": "identifier"
            },
            "title": {
                "name": "title",
                "qname": "Document:title",
                "label": "Title",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/elements/1.1/title",
                "type": "string"
            },
            "processingStatus": {
                "name": "processingStatus",
                "qname": "Document:processingStatus",
                "label": "Processing status",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:processingStatus",
                "type": "string"
            },
            "processingError": {
                "name": "processingError",
                "qname": "Document:processingError",
                "label": "Error message",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:processingError",
                "type": "string"
            },
            "author": {
                "name": "author",
                "qname": "Document:author",
                "label": "Author",
                "description": "The original author, not the uploader",
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/elements/1.1/creator",
                "type": "string"
            },
            "generator": {
                "name": "generator",
                "qname": "Document:generator",
                "label": "Generator",
                "description": "The program used to generate this file",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:generator",
                "type": "string"
            },
            "crawler": {
                "name": "crawler",
                "qname": "Document:crawler",
                "label": "Crawler",
                "description": "The crawler used to acquire this file",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:crawler",
                "type": "string"
            },
            "fileSize": {
                "name": "fileSize",
                "qname": "Document:fileSize",
                "label": "File size",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:fileSize",
                "type": "number"
            },
            "fileName": {
                "name": "fileName",
                "qname": "Document:fileName",
                "label": "File name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:fileName",
                "type": "string"
            },
            "extension": {
                "name": "extension",
                "qname": "Document:extension",
                "label": "File extension",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:extension",
                "type": "string"
            },
            "encoding": {
                "name": "encoding",
                "qname": "Document:encoding",
                "label": "File encoding",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:encoding",
                "type": "string"
            },
            "messageId": {
                "name": "messageId",
                "qname": "Document:messageId",
                "label": "Message ID",
                "description": "Message ID of a document; unique in most cases",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:messageId",
                "type": "identifier"
            },
            "headers": {
                "name": "headers",
                "qname": "Document:headers",
                "label": "Raw headers",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:headers",
                "type": "string"
            },
            "mimeType": {
                "name": "mimeType",
                "qname": "Document:mimeType",
                "label": "MIME type",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/terms/format",
                "type": "mimetype"
            },
            "language": {
                "name": "language",
                "qname": "Document:language",
                "label": "Language",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/terms/language",
                "type": "string"
            },
            "date": {
                "name": "date",
                "qname": "Document:date",
                "label": "Date",
                "description": "If not otherwise specified",
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/elements/1.1/date",
                "type": "date"
            },
            "authoredAt": {
                "name": "authoredAt",
                "qname": "Document:authoredAt",
                "label": "Authored on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:authoredAt",
                "type": "date"
            },
            "publishedAt": {
                "name": "publishedAt",
                "qname": "Document:publishedAt",
                "label": "Published on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:publishedAt",
                "type": "date"
            },
            "parent": {
                "name": "parent",
                "qname": "Document:parent",
                "label": "Parent document",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/terms/isPartOf",
                "type": "entity",
                "schema": "Folder",
                "reverse": "children"
            },
            "namesMentioned": {
                "name": "namesMentioned",
                "qname": "Document:namesMentioned",
                "label": "Mentioned names",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:namesMentioned",
                "type": "name"
            },
            "ibanMentioned": {
                "name": "ibanMentioned",
                "qname": "Document:ibanMentioned",
                "label": "IBANs",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:ibanMentioned",
                "type": "iban"
            },
            "ipMentioned": {
                "name": "ipMentioned",
                "qname": "Document:ipMentioned",
                "label": "IP addresses",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:ipMentioned",
                "type": "ip"
            },
            "locationMentioned": {
                "name": "locationMentioned",
                "qname": "Document:locationMentioned",
                "label": "Locations",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:locationMentioned",
                "type": "address"
            },
            "phoneMentioned": {
                "name": "phoneMentioned",
                "qname": "Document:phoneMentioned",
                "label": "Phone numbers",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:phoneMentioned",
                "type": "phone"
            },
            "emailMentioned": {
                "name": "emailMentioned",
                "qname": "Document:emailMentioned",
                "label": "E-Mail addresses",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:emailMentioned",
                "type": "email"
            },
            "pdfAlternativeHash": {
                "name": "pdfAlternativeHash",
                "qname": "Document:pdfAlternativeHash",
                "label": "PDF alternative version checksum",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:pdfAlternativeHash",
                "type": "identifier"
            },
            "name": {
                "name": "name",
                "qname": "Thing:name",
                "label": "Name",
                "description": null,
                "caption": true,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#prefLabel",
                "type": "name"
            },
            "sameAs": {
                "name": "sameAs",
                "qname": "Thing:sameAs",
                "label": "Same as",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2002/07/owl#sameAs",
                "type": "entity",
                "schema": "Thing",
                "reverse": "sameAs"
            },
            "summary": {
                "name": "summary",
                "qname": "Thing:summary",
                "label": "Summary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:summary",
                "type": "text"
            },
            "description": {
                "name": "description",
                "qname": "Thing:description",
                "label": "Description",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:description",
                "type": "string"
            },
            "country": {
                "name": "country",
                "qname": "Thing:country",
                "label": "Country",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:country",
                "type": "country"
            },
            "alias": {
                "name": "alias",
                "qname": "Thing:alias",
                "label": "Other name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#altLabel",
                "type": "name"
            },
            "previousName": {
                "name": "previousName",
                "qname": "Thing:previousName",
                "label": "Previous name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:previousName",
                "type": "name"
            },
            "weakAlias": {
                "name": "weakAlias",
                "qname": "Thing:weakAlias",
                "label": "Weak alias",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:weakAlias",
                "type": "string"
            },
            "sourceUrl": {
                "name": "sourceUrl",
                "qname": "Thing:sourceUrl",
                "label": "Source link",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:sourceUrl",
                "type": "url"
            },
            "alephUrl": {
                "name": "alephUrl",
                "qname": "Thing:alephUrl",
                "label": "Aleph URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:alephUrl",
                "type": "url"
            },
            "wikipediaUrl": {
                "name": "wikipediaUrl",
                "qname": "Thing:wikipediaUrl",
                "label": "Wikipedia Article",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikipediaUrl",
                "type": "url"
            },
            "wikidataId": {
                "name": "wikidataId",
                "qname": "Thing:wikidataId",
                "label": "Wikidata ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikidataId",
                "type": "identifier"
            },
            "keywords": {
                "name": "keywords",
                "qname": "Thing:keywords",
                "label": "Keywords",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:keywords",
                "type": "string"
            },
            "address": {
                "name": "address",
                "qname": "Thing:address",
                "label": "Address",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:address",
                "type": "address"
            },
            "program": {
                "name": "program",
                "qname": "Thing:program",
                "label": "Program",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:program",
                "type": "string"
            },
            "notes": {
                "name": "notes",
                "qname": "Thing:notes",
                "label": "Notes",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:notes",
                "type": "text"
            },
            "modifiedAt": {
                "name": "modifiedAt",
                "qname": "Thing:modifiedAt",
                "label": "Modified on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:modifiedAt",
                "type": "date"
            },
            "retrievedAt": {
                "name": "retrievedAt",
                "qname": "Thing:retrievedAt",
                "label": "Retrieved on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:retrievedAt",
                "type": "date"
            },
            "courtCase": {
                "name": "courtCase",
                "qname": "Thing:courtCase",
                "label": "Court cases",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Thing:courtCase",
                "type": "entity",
                "schema": "CourtCaseParty",
                "reverse": "party"
            }
        }
    },
    "Workbook": {
        "label": "Workbook",
        "plural": "Workbooks",
        "uri": "https://w3id.org/ftm#Workbook",
        "schemata": ["Thing", "Folder", "Document", "Workbook"],
        "extends": ["Folder"],
        "abstract": false,
        "matchable": false,
        "description": null,
        "featured": [],
        "properties": {
            "children": {
                "name": "children",
                "qname": "Folder:children",
                "label": "Child documents",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Folder:children",
                "type": "entity",
                "schema": "Document",
                "reverse": "parent"
            },
            "contentHash": {
                "name": "contentHash",
                "qname": "Document:contentHash",
                "label": "Content checksum",
                "description": "SHA1 hash of the data",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:contentHash",
                "type": "identifier"
            },
            "title": {
                "name": "title",
                "qname": "Document:title",
                "label": "Title",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/elements/1.1/title",
                "type": "string"
            },
            "processingStatus": {
                "name": "processingStatus",
                "qname": "Document:processingStatus",
                "label": "Processing status",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:processingStatus",
                "type": "string"
            },
            "processingError": {
                "name": "processingError",
                "qname": "Document:processingError",
                "label": "Error message",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:processingError",
                "type": "string"
            },
            "author": {
                "name": "author",
                "qname": "Document:author",
                "label": "Author",
                "description": "The original author, not the uploader",
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/elements/1.1/creator",
                "type": "string"
            },
            "generator": {
                "name": "generator",
                "qname": "Document:generator",
                "label": "Generator",
                "description": "The program used to generate this file",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:generator",
                "type": "string"
            },
            "crawler": {
                "name": "crawler",
                "qname": "Document:crawler",
                "label": "Crawler",
                "description": "The crawler used to acquire this file",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:crawler",
                "type": "string"
            },
            "fileSize": {
                "name": "fileSize",
                "qname": "Document:fileSize",
                "label": "File size",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:fileSize",
                "type": "number"
            },
            "fileName": {
                "name": "fileName",
                "qname": "Document:fileName",
                "label": "File name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:fileName",
                "type": "string"
            },
            "extension": {
                "name": "extension",
                "qname": "Document:extension",
                "label": "File extension",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:extension",
                "type": "string"
            },
            "encoding": {
                "name": "encoding",
                "qname": "Document:encoding",
                "label": "File encoding",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:encoding",
                "type": "string"
            },
            "messageId": {
                "name": "messageId",
                "qname": "Document:messageId",
                "label": "Message ID",
                "description": "Message ID of a document; unique in most cases",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:messageId",
                "type": "identifier"
            },
            "headers": {
                "name": "headers",
                "qname": "Document:headers",
                "label": "Raw headers",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:headers",
                "type": "string"
            },
            "mimeType": {
                "name": "mimeType",
                "qname": "Document:mimeType",
                "label": "MIME type",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/terms/format",
                "type": "mimetype"
            },
            "language": {
                "name": "language",
                "qname": "Document:language",
                "label": "Language",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/terms/language",
                "type": "string"
            },
            "date": {
                "name": "date",
                "qname": "Document:date",
                "label": "Date",
                "description": "If not otherwise specified",
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/elements/1.1/date",
                "type": "date"
            },
            "authoredAt": {
                "name": "authoredAt",
                "qname": "Document:authoredAt",
                "label": "Authored on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:authoredAt",
                "type": "date"
            },
            "publishedAt": {
                "name": "publishedAt",
                "qname": "Document:publishedAt",
                "label": "Published on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:publishedAt",
                "type": "date"
            },
            "parent": {
                "name": "parent",
                "qname": "Document:parent",
                "label": "Parent document",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/terms/isPartOf",
                "type": "entity",
                "schema": "Folder",
                "reverse": "children"
            },
            "namesMentioned": {
                "name": "namesMentioned",
                "qname": "Document:namesMentioned",
                "label": "Mentioned names",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:namesMentioned",
                "type": "name"
            },
            "ibanMentioned": {
                "name": "ibanMentioned",
                "qname": "Document:ibanMentioned",
                "label": "IBANs",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:ibanMentioned",
                "type": "iban"
            },
            "ipMentioned": {
                "name": "ipMentioned",
                "qname": "Document:ipMentioned",
                "label": "IP addresses",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:ipMentioned",
                "type": "ip"
            },
            "locationMentioned": {
                "name": "locationMentioned",
                "qname": "Document:locationMentioned",
                "label": "Locations",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:locationMentioned",
                "type": "address"
            },
            "phoneMentioned": {
                "name": "phoneMentioned",
                "qname": "Document:phoneMentioned",
                "label": "Phone numbers",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:phoneMentioned",
                "type": "phone"
            },
            "emailMentioned": {
                "name": "emailMentioned",
                "qname": "Document:emailMentioned",
                "label": "E-Mail addresses",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:emailMentioned",
                "type": "email"
            },
            "pdfAlternativeHash": {
                "name": "pdfAlternativeHash",
                "qname": "Document:pdfAlternativeHash",
                "label": "PDF alternative version checksum",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:pdfAlternativeHash",
                "type": "identifier"
            },
            "name": {
                "name": "name",
                "qname": "Thing:name",
                "label": "Name",
                "description": null,
                "caption": true,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#prefLabel",
                "type": "name"
            },
            "sameAs": {
                "name": "sameAs",
                "qname": "Thing:sameAs",
                "label": "Same as",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2002/07/owl#sameAs",
                "type": "entity",
                "schema": "Thing",
                "reverse": "sameAs"
            },
            "summary": {
                "name": "summary",
                "qname": "Thing:summary",
                "label": "Summary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:summary",
                "type": "text"
            },
            "description": {
                "name": "description",
                "qname": "Thing:description",
                "label": "Description",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:description",
                "type": "string"
            },
            "country": {
                "name": "country",
                "qname": "Thing:country",
                "label": "Country",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:country",
                "type": "country"
            },
            "alias": {
                "name": "alias",
                "qname": "Thing:alias",
                "label": "Other name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#altLabel",
                "type": "name"
            },
            "previousName": {
                "name": "previousName",
                "qname": "Thing:previousName",
                "label": "Previous name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:previousName",
                "type": "name"
            },
            "weakAlias": {
                "name": "weakAlias",
                "qname": "Thing:weakAlias",
                "label": "Weak alias",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:weakAlias",
                "type": "string"
            },
            "sourceUrl": {
                "name": "sourceUrl",
                "qname": "Thing:sourceUrl",
                "label": "Source link",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:sourceUrl",
                "type": "url"
            },
            "alephUrl": {
                "name": "alephUrl",
                "qname": "Thing:alephUrl",
                "label": "Aleph URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:alephUrl",
                "type": "url"
            },
            "wikipediaUrl": {
                "name": "wikipediaUrl",
                "qname": "Thing:wikipediaUrl",
                "label": "Wikipedia Article",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikipediaUrl",
                "type": "url"
            },
            "wikidataId": {
                "name": "wikidataId",
                "qname": "Thing:wikidataId",
                "label": "Wikidata ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikidataId",
                "type": "identifier"
            },
            "keywords": {
                "name": "keywords",
                "qname": "Thing:keywords",
                "label": "Keywords",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:keywords",
                "type": "string"
            },
            "address": {
                "name": "address",
                "qname": "Thing:address",
                "label": "Address",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:address",
                "type": "address"
            },
            "program": {
                "name": "program",
                "qname": "Thing:program",
                "label": "Program",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:program",
                "type": "string"
            },
            "notes": {
                "name": "notes",
                "qname": "Thing:notes",
                "label": "Notes",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:notes",
                "type": "text"
            },
            "modifiedAt": {
                "name": "modifiedAt",
                "qname": "Thing:modifiedAt",
                "label": "Modified on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:modifiedAt",
                "type": "date"
            },
            "retrievedAt": {
                "name": "retrievedAt",
                "qname": "Thing:retrievedAt",
                "label": "Retrieved on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:retrievedAt",
                "type": "date"
            },
            "courtCase": {
                "name": "courtCase",
                "qname": "Thing:courtCase",
                "label": "Court cases",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Thing:courtCase",
                "type": "entity",
                "schema": "CourtCaseParty",
                "reverse": "party"
            }
        }
    },
    "Image": {
        "label": "Image",
        "plural": "Images",
        "uri": "https://w3id.org/ftm#Image",
        "schemata": ["Thing", "Image", "Document"],
        "extends": ["Document"],
        "abstract": false,
        "matchable": false,
        "description": null,
        "featured": [],
        "properties": {
            "contentHash": {
                "name": "contentHash",
                "qname": "Document:contentHash",
                "label": "Content checksum",
                "description": "SHA1 hash of the data",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:contentHash",
                "type": "identifier"
            },
            "title": {
                "name": "title",
                "qname": "Document:title",
                "label": "Title",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/elements/1.1/title",
                "type": "string"
            },
            "processingStatus": {
                "name": "processingStatus",
                "qname": "Document:processingStatus",
                "label": "Processing status",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:processingStatus",
                "type": "string"
            },
            "processingError": {
                "name": "processingError",
                "qname": "Document:processingError",
                "label": "Error message",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:processingError",
                "type": "string"
            },
            "author": {
                "name": "author",
                "qname": "Document:author",
                "label": "Author",
                "description": "The original author, not the uploader",
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/elements/1.1/creator",
                "type": "string"
            },
            "generator": {
                "name": "generator",
                "qname": "Document:generator",
                "label": "Generator",
                "description": "The program used to generate this file",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:generator",
                "type": "string"
            },
            "crawler": {
                "name": "crawler",
                "qname": "Document:crawler",
                "label": "Crawler",
                "description": "The crawler used to acquire this file",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:crawler",
                "type": "string"
            },
            "fileSize": {
                "name": "fileSize",
                "qname": "Document:fileSize",
                "label": "File size",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:fileSize",
                "type": "number"
            },
            "fileName": {
                "name": "fileName",
                "qname": "Document:fileName",
                "label": "File name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:fileName",
                "type": "string"
            },
            "extension": {
                "name": "extension",
                "qname": "Document:extension",
                "label": "File extension",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:extension",
                "type": "string"
            },
            "encoding": {
                "name": "encoding",
                "qname": "Document:encoding",
                "label": "File encoding",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:encoding",
                "type": "string"
            },
            "messageId": {
                "name": "messageId",
                "qname": "Document:messageId",
                "label": "Message ID",
                "description": "Message ID of a document; unique in most cases",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:messageId",
                "type": "identifier"
            },
            "headers": {
                "name": "headers",
                "qname": "Document:headers",
                "label": "Raw headers",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:headers",
                "type": "string"
            },
            "mimeType": {
                "name": "mimeType",
                "qname": "Document:mimeType",
                "label": "MIME type",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/terms/format",
                "type": "mimetype"
            },
            "language": {
                "name": "language",
                "qname": "Document:language",
                "label": "Language",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/terms/language",
                "type": "string"
            },
            "date": {
                "name": "date",
                "qname": "Document:date",
                "label": "Date",
                "description": "If not otherwise specified",
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/elements/1.1/date",
                "type": "date"
            },
            "authoredAt": {
                "name": "authoredAt",
                "qname": "Document:authoredAt",
                "label": "Authored on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:authoredAt",
                "type": "date"
            },
            "publishedAt": {
                "name": "publishedAt",
                "qname": "Document:publishedAt",
                "label": "Published on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:publishedAt",
                "type": "date"
            },
            "parent": {
                "name": "parent",
                "qname": "Document:parent",
                "label": "Parent document",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/terms/isPartOf",
                "type": "entity",
                "schema": "Folder",
                "reverse": "children"
            },
            "namesMentioned": {
                "name": "namesMentioned",
                "qname": "Document:namesMentioned",
                "label": "Mentioned names",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:namesMentioned",
                "type": "name"
            },
            "ibanMentioned": {
                "name": "ibanMentioned",
                "qname": "Document:ibanMentioned",
                "label": "IBANs",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:ibanMentioned",
                "type": "iban"
            },
            "ipMentioned": {
                "name": "ipMentioned",
                "qname": "Document:ipMentioned",
                "label": "IP addresses",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:ipMentioned",
                "type": "ip"
            },
            "locationMentioned": {
                "name": "locationMentioned",
                "qname": "Document:locationMentioned",
                "label": "Locations",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:locationMentioned",
                "type": "address"
            },
            "phoneMentioned": {
                "name": "phoneMentioned",
                "qname": "Document:phoneMentioned",
                "label": "Phone numbers",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:phoneMentioned",
                "type": "phone"
            },
            "emailMentioned": {
                "name": "emailMentioned",
                "qname": "Document:emailMentioned",
                "label": "E-Mail addresses",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:emailMentioned",
                "type": "email"
            },
            "pdfAlternativeHash": {
                "name": "pdfAlternativeHash",
                "qname": "Document:pdfAlternativeHash",
                "label": "PDF alternative version checksum",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:pdfAlternativeHash",
                "type": "identifier"
            },
            "name": {
                "name": "name",
                "qname": "Thing:name",
                "label": "Name",
                "description": null,
                "caption": true,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#prefLabel",
                "type": "name"
            },
            "sameAs": {
                "name": "sameAs",
                "qname": "Thing:sameAs",
                "label": "Same as",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2002/07/owl#sameAs",
                "type": "entity",
                "schema": "Thing",
                "reverse": "sameAs"
            },
            "summary": {
                "name": "summary",
                "qname": "Thing:summary",
                "label": "Summary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:summary",
                "type": "text"
            },
            "description": {
                "name": "description",
                "qname": "Thing:description",
                "label": "Description",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:description",
                "type": "string"
            },
            "country": {
                "name": "country",
                "qname": "Thing:country",
                "label": "Country",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:country",
                "type": "country"
            },
            "alias": {
                "name": "alias",
                "qname": "Thing:alias",
                "label": "Other name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#altLabel",
                "type": "name"
            },
            "previousName": {
                "name": "previousName",
                "qname": "Thing:previousName",
                "label": "Previous name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:previousName",
                "type": "name"
            },
            "weakAlias": {
                "name": "weakAlias",
                "qname": "Thing:weakAlias",
                "label": "Weak alias",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:weakAlias",
                "type": "string"
            },
            "sourceUrl": {
                "name": "sourceUrl",
                "qname": "Thing:sourceUrl",
                "label": "Source link",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:sourceUrl",
                "type": "url"
            },
            "alephUrl": {
                "name": "alephUrl",
                "qname": "Thing:alephUrl",
                "label": "Aleph URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:alephUrl",
                "type": "url"
            },
            "wikipediaUrl": {
                "name": "wikipediaUrl",
                "qname": "Thing:wikipediaUrl",
                "label": "Wikipedia Article",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikipediaUrl",
                "type": "url"
            },
            "wikidataId": {
                "name": "wikidataId",
                "qname": "Thing:wikidataId",
                "label": "Wikidata ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikidataId",
                "type": "identifier"
            },
            "keywords": {
                "name": "keywords",
                "qname": "Thing:keywords",
                "label": "Keywords",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:keywords",
                "type": "string"
            },
            "address": {
                "name": "address",
                "qname": "Thing:address",
                "label": "Address",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:address",
                "type": "address"
            },
            "program": {
                "name": "program",
                "qname": "Thing:program",
                "label": "Program",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:program",
                "type": "string"
            },
            "notes": {
                "name": "notes",
                "qname": "Thing:notes",
                "label": "Notes",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:notes",
                "type": "text"
            },
            "modifiedAt": {
                "name": "modifiedAt",
                "qname": "Thing:modifiedAt",
                "label": "Modified on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:modifiedAt",
                "type": "date"
            },
            "retrievedAt": {
                "name": "retrievedAt",
                "qname": "Thing:retrievedAt",
                "label": "Retrieved on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:retrievedAt",
                "type": "date"
            },
            "courtCase": {
                "name": "courtCase",
                "qname": "Thing:courtCase",
                "label": "Court cases",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Thing:courtCase",
                "type": "entity",
                "schema": "CourtCaseParty",
                "reverse": "party"
            }
        }
    },
    "Video": {
        "label": "Video",
        "plural": "Videos",
        "uri": "https://w3id.org/ftm#Video",
        "schemata": ["Thing", "Video", "Document"],
        "extends": ["Document"],
        "abstract": false,
        "matchable": false,
        "description": null,
        "featured": [],
        "properties": {
            "contentHash": {
                "name": "contentHash",
                "qname": "Document:contentHash",
                "label": "Content checksum",
                "description": "SHA1 hash of the data",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:contentHash",
                "type": "identifier"
            },
            "title": {
                "name": "title",
                "qname": "Document:title",
                "label": "Title",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/elements/1.1/title",
                "type": "string"
            },
            "processingStatus": {
                "name": "processingStatus",
                "qname": "Document:processingStatus",
                "label": "Processing status",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:processingStatus",
                "type": "string"
            },
            "processingError": {
                "name": "processingError",
                "qname": "Document:processingError",
                "label": "Error message",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:processingError",
                "type": "string"
            },
            "author": {
                "name": "author",
                "qname": "Document:author",
                "label": "Author",
                "description": "The original author, not the uploader",
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/elements/1.1/creator",
                "type": "string"
            },
            "generator": {
                "name": "generator",
                "qname": "Document:generator",
                "label": "Generator",
                "description": "The program used to generate this file",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:generator",
                "type": "string"
            },
            "crawler": {
                "name": "crawler",
                "qname": "Document:crawler",
                "label": "Crawler",
                "description": "The crawler used to acquire this file",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:crawler",
                "type": "string"
            },
            "fileSize": {
                "name": "fileSize",
                "qname": "Document:fileSize",
                "label": "File size",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:fileSize",
                "type": "number"
            },
            "fileName": {
                "name": "fileName",
                "qname": "Document:fileName",
                "label": "File name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:fileName",
                "type": "string"
            },
            "extension": {
                "name": "extension",
                "qname": "Document:extension",
                "label": "File extension",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:extension",
                "type": "string"
            },
            "encoding": {
                "name": "encoding",
                "qname": "Document:encoding",
                "label": "File encoding",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:encoding",
                "type": "string"
            },
            "messageId": {
                "name": "messageId",
                "qname": "Document:messageId",
                "label": "Message ID",
                "description": "Message ID of a document; unique in most cases",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:messageId",
                "type": "identifier"
            },
            "headers": {
                "name": "headers",
                "qname": "Document:headers",
                "label": "Raw headers",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:headers",
                "type": "string"
            },
            "mimeType": {
                "name": "mimeType",
                "qname": "Document:mimeType",
                "label": "MIME type",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/terms/format",
                "type": "mimetype"
            },
            "language": {
                "name": "language",
                "qname": "Document:language",
                "label": "Language",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/terms/language",
                "type": "string"
            },
            "date": {
                "name": "date",
                "qname": "Document:date",
                "label": "Date",
                "description": "If not otherwise specified",
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/elements/1.1/date",
                "type": "date"
            },
            "authoredAt": {
                "name": "authoredAt",
                "qname": "Document:authoredAt",
                "label": "Authored on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:authoredAt",
                "type": "date"
            },
            "publishedAt": {
                "name": "publishedAt",
                "qname": "Document:publishedAt",
                "label": "Published on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:publishedAt",
                "type": "date"
            },
            "parent": {
                "name": "parent",
                "qname": "Document:parent",
                "label": "Parent document",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/terms/isPartOf",
                "type": "entity",
                "schema": "Folder",
                "reverse": "children"
            },
            "namesMentioned": {
                "name": "namesMentioned",
                "qname": "Document:namesMentioned",
                "label": "Mentioned names",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:namesMentioned",
                "type": "name"
            },
            "ibanMentioned": {
                "name": "ibanMentioned",
                "qname": "Document:ibanMentioned",
                "label": "IBANs",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:ibanMentioned",
                "type": "iban"
            },
            "ipMentioned": {
                "name": "ipMentioned",
                "qname": "Document:ipMentioned",
                "label": "IP addresses",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:ipMentioned",
                "type": "ip"
            },
            "locationMentioned": {
                "name": "locationMentioned",
                "qname": "Document:locationMentioned",
                "label": "Locations",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:locationMentioned",
                "type": "address"
            },
            "phoneMentioned": {
                "name": "phoneMentioned",
                "qname": "Document:phoneMentioned",
                "label": "Phone numbers",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:phoneMentioned",
                "type": "phone"
            },
            "emailMentioned": {
                "name": "emailMentioned",
                "qname": "Document:emailMentioned",
                "label": "E-Mail addresses",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:emailMentioned",
                "type": "email"
            },
            "pdfAlternativeHash": {
                "name": "pdfAlternativeHash",
                "qname": "Document:pdfAlternativeHash",
                "label": "PDF alternative version checksum",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:pdfAlternativeHash",
                "type": "identifier"
            },
            "name": {
                "name": "name",
                "qname": "Thing:name",
                "label": "Name",
                "description": null,
                "caption": true,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#prefLabel",
                "type": "name"
            },
            "sameAs": {
                "name": "sameAs",
                "qname": "Thing:sameAs",
                "label": "Same as",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2002/07/owl#sameAs",
                "type": "entity",
                "schema": "Thing",
                "reverse": "sameAs"
            },
            "summary": {
                "name": "summary",
                "qname": "Thing:summary",
                "label": "Summary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:summary",
                "type": "text"
            },
            "description": {
                "name": "description",
                "qname": "Thing:description",
                "label": "Description",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:description",
                "type": "string"
            },
            "country": {
                "name": "country",
                "qname": "Thing:country",
                "label": "Country",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:country",
                "type": "country"
            },
            "alias": {
                "name": "alias",
                "qname": "Thing:alias",
                "label": "Other name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#altLabel",
                "type": "name"
            },
            "previousName": {
                "name": "previousName",
                "qname": "Thing:previousName",
                "label": "Previous name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:previousName",
                "type": "name"
            },
            "weakAlias": {
                "name": "weakAlias",
                "qname": "Thing:weakAlias",
                "label": "Weak alias",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:weakAlias",
                "type": "string"
            },
            "sourceUrl": {
                "name": "sourceUrl",
                "qname": "Thing:sourceUrl",
                "label": "Source link",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:sourceUrl",
                "type": "url"
            },
            "alephUrl": {
                "name": "alephUrl",
                "qname": "Thing:alephUrl",
                "label": "Aleph URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:alephUrl",
                "type": "url"
            },
            "wikipediaUrl": {
                "name": "wikipediaUrl",
                "qname": "Thing:wikipediaUrl",
                "label": "Wikipedia Article",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikipediaUrl",
                "type": "url"
            },
            "wikidataId": {
                "name": "wikidataId",
                "qname": "Thing:wikidataId",
                "label": "Wikidata ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikidataId",
                "type": "identifier"
            },
            "keywords": {
                "name": "keywords",
                "qname": "Thing:keywords",
                "label": "Keywords",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:keywords",
                "type": "string"
            },
            "address": {
                "name": "address",
                "qname": "Thing:address",
                "label": "Address",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:address",
                "type": "address"
            },
            "program": {
                "name": "program",
                "qname": "Thing:program",
                "label": "Program",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:program",
                "type": "string"
            },
            "notes": {
                "name": "notes",
                "qname": "Thing:notes",
                "label": "Notes",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:notes",
                "type": "text"
            },
            "modifiedAt": {
                "name": "modifiedAt",
                "qname": "Thing:modifiedAt",
                "label": "Modified on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:modifiedAt",
                "type": "date"
            },
            "retrievedAt": {
                "name": "retrievedAt",
                "qname": "Thing:retrievedAt",
                "label": "Retrieved on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:retrievedAt",
                "type": "date"
            },
            "courtCase": {
                "name": "courtCase",
                "qname": "Thing:courtCase",
                "label": "Court cases",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Thing:courtCase",
                "type": "entity",
                "schema": "CourtCaseParty",
                "reverse": "party"
            }
        }
    },
    "Audio": {
        "label": "Audio",
        "plural": "Audio files",
        "uri": "https://w3id.org/ftm#Audio",
        "schemata": ["Document", "Thing", "Audio"],
        "extends": ["Document"],
        "abstract": false,
        "matchable": false,
        "description": null,
        "featured": [],
        "properties": {
            "contentHash": {
                "name": "contentHash",
                "qname": "Document:contentHash",
                "label": "Content checksum",
                "description": "SHA1 hash of the data",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:contentHash",
                "type": "identifier"
            },
            "title": {
                "name": "title",
                "qname": "Document:title",
                "label": "Title",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/elements/1.1/title",
                "type": "string"
            },
            "processingStatus": {
                "name": "processingStatus",
                "qname": "Document:processingStatus",
                "label": "Processing status",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:processingStatus",
                "type": "string"
            },
            "processingError": {
                "name": "processingError",
                "qname": "Document:processingError",
                "label": "Error message",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:processingError",
                "type": "string"
            },
            "author": {
                "name": "author",
                "qname": "Document:author",
                "label": "Author",
                "description": "The original author, not the uploader",
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/elements/1.1/creator",
                "type": "string"
            },
            "generator": {
                "name": "generator",
                "qname": "Document:generator",
                "label": "Generator",
                "description": "The program used to generate this file",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:generator",
                "type": "string"
            },
            "crawler": {
                "name": "crawler",
                "qname": "Document:crawler",
                "label": "Crawler",
                "description": "The crawler used to acquire this file",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:crawler",
                "type": "string"
            },
            "fileSize": {
                "name": "fileSize",
                "qname": "Document:fileSize",
                "label": "File size",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:fileSize",
                "type": "number"
            },
            "fileName": {
                "name": "fileName",
                "qname": "Document:fileName",
                "label": "File name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:fileName",
                "type": "string"
            },
            "extension": {
                "name": "extension",
                "qname": "Document:extension",
                "label": "File extension",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:extension",
                "type": "string"
            },
            "encoding": {
                "name": "encoding",
                "qname": "Document:encoding",
                "label": "File encoding",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:encoding",
                "type": "string"
            },
            "messageId": {
                "name": "messageId",
                "qname": "Document:messageId",
                "label": "Message ID",
                "description": "Message ID of a document; unique in most cases",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:messageId",
                "type": "identifier"
            },
            "headers": {
                "name": "headers",
                "qname": "Document:headers",
                "label": "Raw headers",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:headers",
                "type": "string"
            },
            "mimeType": {
                "name": "mimeType",
                "qname": "Document:mimeType",
                "label": "MIME type",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/terms/format",
                "type": "mimetype"
            },
            "language": {
                "name": "language",
                "qname": "Document:language",
                "label": "Language",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/terms/language",
                "type": "string"
            },
            "date": {
                "name": "date",
                "qname": "Document:date",
                "label": "Date",
                "description": "If not otherwise specified",
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/elements/1.1/date",
                "type": "date"
            },
            "authoredAt": {
                "name": "authoredAt",
                "qname": "Document:authoredAt",
                "label": "Authored on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:authoredAt",
                "type": "date"
            },
            "publishedAt": {
                "name": "publishedAt",
                "qname": "Document:publishedAt",
                "label": "Published on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:publishedAt",
                "type": "date"
            },
            "parent": {
                "name": "parent",
                "qname": "Document:parent",
                "label": "Parent document",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/terms/isPartOf",
                "type": "entity",
                "schema": "Folder",
                "reverse": "children"
            },
            "namesMentioned": {
                "name": "namesMentioned",
                "qname": "Document:namesMentioned",
                "label": "Mentioned names",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:namesMentioned",
                "type": "name"
            },
            "ibanMentioned": {
                "name": "ibanMentioned",
                "qname": "Document:ibanMentioned",
                "label": "IBANs",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:ibanMentioned",
                "type": "iban"
            },
            "ipMentioned": {
                "name": "ipMentioned",
                "qname": "Document:ipMentioned",
                "label": "IP addresses",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:ipMentioned",
                "type": "ip"
            },
            "locationMentioned": {
                "name": "locationMentioned",
                "qname": "Document:locationMentioned",
                "label": "Locations",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:locationMentioned",
                "type": "address"
            },
            "phoneMentioned": {
                "name": "phoneMentioned",
                "qname": "Document:phoneMentioned",
                "label": "Phone numbers",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:phoneMentioned",
                "type": "phone"
            },
            "emailMentioned": {
                "name": "emailMentioned",
                "qname": "Document:emailMentioned",
                "label": "E-Mail addresses",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:emailMentioned",
                "type": "email"
            },
            "pdfAlternativeHash": {
                "name": "pdfAlternativeHash",
                "qname": "Document:pdfAlternativeHash",
                "label": "PDF alternative version checksum",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:pdfAlternativeHash",
                "type": "identifier"
            },
            "name": {
                "name": "name",
                "qname": "Thing:name",
                "label": "Name",
                "description": null,
                "caption": true,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#prefLabel",
                "type": "name"
            },
            "sameAs": {
                "name": "sameAs",
                "qname": "Thing:sameAs",
                "label": "Same as",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2002/07/owl#sameAs",
                "type": "entity",
                "schema": "Thing",
                "reverse": "sameAs"
            },
            "summary": {
                "name": "summary",
                "qname": "Thing:summary",
                "label": "Summary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:summary",
                "type": "text"
            },
            "description": {
                "name": "description",
                "qname": "Thing:description",
                "label": "Description",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:description",
                "type": "string"
            },
            "country": {
                "name": "country",
                "qname": "Thing:country",
                "label": "Country",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:country",
                "type": "country"
            },
            "alias": {
                "name": "alias",
                "qname": "Thing:alias",
                "label": "Other name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#altLabel",
                "type": "name"
            },
            "previousName": {
                "name": "previousName",
                "qname": "Thing:previousName",
                "label": "Previous name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:previousName",
                "type": "name"
            },
            "weakAlias": {
                "name": "weakAlias",
                "qname": "Thing:weakAlias",
                "label": "Weak alias",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:weakAlias",
                "type": "string"
            },
            "sourceUrl": {
                "name": "sourceUrl",
                "qname": "Thing:sourceUrl",
                "label": "Source link",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:sourceUrl",
                "type": "url"
            },
            "alephUrl": {
                "name": "alephUrl",
                "qname": "Thing:alephUrl",
                "label": "Aleph URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:alephUrl",
                "type": "url"
            },
            "wikipediaUrl": {
                "name": "wikipediaUrl",
                "qname": "Thing:wikipediaUrl",
                "label": "Wikipedia Article",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikipediaUrl",
                "type": "url"
            },
            "wikidataId": {
                "name": "wikidataId",
                "qname": "Thing:wikidataId",
                "label": "Wikidata ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikidataId",
                "type": "identifier"
            },
            "keywords": {
                "name": "keywords",
                "qname": "Thing:keywords",
                "label": "Keywords",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:keywords",
                "type": "string"
            },
            "address": {
                "name": "address",
                "qname": "Thing:address",
                "label": "Address",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:address",
                "type": "address"
            },
            "program": {
                "name": "program",
                "qname": "Thing:program",
                "label": "Program",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:program",
                "type": "string"
            },
            "notes": {
                "name": "notes",
                "qname": "Thing:notes",
                "label": "Notes",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:notes",
                "type": "text"
            },
            "modifiedAt": {
                "name": "modifiedAt",
                "qname": "Thing:modifiedAt",
                "label": "Modified on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:modifiedAt",
                "type": "date"
            },
            "retrievedAt": {
                "name": "retrievedAt",
                "qname": "Thing:retrievedAt",
                "label": "Retrieved on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:retrievedAt",
                "type": "date"
            },
            "courtCase": {
                "name": "courtCase",
                "qname": "Thing:courtCase",
                "label": "Court cases",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Thing:courtCase",
                "type": "entity",
                "schema": "CourtCaseParty",
                "reverse": "party"
            }
        }
    },
    "HyperText": {
        "label": "Web page",
        "plural": "Web pages",
        "uri": "https://w3id.org/ftm#HyperText",
        "schemata": ["Document", "HyperText", "Thing"],
        "extends": ["Document"],
        "abstract": false,
        "matchable": false,
        "description": null,
        "featured": [],
        "properties": {
            "bodyText": {
                "name": "bodyText",
                "qname": "HyperText:bodyText",
                "label": "Text",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#HyperText:bodyText",
                "type": "text"
            },
            "bodyHtml": {
                "name": "bodyHtml",
                "qname": "HyperText:bodyHtml",
                "label": "HTML",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#HyperText:bodyHtml",
                "type": "string"
            },
            "contentHash": {
                "name": "contentHash",
                "qname": "Document:contentHash",
                "label": "Content checksum",
                "description": "SHA1 hash of the data",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:contentHash",
                "type": "identifier"
            },
            "title": {
                "name": "title",
                "qname": "Document:title",
                "label": "Title",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/elements/1.1/title",
                "type": "string"
            },
            "processingStatus": {
                "name": "processingStatus",
                "qname": "Document:processingStatus",
                "label": "Processing status",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:processingStatus",
                "type": "string"
            },
            "processingError": {
                "name": "processingError",
                "qname": "Document:processingError",
                "label": "Error message",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:processingError",
                "type": "string"
            },
            "author": {
                "name": "author",
                "qname": "Document:author",
                "label": "Author",
                "description": "The original author, not the uploader",
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/elements/1.1/creator",
                "type": "string"
            },
            "generator": {
                "name": "generator",
                "qname": "Document:generator",
                "label": "Generator",
                "description": "The program used to generate this file",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:generator",
                "type": "string"
            },
            "crawler": {
                "name": "crawler",
                "qname": "Document:crawler",
                "label": "Crawler",
                "description": "The crawler used to acquire this file",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:crawler",
                "type": "string"
            },
            "fileSize": {
                "name": "fileSize",
                "qname": "Document:fileSize",
                "label": "File size",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:fileSize",
                "type": "number"
            },
            "fileName": {
                "name": "fileName",
                "qname": "Document:fileName",
                "label": "File name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:fileName",
                "type": "string"
            },
            "extension": {
                "name": "extension",
                "qname": "Document:extension",
                "label": "File extension",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:extension",
                "type": "string"
            },
            "encoding": {
                "name": "encoding",
                "qname": "Document:encoding",
                "label": "File encoding",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:encoding",
                "type": "string"
            },
            "messageId": {
                "name": "messageId",
                "qname": "Document:messageId",
                "label": "Message ID",
                "description": "Message ID of a document; unique in most cases",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:messageId",
                "type": "identifier"
            },
            "headers": {
                "name": "headers",
                "qname": "Document:headers",
                "label": "Raw headers",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:headers",
                "type": "string"
            },
            "mimeType": {
                "name": "mimeType",
                "qname": "Document:mimeType",
                "label": "MIME type",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/terms/format",
                "type": "mimetype"
            },
            "language": {
                "name": "language",
                "qname": "Document:language",
                "label": "Language",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/terms/language",
                "type": "string"
            },
            "date": {
                "name": "date",
                "qname": "Document:date",
                "label": "Date",
                "description": "If not otherwise specified",
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/elements/1.1/date",
                "type": "date"
            },
            "authoredAt": {
                "name": "authoredAt",
                "qname": "Document:authoredAt",
                "label": "Authored on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:authoredAt",
                "type": "date"
            },
            "publishedAt": {
                "name": "publishedAt",
                "qname": "Document:publishedAt",
                "label": "Published on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:publishedAt",
                "type": "date"
            },
            "parent": {
                "name": "parent",
                "qname": "Document:parent",
                "label": "Parent document",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/terms/isPartOf",
                "type": "entity",
                "schema": "Folder",
                "reverse": "children"
            },
            "namesMentioned": {
                "name": "namesMentioned",
                "qname": "Document:namesMentioned",
                "label": "Mentioned names",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:namesMentioned",
                "type": "name"
            },
            "ibanMentioned": {
                "name": "ibanMentioned",
                "qname": "Document:ibanMentioned",
                "label": "IBANs",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:ibanMentioned",
                "type": "iban"
            },
            "ipMentioned": {
                "name": "ipMentioned",
                "qname": "Document:ipMentioned",
                "label": "IP addresses",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:ipMentioned",
                "type": "ip"
            },
            "locationMentioned": {
                "name": "locationMentioned",
                "qname": "Document:locationMentioned",
                "label": "Locations",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:locationMentioned",
                "type": "address"
            },
            "phoneMentioned": {
                "name": "phoneMentioned",
                "qname": "Document:phoneMentioned",
                "label": "Phone numbers",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:phoneMentioned",
                "type": "phone"
            },
            "emailMentioned": {
                "name": "emailMentioned",
                "qname": "Document:emailMentioned",
                "label": "E-Mail addresses",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:emailMentioned",
                "type": "email"
            },
            "pdfAlternativeHash": {
                "name": "pdfAlternativeHash",
                "qname": "Document:pdfAlternativeHash",
                "label": "PDF alternative version checksum",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:pdfAlternativeHash",
                "type": "identifier"
            },
            "name": {
                "name": "name",
                "qname": "Thing:name",
                "label": "Name",
                "description": null,
                "caption": true,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#prefLabel",
                "type": "name"
            },
            "sameAs": {
                "name": "sameAs",
                "qname": "Thing:sameAs",
                "label": "Same as",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2002/07/owl#sameAs",
                "type": "entity",
                "schema": "Thing",
                "reverse": "sameAs"
            },
            "summary": {
                "name": "summary",
                "qname": "Thing:summary",
                "label": "Summary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:summary",
                "type": "text"
            },
            "description": {
                "name": "description",
                "qname": "Thing:description",
                "label": "Description",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:description",
                "type": "string"
            },
            "country": {
                "name": "country",
                "qname": "Thing:country",
                "label": "Country",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:country",
                "type": "country"
            },
            "alias": {
                "name": "alias",
                "qname": "Thing:alias",
                "label": "Other name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#altLabel",
                "type": "name"
            },
            "previousName": {
                "name": "previousName",
                "qname": "Thing:previousName",
                "label": "Previous name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:previousName",
                "type": "name"
            },
            "weakAlias": {
                "name": "weakAlias",
                "qname": "Thing:weakAlias",
                "label": "Weak alias",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:weakAlias",
                "type": "string"
            },
            "sourceUrl": {
                "name": "sourceUrl",
                "qname": "Thing:sourceUrl",
                "label": "Source link",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:sourceUrl",
                "type": "url"
            },
            "alephUrl": {
                "name": "alephUrl",
                "qname": "Thing:alephUrl",
                "label": "Aleph URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:alephUrl",
                "type": "url"
            },
            "wikipediaUrl": {
                "name": "wikipediaUrl",
                "qname": "Thing:wikipediaUrl",
                "label": "Wikipedia Article",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikipediaUrl",
                "type": "url"
            },
            "wikidataId": {
                "name": "wikidataId",
                "qname": "Thing:wikidataId",
                "label": "Wikidata ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikidataId",
                "type": "identifier"
            },
            "keywords": {
                "name": "keywords",
                "qname": "Thing:keywords",
                "label": "Keywords",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:keywords",
                "type": "string"
            },
            "address": {
                "name": "address",
                "qname": "Thing:address",
                "label": "Address",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:address",
                "type": "address"
            },
            "program": {
                "name": "program",
                "qname": "Thing:program",
                "label": "Program",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:program",
                "type": "string"
            },
            "notes": {
                "name": "notes",
                "qname": "Thing:notes",
                "label": "Notes",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:notes",
                "type": "text"
            },
            "modifiedAt": {
                "name": "modifiedAt",
                "qname": "Thing:modifiedAt",
                "label": "Modified on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:modifiedAt",
                "type": "date"
            },
            "retrievedAt": {
                "name": "retrievedAt",
                "qname": "Thing:retrievedAt",
                "label": "Retrieved on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:retrievedAt",
                "type": "date"
            },
            "courtCase": {
                "name": "courtCase",
                "qname": "Thing:courtCase",
                "label": "Court cases",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Thing:courtCase",
                "type": "entity",
                "schema": "CourtCaseParty",
                "reverse": "party"
            }
        }
    },
    "Email": {
        "label": "E-Mail",
        "plural": "E-Mails",
        "uri": "https://w3id.org/ftm#Email",
        "schemata": ["Thing", "Folder", "Document", "Email", "HyperText", "PlainText"],
        "extends": ["HyperText", "Folder", "PlainText"],
        "abstract": false,
        "matchable": false,
        "description": null,
        "featured": [],
        "properties": {
            "sender": {
                "name": "sender",
                "qname": "Email:sender",
                "label": "Sender",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Email:sender",
                "type": "email"
            },
            "recipient": {
                "name": "recipient",
                "qname": "Email:recipient",
                "label": "Recipient",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Email:recipient",
                "type": "email"
            },
            "carbonCopy": {
                "name": "carbonCopy",
                "qname": "Email:carbonCopy",
                "label": "Carbon copy",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Email:carbonCopy",
                "type": "email"
            },
            "blindCarbonCopy": {
                "name": "blindCarbonCopy",
                "qname": "Email:blindCarbonCopy",
                "label": "Blind carbon copy",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Email:blindCarbonCopy",
                "type": "email"
            },
            "inReplyTo": {
                "name": "inReplyTo",
                "qname": "Email:inReplyTo",
                "label": "In Reply To",
                "description": "Message IDs of the preceding emails in the thread",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Email:inReplyTo",
                "type": "identifier"
            },
            "children": {
                "name": "children",
                "qname": "Folder:children",
                "label": "Child documents",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Folder:children",
                "type": "entity",
                "schema": "Document",
                "reverse": "parent"
            },
            "contentHash": {
                "name": "contentHash",
                "qname": "Document:contentHash",
                "label": "Content checksum",
                "description": "SHA1 hash of the data",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:contentHash",
                "type": "identifier"
            },
            "title": {
                "name": "title",
                "qname": "Document:title",
                "label": "Title",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/elements/1.1/title",
                "type": "string"
            },
            "processingStatus": {
                "name": "processingStatus",
                "qname": "Document:processingStatus",
                "label": "Processing status",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:processingStatus",
                "type": "string"
            },
            "processingError": {
                "name": "processingError",
                "qname": "Document:processingError",
                "label": "Error message",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:processingError",
                "type": "string"
            },
            "author": {
                "name": "author",
                "qname": "Document:author",
                "label": "Author",
                "description": "The original author, not the uploader",
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/elements/1.1/creator",
                "type": "string"
            },
            "generator": {
                "name": "generator",
                "qname": "Document:generator",
                "label": "Generator",
                "description": "The program used to generate this file",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:generator",
                "type": "string"
            },
            "crawler": {
                "name": "crawler",
                "qname": "Document:crawler",
                "label": "Crawler",
                "description": "The crawler used to acquire this file",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:crawler",
                "type": "string"
            },
            "fileSize": {
                "name": "fileSize",
                "qname": "Document:fileSize",
                "label": "File size",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:fileSize",
                "type": "number"
            },
            "fileName": {
                "name": "fileName",
                "qname": "Document:fileName",
                "label": "File name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:fileName",
                "type": "string"
            },
            "extension": {
                "name": "extension",
                "qname": "Document:extension",
                "label": "File extension",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:extension",
                "type": "string"
            },
            "encoding": {
                "name": "encoding",
                "qname": "Document:encoding",
                "label": "File encoding",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:encoding",
                "type": "string"
            },
            "messageId": {
                "name": "messageId",
                "qname": "Document:messageId",
                "label": "Message ID",
                "description": "Message ID of a document; unique in most cases",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:messageId",
                "type": "identifier"
            },
            "headers": {
                "name": "headers",
                "qname": "Document:headers",
                "label": "Raw headers",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:headers",
                "type": "string"
            },
            "mimeType": {
                "name": "mimeType",
                "qname": "Document:mimeType",
                "label": "MIME type",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/terms/format",
                "type": "mimetype"
            },
            "language": {
                "name": "language",
                "qname": "Document:language",
                "label": "Language",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/terms/language",
                "type": "string"
            },
            "date": {
                "name": "date",
                "qname": "Document:date",
                "label": "Date",
                "description": "If not otherwise specified",
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/elements/1.1/date",
                "type": "date"
            },
            "authoredAt": {
                "name": "authoredAt",
                "qname": "Document:authoredAt",
                "label": "Authored on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:authoredAt",
                "type": "date"
            },
            "publishedAt": {
                "name": "publishedAt",
                "qname": "Document:publishedAt",
                "label": "Published on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:publishedAt",
                "type": "date"
            },
            "parent": {
                "name": "parent",
                "qname": "Document:parent",
                "label": "Parent document",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/terms/isPartOf",
                "type": "entity",
                "schema": "Folder",
                "reverse": "children"
            },
            "namesMentioned": {
                "name": "namesMentioned",
                "qname": "Document:namesMentioned",
                "label": "Mentioned names",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:namesMentioned",
                "type": "name"
            },
            "ibanMentioned": {
                "name": "ibanMentioned",
                "qname": "Document:ibanMentioned",
                "label": "IBANs",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:ibanMentioned",
                "type": "iban"
            },
            "ipMentioned": {
                "name": "ipMentioned",
                "qname": "Document:ipMentioned",
                "label": "IP addresses",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:ipMentioned",
                "type": "ip"
            },
            "locationMentioned": {
                "name": "locationMentioned",
                "qname": "Document:locationMentioned",
                "label": "Locations",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:locationMentioned",
                "type": "address"
            },
            "phoneMentioned": {
                "name": "phoneMentioned",
                "qname": "Document:phoneMentioned",
                "label": "Phone numbers",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:phoneMentioned",
                "type": "phone"
            },
            "emailMentioned": {
                "name": "emailMentioned",
                "qname": "Document:emailMentioned",
                "label": "E-Mail addresses",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:emailMentioned",
                "type": "email"
            },
            "pdfAlternativeHash": {
                "name": "pdfAlternativeHash",
                "qname": "Document:pdfAlternativeHash",
                "label": "PDF alternative version checksum",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:pdfAlternativeHash",
                "type": "identifier"
            },
            "name": {
                "name": "name",
                "qname": "Thing:name",
                "label": "Name",
                "description": null,
                "caption": true,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#prefLabel",
                "type": "name"
            },
            "sameAs": {
                "name": "sameAs",
                "qname": "Thing:sameAs",
                "label": "Same as",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2002/07/owl#sameAs",
                "type": "entity",
                "schema": "Thing",
                "reverse": "sameAs"
            },
            "summary": {
                "name": "summary",
                "qname": "Thing:summary",
                "label": "Summary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:summary",
                "type": "text"
            },
            "description": {
                "name": "description",
                "qname": "Thing:description",
                "label": "Description",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:description",
                "type": "string"
            },
            "country": {
                "name": "country",
                "qname": "Thing:country",
                "label": "Country",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:country",
                "type": "country"
            },
            "alias": {
                "name": "alias",
                "qname": "Thing:alias",
                "label": "Other name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#altLabel",
                "type": "name"
            },
            "previousName": {
                "name": "previousName",
                "qname": "Thing:previousName",
                "label": "Previous name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:previousName",
                "type": "name"
            },
            "weakAlias": {
                "name": "weakAlias",
                "qname": "Thing:weakAlias",
                "label": "Weak alias",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:weakAlias",
                "type": "string"
            },
            "sourceUrl": {
                "name": "sourceUrl",
                "qname": "Thing:sourceUrl",
                "label": "Source link",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:sourceUrl",
                "type": "url"
            },
            "alephUrl": {
                "name": "alephUrl",
                "qname": "Thing:alephUrl",
                "label": "Aleph URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:alephUrl",
                "type": "url"
            },
            "wikipediaUrl": {
                "name": "wikipediaUrl",
                "qname": "Thing:wikipediaUrl",
                "label": "Wikipedia Article",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikipediaUrl",
                "type": "url"
            },
            "wikidataId": {
                "name": "wikidataId",
                "qname": "Thing:wikidataId",
                "label": "Wikidata ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikidataId",
                "type": "identifier"
            },
            "keywords": {
                "name": "keywords",
                "qname": "Thing:keywords",
                "label": "Keywords",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:keywords",
                "type": "string"
            },
            "address": {
                "name": "address",
                "qname": "Thing:address",
                "label": "Address",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:address",
                "type": "address"
            },
            "program": {
                "name": "program",
                "qname": "Thing:program",
                "label": "Program",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:program",
                "type": "string"
            },
            "notes": {
                "name": "notes",
                "qname": "Thing:notes",
                "label": "Notes",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:notes",
                "type": "text"
            },
            "modifiedAt": {
                "name": "modifiedAt",
                "qname": "Thing:modifiedAt",
                "label": "Modified on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:modifiedAt",
                "type": "date"
            },
            "retrievedAt": {
                "name": "retrievedAt",
                "qname": "Thing:retrievedAt",
                "label": "Retrieved on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:retrievedAt",
                "type": "date"
            },
            "courtCase": {
                "name": "courtCase",
                "qname": "Thing:courtCase",
                "label": "Court cases",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Thing:courtCase",
                "type": "entity",
                "schema": "CourtCaseParty",
                "reverse": "party"
            },
            "bodyText": {
                "name": "bodyText",
                "qname": "PlainText:bodyText",
                "label": "Text",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#PlainText:bodyText",
                "type": "text"
            },
            "bodyHtml": {
                "name": "bodyHtml",
                "qname": "HyperText:bodyHtml",
                "label": "HTML",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#HyperText:bodyHtml",
                "type": "string"
            }
        }
    },
    "Table": {
        "label": "Table",
        "plural": "Tables",
        "uri": "https://w3id.org/ftm#Table",
        "schemata": ["Thing", "Table", "Document"],
        "extends": ["Document"],
        "abstract": false,
        "matchable": false,
        "description": null,
        "featured": [],
        "properties": {
            "rows": {
                "name": "rows",
                "qname": "Table:rows",
                "label": "Rows",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Table:rows",
                "type": "entity",
                "schema": "Row",
                "reverse": "table"
            },
            "contentHash": {
                "name": "contentHash",
                "qname": "Document:contentHash",
                "label": "Content checksum",
                "description": "SHA1 hash of the data",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:contentHash",
                "type": "identifier"
            },
            "title": {
                "name": "title",
                "qname": "Document:title",
                "label": "Title",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/elements/1.1/title",
                "type": "string"
            },
            "processingStatus": {
                "name": "processingStatus",
                "qname": "Document:processingStatus",
                "label": "Processing status",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:processingStatus",
                "type": "string"
            },
            "processingError": {
                "name": "processingError",
                "qname": "Document:processingError",
                "label": "Error message",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:processingError",
                "type": "string"
            },
            "author": {
                "name": "author",
                "qname": "Document:author",
                "label": "Author",
                "description": "The original author, not the uploader",
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/elements/1.1/creator",
                "type": "string"
            },
            "generator": {
                "name": "generator",
                "qname": "Document:generator",
                "label": "Generator",
                "description": "The program used to generate this file",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:generator",
                "type": "string"
            },
            "crawler": {
                "name": "crawler",
                "qname": "Document:crawler",
                "label": "Crawler",
                "description": "The crawler used to acquire this file",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:crawler",
                "type": "string"
            },
            "fileSize": {
                "name": "fileSize",
                "qname": "Document:fileSize",
                "label": "File size",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:fileSize",
                "type": "number"
            },
            "fileName": {
                "name": "fileName",
                "qname": "Document:fileName",
                "label": "File name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:fileName",
                "type": "string"
            },
            "extension": {
                "name": "extension",
                "qname": "Document:extension",
                "label": "File extension",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:extension",
                "type": "string"
            },
            "encoding": {
                "name": "encoding",
                "qname": "Document:encoding",
                "label": "File encoding",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:encoding",
                "type": "string"
            },
            "messageId": {
                "name": "messageId",
                "qname": "Document:messageId",
                "label": "Message ID",
                "description": "Message ID of a document; unique in most cases",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:messageId",
                "type": "identifier"
            },
            "headers": {
                "name": "headers",
                "qname": "Document:headers",
                "label": "Raw headers",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:headers",
                "type": "string"
            },
            "mimeType": {
                "name": "mimeType",
                "qname": "Document:mimeType",
                "label": "MIME type",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/terms/format",
                "type": "mimetype"
            },
            "language": {
                "name": "language",
                "qname": "Document:language",
                "label": "Language",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/terms/language",
                "type": "string"
            },
            "date": {
                "name": "date",
                "qname": "Document:date",
                "label": "Date",
                "description": "If not otherwise specified",
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/elements/1.1/date",
                "type": "date"
            },
            "authoredAt": {
                "name": "authoredAt",
                "qname": "Document:authoredAt",
                "label": "Authored on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:authoredAt",
                "type": "date"
            },
            "publishedAt": {
                "name": "publishedAt",
                "qname": "Document:publishedAt",
                "label": "Published on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:publishedAt",
                "type": "date"
            },
            "parent": {
                "name": "parent",
                "qname": "Document:parent",
                "label": "Parent document",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://purl.org/dc/terms/isPartOf",
                "type": "entity",
                "schema": "Folder",
                "reverse": "children"
            },
            "namesMentioned": {
                "name": "namesMentioned",
                "qname": "Document:namesMentioned",
                "label": "Mentioned names",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:namesMentioned",
                "type": "name"
            },
            "ibanMentioned": {
                "name": "ibanMentioned",
                "qname": "Document:ibanMentioned",
                "label": "IBANs",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:ibanMentioned",
                "type": "iban"
            },
            "ipMentioned": {
                "name": "ipMentioned",
                "qname": "Document:ipMentioned",
                "label": "IP addresses",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:ipMentioned",
                "type": "ip"
            },
            "locationMentioned": {
                "name": "locationMentioned",
                "qname": "Document:locationMentioned",
                "label": "Locations",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:locationMentioned",
                "type": "address"
            },
            "phoneMentioned": {
                "name": "phoneMentioned",
                "qname": "Document:phoneMentioned",
                "label": "Phone numbers",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:phoneMentioned",
                "type": "phone"
            },
            "emailMentioned": {
                "name": "emailMentioned",
                "qname": "Document:emailMentioned",
                "label": "E-Mail addresses",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:emailMentioned",
                "type": "email"
            },
            "pdfAlternativeHash": {
                "name": "pdfAlternativeHash",
                "qname": "Document:pdfAlternativeHash",
                "label": "PDF alternative version checksum",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Document:pdfAlternativeHash",
                "type": "identifier"
            },
            "name": {
                "name": "name",
                "qname": "Thing:name",
                "label": "Name",
                "description": null,
                "caption": true,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#prefLabel",
                "type": "name"
            },
            "sameAs": {
                "name": "sameAs",
                "qname": "Thing:sameAs",
                "label": "Same as",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2002/07/owl#sameAs",
                "type": "entity",
                "schema": "Thing",
                "reverse": "sameAs"
            },
            "summary": {
                "name": "summary",
                "qname": "Thing:summary",
                "label": "Summary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:summary",
                "type": "text"
            },
            "description": {
                "name": "description",
                "qname": "Thing:description",
                "label": "Description",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:description",
                "type": "string"
            },
            "country": {
                "name": "country",
                "qname": "Thing:country",
                "label": "Country",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:country",
                "type": "country"
            },
            "alias": {
                "name": "alias",
                "qname": "Thing:alias",
                "label": "Other name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#altLabel",
                "type": "name"
            },
            "previousName": {
                "name": "previousName",
                "qname": "Thing:previousName",
                "label": "Previous name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:previousName",
                "type": "name"
            },
            "weakAlias": {
                "name": "weakAlias",
                "qname": "Thing:weakAlias",
                "label": "Weak alias",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:weakAlias",
                "type": "string"
            },
            "sourceUrl": {
                "name": "sourceUrl",
                "qname": "Thing:sourceUrl",
                "label": "Source link",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:sourceUrl",
                "type": "url"
            },
            "alephUrl": {
                "name": "alephUrl",
                "qname": "Thing:alephUrl",
                "label": "Aleph URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:alephUrl",
                "type": "url"
            },
            "wikipediaUrl": {
                "name": "wikipediaUrl",
                "qname": "Thing:wikipediaUrl",
                "label": "Wikipedia Article",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikipediaUrl",
                "type": "url"
            },
            "wikidataId": {
                "name": "wikidataId",
                "qname": "Thing:wikidataId",
                "label": "Wikidata ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikidataId",
                "type": "identifier"
            },
            "keywords": {
                "name": "keywords",
                "qname": "Thing:keywords",
                "label": "Keywords",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:keywords",
                "type": "string"
            },
            "address": {
                "name": "address",
                "qname": "Thing:address",
                "label": "Address",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:address",
                "type": "address"
            },
            "program": {
                "name": "program",
                "qname": "Thing:program",
                "label": "Program",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:program",
                "type": "string"
            },
            "notes": {
                "name": "notes",
                "qname": "Thing:notes",
                "label": "Notes",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:notes",
                "type": "text"
            },
            "modifiedAt": {
                "name": "modifiedAt",
                "qname": "Thing:modifiedAt",
                "label": "Modified on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:modifiedAt",
                "type": "date"
            },
            "retrievedAt": {
                "name": "retrievedAt",
                "qname": "Thing:retrievedAt",
                "label": "Retrieved on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:retrievedAt",
                "type": "date"
            },
            "courtCase": {
                "name": "courtCase",
                "qname": "Thing:courtCase",
                "label": "Court cases",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Thing:courtCase",
                "type": "entity",
                "schema": "CourtCaseParty",
                "reverse": "party"
            }
        }
    },
    "License": {
        "label": "License",
        "plural": "Licenses",
        "uri": "https://w3id.org/ftm#License",
        "schemata": ["Contract", "Thing", "License", "Value", "Asset"],
        "extends": ["Contract"],
        "abstract": false,
        "matchable": false,
        "description": "A grant of land, rights or property. A type of Contract",
        "featured": ["name", "amount", "authority", "contractDate", "commodities"],
        "properties": {
            "area": {
                "name": "area",
                "qname": "License:area",
                "label": "Area",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#License:area",
                "type": "string"
            },
            "commodities": {
                "name": "commodities",
                "qname": "License:commodities",
                "label": "Commodities",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#License:commodities",
                "type": "string"
            },
            "reviewDate": {
                "name": "reviewDate",
                "qname": "License:reviewDate",
                "label": "License review date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#License:reviewDate",
                "type": "string"
            },
            "authority": {
                "name": "authority",
                "qname": "Contract:authority",
                "label": "Contract authority",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Contract:authority",
                "type": "entity",
                "schema": "LegalEntity",
                "reverse": "contractAuthority"
            },
            "type": {
                "name": "type",
                "qname": "Contract:type",
                "label": "Type",
                "description": "Type of contract. Potentially W (Works), U (Supplies), S (Services).\n",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Contract:type",
                "type": "string"
            },
            "contractDate": {
                "name": "contractDate",
                "qname": "Contract:contractDate",
                "label": "Contract date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Contract:contractDate",
                "type": "date"
            },
            "procedureNumber": {
                "name": "procedureNumber",
                "qname": "Contract:procedureNumber",
                "label": "Procedure number",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Contract:procedureNumber",
                "type": "string"
            },
            "noticeId": {
                "name": "noticeId",
                "qname": "Contract:noticeId",
                "label": "Contract Award Notice ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Contract:noticeId",
                "type": "string"
            },
            "numberAwards": {
                "name": "numberAwards",
                "qname": "Contract:numberAwards",
                "label": "Number of awards",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Contract:numberAwards",
                "type": "string"
            },
            "cancelled": {
                "name": "cancelled",
                "qname": "Contract:cancelled",
                "label": "Cancelled?",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Contract:cancelled",
                "type": "string"
            },
            "name": {
                "name": "name",
                "qname": "Thing:name",
                "label": "Name",
                "description": null,
                "caption": true,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#prefLabel",
                "type": "name"
            },
            "sameAs": {
                "name": "sameAs",
                "qname": "Thing:sameAs",
                "label": "Same as",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2002/07/owl#sameAs",
                "type": "entity",
                "schema": "Thing",
                "reverse": "sameAs"
            },
            "summary": {
                "name": "summary",
                "qname": "Thing:summary",
                "label": "Summary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:summary",
                "type": "text"
            },
            "description": {
                "name": "description",
                "qname": "Thing:description",
                "label": "Description",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:description",
                "type": "string"
            },
            "country": {
                "name": "country",
                "qname": "Thing:country",
                "label": "Country",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:country",
                "type": "country"
            },
            "alias": {
                "name": "alias",
                "qname": "Thing:alias",
                "label": "Other name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#altLabel",
                "type": "name"
            },
            "previousName": {
                "name": "previousName",
                "qname": "Thing:previousName",
                "label": "Previous name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:previousName",
                "type": "name"
            },
            "weakAlias": {
                "name": "weakAlias",
                "qname": "Thing:weakAlias",
                "label": "Weak alias",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:weakAlias",
                "type": "string"
            },
            "sourceUrl": {
                "name": "sourceUrl",
                "qname": "Thing:sourceUrl",
                "label": "Source link",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:sourceUrl",
                "type": "url"
            },
            "alephUrl": {
                "name": "alephUrl",
                "qname": "Thing:alephUrl",
                "label": "Aleph URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:alephUrl",
                "type": "url"
            },
            "wikipediaUrl": {
                "name": "wikipediaUrl",
                "qname": "Thing:wikipediaUrl",
                "label": "Wikipedia Article",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikipediaUrl",
                "type": "url"
            },
            "wikidataId": {
                "name": "wikidataId",
                "qname": "Thing:wikidataId",
                "label": "Wikidata ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikidataId",
                "type": "identifier"
            },
            "keywords": {
                "name": "keywords",
                "qname": "Thing:keywords",
                "label": "Keywords",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:keywords",
                "type": "string"
            },
            "address": {
                "name": "address",
                "qname": "Thing:address",
                "label": "Address",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:address",
                "type": "address"
            },
            "program": {
                "name": "program",
                "qname": "Thing:program",
                "label": "Program",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:program",
                "type": "string"
            },
            "notes": {
                "name": "notes",
                "qname": "Thing:notes",
                "label": "Notes",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:notes",
                "type": "text"
            },
            "modifiedAt": {
                "name": "modifiedAt",
                "qname": "Thing:modifiedAt",
                "label": "Modified on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:modifiedAt",
                "type": "date"
            },
            "retrievedAt": {
                "name": "retrievedAt",
                "qname": "Thing:retrievedAt",
                "label": "Retrieved on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:retrievedAt",
                "type": "date"
            },
            "amount": {
                "name": "amount",
                "qname": "Value:amount",
                "label": "Amount",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:amount",
                "type": "number"
            },
            "currency": {
                "name": "currency",
                "qname": "Value:currency",
                "label": "Currency",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:currency",
                "type": "string"
            },
            "amountUsd": {
                "name": "amountUsd",
                "qname": "Value:amountUsd",
                "label": "Amount in USD",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:amountUsd",
                "type": "number"
            },
            "amountEur": {
                "name": "amountEur",
                "qname": "Value:amountEur",
                "label": "Amount in EUR",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:amountEur",
                "type": "number"
            },
            "ownershipAsset": {
                "name": "ownershipAsset",
                "qname": "Asset:ownershipAsset",
                "label": "Owners",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Asset:ownershipAsset",
                "type": "entity",
                "schema": "Ownership",
                "reverse": "asset"
            },
            "courtCase": {
                "name": "courtCase",
                "qname": "Thing:courtCase",
                "label": "Court cases",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Thing:courtCase",
                "type": "entity",
                "schema": "CourtCaseParty",
                "reverse": "party"
            }
        }
    },
    "ContractAward": {
        "label": "Contract Lot Award",
        "plural": "Contract Awards",
        "uri": "https://w3id.org/ftm#ContractAward",
        "schemata": ["Interval", "Value", "ContractAward", "Interest"],
        "extends": ["Value", "Interest"],
        "abstract": false,
        "matchable": false,
        "description": "A contract or contract lot as awarded to a supplier.",
        "featured": ["supplier", "contract", "amount", "lotNumber", "decisionReason"],
        "properties": {
            "supplier": {
                "name": "supplier",
                "qname": "ContractAward:supplier",
                "label": "Supplier",
                "description": "The entity the contract was awarded to",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#ContractAward:supplier",
                "type": "entity",
                "schema": "LegalEntity",
                "reverse": "contractAwardSupplier"
            },
            "contract": {
                "name": "contract",
                "qname": "ContractAward:contract",
                "label": "Contract",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#ContractAward:contract",
                "type": "entity",
                "schema": "Contract",
                "reverse": "awards"
            },
            "lotNumber": {
                "name": "lotNumber",
                "qname": "ContractAward:lotNumber",
                "label": "Lot number",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#ContractAward:lotNumber",
                "type": "string"
            },
            "documentNumber": {
                "name": "documentNumber",
                "qname": "ContractAward:documentNumber",
                "label": "Document number",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#ContractAward:documentNumber",
                "type": "string"
            },
            "documentType": {
                "name": "documentType",
                "qname": "ContractAward:documentType",
                "label": "Document type",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#ContractAward:documentType",
                "type": "string"
            },
            "decisionReason": {
                "name": "decisionReason",
                "qname": "ContractAward:decisionReason",
                "label": "Decision reason",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#ContractAward:decisionReason",
                "type": "string"
            },
            "cpvCode": {
                "name": "cpvCode",
                "qname": "ContractAward:cpvCode",
                "label": "CPV Code",
                "description": "Contract Procurement Vocabulary (what type of goods/services, EU)",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#ContractAward:cpvCode",
                "type": "string"
            },
            "nutsCode": {
                "name": "nutsCode",
                "qname": "ContractAward:nutsCode",
                "label": "NUTS Code",
                "description": "Nomencalture of Territorial Units for Statistics (NUTS)",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#ContractAward:nutsCode",
                "type": "string"
            },
            "amended": {
                "name": "amended",
                "qname": "ContractAward:amended",
                "label": "Amended?",
                "description": "Was this award amended, modified or updated by a subsequent document?",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#ContractAward:amended",
                "type": "string"
            },
            "amount": {
                "name": "amount",
                "qname": "Value:amount",
                "label": "Amount",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:amount",
                "type": "number"
            },
            "currency": {
                "name": "currency",
                "qname": "Value:currency",
                "label": "Currency",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:currency",
                "type": "string"
            },
            "amountUsd": {
                "name": "amountUsd",
                "qname": "Value:amountUsd",
                "label": "Amount in USD",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:amountUsd",
                "type": "number"
            },
            "amountEur": {
                "name": "amountEur",
                "qname": "Value:amountEur",
                "label": "Amount in EUR",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:amountEur",
                "type": "number"
            },
            "role": {
                "name": "role",
                "qname": "Interest:role",
                "label": "Role",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interest:role",
                "type": "string"
            },
            "status": {
                "name": "status",
                "qname": "Interest:status",
                "label": "Status",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interest:status",
                "type": "string"
            },
            "startDate": {
                "name": "startDate",
                "qname": "Interval:startDate",
                "label": "Start date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:startDate",
                "type": "date"
            },
            "endDate": {
                "name": "endDate",
                "qname": "Interval:endDate",
                "label": "End date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:endDate",
                "type": "date"
            },
            "date": {
                "name": "date",
                "qname": "Interval:date",
                "label": "Date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:date",
                "type": "date"
            },
            "summary": {
                "name": "summary",
                "qname": "Interval:summary",
                "label": "Summary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:summary",
                "type": "text"
            },
            "recordId": {
                "name": "recordId",
                "qname": "Interval:recordId",
                "label": "Record ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:recordId",
                "type": "string"
            },
            "sourceUrl": {
                "name": "sourceUrl",
                "qname": "Interval:sourceUrl",
                "label": "Source URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:sourceUrl",
                "type": "url"
            },
            "alephUrl": {
                "name": "alephUrl",
                "qname": "Interval:alephUrl",
                "label": "Aleph URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:alephUrl",
                "type": "url"
            },
            "modifiedAt": {
                "name": "modifiedAt",
                "qname": "Interval:modifiedAt",
                "label": "Modified on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:modifiedAt",
                "type": "date"
            },
            "retrievedAt": {
                "name": "retrievedAt",
                "qname": "Interval:retrievedAt",
                "label": "Retrieved on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:retrievedAt",
                "type": "date"
            }
        }
    },
    "Thing": {
        "label": "Thing",
        "plural": "Thing",
        "uri": "https://w3id.org/ftm#Thing",
        "schemata": ["Thing"],
        "extends": [],
        "abstract": true,
        "matchable": false,
        "description": null,
        "featured": ["name", "country"],
        "properties": {
            "name": {
                "name": "name",
                "qname": "Thing:name",
                "label": "Name",
                "description": null,
                "caption": true,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#prefLabel",
                "type": "name"
            },
            "sameAs": {
                "name": "sameAs",
                "qname": "Thing:sameAs",
                "label": "Same as",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2002/07/owl#sameAs",
                "type": "entity",
                "schema": "Thing",
                "reverse": "sameAs"
            },
            "summary": {
                "name": "summary",
                "qname": "Thing:summary",
                "label": "Summary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:summary",
                "type": "text"
            },
            "description": {
                "name": "description",
                "qname": "Thing:description",
                "label": "Description",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:description",
                "type": "string"
            },
            "country": {
                "name": "country",
                "qname": "Thing:country",
                "label": "Country",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:country",
                "type": "country"
            },
            "alias": {
                "name": "alias",
                "qname": "Thing:alias",
                "label": "Other name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#altLabel",
                "type": "name"
            },
            "previousName": {
                "name": "previousName",
                "qname": "Thing:previousName",
                "label": "Previous name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:previousName",
                "type": "name"
            },
            "weakAlias": {
                "name": "weakAlias",
                "qname": "Thing:weakAlias",
                "label": "Weak alias",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:weakAlias",
                "type": "string"
            },
            "sourceUrl": {
                "name": "sourceUrl",
                "qname": "Thing:sourceUrl",
                "label": "Source link",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:sourceUrl",
                "type": "url"
            },
            "alephUrl": {
                "name": "alephUrl",
                "qname": "Thing:alephUrl",
                "label": "Aleph URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:alephUrl",
                "type": "url"
            },
            "wikipediaUrl": {
                "name": "wikipediaUrl",
                "qname": "Thing:wikipediaUrl",
                "label": "Wikipedia Article",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikipediaUrl",
                "type": "url"
            },
            "wikidataId": {
                "name": "wikidataId",
                "qname": "Thing:wikidataId",
                "label": "Wikidata ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikidataId",
                "type": "identifier"
            },
            "keywords": {
                "name": "keywords",
                "qname": "Thing:keywords",
                "label": "Keywords",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:keywords",
                "type": "string"
            },
            "address": {
                "name": "address",
                "qname": "Thing:address",
                "label": "Address",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:address",
                "type": "address"
            },
            "program": {
                "name": "program",
                "qname": "Thing:program",
                "label": "Program",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:program",
                "type": "string"
            },
            "notes": {
                "name": "notes",
                "qname": "Thing:notes",
                "label": "Notes",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:notes",
                "type": "text"
            },
            "modifiedAt": {
                "name": "modifiedAt",
                "qname": "Thing:modifiedAt",
                "label": "Modified on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:modifiedAt",
                "type": "date"
            },
            "retrievedAt": {
                "name": "retrievedAt",
                "qname": "Thing:retrievedAt",
                "label": "Retrieved on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:retrievedAt",
                "type": "date"
            },
            "courtCase": {
                "name": "courtCase",
                "qname": "Thing:courtCase",
                "label": "Court cases",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Thing:courtCase",
                "type": "entity",
                "schema": "CourtCaseParty",
                "reverse": "party"
            },
            "sanctionEntity": {
                "name": "sanctionEntity",
                "qname": "Thing:sanctionEntity",
                "label": "Sanctions",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Thing:sanctionEntity",
                "type": "entity",
                "schema": "Sanction",
                "reverse": "entity"
            },
            "unknownLinkTo": {
                "name": "unknownLinkTo",
                "qname": "Thing:unknownLinkTo",
                "label": "Linked to",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Thing:unknownLinkTo",
                "type": "entity",
                "schema": "UnknownLink",
                "reverse": "subject"
            },
            "unknownLinkFrom": {
                "name": "unknownLinkFrom",
                "qname": "Thing:unknownLinkFrom",
                "label": "Linked from",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Thing:unknownLinkFrom",
                "type": "entity",
                "schema": "UnknownLink",
                "reverse": "object"
            }
        }
    },
    "Payment": {
        "label": "Payment",
        "plural": "Payments",
        "uri": "https://w3id.org/ftm#Payment",
        "schemata": ["Interval", "Value", "Payment"],
        "extends": ["Interval", "Value"],
        "abstract": false,
        "matchable": false,
        "description": "A monetary payment between two parties.",
        "featured": ["payer", "beneficiary", "amount", "purpose"],
        "properties": {
            "sequenceNumber": {
                "name": "sequenceNumber",
                "qname": "Payment:sequenceNumber",
                "label": "Sequence number",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Payment:sequenceNumber",
                "type": "string"
            },
            "transactionNumber": {
                "name": "transactionNumber",
                "qname": "Payment:transactionNumber",
                "label": "Transaction number",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Payment:transactionNumber",
                "type": "string"
            },
            "purpose": {
                "name": "purpose",
                "qname": "Payment:purpose",
                "label": "Payment purpose",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Payment:purpose",
                "type": "text"
            },
            "programme": {
                "name": "programme",
                "qname": "Payment:programme",
                "label": "Payment programme",
                "description": "Programme name, funding code, category identifier, etc.",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Payment:programme",
                "type": "string"
            },
            "payer": {
                "name": "payer",
                "qname": "Payment:payer",
                "label": "Payer",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Payment:payer",
                "type": "entity",
                "schema": "LegalEntity",
                "reverse": "paymentPayer"
            },
            "payerAccount": {
                "name": "payerAccount",
                "qname": "Payment:payerAccount",
                "label": "Payer bank account",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Payment:payerAccount",
                "type": "entity",
                "schema": "BankAccount",
                "reverse": "paymentPayerAccount"
            },
            "beneficiary": {
                "name": "beneficiary",
                "qname": "Payment:beneficiary",
                "label": "Beneficiary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Payment:beneficiary",
                "type": "entity",
                "schema": "LegalEntity",
                "reverse": "paymentBeneficiary"
            },
            "beneficiaryAccount": {
                "name": "beneficiaryAccount",
                "qname": "Payment:beneficiaryAccount",
                "label": "Beneficiary bank account",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Payment:beneficiaryAccount",
                "type": "entity",
                "schema": "BankAccount",
                "reverse": "paymentBeneficiaryAccount"
            },
            "startDate": {
                "name": "startDate",
                "qname": "Interval:startDate",
                "label": "Start date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:startDate",
                "type": "date"
            },
            "endDate": {
                "name": "endDate",
                "qname": "Interval:endDate",
                "label": "End date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:endDate",
                "type": "date"
            },
            "date": {
                "name": "date",
                "qname": "Interval:date",
                "label": "Date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:date",
                "type": "date"
            },
            "summary": {
                "name": "summary",
                "qname": "Interval:summary",
                "label": "Summary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:summary",
                "type": "text"
            },
            "recordId": {
                "name": "recordId",
                "qname": "Interval:recordId",
                "label": "Record ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:recordId",
                "type": "string"
            },
            "sourceUrl": {
                "name": "sourceUrl",
                "qname": "Interval:sourceUrl",
                "label": "Source URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:sourceUrl",
                "type": "url"
            },
            "alephUrl": {
                "name": "alephUrl",
                "qname": "Interval:alephUrl",
                "label": "Aleph URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:alephUrl",
                "type": "url"
            },
            "modifiedAt": {
                "name": "modifiedAt",
                "qname": "Interval:modifiedAt",
                "label": "Modified on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:modifiedAt",
                "type": "date"
            },
            "retrievedAt": {
                "name": "retrievedAt",
                "qname": "Interval:retrievedAt",
                "label": "Retrieved on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:retrievedAt",
                "type": "date"
            },
            "amount": {
                "name": "amount",
                "qname": "Value:amount",
                "label": "Amount",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:amount",
                "type": "number"
            },
            "currency": {
                "name": "currency",
                "qname": "Value:currency",
                "label": "Currency",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:currency",
                "type": "string"
            },
            "amountUsd": {
                "name": "amountUsd",
                "qname": "Value:amountUsd",
                "label": "Amount in USD",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:amountUsd",
                "type": "number"
            },
            "amountEur": {
                "name": "amountEur",
                "qname": "Value:amountEur",
                "label": "Amount in EUR",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:amountEur",
                "type": "number"
            }
        }
    },
    "Asset": {
        "label": "Asset",
        "plural": "Assets",
        "uri": "https://w3id.org/ftm#Asset",
        "schemata": ["Value", "Asset", "Thing"],
        "extends": ["Value", "Thing"],
        "abstract": true,
        "matchable": false,
        "description": null,
        "featured": [],
        "properties": {
            "name": {
                "name": "name",
                "qname": "Thing:name",
                "label": "Name",
                "description": null,
                "caption": true,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#prefLabel",
                "type": "name"
            },
            "sameAs": {
                "name": "sameAs",
                "qname": "Thing:sameAs",
                "label": "Same as",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2002/07/owl#sameAs",
                "type": "entity",
                "schema": "Thing",
                "reverse": "sameAs"
            },
            "summary": {
                "name": "summary",
                "qname": "Thing:summary",
                "label": "Summary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:summary",
                "type": "text"
            },
            "description": {
                "name": "description",
                "qname": "Thing:description",
                "label": "Description",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:description",
                "type": "string"
            },
            "country": {
                "name": "country",
                "qname": "Thing:country",
                "label": "Country",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:country",
                "type": "country"
            },
            "alias": {
                "name": "alias",
                "qname": "Thing:alias",
                "label": "Other name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#altLabel",
                "type": "name"
            },
            "previousName": {
                "name": "previousName",
                "qname": "Thing:previousName",
                "label": "Previous name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:previousName",
                "type": "name"
            },
            "weakAlias": {
                "name": "weakAlias",
                "qname": "Thing:weakAlias",
                "label": "Weak alias",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:weakAlias",
                "type": "string"
            },
            "sourceUrl": {
                "name": "sourceUrl",
                "qname": "Thing:sourceUrl",
                "label": "Source link",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:sourceUrl",
                "type": "url"
            },
            "alephUrl": {
                "name": "alephUrl",
                "qname": "Thing:alephUrl",
                "label": "Aleph URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:alephUrl",
                "type": "url"
            },
            "wikipediaUrl": {
                "name": "wikipediaUrl",
                "qname": "Thing:wikipediaUrl",
                "label": "Wikipedia Article",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikipediaUrl",
                "type": "url"
            },
            "wikidataId": {
                "name": "wikidataId",
                "qname": "Thing:wikidataId",
                "label": "Wikidata ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikidataId",
                "type": "identifier"
            },
            "keywords": {
                "name": "keywords",
                "qname": "Thing:keywords",
                "label": "Keywords",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:keywords",
                "type": "string"
            },
            "address": {
                "name": "address",
                "qname": "Thing:address",
                "label": "Address",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:address",
                "type": "address"
            },
            "program": {
                "name": "program",
                "qname": "Thing:program",
                "label": "Program",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:program",
                "type": "string"
            },
            "notes": {
                "name": "notes",
                "qname": "Thing:notes",
                "label": "Notes",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:notes",
                "type": "text"
            },
            "modifiedAt": {
                "name": "modifiedAt",
                "qname": "Thing:modifiedAt",
                "label": "Modified on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:modifiedAt",
                "type": "date"
            },
            "retrievedAt": {
                "name": "retrievedAt",
                "qname": "Thing:retrievedAt",
                "label": "Retrieved on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:retrievedAt",
                "type": "date"
            },
            "amount": {
                "name": "amount",
                "qname": "Value:amount",
                "label": "Amount",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:amount",
                "type": "number"
            },
            "currency": {
                "name": "currency",
                "qname": "Value:currency",
                "label": "Currency",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:currency",
                "type": "string"
            },
            "amountUsd": {
                "name": "amountUsd",
                "qname": "Value:amountUsd",
                "label": "Amount in USD",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:amountUsd",
                "type": "number"
            },
            "amountEur": {
                "name": "amountEur",
                "qname": "Value:amountEur",
                "label": "Amount in EUR",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:amountEur",
                "type": "number"
            },
            "ownershipAsset": {
                "name": "ownershipAsset",
                "qname": "Asset:ownershipAsset",
                "label": "Owners",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Asset:ownershipAsset",
                "type": "entity",
                "schema": "Ownership",
                "reverse": "asset"
            },
            "courtCase": {
                "name": "courtCase",
                "qname": "Thing:courtCase",
                "label": "Court cases",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Thing:courtCase",
                "type": "entity",
                "schema": "CourtCaseParty",
                "reverse": "party"
            },
            "sanctionEntity": {
                "name": "sanctionEntity",
                "qname": "Thing:sanctionEntity",
                "label": "Sanctions",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Thing:sanctionEntity",
                "type": "entity",
                "schema": "Sanction",
                "reverse": "entity"
            }
        }
    },
    "Person": {
        "label": "Person",
        "plural": "People",
        "uri": "http://xmlns.com/foaf/0.1/Person",
        "schemata": ["LegalEntity", "Thing", "Person"],
        "extends": ["LegalEntity"],
        "abstract": false,
        "matchable": true,
        "description": "An individual",
        "featured": ["name", "nationality", "birthDate"],
        "properties": {
            "title": {
                "name": "title",
                "qname": "Person:title",
                "label": "Title",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://xmlns.com/foaf/0.1/title",
                "type": "string"
            },
            "firstName": {
                "name": "firstName",
                "qname": "Person:firstName",
                "label": "First name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://xmlns.com/foaf/0.1/givenName",
                "type": "string"
            },
            "secondName": {
                "name": "secondName",
                "qname": "Person:secondName",
                "label": "Second name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Person:secondName",
                "type": "string"
            },
            "middleName": {
                "name": "middleName",
                "qname": "Person:middleName",
                "label": "Middle name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Person:middleName",
                "type": "string"
            },
            "fatherName": {
                "name": "fatherName",
                "qname": "Person:fatherName",
                "label": "Patronymic",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Person:fatherName",
                "type": "string"
            },
            "motherName": {
                "name": "motherName",
                "qname": "Person:motherName",
                "label": "Matronymic",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Person:motherName",
                "type": "string"
            },
            "lastName": {
                "name": "lastName",
                "qname": "Person:lastName",
                "label": "Last name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://xmlns.com/foaf/0.1/lastName",
                "type": "string"
            },
            "birthDate": {
                "name": "birthDate",
                "qname": "Person:birthDate",
                "label": "Birth date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://xmlns.com/foaf/0.1/birthday",
                "type": "date"
            },
            "birthPlace": {
                "name": "birthPlace",
                "qname": "Person:birthPlace",
                "label": "Place of birth",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Person:birthPlace",
                "type": "string"
            },
            "deathDate": {
                "name": "deathDate",
                "qname": "Person:deathDate",
                "label": "Death date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Person:deathDate",
                "type": "date"
            },
            "position": {
                "name": "position",
                "qname": "Person:position",
                "label": "Position",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Person:position",
                "type": "string"
            },
            "nationality": {
                "name": "nationality",
                "qname": "Person:nationality",
                "label": "Nationality",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Person:nationality",
                "type": "country"
            },
            "gender": {
                "name": "gender",
                "qname": "Person:gender",
                "label": "Gender",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Person:gender",
                "type": "string"
            },
            "passportNumber": {
                "name": "passportNumber",
                "qname": "Person:passportNumber",
                "label": "Passport",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Person:passportNumber",
                "type": "identifier"
            },
            "relationshipPerson": {
                "name": "relationshipPerson",
                "qname": "Person:relationshipPerson",
                "label": "Related to",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Person:relationshipPerson",
                "type": "entity",
                "schema": "Relationship",
                "reverse": "person"
            },
            "associates": {
                "name": "associates",
                "qname": "Person:associates",
                "label": "Associates",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Person:associates",
                "type": "entity",
                "schema": "Associate",
                "reverse": "associate"
            },
            "email": {
                "name": "email",
                "qname": "LegalEntity:email",
                "label": "E-Mail",
                "description": "Email address",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:email",
                "type": "email"
            },
            "phone": {
                "name": "phone",
                "qname": "LegalEntity:phone",
                "label": "Phone",
                "description": "Phone number",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:phone",
                "type": "phone"
            },
            "website": {
                "name": "website",
                "qname": "LegalEntity:website",
                "label": "Website",
                "description": "Website address",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:website",
                "type": "url"
            },
            "legalForm": {
                "name": "legalForm",
                "qname": "LegalEntity:legalForm",
                "label": "Legal form",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:legalForm",
                "type": "string"
            },
            "incorporationDate": {
                "name": "incorporationDate",
                "qname": "LegalEntity:incorporationDate",
                "label": "Incorporation date",
                "description": "The date the legal entity was incorporated",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:incorporationDate",
                "type": "date"
            },
            "dissolutionDate": {
                "name": "dissolutionDate",
                "qname": "LegalEntity:dissolutionDate",
                "label": "Dissolution date",
                "description": "The date the legal entity was dissolved, if applicable",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:dissolutionDate",
                "type": "date"
            },
            "taxStatus": {
                "name": "taxStatus",
                "qname": "LegalEntity:taxStatus",
                "label": "Tax status",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:taxStatus",
                "type": "string"
            },
            "status": {
                "name": "status",
                "qname": "LegalEntity:status",
                "label": "Status",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:status",
                "type": "string"
            },
            "sector": {
                "name": "sector",
                "qname": "LegalEntity:sector",
                "label": "Sector",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:sector",
                "type": "string"
            },
            "classification": {
                "name": "classification",
                "qname": "LegalEntity:classification",
                "label": "Classification",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:classification",
                "type": "string"
            },
            "registrationNumber": {
                "name": "registrationNumber",
                "qname": "LegalEntity:registrationNumber",
                "label": "Registration number",
                "description": "Company registration number",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:registrationNumber",
                "type": "identifier"
            },
            "idNumber": {
                "name": "idNumber",
                "qname": "LegalEntity:idNumber",
                "label": "ID Number",
                "description": "ID number of any applicable ID",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:idNumber",
                "type": "identifier"
            },
            "taxNumber": {
                "name": "taxNumber",
                "qname": "LegalEntity:taxNumber",
                "label": "Tax ID Number",
                "description": "Tax ID number",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:taxNumber",
                "type": "identifier"
            },
            "vatCode": {
                "name": "vatCode",
                "qname": "LegalEntity:vatCode",
                "label": "V.A.T. Identifier",
                "description": "(EU) VAT number",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:vatCode",
                "type": "identifier"
            },
            "jurisdiction": {
                "name": "jurisdiction",
                "qname": "LegalEntity:jurisdiction",
                "label": "Jurisdiction",
                "description": "Country or region in which this entity operates",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:jurisdiction",
                "type": "country"
            },
            "mainCountry": {
                "name": "mainCountry",
                "qname": "LegalEntity:mainCountry",
                "label": "Country of origin",
                "description": "Primary country of this entity",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:mainCountry",
                "type": "country"
            },
            "opencorporatesUrl": {
                "name": "opencorporatesUrl",
                "qname": "LegalEntity:opencorporatesUrl",
                "label": "OpenCorporates URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:opencorporatesUrl",
                "type": "url"
            },
            "bvdId": {
                "name": "bvdId",
                "qname": "LegalEntity:bvdId",
                "label": "Bureau van Dijk ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:bvdId",
                "type": "identifier"
            },
            "icijId": {
                "name": "icijId",
                "qname": "LegalEntity:icijId",
                "label": "ICIJ ID",
                "description": "ID according to International Consortium for Investigative Journalists",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:icijId",
                "type": "string"
            },
            "okpoCode": {
                "name": "okpoCode",
                "qname": "LegalEntity:okpoCode",
                "label": "OKPO",
                "description": "Russian industry classifier",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:okpoCode",
                "type": "identifier"
            },
            "innCode": {
                "name": "innCode",
                "qname": "LegalEntity:innCode",
                "label": "INN",
                "description": "Russian company ID",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:innCode",
                "type": "identifier"
            },
            "dunsCode": {
                "name": "dunsCode",
                "qname": "LegalEntity:dunsCode",
                "label": "D-U-N-S",
                "description": "Dun & Bradstreet identifier",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:dunsCode",
                "type": "identifier"
            },
            "swiftBic": {
                "name": "swiftBic",
                "qname": "LegalEntity:swiftBic",
                "label": "SWIFT/BIC",
                "description": "Bank identifier code",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:swiftBic",
                "type": "identifier"
            },
            "parent": {
                "name": "parent",
                "qname": "LegalEntity:parent",
                "label": "Parent company",
                "description": "If this entity is a subsidiary, another entity (company or organisation) is its parent",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:parent",
                "type": "entity",
                "schema": "LegalEntity",
                "reverse": "subsidiaries"
            },
            "subsidiaries": {
                "name": "subsidiaries",
                "qname": "LegalEntity:subsidiaries",
                "label": "Subsidiaries",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:subsidiaries",
                "type": "entity",
                "schema": "LegalEntity",
                "reverse": "parent"
            },
            "passport": {
                "name": "passport",
                "qname": "LegalEntity:passport",
                "label": "Passports",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:passport",
                "type": "entity",
                "schema": "Passport",
                "reverse": "holder"
            },
            "agencyClient": {
                "name": "agencyClient",
                "qname": "LegalEntity:agencyClient",
                "label": "Agency clients",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#LegalEntity:agencyClient",
                "type": "entity",
                "schema": "Representation",
                "reverse": "agent"
            },
            "agentRepresentation": {
                "name": "agentRepresentation",
                "qname": "LegalEntity:agentRepresentation",
                "label": "Agents",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#LegalEntity:agentRepresentation",
                "type": "entity",
                "schema": "Representation",
                "reverse": "client"
            },
            "contractAuthority": {
                "name": "contractAuthority",
                "qname": "LegalEntity:contractAuthority",
                "label": "Contracts issued",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#LegalEntity:contractAuthority",
                "type": "entity",
                "schema": "Contract",
                "reverse": "authority"
            },
            "name": {
                "name": "name",
                "qname": "Thing:name",
                "label": "Name",
                "description": null,
                "caption": true,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#prefLabel",
                "type": "name"
            },
            "sameAs": {
                "name": "sameAs",
                "qname": "Thing:sameAs",
                "label": "Same as",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2002/07/owl#sameAs",
                "type": "entity",
                "schema": "Thing",
                "reverse": "sameAs"
            },
            "summary": {
                "name": "summary",
                "qname": "Thing:summary",
                "label": "Summary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:summary",
                "type": "text"
            },
            "description": {
                "name": "description",
                "qname": "Thing:description",
                "label": "Description",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:description",
                "type": "string"
            },
            "country": {
                "name": "country",
                "qname": "Thing:country",
                "label": "Country",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:country",
                "type": "country"
            },
            "alias": {
                "name": "alias",
                "qname": "Thing:alias",
                "label": "Other name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#altLabel",
                "type": "name"
            },
            "previousName": {
                "name": "previousName",
                "qname": "Thing:previousName",
                "label": "Previous name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:previousName",
                "type": "name"
            },
            "weakAlias": {
                "name": "weakAlias",
                "qname": "Thing:weakAlias",
                "label": "Weak alias",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:weakAlias",
                "type": "string"
            },
            "sourceUrl": {
                "name": "sourceUrl",
                "qname": "Thing:sourceUrl",
                "label": "Source link",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:sourceUrl",
                "type": "url"
            },
            "alephUrl": {
                "name": "alephUrl",
                "qname": "Thing:alephUrl",
                "label": "Aleph URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:alephUrl",
                "type": "url"
            },
            "wikipediaUrl": {
                "name": "wikipediaUrl",
                "qname": "Thing:wikipediaUrl",
                "label": "Wikipedia Article",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikipediaUrl",
                "type": "url"
            },
            "wikidataId": {
                "name": "wikidataId",
                "qname": "Thing:wikidataId",
                "label": "Wikidata ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikidataId",
                "type": "identifier"
            },
            "keywords": {
                "name": "keywords",
                "qname": "Thing:keywords",
                "label": "Keywords",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:keywords",
                "type": "string"
            },
            "address": {
                "name": "address",
                "qname": "Thing:address",
                "label": "Address",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:address",
                "type": "address"
            },
            "program": {
                "name": "program",
                "qname": "Thing:program",
                "label": "Program",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:program",
                "type": "string"
            },
            "notes": {
                "name": "notes",
                "qname": "Thing:notes",
                "label": "Notes",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:notes",
                "type": "text"
            },
            "modifiedAt": {
                "name": "modifiedAt",
                "qname": "Thing:modifiedAt",
                "label": "Modified on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:modifiedAt",
                "type": "date"
            },
            "retrievedAt": {
                "name": "retrievedAt",
                "qname": "Thing:retrievedAt",
                "label": "Retrieved on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:retrievedAt",
                "type": "date"
            },
            "successors": {
                "name": "successors",
                "qname": "LegalEntity:successors",
                "label": "Successors",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#LegalEntity:successors",
                "type": "entity",
                "schema": "Succession",
                "reverse": "predecessor"
            },
            "predecessors": {
                "name": "predecessors",
                "qname": "LegalEntity:predecessors",
                "label": "Predecessors",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#LegalEntity:predecessors",
                "type": "entity",
                "schema": "Succession",
                "reverse": "successor"
            },
            "ownershipOwner": {
                "name": "ownershipOwner",
                "qname": "LegalEntity:ownershipOwner",
                "label": "Assets and shares",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#LegalEntity:ownershipOwner",
                "type": "entity",
                "schema": "Ownership",
                "reverse": "owner"
            },
            "courtCase": {
                "name": "courtCase",
                "qname": "Thing:courtCase",
                "label": "Court cases",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Thing:courtCase",
                "type": "entity",
                "schema": "CourtCaseParty",
                "reverse": "party"
            },
            "contractAwardSupplier": {
                "name": "contractAwardSupplier",
                "qname": "LegalEntity:contractAwardSupplier",
                "label": "Contracts awarded",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#LegalEntity:contractAwardSupplier",
                "type": "entity",
                "schema": "ContractAward",
                "reverse": "supplier"
            },
            "paymentPayer": {
                "name": "paymentPayer",
                "qname": "LegalEntity:paymentPayer",
                "label": "Payments made",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#LegalEntity:paymentPayer",
                "type": "entity",
                "schema": "Payment",
                "reverse": "payer"
            },
            "paymentBeneficiary": {
                "name": "paymentBeneficiary",
                "qname": "LegalEntity:paymentBeneficiary",
                "label": "Payments received",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#LegalEntity:paymentBeneficiary",
                "type": "entity",
                "schema": "Payment",
                "reverse": "beneficiary"
            },
            "familyRelative": {
                "name": "familyRelative",
                "qname": "Person:familyRelative",
                "label": "Relatives",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Person:familyRelative",
                "type": "entity",
                "schema": "Family",
                "reverse": "relative"
            }
        }
    },
    "Passport": {
        "label": "Passport",
        "plural": "Passports",
        "uri": "https://w3id.org/ftm#Passport",
        "schemata": ["Interval", "Passport"],
        "extends": ["Interval"],
        "abstract": false,
        "matchable": false,
        "description": "Passport",
        "featured": ["type", "holder", "startDate", "endDate"],
        "properties": {
            "holder": {
                "name": "holder",
                "qname": "Passport:holder",
                "label": "Document holder",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Passport:holder",
                "type": "entity"
            },
            "type": {
                "name": "type",
                "qname": "Passport:type",
                "label": "Document type",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Passport:type",
                "type": "string"
            },
            "country": {
                "name": "country",
                "qname": "Passport:country",
                "label": "Country",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Passport:country",
                "type": "country"
            },
            "passportNumber": {
                "name": "passportNumber",
                "qname": "Passport:passportNumber",
                "label": "Passport number",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Passport:passportNumber",
                "type": "identifier"
            },
            "surname": {
                "name": "surname",
                "qname": "Passport:surname",
                "label": "Surname",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Passport:surname",
                "type": "string"
            },
            "givenName": {
                "name": "givenName",
                "qname": "Passport:givenName",
                "label": "Given name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Passport:givenName",
                "type": "string"
            },
            "birthDate": {
                "name": "birthDate",
                "qname": "Passport:birthDate",
                "label": "Date of birth",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Passport:birthDate",
                "type": "date"
            },
            "birthPlace": {
                "name": "birthPlace",
                "qname": "Passport:birthPlace",
                "label": "Place of birth",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Passport:birthPlace",
                "type": "string"
            },
            "gender": {
                "name": "gender",
                "qname": "Passport:gender",
                "label": "Gender",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Passport:gender",
                "type": "string"
            },
            "personalNumber": {
                "name": "personalNumber",
                "qname": "Passport:personalNumber",
                "label": "Personal number",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Passport:personalNumber",
                "type": "identifier"
            },
            "authority": {
                "name": "authority",
                "qname": "Passport:authority",
                "label": "Authority",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Passport:authority",
                "type": "string"
            },
            "startDate": {
                "name": "startDate",
                "qname": "Interval:startDate",
                "label": "Start date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:startDate",
                "type": "date"
            },
            "endDate": {
                "name": "endDate",
                "qname": "Interval:endDate",
                "label": "End date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:endDate",
                "type": "date"
            },
            "date": {
                "name": "date",
                "qname": "Interval:date",
                "label": "Date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:date",
                "type": "date"
            },
            "summary": {
                "name": "summary",
                "qname": "Interval:summary",
                "label": "Summary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:summary",
                "type": "text"
            },
            "recordId": {
                "name": "recordId",
                "qname": "Interval:recordId",
                "label": "Record ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:recordId",
                "type": "string"
            },
            "sourceUrl": {
                "name": "sourceUrl",
                "qname": "Interval:sourceUrl",
                "label": "Source URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:sourceUrl",
                "type": "url"
            },
            "alephUrl": {
                "name": "alephUrl",
                "qname": "Interval:alephUrl",
                "label": "Aleph URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:alephUrl",
                "type": "url"
            },
            "modifiedAt": {
                "name": "modifiedAt",
                "qname": "Interval:modifiedAt",
                "label": "Modified on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:modifiedAt",
                "type": "date"
            },
            "retrievedAt": {
                "name": "retrievedAt",
                "qname": "Interval:retrievedAt",
                "label": "Retrieved on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:retrievedAt",
                "type": "date"
            }
        }
    },
    "CourtCase": {
        "label": "Court case",
        "plural": "Court cases",
        "uri": "https://w3id.org/ftm#CourtCase",
        "schemata": ["CourtCase", "Thing"],
        "extends": ["Thing"],
        "abstract": false,
        "matchable": false,
        "description": null,
        "featured": ["name", "fileDate", "caseNumber"],
        "properties": {
            "category": {
                "name": "category",
                "qname": "CourtCase:category",
                "label": "Category",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#CourtCase:category",
                "type": "string"
            },
            "type": {
                "name": "type",
                "qname": "CourtCase:type",
                "label": "Type",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#CourtCase:type",
                "type": "string"
            },
            "status": {
                "name": "status",
                "qname": "CourtCase:status",
                "label": "Status",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#CourtCase:status",
                "type": "string"
            },
            "caseNumber": {
                "name": "caseNumber",
                "qname": "CourtCase:caseNumber",
                "label": "Case number",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#CourtCase:caseNumber",
                "type": "identifier"
            },
            "court": {
                "name": "court",
                "qname": "CourtCase:court",
                "label": "Court",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#CourtCase:court",
                "type": "string"
            },
            "fileDate": {
                "name": "fileDate",
                "qname": "CourtCase:fileDate",
                "label": "File date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#CourtCase:fileDate",
                "type": "date"
            },
            "closeDate": {
                "name": "closeDate",
                "qname": "CourtCase:closeDate",
                "label": "Close date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#CourtCase:closeDate",
                "type": "date"
            },
            "parties": {
                "name": "parties",
                "qname": "CourtCase:parties",
                "label": "Parties",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#CourtCase:parties",
                "type": "entity",
                "schema": "CourtCaseParty",
                "reverse": "case"
            },
            "name": {
                "name": "name",
                "qname": "Thing:name",
                "label": "Name",
                "description": null,
                "caption": true,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#prefLabel",
                "type": "name"
            },
            "sameAs": {
                "name": "sameAs",
                "qname": "Thing:sameAs",
                "label": "Same as",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2002/07/owl#sameAs",
                "type": "entity",
                "schema": "Thing",
                "reverse": "sameAs"
            },
            "summary": {
                "name": "summary",
                "qname": "Thing:summary",
                "label": "Summary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:summary",
                "type": "text"
            },
            "description": {
                "name": "description",
                "qname": "Thing:description",
                "label": "Description",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:description",
                "type": "string"
            },
            "country": {
                "name": "country",
                "qname": "Thing:country",
                "label": "Country",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:country",
                "type": "country"
            },
            "alias": {
                "name": "alias",
                "qname": "Thing:alias",
                "label": "Other name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#altLabel",
                "type": "name"
            },
            "previousName": {
                "name": "previousName",
                "qname": "Thing:previousName",
                "label": "Previous name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:previousName",
                "type": "name"
            },
            "weakAlias": {
                "name": "weakAlias",
                "qname": "Thing:weakAlias",
                "label": "Weak alias",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:weakAlias",
                "type": "string"
            },
            "sourceUrl": {
                "name": "sourceUrl",
                "qname": "Thing:sourceUrl",
                "label": "Source link",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:sourceUrl",
                "type": "url"
            },
            "alephUrl": {
                "name": "alephUrl",
                "qname": "Thing:alephUrl",
                "label": "Aleph URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:alephUrl",
                "type": "url"
            },
            "wikipediaUrl": {
                "name": "wikipediaUrl",
                "qname": "Thing:wikipediaUrl",
                "label": "Wikipedia Article",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikipediaUrl",
                "type": "url"
            },
            "wikidataId": {
                "name": "wikidataId",
                "qname": "Thing:wikidataId",
                "label": "Wikidata ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikidataId",
                "type": "identifier"
            },
            "keywords": {
                "name": "keywords",
                "qname": "Thing:keywords",
                "label": "Keywords",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:keywords",
                "type": "string"
            },
            "address": {
                "name": "address",
                "qname": "Thing:address",
                "label": "Address",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:address",
                "type": "address"
            },
            "program": {
                "name": "program",
                "qname": "Thing:program",
                "label": "Program",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:program",
                "type": "string"
            },
            "notes": {
                "name": "notes",
                "qname": "Thing:notes",
                "label": "Notes",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:notes",
                "type": "text"
            },
            "modifiedAt": {
                "name": "modifiedAt",
                "qname": "Thing:modifiedAt",
                "label": "Modified on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:modifiedAt",
                "type": "date"
            },
            "retrievedAt": {
                "name": "retrievedAt",
                "qname": "Thing:retrievedAt",
                "label": "Retrieved on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:retrievedAt",
                "type": "date"
            },
            "courtCase": {
                "name": "courtCase",
                "qname": "Thing:courtCase",
                "label": "Court cases",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Thing:courtCase",
                "type": "entity",
                "schema": "CourtCaseParty",
                "reverse": "party"
            }
        }
    },
    "EconomicActivity": {
        "label": "Economic Activity",
        "plural": "Economic Activities",
        "uri": "https://w3id.org/ftm#EconomicActivity",
        "schemata": ["Interval", "EconomicActivity"],
        "extends": ["Interval"],
        "abstract": false,
        "matchable": false,
        "description": "An economic activity",
        "featured": ["sender", "receiver", "contract", "goodsDescription", "startDate", "endDate"],
        "properties": {
            "contract": {
                "name": "contract",
                "qname": "EconomicActivity:contract",
                "label": "Associated contract",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#EconomicActivity:contract",
                "type": "entity"
            },
            "ccdNumber": {
                "name": "ccdNumber",
                "qname": "EconomicActivity:ccdNumber",
                "label": "Customs Cargo Declaration Number",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#EconomicActivity:ccdNumber",
                "type": "identifier"
            },
            "ccdValue": {
                "name": "ccdValue",
                "qname": "EconomicActivity:ccdValue",
                "label": "CCD Value",
                "description": "Declaration Value",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#EconomicActivity:ccdValue",
                "type": "string"
            },
            "directionOfTransportation": {
                "name": "directionOfTransportation",
                "qname": "EconomicActivity:directionOfTransportation",
                "label": "Direction of transportation",
                "description": "Direction of transportation (import/export)",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#EconomicActivity:directionOfTransportation",
                "type": "string"
            },
            "customsProcedure": {
                "name": "customsProcedure",
                "qname": "EconomicActivity:customsProcedure",
                "label": "Customs Procedure",
                "description": "Customs Procedure — type of customs clearance",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#EconomicActivity:customsProcedure",
                "type": "string"
            },
            "vedCode": {
                "name": "vedCode",
                "qname": "EconomicActivity:vedCode",
                "label": "FEAC Code",
                "description": "(Код ТН ВЭД) Foreign Economic Activity Commodity Code",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#EconomicActivity:vedCode",
                "type": "identifier"
            },
            "vedCodeDescription": {
                "name": "vedCodeDescription",
                "qname": "EconomicActivity:vedCodeDescription",
                "label": "FEAC Code description",
                "description": "(Описание кода ТН ВЭД) Foreign Economic Activity Commodity Code description",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#EconomicActivity:vedCodeDescription",
                "type": "string"
            },
            "goodsDescription": {
                "name": "goodsDescription",
                "qname": "EconomicActivity:goodsDescription",
                "label": "Description",
                "description": "Description of goods",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#EconomicActivity:goodsDescription",
                "type": "string"
            },
            "declarant": {
                "name": "declarant",
                "qname": "EconomicActivity:declarant",
                "label": "Declarant",
                "description": "Customs declarant",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#EconomicActivity:declarant",
                "type": "entity"
            },
            "sender": {
                "name": "sender",
                "qname": "EconomicActivity:sender",
                "label": "Sender",
                "description": "Origin of the goods",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#EconomicActivity:sender",
                "type": "entity"
            },
            "receiver": {
                "name": "receiver",
                "qname": "EconomicActivity:receiver",
                "label": "Receiver",
                "description": "Destination of the goods",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#EconomicActivity:receiver",
                "type": "entity"
            },
            "contractHolder": {
                "name": "contractHolder",
                "qname": "EconomicActivity:contractHolder",
                "label": "Contract holder",
                "description": "Customs formalities caretaker",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#EconomicActivity:contractHolder",
                "type": "entity"
            },
            "invoiceAmount": {
                "name": "invoiceAmount",
                "qname": "EconomicActivity:invoiceAmount",
                "label": "Invoice Value Amount",
                "description": "Invoice Value of goods",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#EconomicActivity:invoiceAmount",
                "type": "string"
            },
            "customsAmount": {
                "name": "customsAmount",
                "qname": "EconomicActivity:customsAmount",
                "label": "Customs Value Amount",
                "description": "Customs Value of goods",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#EconomicActivity:customsAmount",
                "type": "string"
            },
            "dollarExchRate": {
                "name": "dollarExchRate",
                "qname": "EconomicActivity:dollarExchRate",
                "label": "USD Exchange Rate",
                "description": "USD Exchange Rate for the activity",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#EconomicActivity:dollarExchRate",
                "type": "string"
            },
            "tradingCountry": {
                "name": "tradingCountry",
                "qname": "EconomicActivity:tradingCountry",
                "label": "Trading Country",
                "description": "Trading Country of the company which transports the goods via Russian border",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#EconomicActivity:tradingCountry",
                "type": "country"
            },
            "departureCountry": {
                "name": "departureCountry",
                "qname": "EconomicActivity:departureCountry",
                "label": "Country of departure",
                "description": "Country out of which the goods are transported",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#EconomicActivity:departureCountry",
                "type": "country"
            },
            "destinationCountry": {
                "name": "destinationCountry",
                "qname": "EconomicActivity:destinationCountry",
                "label": "Country of destination",
                "description": "Final destination for the goods",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#EconomicActivity:destinationCountry",
                "type": "country"
            },
            "originCountry": {
                "name": "originCountry",
                "qname": "EconomicActivity:originCountry",
                "label": "Country of origin",
                "description": "Country of origin of goods",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#EconomicActivity:originCountry",
                "type": "country"
            },
            "bankAccount": {
                "name": "bankAccount",
                "qname": "EconomicActivity:bankAccount",
                "label": "Bank Account",
                "description": "Bank account of the contract",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#EconomicActivity:bankAccount",
                "type": "entity"
            },
            "bankRub": {
                "name": "bankRub",
                "qname": "EconomicActivity:bankRub",
                "label": "Rouble bank",
                "description": "Bank account for payments in roubles",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#EconomicActivity:bankRub",
                "type": "entity"
            },
            "bankForeign": {
                "name": "bankForeign",
                "qname": "EconomicActivity:bankForeign",
                "label": "Foreign currency bank",
                "description": "Bank account for payments in foreign currency",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#EconomicActivity:bankForeign",
                "type": "entity"
            },
            "transport": {
                "name": "transport",
                "qname": "EconomicActivity:transport",
                "label": "Transport",
                "description": "Means of transportation",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#EconomicActivity:transport",
                "type": "entity"
            },
            "startDate": {
                "name": "startDate",
                "qname": "Interval:startDate",
                "label": "Start date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:startDate",
                "type": "date"
            },
            "endDate": {
                "name": "endDate",
                "qname": "Interval:endDate",
                "label": "End date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:endDate",
                "type": "date"
            },
            "date": {
                "name": "date",
                "qname": "Interval:date",
                "label": "Date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:date",
                "type": "date"
            },
            "summary": {
                "name": "summary",
                "qname": "Interval:summary",
                "label": "Summary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:summary",
                "type": "text"
            },
            "recordId": {
                "name": "recordId",
                "qname": "Interval:recordId",
                "label": "Record ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:recordId",
                "type": "string"
            },
            "sourceUrl": {
                "name": "sourceUrl",
                "qname": "Interval:sourceUrl",
                "label": "Source URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:sourceUrl",
                "type": "url"
            },
            "alephUrl": {
                "name": "alephUrl",
                "qname": "Interval:alephUrl",
                "label": "Aleph URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:alephUrl",
                "type": "url"
            },
            "modifiedAt": {
                "name": "modifiedAt",
                "qname": "Interval:modifiedAt",
                "label": "Modified on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:modifiedAt",
                "type": "date"
            },
            "retrievedAt": {
                "name": "retrievedAt",
                "qname": "Interval:retrievedAt",
                "label": "Retrieved on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:retrievedAt",
                "type": "date"
            }
        }
    },
    "Sanction": {
        "label": "Sanction",
        "plural": "Sanctions",
        "uri": "https://w3id.org/ftm#Sanction",
        "schemata": ["Interval", "Sanction"],
        "extends": ["Interval"],
        "abstract": false,
        "matchable": false,
        "description": "A sanction designation",
        "featured": ["entity", "authority", "program", "startDate", "endDate"],
        "properties": {
            "entity": {
                "name": "entity",
                "qname": "Sanction:entity",
                "label": "Entity",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Sanction:entity",
                "type": "entity",
                "schema": "Thing",
                "reverse": "sanctionEntity"
            },
            "authority": {
                "name": "authority",
                "qname": "Sanction:authority",
                "label": "Authority",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Sanction:authority",
                "type": "string"
            },
            "program": {
                "name": "program",
                "qname": "Sanction:program",
                "label": "Program",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Sanction:program",
                "type": "string"
            },
            "status": {
                "name": "status",
                "qname": "Sanction:status",
                "label": "Status",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Sanction:status",
                "type": "string"
            },
            "duration": {
                "name": "duration",
                "qname": "Sanction:duration",
                "label": "Duration",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Sanction:duration",
                "type": "string"
            },
            "reason": {
                "name": "reason",
                "qname": "Sanction:reason",
                "label": "Reason",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Sanction:reason",
                "type": "string"
            },
            "country": {
                "name": "country",
                "qname": "Sanction:country",
                "label": "Country",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Sanction:country",
                "type": "country"
            },
            "startDate": {
                "name": "startDate",
                "qname": "Interval:startDate",
                "label": "Start date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:startDate",
                "type": "date"
            },
            "endDate": {
                "name": "endDate",
                "qname": "Interval:endDate",
                "label": "End date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:endDate",
                "type": "date"
            },
            "date": {
                "name": "date",
                "qname": "Interval:date",
                "label": "Date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:date",
                "type": "date"
            },
            "summary": {
                "name": "summary",
                "qname": "Interval:summary",
                "label": "Summary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:summary",
                "type": "text"
            },
            "recordId": {
                "name": "recordId",
                "qname": "Interval:recordId",
                "label": "Record ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:recordId",
                "type": "string"
            },
            "sourceUrl": {
                "name": "sourceUrl",
                "qname": "Interval:sourceUrl",
                "label": "Source URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:sourceUrl",
                "type": "url"
            },
            "alephUrl": {
                "name": "alephUrl",
                "qname": "Interval:alephUrl",
                "label": "Aleph URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:alephUrl",
                "type": "url"
            },
            "modifiedAt": {
                "name": "modifiedAt",
                "qname": "Interval:modifiedAt",
                "label": "Modified on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:modifiedAt",
                "type": "date"
            },
            "retrievedAt": {
                "name": "retrievedAt",
                "qname": "Interval:retrievedAt",
                "label": "Retrieved on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:retrievedAt",
                "type": "date"
            }
        }
    },
    "Relationship": {
        "label": "Relationship",
        "plural": "Relationships",
        "uri": "https://w3id.org/ftm#Relationship",
        "schemata": ["Interval", "Relationship"],
        "extends": ["Interval"],
        "abstract": false,
        "matchable": false,
        "description": "Person-to-person relationship",
        "featured": ["person", "relationship"],
        "properties": {
            "person": {
                "name": "person",
                "qname": "Relationship:person",
                "label": "Person",
                "description": "The subject of the familial relation.",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Relationship:person",
                "type": "entity",
                "schema": "Person",
                "reverse": "relationshipPerson"
            },
            "relationship": {
                "name": "relationship",
                "qname": "Relationship:relationship",
                "label": "Relationship",
                "description": "Nature of the relationship, from the *person's* perspective eg. 'mother', where 'relative' is mother of 'person'.",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Relationship:relationship",
                "type": "string"
            },
            "supportingDocumentType": {
                "name": "supportingDocumentType",
                "qname": "Relationship:supportingDocumentType",
                "label": "Supporting document",
                "description": "Eg. birth certificate, marriage license. This is *not* just the data source.",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Relationship:supportingDocumentType",
                "type": "string"
            },
            "supportingDocumentNumber": {
                "name": "supportingDocumentNumber",
                "qname": "Relationship:supportingDocumentNumber",
                "label": "Supporting document number",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Relationship:supportingDocumentNumber",
                "type": "string"
            },
            "startDate": {
                "name": "startDate",
                "qname": "Interval:startDate",
                "label": "Start date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:startDate",
                "type": "date"
            },
            "endDate": {
                "name": "endDate",
                "qname": "Interval:endDate",
                "label": "End date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:endDate",
                "type": "date"
            },
            "date": {
                "name": "date",
                "qname": "Interval:date",
                "label": "Date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:date",
                "type": "date"
            },
            "summary": {
                "name": "summary",
                "qname": "Interval:summary",
                "label": "Summary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:summary",
                "type": "text"
            },
            "recordId": {
                "name": "recordId",
                "qname": "Interval:recordId",
                "label": "Record ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:recordId",
                "type": "string"
            },
            "sourceUrl": {
                "name": "sourceUrl",
                "qname": "Interval:sourceUrl",
                "label": "Source URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:sourceUrl",
                "type": "url"
            },
            "alephUrl": {
                "name": "alephUrl",
                "qname": "Interval:alephUrl",
                "label": "Aleph URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:alephUrl",
                "type": "url"
            },
            "modifiedAt": {
                "name": "modifiedAt",
                "qname": "Interval:modifiedAt",
                "label": "Modified on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:modifiedAt",
                "type": "date"
            },
            "retrievedAt": {
                "name": "retrievedAt",
                "qname": "Interval:retrievedAt",
                "label": "Retrieved on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:retrievedAt",
                "type": "date"
            }
        }
    },
    "Membership": {
        "label": "Membership",
        "plural": "Memberships",
        "uri": "https://w3id.org/ftm#Membership",
        "schemata": ["Interval", "Interest", "Membership"],
        "extends": ["Interest"],
        "abstract": false,
        "matchable": false,
        "description": null,
        "featured": ["member", "organization", "role"],
        "properties": {
            "member": {
                "name": "member",
                "qname": "Membership:member",
                "label": "Member",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Membership:member",
                "type": "entity",
                "schema": "LegalEntity",
                "reverse": "membershipMember"
            },
            "organization": {
                "name": "organization",
                "qname": "Membership:organization",
                "label": "Organization",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Membership:organization",
                "type": "entity",
                "schema": "Organization",
                "reverse": "membershipOrganization"
            },
            "role": {
                "name": "role",
                "qname": "Interest:role",
                "label": "Role",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interest:role",
                "type": "string"
            },
            "status": {
                "name": "status",
                "qname": "Interest:status",
                "label": "Status",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interest:status",
                "type": "string"
            },
            "startDate": {
                "name": "startDate",
                "qname": "Interval:startDate",
                "label": "Start date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:startDate",
                "type": "date"
            },
            "endDate": {
                "name": "endDate",
                "qname": "Interval:endDate",
                "label": "End date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:endDate",
                "type": "date"
            },
            "date": {
                "name": "date",
                "qname": "Interval:date",
                "label": "Date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:date",
                "type": "date"
            },
            "summary": {
                "name": "summary",
                "qname": "Interval:summary",
                "label": "Summary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:summary",
                "type": "text"
            },
            "recordId": {
                "name": "recordId",
                "qname": "Interval:recordId",
                "label": "Record ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:recordId",
                "type": "string"
            },
            "sourceUrl": {
                "name": "sourceUrl",
                "qname": "Interval:sourceUrl",
                "label": "Source URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:sourceUrl",
                "type": "url"
            },
            "alephUrl": {
                "name": "alephUrl",
                "qname": "Interval:alephUrl",
                "label": "Aleph URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:alephUrl",
                "type": "url"
            },
            "modifiedAt": {
                "name": "modifiedAt",
                "qname": "Interval:modifiedAt",
                "label": "Modified on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:modifiedAt",
                "type": "date"
            },
            "retrievedAt": {
                "name": "retrievedAt",
                "qname": "Interval:retrievedAt",
                "label": "Retrieved on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:retrievedAt",
                "type": "date"
            }
        }
    },
    "Vessel": {
        "label": "Vessel",
        "plural": "Vessels",
        "uri": "https://w3id.org/ftm#Vessel",
        "schemata": ["Thing", "Value", "Asset", "Vehicle", "Vessel"],
        "extends": ["Vehicle"],
        "abstract": false,
        "matchable": false,
        "description": "A boat or ship",
        "featured": ["name", "imoNumber", "type"],
        "properties": {
            "imoNumber": {
                "name": "imoNumber",
                "qname": "Vessel:imoNumber",
                "label": "IMO Number",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Vessel:imoNumber",
                "type": "identifier"
            },
            "crsNumber": {
                "name": "crsNumber",
                "qname": "Vessel:crsNumber",
                "label": "CRS Number",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Vessel:crsNumber",
                "type": "identifier"
            },
            "flag": {
                "name": "flag",
                "qname": "Vessel:flag",
                "label": "Flag",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Vessel:flag",
                "type": "country"
            },
            "registrationPort": {
                "name": "registrationPort",
                "qname": "Vessel:registrationPort",
                "label": "Port of Registration",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Vessel:registrationPort",
                "type": "string"
            },
            "navigationArea": {
                "name": "navigationArea",
                "qname": "Vessel:navigationArea",
                "label": "Navigation Area",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Vessel:navigationArea",
                "type": "string"
            },
            "tonnage": {
                "name": "tonnage",
                "qname": "Vessel:tonnage",
                "label": "Tonnage",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Vessel:tonnage",
                "type": "string"
            },
            "grossRegisteredTonnage": {
                "name": "grossRegisteredTonnage",
                "qname": "Vessel:grossRegisteredTonnage",
                "label": "Gross Registered Tonnage",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Vessel:grossRegisteredTonnage",
                "type": "number"
            },
            "nameChangeDate": {
                "name": "nameChangeDate",
                "qname": "Vessel:nameChangeDate",
                "label": "Date of Name Change",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Vessel:nameChangeDate",
                "type": "date"
            },
            "callSign": {
                "name": "callSign",
                "qname": "Vessel:callSign",
                "label": "Call Sign",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Vessel:callSign",
                "type": "identifier"
            },
            "pastNames": {
                "name": "pastNames",
                "qname": "Vessel:pastNames",
                "label": "Past Names",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Vessel:pastNames",
                "type": "name"
            },
            "pastFlags": {
                "name": "pastFlags",
                "qname": "Vessel:pastFlags",
                "label": "Past Flags",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Vessel:pastFlags",
                "type": "string"
            },
            "pastTypes": {
                "name": "pastTypes",
                "qname": "Vessel:pastTypes",
                "label": "Past Types",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Vessel:pastTypes",
                "type": "string"
            },
            "mmsi": {
                "name": "mmsi",
                "qname": "Vessel:mmsi",
                "label": "MMSI",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Vessel:mmsi",
                "type": "identifier"
            },
            "registrationNumber": {
                "name": "registrationNumber",
                "qname": "Vehicle:registrationNumber",
                "label": "Registration Number",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Vehicle:registrationNumber",
                "type": "identifier"
            },
            "type": {
                "name": "type",
                "qname": "Vehicle:type",
                "label": "Type",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Vehicle:type",
                "type": "string"
            },
            "model": {
                "name": "model",
                "qname": "Vehicle:model",
                "label": "Model",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Vehicle:model",
                "type": "string"
            },
            "owner": {
                "name": "owner",
                "qname": "Vehicle:owner",
                "label": "Owner",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Vehicle:owner",
                "type": "entity"
            },
            "operator": {
                "name": "operator",
                "qname": "Vehicle:operator",
                "label": "Operator",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Vehicle:operator",
                "type": "entity"
            },
            "buildDate": {
                "name": "buildDate",
                "qname": "Vehicle:buildDate",
                "label": "Build Date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Vehicle:buildDate",
                "type": "date"
            },
            "country": {
                "name": "country",
                "qname": "Vehicle:country",
                "label": "Country",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Vehicle:country",
                "type": "country"
            },
            "registrationDate": {
                "name": "registrationDate",
                "qname": "Vehicle:registrationDate",
                "label": "Registration Date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Vehicle:registrationDate",
                "type": "date"
            },
            "name": {
                "name": "name",
                "qname": "Thing:name",
                "label": "Name",
                "description": null,
                "caption": true,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#prefLabel",
                "type": "name"
            },
            "sameAs": {
                "name": "sameAs",
                "qname": "Thing:sameAs",
                "label": "Same as",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2002/07/owl#sameAs",
                "type": "entity",
                "schema": "Thing",
                "reverse": "sameAs"
            },
            "summary": {
                "name": "summary",
                "qname": "Thing:summary",
                "label": "Summary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:summary",
                "type": "text"
            },
            "description": {
                "name": "description",
                "qname": "Thing:description",
                "label": "Description",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:description",
                "type": "string"
            },
            "alias": {
                "name": "alias",
                "qname": "Thing:alias",
                "label": "Other name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#altLabel",
                "type": "name"
            },
            "previousName": {
                "name": "previousName",
                "qname": "Thing:previousName",
                "label": "Previous name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:previousName",
                "type": "name"
            },
            "weakAlias": {
                "name": "weakAlias",
                "qname": "Thing:weakAlias",
                "label": "Weak alias",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:weakAlias",
                "type": "string"
            },
            "sourceUrl": {
                "name": "sourceUrl",
                "qname": "Thing:sourceUrl",
                "label": "Source link",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:sourceUrl",
                "type": "url"
            },
            "alephUrl": {
                "name": "alephUrl",
                "qname": "Thing:alephUrl",
                "label": "Aleph URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:alephUrl",
                "type": "url"
            },
            "wikipediaUrl": {
                "name": "wikipediaUrl",
                "qname": "Thing:wikipediaUrl",
                "label": "Wikipedia Article",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikipediaUrl",
                "type": "url"
            },
            "wikidataId": {
                "name": "wikidataId",
                "qname": "Thing:wikidataId",
                "label": "Wikidata ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikidataId",
                "type": "identifier"
            },
            "keywords": {
                "name": "keywords",
                "qname": "Thing:keywords",
                "label": "Keywords",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:keywords",
                "type": "string"
            },
            "address": {
                "name": "address",
                "qname": "Thing:address",
                "label": "Address",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:address",
                "type": "address"
            },
            "program": {
                "name": "program",
                "qname": "Thing:program",
                "label": "Program",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:program",
                "type": "string"
            },
            "notes": {
                "name": "notes",
                "qname": "Thing:notes",
                "label": "Notes",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:notes",
                "type": "text"
            },
            "modifiedAt": {
                "name": "modifiedAt",
                "qname": "Thing:modifiedAt",
                "label": "Modified on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:modifiedAt",
                "type": "date"
            },
            "retrievedAt": {
                "name": "retrievedAt",
                "qname": "Thing:retrievedAt",
                "label": "Retrieved on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:retrievedAt",
                "type": "date"
            },
            "amount": {
                "name": "amount",
                "qname": "Value:amount",
                "label": "Amount",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:amount",
                "type": "number"
            },
            "currency": {
                "name": "currency",
                "qname": "Value:currency",
                "label": "Currency",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:currency",
                "type": "string"
            },
            "amountUsd": {
                "name": "amountUsd",
                "qname": "Value:amountUsd",
                "label": "Amount in USD",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:amountUsd",
                "type": "number"
            },
            "amountEur": {
                "name": "amountEur",
                "qname": "Value:amountEur",
                "label": "Amount in EUR",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:amountEur",
                "type": "number"
            },
            "ownershipAsset": {
                "name": "ownershipAsset",
                "qname": "Asset:ownershipAsset",
                "label": "Owners",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Asset:ownershipAsset",
                "type": "entity",
                "schema": "Ownership",
                "reverse": "asset"
            },
            "courtCase": {
                "name": "courtCase",
                "qname": "Thing:courtCase",
                "label": "Court cases",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Thing:courtCase",
                "type": "entity",
                "schema": "CourtCaseParty",
                "reverse": "party"
            },
            "sanctionEntity": {
                "name": "sanctionEntity",
                "qname": "Thing:sanctionEntity",
                "label": "Sanctions",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Thing:sanctionEntity",
                "type": "entity",
                "schema": "Sanction",
                "reverse": "entity"
            }
        }
    },
    "Family": {
        "label": "Family",
        "plural": "Family",
        "uri": "https://w3id.org/ftm#Family",
        "schemata": ["Interval", "Relationship", "Family"],
        "extends": ["Relationship"],
        "abstract": false,
        "matchable": false,
        "description": "Family relationship between two people",
        "featured": ["person", "relative", "relationship"],
        "properties": {
            "relative": {
                "name": "relative",
                "qname": "Family:relative",
                "label": "Relative",
                "description": "The relative of the subject person.",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Family:relative",
                "type": "entity",
                "schema": "Person",
                "reverse": "familyRelative"
            },
            "person": {
                "name": "person",
                "qname": "Relationship:person",
                "label": "Person",
                "description": "The subject of the familial relation.",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Relationship:person",
                "type": "entity",
                "schema": "Person",
                "reverse": "relationshipPerson"
            },
            "relationship": {
                "name": "relationship",
                "qname": "Relationship:relationship",
                "label": "Relationship",
                "description": "Nature of the relationship, from the *person's* perspective eg. 'mother', where 'relative' is mother of 'person'.",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Relationship:relationship",
                "type": "string"
            },
            "supportingDocumentType": {
                "name": "supportingDocumentType",
                "qname": "Relationship:supportingDocumentType",
                "label": "Supporting document",
                "description": "Eg. birth certificate, marriage license. This is *not* just the data source.",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Relationship:supportingDocumentType",
                "type": "string"
            },
            "supportingDocumentNumber": {
                "name": "supportingDocumentNumber",
                "qname": "Relationship:supportingDocumentNumber",
                "label": "Supporting document number",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Relationship:supportingDocumentNumber",
                "type": "string"
            },
            "startDate": {
                "name": "startDate",
                "qname": "Interval:startDate",
                "label": "Start date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:startDate",
                "type": "date"
            },
            "endDate": {
                "name": "endDate",
                "qname": "Interval:endDate",
                "label": "End date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:endDate",
                "type": "date"
            },
            "date": {
                "name": "date",
                "qname": "Interval:date",
                "label": "Date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:date",
                "type": "date"
            },
            "summary": {
                "name": "summary",
                "qname": "Interval:summary",
                "label": "Summary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:summary",
                "type": "text"
            },
            "recordId": {
                "name": "recordId",
                "qname": "Interval:recordId",
                "label": "Record ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:recordId",
                "type": "string"
            },
            "sourceUrl": {
                "name": "sourceUrl",
                "qname": "Interval:sourceUrl",
                "label": "Source URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:sourceUrl",
                "type": "url"
            },
            "alephUrl": {
                "name": "alephUrl",
                "qname": "Interval:alephUrl",
                "label": "Aleph URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:alephUrl",
                "type": "url"
            },
            "modifiedAt": {
                "name": "modifiedAt",
                "qname": "Interval:modifiedAt",
                "label": "Modified on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:modifiedAt",
                "type": "date"
            },
            "retrievedAt": {
                "name": "retrievedAt",
                "qname": "Interval:retrievedAt",
                "label": "Retrieved on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:retrievedAt",
                "type": "date"
            }
        }
    },
    "Company": {
        "label": "Company",
        "plural": "Companies",
        "uri": "https://w3id.org/ftm#Company",
        "schemata": ["Thing", "Company", "LegalEntity", "Value", "Asset", "Organization"],
        "extends": ["Organization", "Asset"],
        "abstract": false,
        "matchable": true,
        "description": null,
        "featured": ["name", "registrationNumber", "jurisdiction", "incorporationDate"],
        "properties": {
            "jurisdiction": {
                "name": "jurisdiction",
                "qname": "Company:jurisdiction",
                "label": "Jurisdiction",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Company:jurisdiction",
                "type": "country"
            },
            "registrationNumber": {
                "name": "registrationNumber",
                "qname": "Company:registrationNumber",
                "label": "Registration number",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Company:registrationNumber",
                "type": "identifier"
            },
            "capital": {
                "name": "capital",
                "qname": "Company:capital",
                "label": "Capital",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Company:capital",
                "type": "string"
            },
            "voenCode": {
                "name": "voenCode",
                "qname": "Company:voenCode",
                "label": "VOEN",
                "description": "Azerbaijan taxpayer ID",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Company:voenCode",
                "type": "identifier"
            },
            "coatoCode": {
                "name": "coatoCode",
                "qname": "Company:coatoCode",
                "label": "COATO / SOATO / OKATO",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Company:coatoCode",
                "type": "identifier"
            },
            "irsCode": {
                "name": "irsCode",
                "qname": "Company:irsCode",
                "label": "IRS Number",
                "description": "US tax ID",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Company:irsCode",
                "type": "identifier"
            },
            "ipoCode": {
                "name": "ipoCode",
                "qname": "Company:ipoCode",
                "label": "IPO",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Company:ipoCode",
                "type": "identifier"
            },
            "cikCode": {
                "name": "cikCode",
                "qname": "Company:cikCode",
                "label": "SEC Central Index Key",
                "description": "US SEC Central Index Key",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Company:cikCode",
                "type": "identifier"
            },
            "jibCode": {
                "name": "jibCode",
                "qname": "Company:jibCode",
                "label": "JIB",
                "description": "Yugoslavia company ID",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Company:jibCode",
                "type": "identifier"
            },
            "mbsCode": {
                "name": "mbsCode",
                "qname": "Company:mbsCode",
                "label": "MBS",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Company:mbsCode",
                "type": "identifier"
            },
            "ibcRuc": {
                "name": "ibcRuc",
                "qname": "Company:ibcRuc",
                "label": "ibcRUC",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Company:ibcRuc",
                "type": "identifier"
            },
            "caemCode": {
                "name": "caemCode",
                "qname": "Company:caemCode",
                "label": "COD CAEM",
                "description": "(RO) What kind of activity a legal entity is allowed to develop",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Company:caemCode",
                "type": "string"
            },
            "kppCode": {
                "name": "kppCode",
                "qname": "Company:kppCode",
                "label": "KPP",
                "description": "(RU, КПП) in addition to INN for orgs; reason for registration at FNS",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Company:kppCode",
                "type": "identifier"
            },
            "okvedCode": {
                "name": "okvedCode",
                "qname": "Company:okvedCode",
                "label": "OKVED(2) Classifier",
                "description": "(RU, ОКВЭД) Economical activity classifier. OKVED2 is the same but newer",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Company:okvedCode",
                "type": "string"
            },
            "okopfCode": {
                "name": "okopfCode",
                "qname": "Company:okopfCode",
                "label": "OKOPF",
                "description": "(RU, ОКОПФ) What kind of business entity",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Company:okopfCode",
                "type": "string"
            },
            "fnsCode": {
                "name": "fnsCode",
                "qname": "Company:fnsCode",
                "label": "Federal tax service code",
                "description": "(RU, ФНС) Federal Tax Service related info",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Company:fnsCode",
                "type": "identifier"
            },
            "fssCode": {
                "name": "fssCode",
                "qname": "Company:fssCode",
                "label": "FSS",
                "description": "(RU, ФСС) Social Security",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Company:fssCode",
                "type": "string"
            },
            "ogrnCode": {
                "name": "ogrnCode",
                "qname": "Company:ogrnCode",
                "label": "OGRN",
                "description": "Major State Registration Number",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Company:ogrnCode",
                "type": "identifier"
            },
            "bikCode": {
                "name": "bikCode",
                "qname": "Company:bikCode",
                "label": "BIK",
                "description": "Russian bank account code",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Company:bikCode",
                "type": "string"
            },
            "pfrNumber": {
                "name": "pfrNumber",
                "qname": "Company:pfrNumber",
                "label": "PFR Number",
                "description": "(RU, ПФР) Pension Fund Registration number. AAA-BBB-CCCCCC, where AAA is organisation region, BBB is district, CCCCCC number at a specific branch",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Company:pfrNumber",
                "type": "identifier"
            },
            "oksmCode": {
                "name": "oksmCode",
                "qname": "Company:oksmCode",
                "label": "OKSM",
                "description": "Russian (ОКСМ) countries classifer",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Company:oksmCode",
                "type": "string"
            },
            "email": {
                "name": "email",
                "qname": "LegalEntity:email",
                "label": "E-Mail",
                "description": "Email address",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:email",
                "type": "email"
            },
            "phone": {
                "name": "phone",
                "qname": "LegalEntity:phone",
                "label": "Phone",
                "description": "Phone number",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:phone",
                "type": "phone"
            },
            "website": {
                "name": "website",
                "qname": "LegalEntity:website",
                "label": "Website",
                "description": "Website address",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:website",
                "type": "url"
            },
            "legalForm": {
                "name": "legalForm",
                "qname": "LegalEntity:legalForm",
                "label": "Legal form",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:legalForm",
                "type": "string"
            },
            "incorporationDate": {
                "name": "incorporationDate",
                "qname": "LegalEntity:incorporationDate",
                "label": "Incorporation date",
                "description": "The date the legal entity was incorporated",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:incorporationDate",
                "type": "date"
            },
            "dissolutionDate": {
                "name": "dissolutionDate",
                "qname": "LegalEntity:dissolutionDate",
                "label": "Dissolution date",
                "description": "The date the legal entity was dissolved, if applicable",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:dissolutionDate",
                "type": "date"
            },
            "taxStatus": {
                "name": "taxStatus",
                "qname": "LegalEntity:taxStatus",
                "label": "Tax status",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:taxStatus",
                "type": "string"
            },
            "status": {
                "name": "status",
                "qname": "LegalEntity:status",
                "label": "Status",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:status",
                "type": "string"
            },
            "sector": {
                "name": "sector",
                "qname": "LegalEntity:sector",
                "label": "Sector",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:sector",
                "type": "string"
            },
            "classification": {
                "name": "classification",
                "qname": "LegalEntity:classification",
                "label": "Classification",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:classification",
                "type": "string"
            },
            "idNumber": {
                "name": "idNumber",
                "qname": "LegalEntity:idNumber",
                "label": "ID Number",
                "description": "ID number of any applicable ID",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:idNumber",
                "type": "identifier"
            },
            "taxNumber": {
                "name": "taxNumber",
                "qname": "LegalEntity:taxNumber",
                "label": "Tax ID Number",
                "description": "Tax ID number",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:taxNumber",
                "type": "identifier"
            },
            "vatCode": {
                "name": "vatCode",
                "qname": "LegalEntity:vatCode",
                "label": "V.A.T. Identifier",
                "description": "(EU) VAT number",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:vatCode",
                "type": "identifier"
            },
            "mainCountry": {
                "name": "mainCountry",
                "qname": "LegalEntity:mainCountry",
                "label": "Country of origin",
                "description": "Primary country of this entity",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:mainCountry",
                "type": "country"
            },
            "opencorporatesUrl": {
                "name": "opencorporatesUrl",
                "qname": "LegalEntity:opencorporatesUrl",
                "label": "OpenCorporates URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:opencorporatesUrl",
                "type": "url"
            },
            "bvdId": {
                "name": "bvdId",
                "qname": "LegalEntity:bvdId",
                "label": "Bureau van Dijk ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:bvdId",
                "type": "identifier"
            },
            "icijId": {
                "name": "icijId",
                "qname": "LegalEntity:icijId",
                "label": "ICIJ ID",
                "description": "ID according to International Consortium for Investigative Journalists",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:icijId",
                "type": "string"
            },
            "okpoCode": {
                "name": "okpoCode",
                "qname": "LegalEntity:okpoCode",
                "label": "OKPO",
                "description": "Russian industry classifier",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:okpoCode",
                "type": "identifier"
            },
            "innCode": {
                "name": "innCode",
                "qname": "LegalEntity:innCode",
                "label": "INN",
                "description": "Russian company ID",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:innCode",
                "type": "identifier"
            },
            "dunsCode": {
                "name": "dunsCode",
                "qname": "LegalEntity:dunsCode",
                "label": "D-U-N-S",
                "description": "Dun & Bradstreet identifier",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:dunsCode",
                "type": "identifier"
            },
            "swiftBic": {
                "name": "swiftBic",
                "qname": "LegalEntity:swiftBic",
                "label": "SWIFT/BIC",
                "description": "Bank identifier code",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:swiftBic",
                "type": "identifier"
            },
            "parent": {
                "name": "parent",
                "qname": "LegalEntity:parent",
                "label": "Parent company",
                "description": "If this entity is a subsidiary, another entity (company or organisation) is its parent",
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:parent",
                "type": "entity",
                "schema": "LegalEntity",
                "reverse": "subsidiaries"
            },
            "subsidiaries": {
                "name": "subsidiaries",
                "qname": "LegalEntity:subsidiaries",
                "label": "Subsidiaries",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:subsidiaries",
                "type": "entity",
                "schema": "LegalEntity",
                "reverse": "parent"
            },
            "passport": {
                "name": "passport",
                "qname": "LegalEntity:passport",
                "label": "Passports",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#LegalEntity:passport",
                "type": "entity",
                "schema": "Passport",
                "reverse": "holder"
            },
            "agencyClient": {
                "name": "agencyClient",
                "qname": "LegalEntity:agencyClient",
                "label": "Agency clients",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#LegalEntity:agencyClient",
                "type": "entity",
                "schema": "Representation",
                "reverse": "agent"
            },
            "agentRepresentation": {
                "name": "agentRepresentation",
                "qname": "LegalEntity:agentRepresentation",
                "label": "Agents",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#LegalEntity:agentRepresentation",
                "type": "entity",
                "schema": "Representation",
                "reverse": "client"
            },
            "contractAuthority": {
                "name": "contractAuthority",
                "qname": "LegalEntity:contractAuthority",
                "label": "Contracts issued",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#LegalEntity:contractAuthority",
                "type": "entity",
                "schema": "Contract",
                "reverse": "authority"
            },
            "name": {
                "name": "name",
                "qname": "Thing:name",
                "label": "Name",
                "description": null,
                "caption": true,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#prefLabel",
                "type": "name"
            },
            "sameAs": {
                "name": "sameAs",
                "qname": "Thing:sameAs",
                "label": "Same as",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2002/07/owl#sameAs",
                "type": "entity",
                "schema": "Thing",
                "reverse": "sameAs"
            },
            "summary": {
                "name": "summary",
                "qname": "Thing:summary",
                "label": "Summary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:summary",
                "type": "text"
            },
            "description": {
                "name": "description",
                "qname": "Thing:description",
                "label": "Description",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:description",
                "type": "string"
            },
            "country": {
                "name": "country",
                "qname": "Thing:country",
                "label": "Country",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:country",
                "type": "country"
            },
            "alias": {
                "name": "alias",
                "qname": "Thing:alias",
                "label": "Other name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#altLabel",
                "type": "name"
            },
            "previousName": {
                "name": "previousName",
                "qname": "Thing:previousName",
                "label": "Previous name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:previousName",
                "type": "name"
            },
            "weakAlias": {
                "name": "weakAlias",
                "qname": "Thing:weakAlias",
                "label": "Weak alias",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:weakAlias",
                "type": "string"
            },
            "sourceUrl": {
                "name": "sourceUrl",
                "qname": "Thing:sourceUrl",
                "label": "Source link",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:sourceUrl",
                "type": "url"
            },
            "alephUrl": {
                "name": "alephUrl",
                "qname": "Thing:alephUrl",
                "label": "Aleph URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:alephUrl",
                "type": "url"
            },
            "wikipediaUrl": {
                "name": "wikipediaUrl",
                "qname": "Thing:wikipediaUrl",
                "label": "Wikipedia Article",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikipediaUrl",
                "type": "url"
            },
            "wikidataId": {
                "name": "wikidataId",
                "qname": "Thing:wikidataId",
                "label": "Wikidata ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikidataId",
                "type": "identifier"
            },
            "keywords": {
                "name": "keywords",
                "qname": "Thing:keywords",
                "label": "Keywords",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:keywords",
                "type": "string"
            },
            "address": {
                "name": "address",
                "qname": "Thing:address",
                "label": "Address",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:address",
                "type": "address"
            },
            "program": {
                "name": "program",
                "qname": "Thing:program",
                "label": "Program",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:program",
                "type": "string"
            },
            "notes": {
                "name": "notes",
                "qname": "Thing:notes",
                "label": "Notes",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:notes",
                "type": "text"
            },
            "modifiedAt": {
                "name": "modifiedAt",
                "qname": "Thing:modifiedAt",
                "label": "Modified on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:modifiedAt",
                "type": "date"
            },
            "retrievedAt": {
                "name": "retrievedAt",
                "qname": "Thing:retrievedAt",
                "label": "Retrieved on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:retrievedAt",
                "type": "date"
            },
            "successors": {
                "name": "successors",
                "qname": "LegalEntity:successors",
                "label": "Successors",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#LegalEntity:successors",
                "type": "entity",
                "schema": "Succession",
                "reverse": "predecessor"
            },
            "predecessors": {
                "name": "predecessors",
                "qname": "LegalEntity:predecessors",
                "label": "Predecessors",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#LegalEntity:predecessors",
                "type": "entity",
                "schema": "Succession",
                "reverse": "successor"
            },
            "ownershipOwner": {
                "name": "ownershipOwner",
                "qname": "LegalEntity:ownershipOwner",
                "label": "Assets and shares",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#LegalEntity:ownershipOwner",
                "type": "entity",
                "schema": "Ownership",
                "reverse": "owner"
            },
            "courtCase": {
                "name": "courtCase",
                "qname": "Thing:courtCase",
                "label": "Court cases",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Thing:courtCase",
                "type": "entity",
                "schema": "CourtCaseParty",
                "reverse": "party"
            },
            "membershipOrganization": {
                "name": "membershipOrganization",
                "qname": "Organization:membershipOrganization",
                "label": "Members",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Organization:membershipOrganization",
                "type": "entity",
                "schema": "Membership",
                "reverse": "organization"
            },
            "contractAwardSupplier": {
                "name": "contractAwardSupplier",
                "qname": "LegalEntity:contractAwardSupplier",
                "label": "Contracts awarded",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#LegalEntity:contractAwardSupplier",
                "type": "entity",
                "schema": "ContractAward",
                "reverse": "supplier"
            },
            "paymentPayer": {
                "name": "paymentPayer",
                "qname": "LegalEntity:paymentPayer",
                "label": "Payments made",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#LegalEntity:paymentPayer",
                "type": "entity",
                "schema": "Payment",
                "reverse": "payer"
            },
            "paymentBeneficiary": {
                "name": "paymentBeneficiary",
                "qname": "LegalEntity:paymentBeneficiary",
                "label": "Payments received",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#LegalEntity:paymentBeneficiary",
                "type": "entity",
                "schema": "Payment",
                "reverse": "beneficiary"
            },
            "membershipMember": {
                "name": "membershipMember",
                "qname": "LegalEntity:membershipMember",
                "label": "Memberships",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#LegalEntity:membershipMember",
                "type": "entity",
                "schema": "Membership",
                "reverse": "member"
            },
            "sanctionEntity": {
                "name": "sanctionEntity",
                "qname": "Thing:sanctionEntity",
                "label": "Sanctions",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Thing:sanctionEntity",
                "type": "entity",
                "schema": "Sanction",
                "reverse": "entity"
            },
            "amount": {
                "name": "amount",
                "qname": "Value:amount",
                "label": "Amount",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:amount",
                "type": "number"
            },
            "currency": {
                "name": "currency",
                "qname": "Value:currency",
                "label": "Currency",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:currency",
                "type": "string"
            },
            "amountUsd": {
                "name": "amountUsd",
                "qname": "Value:amountUsd",
                "label": "Amount in USD",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:amountUsd",
                "type": "number"
            },
            "amountEur": {
                "name": "amountEur",
                "qname": "Value:amountEur",
                "label": "Amount in EUR",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:amountEur",
                "type": "number"
            },
            "ownershipAsset": {
                "name": "ownershipAsset",
                "qname": "Asset:ownershipAsset",
                "label": "Owners",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Asset:ownershipAsset",
                "type": "entity",
                "schema": "Ownership",
                "reverse": "asset"
            }
        }
    },
    "Directorship": {
        "label": "Directorship",
        "plural": "Directorship",
        "uri": "https://w3id.org/ftm#Directorship",
        "schemata": ["Interval", "Directorship", "Interest"],
        "extends": ["Interest"],
        "abstract": false,
        "matchable": false,
        "description": null,
        "featured": ["director", "organization", "role", "startDate", "endDate"],
        "properties": {
            "director": {
                "name": "director",
                "qname": "Directorship:director",
                "label": "Director",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Directorship:director",
                "type": "entity",
                "schema": "LegalEntity",
                "reverse": "directorshipDirector"
            },
            "organization": {
                "name": "organization",
                "qname": "Directorship:organization",
                "label": "Organization",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Directorship:organization",
                "type": "entity",
                "schema": "Organization",
                "reverse": "directorshipOrganization"
            },
            "secretary": {
                "name": "secretary",
                "qname": "Directorship:secretary",
                "label": "Secretary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Directorship:secretary",
                "type": "string"
            },
            "role": {
                "name": "role",
                "qname": "Interest:role",
                "label": "Role",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interest:role",
                "type": "string"
            },
            "status": {
                "name": "status",
                "qname": "Interest:status",
                "label": "Status",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interest:status",
                "type": "string"
            },
            "startDate": {
                "name": "startDate",
                "qname": "Interval:startDate",
                "label": "Start date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:startDate",
                "type": "date"
            },
            "endDate": {
                "name": "endDate",
                "qname": "Interval:endDate",
                "label": "End date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:endDate",
                "type": "date"
            },
            "date": {
                "name": "date",
                "qname": "Interval:date",
                "label": "Date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:date",
                "type": "date"
            },
            "summary": {
                "name": "summary",
                "qname": "Interval:summary",
                "label": "Summary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:summary",
                "type": "text"
            },
            "recordId": {
                "name": "recordId",
                "qname": "Interval:recordId",
                "label": "Record ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:recordId",
                "type": "string"
            },
            "sourceUrl": {
                "name": "sourceUrl",
                "qname": "Interval:sourceUrl",
                "label": "Source URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:sourceUrl",
                "type": "url"
            },
            "alephUrl": {
                "name": "alephUrl",
                "qname": "Interval:alephUrl",
                "label": "Aleph URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:alephUrl",
                "type": "url"
            },
            "modifiedAt": {
                "name": "modifiedAt",
                "qname": "Interval:modifiedAt",
                "label": "Modified on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:modifiedAt",
                "type": "date"
            },
            "retrievedAt": {
                "name": "retrievedAt",
                "qname": "Interval:retrievedAt",
                "label": "Retrieved on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:retrievedAt",
                "type": "date"
            }
        }
    },
    "BankAccount": {
        "label": "Bank Account",
        "plural": "Bank Accounts",
        "uri": "https://w3id.org/ftm#BankAccount",
        "schemata": ["Value", "Asset", "Thing", "BankAccount"],
        "extends": ["Asset"],
        "abstract": false,
        "matchable": false,
        "description": null,
        "featured": ["accountNumber", "bankName"],
        "properties": {
            "bankName": {
                "name": "bankName",
                "qname": "BankAccount:bankName",
                "label": "Bank Name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#BankAccount:bankName",
                "type": "string"
            },
            "accountNumber": {
                "name": "accountNumber",
                "qname": "BankAccount:accountNumber",
                "label": "Account Number",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#BankAccount:accountNumber",
                "type": "identifier"
            },
            "iban": {
                "name": "iban",
                "qname": "BankAccount:iban",
                "label": "IBAN",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#BankAccount:iban",
                "type": "iban"
            },
            "bic": {
                "name": "bic",
                "qname": "BankAccount:bic",
                "label": "Bank Identifier Code",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#BankAccount:bic",
                "type": "string"
            },
            "accountType": {
                "name": "accountType",
                "qname": "BankAccount:accountType",
                "label": "Account Type",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#BankAccount:accountType",
                "type": "string"
            },
            "balance": {
                "name": "balance",
                "qname": "BankAccount:balance",
                "label": "Balance",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#BankAccount:balance",
                "type": "number"
            },
            "bankAddress": {
                "name": "bankAddress",
                "qname": "BankAccount:bankAddress",
                "label": "Bank Address",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#BankAccount:bankAddress",
                "type": "string"
            },
            "paymentPayerAccount": {
                "name": "paymentPayerAccount",
                "qname": "BankAccount:paymentPayerAccount",
                "label": "Payments made",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#BankAccount:paymentPayerAccount",
                "type": "entity",
                "schema": "Payment",
                "reverse": "payerAccount"
            },
            "paymentBeneficiaryAccount": {
                "name": "paymentBeneficiaryAccount",
                "qname": "BankAccount:paymentBeneficiaryAccount",
                "label": "Payments received",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#BankAccount:paymentBeneficiaryAccount",
                "type": "entity",
                "schema": "Payment",
                "reverse": "beneficiaryAccount"
            },
            "name": {
                "name": "name",
                "qname": "Thing:name",
                "label": "Name",
                "description": null,
                "caption": true,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#prefLabel",
                "type": "name"
            },
            "sameAs": {
                "name": "sameAs",
                "qname": "Thing:sameAs",
                "label": "Same as",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2002/07/owl#sameAs",
                "type": "entity",
                "schema": "Thing",
                "reverse": "sameAs"
            },
            "summary": {
                "name": "summary",
                "qname": "Thing:summary",
                "label": "Summary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:summary",
                "type": "text"
            },
            "description": {
                "name": "description",
                "qname": "Thing:description",
                "label": "Description",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:description",
                "type": "string"
            },
            "country": {
                "name": "country",
                "qname": "Thing:country",
                "label": "Country",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:country",
                "type": "country"
            },
            "alias": {
                "name": "alias",
                "qname": "Thing:alias",
                "label": "Other name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "http://www.w3.org/2004/02/skos/core#altLabel",
                "type": "name"
            },
            "previousName": {
                "name": "previousName",
                "qname": "Thing:previousName",
                "label": "Previous name",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:previousName",
                "type": "name"
            },
            "weakAlias": {
                "name": "weakAlias",
                "qname": "Thing:weakAlias",
                "label": "Weak alias",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:weakAlias",
                "type": "string"
            },
            "sourceUrl": {
                "name": "sourceUrl",
                "qname": "Thing:sourceUrl",
                "label": "Source link",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:sourceUrl",
                "type": "url"
            },
            "alephUrl": {
                "name": "alephUrl",
                "qname": "Thing:alephUrl",
                "label": "Aleph URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:alephUrl",
                "type": "url"
            },
            "wikipediaUrl": {
                "name": "wikipediaUrl",
                "qname": "Thing:wikipediaUrl",
                "label": "Wikipedia Article",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikipediaUrl",
                "type": "url"
            },
            "wikidataId": {
                "name": "wikidataId",
                "qname": "Thing:wikidataId",
                "label": "Wikidata ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:wikidataId",
                "type": "identifier"
            },
            "keywords": {
                "name": "keywords",
                "qname": "Thing:keywords",
                "label": "Keywords",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:keywords",
                "type": "string"
            },
            "address": {
                "name": "address",
                "qname": "Thing:address",
                "label": "Address",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:address",
                "type": "address"
            },
            "program": {
                "name": "program",
                "qname": "Thing:program",
                "label": "Program",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:program",
                "type": "string"
            },
            "notes": {
                "name": "notes",
                "qname": "Thing:notes",
                "label": "Notes",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:notes",
                "type": "text"
            },
            "modifiedAt": {
                "name": "modifiedAt",
                "qname": "Thing:modifiedAt",
                "label": "Modified on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:modifiedAt",
                "type": "date"
            },
            "retrievedAt": {
                "name": "retrievedAt",
                "qname": "Thing:retrievedAt",
                "label": "Retrieved on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Thing:retrievedAt",
                "type": "date"
            },
            "amount": {
                "name": "amount",
                "qname": "Value:amount",
                "label": "Amount",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:amount",
                "type": "number"
            },
            "currency": {
                "name": "currency",
                "qname": "Value:currency",
                "label": "Currency",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:currency",
                "type": "string"
            },
            "amountUsd": {
                "name": "amountUsd",
                "qname": "Value:amountUsd",
                "label": "Amount in USD",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:amountUsd",
                "type": "number"
            },
            "amountEur": {
                "name": "amountEur",
                "qname": "Value:amountEur",
                "label": "Amount in EUR",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Value:amountEur",
                "type": "number"
            },
            "ownershipAsset": {
                "name": "ownershipAsset",
                "qname": "Asset:ownershipAsset",
                "label": "Owners",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Asset:ownershipAsset",
                "type": "entity",
                "schema": "Ownership",
                "reverse": "asset"
            },
            "courtCase": {
                "name": "courtCase",
                "qname": "Thing:courtCase",
                "label": "Court cases",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Thing:courtCase",
                "type": "entity",
                "schema": "CourtCaseParty",
                "reverse": "party"
            },
            "sanctionEntity": {
                "name": "sanctionEntity",
                "qname": "Thing:sanctionEntity",
                "label": "Sanctions",
                "description": null,
                "caption": false,
                "stub": true,
                "uri": "https://w3id.org/ftm#Thing:sanctionEntity",
                "type": "entity",
                "schema": "Sanction",
                "reverse": "entity"
            }
        }
    },
    "UnknownLink": {
        "label": "Link",
        "plural": "Links",
        "uri": "https://w3id.org/ftm#UnknownLink",
        "schemata": ["Interval", "UnknownLink", "Interest"],
        "extends": ["Interest"],
        "abstract": false,
        "matchable": false,
        "description": null,
        "featured": ["subject", "object", "role"],
        "properties": {
            "subject": {
                "name": "subject",
                "qname": "UnknownLink:subject",
                "label": "Subject",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#UnknownLink:subject",
                "type": "entity",
                "schema": "Thing",
                "reverse": "unknownLinkTo"
            },
            "object": {
                "name": "object",
                "qname": "UnknownLink:object",
                "label": "Object",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#UnknownLink:object",
                "type": "entity",
                "schema": "Thing",
                "reverse": "unknownLinkFrom"
            },
            "role": {
                "name": "role",
                "qname": "Interest:role",
                "label": "Role",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interest:role",
                "type": "string"
            },
            "status": {
                "name": "status",
                "qname": "Interest:status",
                "label": "Status",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interest:status",
                "type": "string"
            },
            "startDate": {
                "name": "startDate",
                "qname": "Interval:startDate",
                "label": "Start date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:startDate",
                "type": "date"
            },
            "endDate": {
                "name": "endDate",
                "qname": "Interval:endDate",
                "label": "End date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:endDate",
                "type": "date"
            },
            "date": {
                "name": "date",
                "qname": "Interval:date",
                "label": "Date",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:date",
                "type": "date"
            },
            "summary": {
                "name": "summary",
                "qname": "Interval:summary",
                "label": "Summary",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:summary",
                "type": "text"
            },
            "recordId": {
                "name": "recordId",
                "qname": "Interval:recordId",
                "label": "Record ID",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:recordId",
                "type": "string"
            },
            "sourceUrl": {
                "name": "sourceUrl",
                "qname": "Interval:sourceUrl",
                "label": "Source URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:sourceUrl",
                "type": "url"
            },
            "alephUrl": {
                "name": "alephUrl",
                "qname": "Interval:alephUrl",
                "label": "Aleph URL",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:alephUrl",
                "type": "url"
            },
            "modifiedAt": {
                "name": "modifiedAt",
                "qname": "Interval:modifiedAt",
                "label": "Modified on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:modifiedAt",
                "type": "date"
            },
            "retrievedAt": {
                "name": "retrievedAt",
                "qname": "Interval:retrievedAt",
                "label": "Retrieved on",
                "description": null,
                "caption": false,
                "stub": false,
                "uri": "https://w3id.org/ftm#Interval:retrievedAt",
                "type": "date"
            }
        }
    }
}