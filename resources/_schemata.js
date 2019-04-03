
export const schemata = {
  "schemata": {
    "Vehicle": {
      "label": "Vehicle",
      "plural": "Vehicles",
      "schemata": [
        "Thing",
        "Value",
        "Asset",
        "Vehicle"
      ],
      "extends": [
        "Asset"
      ],
      "properties": {
        "registrationNumber": {
          "name": "registrationNumber",
          "qname": "Vehicle:registrationNumber",
          "label": "Registration Number",
          "type": "identifier"
        },
        "type": {
          "name": "type",
          "qname": "Vehicle:type",
          "label": "Type",
          "type": "string"
        },
        "model": {
          "name": "model",
          "qname": "Vehicle:model",
          "label": "Model",
          "type": "string"
        },
        "owner": {
          "name": "owner",
          "qname": "Vehicle:owner",
          "label": "Owner",
          "type": "entity",
          "range": "LegalEntity",
          "reverse": "ownedVehicles"
        },
        "operator": {
          "name": "operator",
          "qname": "Vehicle:operator",
          "label": "Operator",
          "type": "entity",
          "range": "LegalEntity",
          "reverse": "operatedVehicles"
        },
        "buildDate": {
          "name": "buildDate",
          "qname": "Vehicle:buildDate",
          "label": "Build Date",
          "type": "date"
        },
        "country": {
          "name": "country",
          "qname": "Vehicle:country",
          "label": "Country",
          "type": "country"
        },
        "registrationDate": {
          "name": "registrationDate",
          "qname": "Vehicle:registrationDate",
          "label": "Registration Date",
          "type": "date"
        }
      },
      "featured": [
        "type",
        "name",
        "registrationNumber",
        "country",
        "owner"
      ]
    },
    "Associate": {
      "label": "Associate",
      "plural": "Associate",
      "schemata": [
        "Associate",
        "Interval"
      ],
      "extends": [
        "Interval"
      ],
      "properties": {
        "person": {
          "name": "person",
          "qname": "Associate:person",
          "label": "Person",
          "type": "entity",
          "description": "The subject of the association.",
          "range": "Person",
          "reverse": "associates"
        },
        "associate": {
          "name": "associate",
          "qname": "Associate:associate",
          "label": "Associate",
          "type": "entity",
          "description": "An associate of the subject person.",
          "range": "Person",
          "reverse": "associations"
        },
        "relationship": {
          "name": "relationship",
          "qname": "Associate:relationship",
          "label": "Relationship",
          "type": "string",
          "description": "Nature of the association"
        }
      },
      "edge": {
        "source": "person",
        "target": "associate"
      },
      "featured": [
        "person",
        "associate",
        "relationship"
      ],
      "description": "Non-family association between two people"
    },
    "Representation": {
      "label": "Representation",
      "plural": "Representation",
      "schemata": [
        "Interest",
        "Representation",
        "Interval"
      ],
      "extends": [
        "Interest"
      ],
      "properties": {
        "agent": {
          "name": "agent",
          "qname": "Representation:agent",
          "label": "Agent",
          "type": "entity",
          "range": "LegalEntity",
          "reverse": "agencyClient"
        },
        "client": {
          "name": "client",
          "qname": "Representation:client",
          "label": "Client",
          "type": "entity",
          "range": "LegalEntity",
          "reverse": "agentRepresentation"
        }
      },
      "edge": {
        "source": "client",
        "target": "agent"
      },
      "featured": [
        "agent",
        "client",
        "role"
      ],
      "description": "A mediatory, intermediary, middleman, or broker acting on behalf of a legal entity."
    },
    "Record": {
      "label": "Record",
      "plural": "Records",
      "schemata": [
        "Record"
      ],
      "extends": [],
      "properties": {
        "index": {
          "name": "index",
          "qname": "Record:index",
          "label": "Index",
          "type": "number"
        },
        "indexText": {
          "name": "indexText",
          "qname": "Record:indexText",
          "label": "Index text",
          "type": "text",
          "hidden": true
        }
      },
      "abstract": true
    },
    "Row": {
      "label": "Row",
      "plural": "Rows",
      "schemata": [
        "Row",
        "Record"
      ],
      "extends": [
        "Record"
      ],
      "properties": {
        "cells": {
          "name": "cells",
          "qname": "Row:cells",
          "label": "Cells",
          "type": "raw",
          "hidden": true
        },
        "table": {
          "name": "table",
          "qname": "Row:table",
          "label": "Table",
          "type": "entity",
          "range": "Table",
          "reverse": "rows"
        }
      }
    },
    "Page": {
      "label": "Page",
      "plural": "Pages",
      "schemata": [
        "Record",
        "Page"
      ],
      "extends": [
        "Record"
      ],
      "properties": {
        "bodyText": {
          "name": "bodyText",
          "qname": "Page:bodyText",
          "label": "Text",
          "type": "text",
          "hidden": true
        },
        "document": {
          "name": "document",
          "qname": "Page:document",
          "label": "Document",
          "type": "entity",
          "range": "Pages",
          "reverse": "pages"
        }
      }
    },
    "Assessment": {
      "label": "Assessment",
      "plural": "Assessments",
      "schemata": [
        "Assessment",
        "Thing"
      ],
      "extends": [
        "Thing"
      ],
      "properties": {
        "publishDate": {
          "name": "publishDate",
          "qname": "Assessment:publishDate",
          "label": "Date of publishing",
          "type": "date"
        },
        "assessmentId": {
          "name": "assessmentId",
          "qname": "Assessment:assessmentId",
          "label": "Assessment ID",
          "type": "string"
        },
        "author": {
          "name": "author",
          "qname": "Assessment:author",
          "label": "Author",
          "type": "entity",
          "range": "LegalEntity",
          "reverse": "authoredAssessments"
        }
      },
      "featured": [
        "name",
        "publishDate",
        "author"
      ]
    },
    "Membership": {
      "label": "Membership",
      "plural": "Memberships",
      "schemata": [
        "Interest",
        "Interval",
        "Membership"
      ],
      "extends": [
        "Interest"
      ],
      "properties": {
        "member": {
          "name": "member",
          "qname": "Membership:member",
          "label": "Member",
          "type": "entity",
          "range": "LegalEntity",
          "reverse": "membershipMember"
        },
        "organization": {
          "name": "organization",
          "qname": "Membership:organization",
          "label": "Organization",
          "type": "entity",
          "range": "Organization",
          "reverse": "membershipOrganization"
        }
      },
      "edge": {
        "source": "organization",
        "target": "member"
      },
      "featured": [
        "member",
        "organization",
        "role"
      ]
    },
    "Company": {
      "label": "Company",
      "plural": "Companies",
      "schemata": [
        "Value",
        "Thing",
        "LegalEntity",
        "Asset",
        "Organization",
        "Company"
      ],
      "extends": [
        "Organization",
        "Asset"
      ],
      "properties": {
        "jurisdiction": {
          "name": "jurisdiction",
          "qname": "Company:jurisdiction",
          "label": "Jurisdiction",
          "type": "country"
        },
        "registrationNumber": {
          "name": "registrationNumber",
          "qname": "Company:registrationNumber",
          "label": "Registration number",
          "type": "identifier"
        },
        "capital": {
          "name": "capital",
          "qname": "Company:capital",
          "label": "Capital",
          "type": "string"
        },
        "voenCode": {
          "name": "voenCode",
          "qname": "Company:voenCode",
          "label": "VOEN",
          "type": "identifier",
          "description": "Azerbaijan taxpayer ID"
        },
        "coatoCode": {
          "name": "coatoCode",
          "qname": "Company:coatoCode",
          "label": "COATO / SOATO / OKATO",
          "type": "identifier"
        },
        "irsCode": {
          "name": "irsCode",
          "qname": "Company:irsCode",
          "label": "IRS Number",
          "type": "identifier",
          "description": "US tax ID"
        },
        "ipoCode": {
          "name": "ipoCode",
          "qname": "Company:ipoCode",
          "label": "IPO",
          "type": "identifier"
        },
        "cikCode": {
          "name": "cikCode",
          "qname": "Company:cikCode",
          "label": "SEC Central Index Key",
          "type": "identifier",
          "description": "US SEC Central Index Key"
        },
        "jibCode": {
          "name": "jibCode",
          "qname": "Company:jibCode",
          "label": "JIB",
          "type": "identifier",
          "description": "Yugoslavia company ID"
        },
        "mbsCode": {
          "name": "mbsCode",
          "qname": "Company:mbsCode",
          "label": "MBS",
          "type": "identifier"
        },
        "ibcRuc": {
          "name": "ibcRuc",
          "qname": "Company:ibcRuc",
          "label": "ibcRUC",
          "type": "identifier"
        },
        "caemCode": {
          "name": "caemCode",
          "qname": "Company:caemCode",
          "label": "COD CAEM",
          "type": "string",
          "description": "(RO) What kind of activity a legal entity is allowed to develop"
        },
        "kppCode": {
          "name": "kppCode",
          "qname": "Company:kppCode",
          "label": "KPP",
          "type": "identifier",
          "description": "(RU, \u041a\u041f\u041f) in addition to INN for orgs; reason for registration at FNS"
        },
        "okvedCode": {
          "name": "okvedCode",
          "qname": "Company:okvedCode",
          "label": "OKVED(2) Classifier",
          "type": "string",
          "description": "(RU, \u041e\u041a\u0412\u042d\u0414) Economical activity classifier. OKVED2 is the same but newer"
        },
        "okopfCode": {
          "name": "okopfCode",
          "qname": "Company:okopfCode",
          "label": "OKOPF",
          "type": "string",
          "description": "(RU, \u041e\u041a\u041e\u041f\u0424) What kind of business entity"
        },
        "fnsCode": {
          "name": "fnsCode",
          "qname": "Company:fnsCode",
          "label": "Federal tax service code",
          "type": "identifier",
          "description": "(RU, \u0424\u041d\u0421) Federal Tax Service related info"
        },
        "fssCode": {
          "name": "fssCode",
          "qname": "Company:fssCode",
          "label": "FSS",
          "type": "string",
          "description": "(RU, \u0424\u0421\u0421) Social Security"
        },
        "ogrnCode": {
          "name": "ogrnCode",
          "qname": "Company:ogrnCode",
          "label": "OGRN",
          "type": "identifier",
          "description": "Major State Registration Number"
        },
        "bikCode": {
          "name": "bikCode",
          "qname": "Company:bikCode",
          "label": "BIK",
          "type": "string",
          "description": "Russian bank account code"
        },
        "pfrNumber": {
          "name": "pfrNumber",
          "qname": "Company:pfrNumber",
          "label": "PFR Number",
          "type": "identifier",
          "description": "(RU, \u041f\u0424\u0420) Pension Fund Registration number. AAA-BBB-CCCCCC, where AAA is organisation region, BBB is district, CCCCCC number at a specific branch"
        },
        "oksmCode": {
          "name": "oksmCode",
          "qname": "Company:oksmCode",
          "label": "OKSM",
          "type": "string",
          "description": "Russian (\u041e\u041a\u0421\u041c) countries classifer"
        }
      },
      "featured": [
        "name",
        "registrationNumber",
        "jurisdiction",
        "incorporationDate"
      ],
      "matchable": true
    },
    "CourtCase": {
      "label": "Court case",
      "plural": "Court cases",
      "schemata": [
        "CourtCase",
        "Thing"
      ],
      "extends": [
        "Thing"
      ],
      "properties": {
        "category": {
          "name": "category",
          "qname": "CourtCase:category",
          "label": "Category",
          "type": "string"
        },
        "type": {
          "name": "type",
          "qname": "CourtCase:type",
          "label": "Type",
          "type": "string"
        },
        "status": {
          "name": "status",
          "qname": "CourtCase:status",
          "label": "Status",
          "type": "string"
        },
        "caseNumber": {
          "name": "caseNumber",
          "qname": "CourtCase:caseNumber",
          "label": "Case number",
          "type": "identifier"
        },
        "court": {
          "name": "court",
          "qname": "CourtCase:court",
          "label": "Court",
          "type": "string"
        },
        "fileDate": {
          "name": "fileDate",
          "qname": "CourtCase:fileDate",
          "label": "File date",
          "type": "date"
        },
        "closeDate": {
          "name": "closeDate",
          "qname": "CourtCase:closeDate",
          "label": "Close date",
          "type": "date"
        },
        "parties": {
          "name": "parties",
          "qname": "CourtCase:parties",
          "label": "Parties",
          "type": "entity",
          "stub": true,
          "range": "CourtCaseParty",
          "reverse": "case"
        }
      },
      "featured": [
        "name",
        "fileDate",
        "caseNumber"
      ]
    },
    "Value": {
      "label": "Value",
      "plural": "Value",
      "schemata": [
        "Value"
      ],
      "extends": [],
      "properties": {
        "amount": {
          "name": "amount",
          "qname": "Value:amount",
          "label": "Amount",
          "type": "number"
        },
        "currency": {
          "name": "currency",
          "qname": "Value:currency",
          "label": "Currency",
          "type": "string"
        },
        "amountUsd": {
          "name": "amountUsd",
          "qname": "Value:amountUsd",
          "label": "Amount in USD",
          "type": "number"
        },
        "amountEur": {
          "name": "amountEur",
          "qname": "Value:amountEur",
          "label": "Amount in EUR",
          "type": "number"
        }
      },
      "abstract": true
    },
    "Passport": {
      "label": "Passport",
      "plural": "Passports",
      "schemata": [
        "Interval",
        "Passport"
      ],
      "extends": [
        "Interval"
      ],
      "properties": {
        "holder": {
          "name": "holder",
          "qname": "Passport:holder",
          "label": "Document holder",
          "type": "entity",
          "range": "LegalEntity",
          "reverse": "passport"
        },
        "type": {
          "name": "type",
          "qname": "Passport:type",
          "label": "Document type",
          "type": "string"
        },
        "country": {
          "name": "country",
          "qname": "Passport:country",
          "label": "Country",
          "type": "country"
        },
        "passportNumber": {
          "name": "passportNumber",
          "qname": "Passport:passportNumber",
          "label": "Passport number",
          "type": "identifier"
        },
        "surname": {
          "name": "surname",
          "qname": "Passport:surname",
          "label": "Surname",
          "type": "string"
        },
        "givenName": {
          "name": "givenName",
          "qname": "Passport:givenName",
          "label": "Given name",
          "type": "string"
        },
        "birthDate": {
          "name": "birthDate",
          "qname": "Passport:birthDate",
          "label": "Date of birth",
          "type": "date"
        },
        "birthPlace": {
          "name": "birthPlace",
          "qname": "Passport:birthPlace",
          "label": "Place of birth",
          "type": "string"
        },
        "gender": {
          "name": "gender",
          "qname": "Passport:gender",
          "label": "Gender",
          "type": "string"
        },
        "personalNumber": {
          "name": "personalNumber",
          "qname": "Passport:personalNumber",
          "label": "Personal number",
          "type": "identifier"
        },
        "authority": {
          "name": "authority",
          "qname": "Passport:authority",
          "label": "Authority",
          "type": "string"
        }
      },
      "featured": [
        "passportNumber",
        "country",
        "type",
        "holder",
        "startDate",
        "endDate"
      ],
      "description": "Passport"
    },
    "PublicBody": {
      "label": "Public body",
      "plural": "Public bodies",
      "schemata": [
        "PublicBody",
        "Organization",
        "LegalEntity",
        "Thing"
      ],
      "extends": [
        "Organization"
      ],
      "properties": {},
      "description": "A public body, such as a ministry, department or state company.",
      "matchable": true
    },
    "TaxRoll": {
      "label": "Tax Roll",
      "plural": "Tax Rolls",
      "schemata": [
        "TaxRoll",
        "Interval"
      ],
      "extends": [
        "Interval"
      ],
      "properties": {
        "taxee": {
          "name": "taxee",
          "qname": "TaxRoll:taxee",
          "label": "Taxee",
          "type": "entity",
          "range": "LegalEntity",
          "reverse": "taxRolls"
        },
        "country": {
          "name": "country",
          "qname": "TaxRoll:country",
          "label": "Country",
          "type": "country"
        },
        "surname": {
          "name": "surname",
          "qname": "TaxRoll:surname",
          "label": "Surname",
          "type": "string"
        },
        "givenName": {
          "name": "givenName",
          "qname": "TaxRoll:givenName",
          "label": "Given name",
          "type": "string"
        },
        "birthDate": {
          "name": "birthDate",
          "qname": "TaxRoll:birthDate",
          "label": "Date of birth",
          "type": "date"
        },
        "income": {
          "name": "income",
          "qname": "TaxRoll:income",
          "label": "Registered income",
          "type": "string"
        },
        "taxPaid": {
          "name": "taxPaid",
          "qname": "TaxRoll:taxPaid",
          "label": "Amount of tax paid",
          "type": "string"
        },
        "wealth": {
          "name": "wealth",
          "qname": "TaxRoll:wealth",
          "label": "Registered wealth",
          "type": "string"
        }
      },
      "featured": [
        "taxee",
        "date",
        "income",
        "wealth",
        "taxPaid"
      ],
      "description": "A tax declaration of an individual"
    },
    "Ownership": {
      "label": "Ownership",
      "plural": "Ownerships",
      "schemata": [
        "Interest",
        "Interval",
        "Ownership"
      ],
      "extends": [
        "Interest"
      ],
      "properties": {
        "owner": {
          "name": "owner",
          "qname": "Ownership:owner",
          "label": "Owner",
          "type": "entity",
          "range": "LegalEntity",
          "reverse": "ownershipOwner"
        },
        "asset": {
          "name": "asset",
          "qname": "Ownership:asset",
          "label": "Asset",
          "type": "entity",
          "range": "Asset",
          "reverse": "ownershipAsset"
        },
        "percentage": {
          "name": "percentage",
          "qname": "Ownership:percentage",
          "label": "Percentage held",
          "type": "string"
        },
        "sharesCount": {
          "name": "sharesCount",
          "qname": "Ownership:sharesCount",
          "label": "Number of shares",
          "type": "string"
        },
        "sharesValue": {
          "name": "sharesValue",
          "qname": "Ownership:sharesValue",
          "label": "Value of shares",
          "type": "string"
        },
        "sharesCurrency": {
          "name": "sharesCurrency",
          "qname": "Ownership:sharesCurrency",
          "label": "Currency of shares",
          "type": "string"
        },
        "sharesType": {
          "name": "sharesType",
          "qname": "Ownership:sharesType",
          "label": "Type of shares",
          "type": "string"
        },
        "legalBasis": {
          "name": "legalBasis",
          "qname": "Ownership:legalBasis",
          "label": "Legal basis",
          "type": "string"
        },
        "ownershipType": {
          "name": "ownershipType",
          "qname": "Ownership:ownershipType",
          "label": "Type of ownership",
          "type": "string"
        }
      },
      "edge": {
        "source": "asset",
        "target": "owner"
      },
      "featured": [
        "owner",
        "asset",
        "percentage",
        "startDate",
        "endDate"
      ]
    },
    "Sanction": {
      "label": "Sanction",
      "plural": "Sanctions",
      "schemata": [
        "Interval",
        "Sanction"
      ],
      "extends": [
        "Interval"
      ],
      "properties": {
        "entity": {
          "name": "entity",
          "qname": "Sanction:entity",
          "label": "Entity",
          "type": "entity",
          "range": "Thing",
          "reverse": "sanctionEntity"
        },
        "authority": {
          "name": "authority",
          "qname": "Sanction:authority",
          "label": "Authority",
          "type": "string"
        },
        "program": {
          "name": "program",
          "qname": "Sanction:program",
          "label": "Program",
          "type": "string"
        },
        "status": {
          "name": "status",
          "qname": "Sanction:status",
          "label": "Status",
          "type": "string"
        },
        "duration": {
          "name": "duration",
          "qname": "Sanction:duration",
          "label": "Duration",
          "type": "string"
        },
        "reason": {
          "name": "reason",
          "qname": "Sanction:reason",
          "label": "Reason",
          "type": "text"
        },
        "country": {
          "name": "country",
          "qname": "Sanction:country",
          "label": "Country",
          "type": "country"
        }
      },
      "featured": [
        "entity",
        "authority",
        "program",
        "startDate",
        "endDate"
      ],
      "description": "A sanction designation"
    },
    "Directorship": {
      "label": "Directorship",
      "plural": "Directorship",
      "schemata": [
        "Interest",
        "Interval",
        "Directorship"
      ],
      "extends": [
        "Interest"
      ],
      "properties": {
        "director": {
          "name": "director",
          "qname": "Directorship:director",
          "label": "Director",
          "type": "entity",
          "range": "LegalEntity",
          "reverse": "directorshipDirector"
        },
        "organization": {
          "name": "organization",
          "qname": "Directorship:organization",
          "label": "Organization",
          "type": "entity",
          "range": "Organization",
          "reverse": "directorshipOrganization"
        },
        "secretary": {
          "name": "secretary",
          "qname": "Directorship:secretary",
          "label": "Secretary",
          "type": "string"
        }
      },
      "edge": {
        "source": "organization",
        "target": "director"
      },
      "featured": [
        "director",
        "organization",
        "role",
        "startDate",
        "endDate"
      ]
    },
    "Person": {
      "label": "Person",
      "plural": "People",
      "schemata": [
        "LegalEntity",
        "Person",
        "Thing"
      ],
      "extends": [
        "LegalEntity"
      ],
      "properties": {
        "title": {
          "name": "title",
          "qname": "Person:title",
          "label": "Title",
          "type": "string"
        },
        "firstName": {
          "name": "firstName",
          "qname": "Person:firstName",
          "label": "First name",
          "type": "string"
        },
        "secondName": {
          "name": "secondName",
          "qname": "Person:secondName",
          "label": "Second name",
          "type": "string"
        },
        "middleName": {
          "name": "middleName",
          "qname": "Person:middleName",
          "label": "Middle name",
          "type": "string"
        },
        "fatherName": {
          "name": "fatherName",
          "qname": "Person:fatherName",
          "label": "Patronymic",
          "type": "string"
        },
        "motherName": {
          "name": "motherName",
          "qname": "Person:motherName",
          "label": "Matronymic",
          "type": "string"
        },
        "lastName": {
          "name": "lastName",
          "qname": "Person:lastName",
          "label": "Last name",
          "type": "string"
        },
        "birthDate": {
          "name": "birthDate",
          "qname": "Person:birthDate",
          "label": "Birth date",
          "type": "date"
        },
        "birthPlace": {
          "name": "birthPlace",
          "qname": "Person:birthPlace",
          "label": "Place of birth",
          "type": "string"
        },
        "deathDate": {
          "name": "deathDate",
          "qname": "Person:deathDate",
          "label": "Death date",
          "type": "date"
        },
        "position": {
          "name": "position",
          "qname": "Person:position",
          "label": "Position",
          "type": "string"
        },
        "nationality": {
          "name": "nationality",
          "qname": "Person:nationality",
          "label": "Nationality",
          "type": "country"
        },
        "gender": {
          "name": "gender",
          "qname": "Person:gender",
          "label": "Gender",
          "type": "string"
        },
        "passportNumber": {
          "name": "passportNumber",
          "qname": "Person:passportNumber",
          "label": "Passport",
          "type": "identifier"
        },
        "associates": {
          "name": "associates",
          "qname": "Person:associates",
          "label": "Associates",
          "type": "entity",
          "stub": true,
          "range": "Associate",
          "reverse": "person"
        },
        "associations": {
          "name": "associations",
          "qname": "Person:associations",
          "label": "Associations",
          "type": "entity",
          "stub": true,
          "range": "Associate",
          "reverse": "associate"
        },
        "familyPerson": {
          "name": "familyPerson",
          "qname": "Person:familyPerson",
          "label": "Family",
          "type": "entity",
          "stub": true,
          "range": "Family",
          "reverse": "person"
        },
        "familyRelative": {
          "name": "familyRelative",
          "qname": "Person:familyRelative",
          "label": "Relatives",
          "type": "entity",
          "stub": true,
          "range": "Family",
          "reverse": "relative"
        }
      },
      "featured": [
        "name",
        "nationality",
        "birthDate"
      ],
      "description": "An individual",
      "matchable": true
    },
    "Vessel": {
      "label": "Vessel",
      "plural": "Vessels",
      "schemata": [
        "Value",
        "Vehicle",
        "Thing",
        "Vessel",
        "Asset"
      ],
      "extends": [
        "Vehicle"
      ],
      "properties": {
        "imoNumber": {
          "name": "imoNumber",
          "qname": "Vessel:imoNumber",
          "label": "IMO Number",
          "type": "identifier"
        },
        "crsNumber": {
          "name": "crsNumber",
          "qname": "Vessel:crsNumber",
          "label": "CRS Number",
          "type": "identifier"
        },
        "flag": {
          "name": "flag",
          "qname": "Vessel:flag",
          "label": "Flag",
          "type": "country"
        },
        "registrationPort": {
          "name": "registrationPort",
          "qname": "Vessel:registrationPort",
          "label": "Port of Registration",
          "type": "string"
        },
        "navigationArea": {
          "name": "navigationArea",
          "qname": "Vessel:navigationArea",
          "label": "Navigation Area",
          "type": "string"
        },
        "tonnage": {
          "name": "tonnage",
          "qname": "Vessel:tonnage",
          "label": "Tonnage",
          "type": "string"
        },
        "grossRegisteredTonnage": {
          "name": "grossRegisteredTonnage",
          "qname": "Vessel:grossRegisteredTonnage",
          "label": "Gross Registered Tonnage",
          "type": "number"
        },
        "nameChangeDate": {
          "name": "nameChangeDate",
          "qname": "Vessel:nameChangeDate",
          "label": "Date of Name Change",
          "type": "date"
        },
        "callSign": {
          "name": "callSign",
          "qname": "Vessel:callSign",
          "label": "Call Sign",
          "type": "identifier"
        },
        "pastNames": {
          "name": "pastNames",
          "qname": "Vessel:pastNames",
          "label": "Past Names",
          "type": "name"
        },
        "pastFlags": {
          "name": "pastFlags",
          "qname": "Vessel:pastFlags",
          "label": "Past Flags",
          "type": "string"
        },
        "pastTypes": {
          "name": "pastTypes",
          "qname": "Vessel:pastTypes",
          "label": "Past Types",
          "type": "string"
        },
        "mmsi": {
          "name": "mmsi",
          "qname": "Vessel:mmsi",
          "label": "MMSI",
          "type": "identifier"
        }
      },
      "featured": [
        "name",
        "imoNumber",
        "type"
      ],
      "description": "A boat or ship",
      "matchable": true
    },
    "Event": {
      "label": "Event",
      "plural": "Event",
      "schemata": [
        "Event",
        "Interval"
      ],
      "extends": [
        "Interval"
      ],
      "properties": {
        "location": {
          "name": "location",
          "qname": "Event:location",
          "label": "Location",
          "type": "string"
        },
        "country": {
          "name": "country",
          "qname": "Event:country",
          "label": "Country",
          "type": "country"
        }
      }
    },
    "ContractAward": {
      "label": "Contract Lot Award",
      "plural": "Contract Awards",
      "schemata": [
        "Interest",
        "Value",
        "Interval",
        "ContractAward"
      ],
      "extends": [
        "Value",
        "Interest"
      ],
      "properties": {
        "supplier": {
          "name": "supplier",
          "qname": "ContractAward:supplier",
          "label": "Supplier",
          "type": "entity",
          "description": "The entity the contract was awarded to",
          "range": "LegalEntity",
          "reverse": "contractAwardSupplier"
        },
        "contract": {
          "name": "contract",
          "qname": "ContractAward:contract",
          "label": "Contract",
          "type": "entity",
          "range": "Contract",
          "reverse": "awards"
        },
        "lotNumber": {
          "name": "lotNumber",
          "qname": "ContractAward:lotNumber",
          "label": "Lot number",
          "type": "string"
        },
        "documentNumber": {
          "name": "documentNumber",
          "qname": "ContractAward:documentNumber",
          "label": "Document number",
          "type": "string"
        },
        "documentType": {
          "name": "documentType",
          "qname": "ContractAward:documentType",
          "label": "Document type",
          "type": "string"
        },
        "decisionReason": {
          "name": "decisionReason",
          "qname": "ContractAward:decisionReason",
          "label": "Decision reason",
          "type": "text"
        },
        "cpvCode": {
          "name": "cpvCode",
          "qname": "ContractAward:cpvCode",
          "label": "CPV Code",
          "type": "string",
          "description": "Contract Procurement Vocabulary (what type of goods/services, EU)"
        },
        "nutsCode": {
          "name": "nutsCode",
          "qname": "ContractAward:nutsCode",
          "label": "NUTS Code",
          "type": "string",
          "description": "Nomencalture of Territorial Units for Statistics (NUTS)"
        },
        "amended": {
          "name": "amended",
          "qname": "ContractAward:amended",
          "label": "Amended?",
          "type": "string",
          "description": "Was this award amended, modified or updated by a subsequent document?"
        }
      },
      "edge": {
        "source": "contract",
        "target": "supplier"
      },
      "featured": [
        "supplier",
        "contract",
        "amount",
        "lotNumber",
        "decisionReason"
      ],
      "description": "A contract or contract lot as awarded to a supplier."
    },
    "LegalEntity": {
      "label": "Legal entity",
      "plural": "Legal entities",
      "schemata": [
        "LegalEntity",
        "Thing"
      ],
      "extends": [
        "Thing"
      ],
      "properties": {
        "email": {
          "name": "email",
          "qname": "LegalEntity:email",
          "label": "E-Mail",
          "type": "email",
          "description": "Email address"
        },
        "phone": {
          "name": "phone",
          "qname": "LegalEntity:phone",
          "label": "Phone",
          "type": "phone",
          "description": "Phone number"
        },
        "website": {
          "name": "website",
          "qname": "LegalEntity:website",
          "label": "Website",
          "type": "url",
          "description": "Website address"
        },
        "legalForm": {
          "name": "legalForm",
          "qname": "LegalEntity:legalForm",
          "label": "Legal form",
          "type": "string"
        },
        "incorporationDate": {
          "name": "incorporationDate",
          "qname": "LegalEntity:incorporationDate",
          "label": "Incorporation date",
          "type": "date",
          "description": "The date the legal entity was incorporated"
        },
        "dissolutionDate": {
          "name": "dissolutionDate",
          "qname": "LegalEntity:dissolutionDate",
          "label": "Dissolution date",
          "type": "date",
          "description": "The date the legal entity was dissolved, if applicable"
        },
        "taxStatus": {
          "name": "taxStatus",
          "qname": "LegalEntity:taxStatus",
          "label": "Tax status",
          "type": "string"
        },
        "status": {
          "name": "status",
          "qname": "LegalEntity:status",
          "label": "Status",
          "type": "string"
        },
        "sector": {
          "name": "sector",
          "qname": "LegalEntity:sector",
          "label": "Sector",
          "type": "string"
        },
        "classification": {
          "name": "classification",
          "qname": "LegalEntity:classification",
          "label": "Classification",
          "type": "string"
        },
        "registrationNumber": {
          "name": "registrationNumber",
          "qname": "LegalEntity:registrationNumber",
          "label": "Registration number",
          "type": "identifier",
          "description": "Company registration number"
        },
        "idNumber": {
          "name": "idNumber",
          "qname": "LegalEntity:idNumber",
          "label": "ID Number",
          "type": "identifier",
          "description": "ID number of any applicable ID"
        },
        "taxNumber": {
          "name": "taxNumber",
          "qname": "LegalEntity:taxNumber",
          "label": "Tax ID Number",
          "type": "identifier",
          "description": "Tax ID number"
        },
        "vatCode": {
          "name": "vatCode",
          "qname": "LegalEntity:vatCode",
          "label": "V.A.T. Identifier",
          "type": "identifier",
          "description": "(EU) VAT number"
        },
        "jurisdiction": {
          "name": "jurisdiction",
          "qname": "LegalEntity:jurisdiction",
          "label": "Jurisdiction",
          "type": "country",
          "description": "Country or region in which this entity operates"
        },
        "mainCountry": {
          "name": "mainCountry",
          "qname": "LegalEntity:mainCountry",
          "label": "Country of origin",
          "type": "country",
          "description": "Primary country of this entity"
        },
        "opencorporatesUrl": {
          "name": "opencorporatesUrl",
          "qname": "LegalEntity:opencorporatesUrl",
          "label": "OpenCorporates URL",
          "type": "url"
        },
        "bvdId": {
          "name": "bvdId",
          "qname": "LegalEntity:bvdId",
          "label": "Bureau van Dijk ID",
          "type": "identifier"
        },
        "icijId": {
          "name": "icijId",
          "qname": "LegalEntity:icijId",
          "label": "ICIJ ID",
          "type": "string",
          "description": "ID according to International Consortium for Investigative Journalists"
        },
        "okpoCode": {
          "name": "okpoCode",
          "qname": "LegalEntity:okpoCode",
          "label": "OKPO",
          "type": "identifier",
          "description": "Russian industry classifier"
        },
        "innCode": {
          "name": "innCode",
          "qname": "LegalEntity:innCode",
          "label": "INN",
          "type": "identifier",
          "description": "Russian company ID"
        },
        "dunsCode": {
          "name": "dunsCode",
          "qname": "LegalEntity:dunsCode",
          "label": "D-U-N-S",
          "type": "identifier",
          "description": "Dun & Bradstreet identifier"
        },
        "swiftBic": {
          "name": "swiftBic",
          "qname": "LegalEntity:swiftBic",
          "label": "SWIFT/BIC",
          "type": "identifier",
          "description": "Bank identifier code"
        },
        "parent": {
          "name": "parent",
          "qname": "LegalEntity:parent",
          "label": "Parent company",
          "type": "entity",
          "description": "If this entity is a subsidiary, another entity (company or organisation) is its parent",
          "range": "LegalEntity",
          "reverse": "subsidiaries"
        },
        "subsidiaries": {
          "name": "subsidiaries",
          "qname": "LegalEntity:subsidiaries",
          "label": "Subsidiaries",
          "type": "entity",
          "range": "LegalEntity",
          "reverse": "parent"
        },
        "passport": {
          "name": "passport",
          "qname": "LegalEntity:passport",
          "label": "Passports",
          "type": "entity",
          "range": "Passport",
          "reverse": "holder"
        },
        "ownedVehicles": {
          "name": "ownedVehicles",
          "qname": "LegalEntity:ownedVehicles",
          "label": "Vehicles owned",
          "type": "entity",
          "stub": true,
          "range": "Vehicle",
          "reverse": "owner"
        },
        "operatedVehicles": {
          "name": "operatedVehicles",
          "qname": "LegalEntity:operatedVehicles",
          "label": "Vehicles operated",
          "type": "entity",
          "stub": true,
          "range": "Vehicle",
          "reverse": "operator"
        },
        "agencyClient": {
          "name": "agencyClient",
          "qname": "LegalEntity:agencyClient",
          "label": "Agency clients",
          "type": "entity",
          "stub": true,
          "range": "Representation",
          "reverse": "agent"
        },
        "agentRepresentation": {
          "name": "agentRepresentation",
          "qname": "LegalEntity:agentRepresentation",
          "label": "Agents",
          "type": "entity",
          "stub": true,
          "range": "Representation",
          "reverse": "client"
        },
        "authoredAssessments": {
          "name": "authoredAssessments",
          "qname": "LegalEntity:authoredAssessments",
          "label": "Assessments authored",
          "type": "entity",
          "stub": true,
          "range": "Assessment",
          "reverse": "author"
        },
        "membershipMember": {
          "name": "membershipMember",
          "qname": "LegalEntity:membershipMember",
          "label": "Memberships",
          "type": "entity",
          "stub": true,
          "range": "Membership",
          "reverse": "member"
        },
        "taxRolls": {
          "name": "taxRolls",
          "qname": "LegalEntity:taxRolls",
          "label": "Tax Rolls",
          "type": "entity",
          "stub": true,
          "range": "TaxRoll",
          "reverse": "taxee"
        },
        "ownershipOwner": {
          "name": "ownershipOwner",
          "qname": "LegalEntity:ownershipOwner",
          "label": "Assets and shares",
          "type": "entity",
          "stub": true,
          "range": "Ownership",
          "reverse": "owner"
        },
        "directorshipDirector": {
          "name": "directorshipDirector",
          "qname": "LegalEntity:directorshipDirector",
          "label": "Directorships",
          "type": "entity",
          "stub": true,
          "range": "Directorship",
          "reverse": "director"
        },
        "contractAwardSupplier": {
          "name": "contractAwardSupplier",
          "qname": "LegalEntity:contractAwardSupplier",
          "label": "Contracts awarded",
          "type": "entity",
          "stub": true,
          "range": "ContractAward",
          "reverse": "supplier"
        },
        "successors": {
          "name": "successors",
          "qname": "LegalEntity:successors",
          "label": "Successors",
          "type": "entity",
          "stub": true,
          "range": "Succession",
          "reverse": "predecessor"
        },
        "predecessors": {
          "name": "predecessors",
          "qname": "LegalEntity:predecessors",
          "label": "Predecessors",
          "type": "entity",
          "stub": true,
          "range": "Succession",
          "reverse": "successor"
        },
        "contractAuthority": {
          "name": "contractAuthority",
          "qname": "LegalEntity:contractAuthority",
          "label": "Contracts issued",
          "type": "entity",
          "stub": true,
          "range": "Contract",
          "reverse": "authority"
        },
        "paymentPayer": {
          "name": "paymentPayer",
          "qname": "LegalEntity:paymentPayer",
          "label": "Payments made",
          "type": "entity",
          "stub": true,
          "range": "Payment",
          "reverse": "payer"
        },
        "paymentBeneficiary": {
          "name": "paymentBeneficiary",
          "qname": "LegalEntity:paymentBeneficiary",
          "label": "Payments received",
          "type": "entity",
          "stub": true,
          "range": "Payment",
          "reverse": "beneficiary"
        },
        "economicActivityDeclarant": {
          "name": "economicActivityDeclarant",
          "qname": "LegalEntity:economicActivityDeclarant",
          "label": "Customs declarations",
          "type": "entity",
          "stub": true,
          "range": "EconomicActivity",
          "reverse": "declarant"
        },
        "economicActivitySender": {
          "name": "economicActivitySender",
          "qname": "LegalEntity:economicActivitySender",
          "label": "Goods originated",
          "type": "entity",
          "stub": true,
          "range": "EconomicActivity",
          "reverse": "sender"
        },
        "economicActivityReceiver": {
          "name": "economicActivityReceiver",
          "qname": "LegalEntity:economicActivityReceiver",
          "label": "Goods received",
          "type": "entity",
          "stub": true,
          "range": "EconomicActivity",
          "reverse": "receiver"
        },
        "economicActivityHolder": {
          "name": "economicActivityHolder",
          "qname": "LegalEntity:economicActivityHolder",
          "label": "Economic activities",
          "type": "entity",
          "stub": true,
          "range": "EconomicActivity",
          "reverse": "contractHolder"
        }
      },
      "featured": [
        "name",
        "legalForm",
        "country"
      ],
      "description": "A legal entity may be a person or a company.",
      "matchable": true
    },
    "Succession": {
      "label": "Succession",
      "plural": "Successions",
      "schemata": [
        "Interest",
        "Succession",
        "Interval"
      ],
      "extends": [
        "Interest"
      ],
      "properties": {
        "predecessor": {
          "name": "predecessor",
          "qname": "Succession:predecessor",
          "label": "Predecessor",
          "type": "entity",
          "range": "LegalEntity",
          "reverse": "successors"
        },
        "successor": {
          "name": "successor",
          "qname": "Succession:successor",
          "label": "Successor",
          "type": "entity",
          "range": "LegalEntity",
          "reverse": "predecessors"
        }
      },
      "edge": {
        "source": "predecessor",
        "target": "successor"
      },
      "featured": [
        "predecessor",
        "successor",
        "date"
      ],
      "description": "Two entities that legally succeed each other."
    },
    "Thing": {
      "label": "Thing",
      "plural": "Thing",
      "schemata": [
        "Thing"
      ],
      "extends": [],
      "properties": {
        "name": {
          "name": "name",
          "qname": "Thing:name",
          "label": "Name",
          "type": "name",
          "required": true,
          "caption": true
        },
        "sameAs": {
          "name": "sameAs",
          "qname": "Thing:sameAs",
          "label": "Same as",
          "type": "entity",
          "range": "Thing",
          "reverse": "sameAs"
        },
        "summary": {
          "name": "summary",
          "qname": "Thing:summary",
          "label": "Summary",
          "type": "text"
        },
        "description": {
          "name": "description",
          "qname": "Thing:description",
          "label": "Description",
          "type": "text"
        },
        "country": {
          "name": "country",
          "qname": "Thing:country",
          "label": "Country",
          "type": "country"
        },
        "alias": {
          "name": "alias",
          "qname": "Thing:alias",
          "label": "Other name",
          "type": "name"
        },
        "previousName": {
          "name": "previousName",
          "qname": "Thing:previousName",
          "label": "Previous name",
          "type": "name"
        },
        "weakAlias": {
          "name": "weakAlias",
          "qname": "Thing:weakAlias",
          "label": "Weak alias",
          "type": "string"
        },
        "sourceUrl": {
          "name": "sourceUrl",
          "qname": "Thing:sourceUrl",
          "label": "Source link",
          "type": "url"
        },
        "publisher": {
          "name": "publisher",
          "qname": "Thing:publisher",
          "label": "Publishing source",
          "type": "string"
        },
        "publisherUrl": {
          "name": "publisherUrl",
          "qname": "Thing:publisherUrl",
          "label": "Publishing source URL",
          "type": "url"
        },
        "alephUrl": {
          "name": "alephUrl",
          "qname": "Thing:alephUrl",
          "label": "Aleph URL",
          "type": "url"
        },
        "wikipediaUrl": {
          "name": "wikipediaUrl",
          "qname": "Thing:wikipediaUrl",
          "label": "Wikipedia Article",
          "type": "url"
        },
        "wikidataId": {
          "name": "wikidataId",
          "qname": "Thing:wikidataId",
          "label": "Wikidata ID",
          "type": "identifier"
        },
        "keywords": {
          "name": "keywords",
          "qname": "Thing:keywords",
          "label": "Keywords",
          "type": "string"
        },
        "address": {
          "name": "address",
          "qname": "Thing:address",
          "label": "Address",
          "type": "address"
        },
        "program": {
          "name": "program",
          "qname": "Thing:program",
          "label": "Program",
          "type": "string"
        },
        "notes": {
          "name": "notes",
          "qname": "Thing:notes",
          "label": "Notes",
          "type": "text"
        },
        "indexText": {
          "name": "indexText",
          "qname": "Thing:indexText",
          "label": "Index text",
          "type": "text",
          "hidden": true
        },
        "modifiedAt": {
          "name": "modifiedAt",
          "qname": "Thing:modifiedAt",
          "label": "Modified on",
          "type": "date"
        },
        "retrievedAt": {
          "name": "retrievedAt",
          "qname": "Thing:retrievedAt",
          "label": "Retrieved on",
          "type": "date"
        },
        "sanctionEntity": {
          "name": "sanctionEntity",
          "qname": "Thing:sanctionEntity",
          "label": "Sanctions",
          "type": "entity",
          "stub": true,
          "range": "Sanction",
          "reverse": "entity"
        },
        "courtCase": {
          "name": "courtCase",
          "qname": "Thing:courtCase",
          "label": "Court cases",
          "type": "entity",
          "stub": true,
          "range": "CourtCaseParty",
          "reverse": "party"
        },
        "unknownLinkTo": {
          "name": "unknownLinkTo",
          "qname": "Thing:unknownLinkTo",
          "label": "Linked to",
          "type": "entity",
          "stub": true,
          "range": "UnknownLink",
          "reverse": "subject"
        },
        "unknownLinkFrom": {
          "name": "unknownLinkFrom",
          "qname": "Thing:unknownLinkFrom",
          "label": "Linked from",
          "type": "entity",
          "stub": true,
          "range": "UnknownLink",
          "reverse": "object"
        }
      },
      "featured": [
        "name",
        "country"
      ],
      "abstract": true
    },
    "License": {
      "label": "License",
      "plural": "Licenses",
      "schemata": [
        "Contract",
        "Value",
        "Thing",
        "License",
        "Asset"
      ],
      "extends": [
        "Contract"
      ],
      "properties": {
        "area": {
          "name": "area",
          "qname": "License:area",
          "label": "Area",
          "type": "string"
        },
        "commodities": {
          "name": "commodities",
          "qname": "License:commodities",
          "label": "Commodities",
          "type": "string"
        },
        "reviewDate": {
          "name": "reviewDate",
          "qname": "License:reviewDate",
          "label": "License review date",
          "type": "string"
        }
      },
      "featured": [
        "name",
        "amount",
        "authority",
        "contractDate",
        "commodities"
      ],
      "description": "A grant of land, rights or property. A type of Contract"
    },
    "Payment": {
      "label": "Payment",
      "plural": "Payments",
      "schemata": [
        "Value",
        "Interval",
        "Payment"
      ],
      "extends": [
        "Value",
        "Interval"
      ],
      "properties": {
        "sequenceNumber": {
          "name": "sequenceNumber",
          "qname": "Payment:sequenceNumber",
          "label": "Sequence number",
          "type": "string"
        },
        "transactionNumber": {
          "name": "transactionNumber",
          "qname": "Payment:transactionNumber",
          "label": "Transaction number",
          "type": "string"
        },
        "purpose": {
          "name": "purpose",
          "qname": "Payment:purpose",
          "label": "Payment purpose",
          "type": "text"
        },
        "programme": {
          "name": "programme",
          "qname": "Payment:programme",
          "label": "Payment programme",
          "type": "string",
          "description": "Programme name, funding code, category identifier, etc."
        },
        "payer": {
          "name": "payer",
          "qname": "Payment:payer",
          "label": "Payer",
          "type": "entity",
          "range": "LegalEntity",
          "reverse": "paymentPayer"
        },
        "payerAccount": {
          "name": "payerAccount",
          "qname": "Payment:payerAccount",
          "label": "Payer bank account",
          "type": "entity",
          "range": "BankAccount",
          "reverse": "paymentPayerAccount"
        },
        "beneficiary": {
          "name": "beneficiary",
          "qname": "Payment:beneficiary",
          "label": "Beneficiary",
          "type": "entity",
          "range": "LegalEntity",
          "reverse": "paymentBeneficiary"
        },
        "beneficiaryAccount": {
          "name": "beneficiaryAccount",
          "qname": "Payment:beneficiaryAccount",
          "label": "Beneficiary bank account",
          "type": "entity",
          "range": "BankAccount",
          "reverse": "paymentBeneficiaryAccount"
        }
      },
      "edge": {
        "source": "payer",
        "target": "beneficiary"
      },
      "featured": [
        "payer",
        "beneficiary",
        "amount",
        "purpose"
      ],
      "description": "A monetary payment between two parties."
    },
    "Organization": {
      "label": "Organization",
      "plural": "Organizations",
      "schemata": [
        "Organization",
        "LegalEntity",
        "Thing"
      ],
      "extends": [
        "LegalEntity"
      ],
      "properties": {
        "membershipOrganization": {
          "name": "membershipOrganization",
          "qname": "Organization:membershipOrganization",
          "label": "Members",
          "type": "entity",
          "stub": true,
          "range": "Membership",
          "reverse": "organization"
        },
        "directorshipOrganization": {
          "name": "directorshipOrganization",
          "qname": "Organization:directorshipOrganization",
          "label": "Directors",
          "type": "entity",
          "stub": true,
          "range": "Directorship",
          "reverse": "organization"
        }
      },
      "matchable": true
    },
    "Family": {
      "label": "Family",
      "plural": "Family",
      "schemata": [
        "Interval",
        "Family"
      ],
      "extends": [
        "Interval"
      ],
      "properties": {
        "person": {
          "name": "person",
          "qname": "Family:person",
          "label": "Person",
          "type": "entity",
          "description": "The subject of the familial relation.",
          "range": "Person",
          "reverse": "familyPerson"
        },
        "relative": {
          "name": "relative",
          "qname": "Family:relative",
          "label": "Relative",
          "type": "entity",
          "description": "The relative of the subject person.",
          "range": "Person",
          "reverse": "familyRelative"
        },
        "relationship": {
          "name": "relationship",
          "qname": "Family:relationship",
          "label": "Relationship",
          "type": "string",
          "description": "Nature of the relationship, from the person's perspective eg. 'mother', where 'relative' is mother of 'person'."
        }
      },
      "edge": {
        "source": "person",
        "target": "relative"
      },
      "featured": [
        "person",
        "relative",
        "relationship"
      ],
      "description": "Family relationship between two people"
    },
    "Interest": {
      "label": "Interest",
      "plural": "Interest",
      "schemata": [
        "Interval",
        "Interest"
      ],
      "extends": [
        "Interval"
      ],
      "properties": {
        "role": {
          "name": "role",
          "qname": "Interest:role",
          "label": "Role",
          "type": "string"
        },
        "status": {
          "name": "status",
          "qname": "Interest:status",
          "label": "Status",
          "type": "string"
        }
      },
      "featured": [
        "role",
        "startDate",
        "endDate"
      ],
      "abstract": true
    },
    "BankAccount": {
      "label": "Bank Account",
      "plural": "Bank Accounts",
      "schemata": [
        "BankAccount",
        "Value",
        "Asset",
        "Thing"
      ],
      "extends": [
        "Asset"
      ],
      "properties": {
        "bankName": {
          "name": "bankName",
          "qname": "BankAccount:bankName",
          "label": "Bank Name",
          "type": "string"
        },
        "accountNumber": {
          "name": "accountNumber",
          "qname": "BankAccount:accountNumber",
          "label": "Account Number",
          "type": "identifier"
        },
        "iban": {
          "name": "iban",
          "qname": "BankAccount:iban",
          "label": "IBAN",
          "type": "iban"
        },
        "bic": {
          "name": "bic",
          "qname": "BankAccount:bic",
          "label": "Bank Identifier Code",
          "type": "string"
        },
        "accountType": {
          "name": "accountType",
          "qname": "BankAccount:accountType",
          "label": "Account Type",
          "type": "string"
        },
        "balance": {
          "name": "balance",
          "qname": "BankAccount:balance",
          "label": "Balance",
          "type": "number"
        },
        "bankAddress": {
          "name": "bankAddress",
          "qname": "BankAccount:bankAddress",
          "label": "Bank Address",
          "type": "string"
        },
        "paymentPayerAccount": {
          "name": "paymentPayerAccount",
          "qname": "BankAccount:paymentPayerAccount",
          "label": "Payments made",
          "type": "entity",
          "stub": true,
          "range": "Payment",
          "reverse": "payerAccount"
        },
        "paymentBeneficiaryAccount": {
          "name": "paymentBeneficiaryAccount",
          "qname": "BankAccount:paymentBeneficiaryAccount",
          "label": "Payments received",
          "type": "entity",
          "stub": true,
          "range": "Payment",
          "reverse": "beneficiaryAccount"
        }
      },
      "featured": [
        "accountNumber",
        "bankName"
      ],
      "matchable": true
    },
    "Document": {
      "label": "File",
      "plural": "Files",
      "schemata": [
        "Document",
        "Thing"
      ],
      "extends": [
        "Thing"
      ],
      "properties": {
        "contentHash": {
          "name": "contentHash",
          "qname": "Document:contentHash",
          "label": "Checksum",
          "type": "checksum",
          "description": "SHA1 hash of the data"
        },
        "title": {
          "name": "title",
          "qname": "Document:title",
          "label": "Title",
          "type": "string"
        },
        "author": {
          "name": "author",
          "qname": "Document:author",
          "label": "Author",
          "type": "string",
          "description": "The original author, not the uploader"
        },
        "generator": {
          "name": "generator",
          "qname": "Document:generator",
          "label": "Generator",
          "type": "string",
          "description": "The program used to generate this file"
        },
        "crawler": {
          "name": "crawler",
          "qname": "Document:crawler",
          "label": "Crawler",
          "type": "string",
          "description": "The crawler used to acquire this file"
        },
        "fileSize": {
          "name": "fileSize",
          "qname": "Document:fileSize",
          "label": "File size",
          "type": "number"
        },
        "fileName": {
          "name": "fileName",
          "qname": "Document:fileName",
          "label": "File name",
          "type": "string"
        },
        "extension": {
          "name": "extension",
          "qname": "Document:extension",
          "label": "File extension",
          "type": "string"
        },
        "encoding": {
          "name": "encoding",
          "qname": "Document:encoding",
          "label": "File encoding",
          "type": "string"
        },
        "messageId": {
          "name": "messageId",
          "qname": "Document:messageId",
          "label": "Message ID",
          "type": "identifier",
          "description": "Message ID of a document; unique in most cases"
        },
        "mimeType": {
          "name": "mimeType",
          "qname": "Document:mimeType",
          "label": "MIME type",
          "type": "mimetype"
        },
        "language": {
          "name": "language",
          "qname": "Document:language",
          "label": "Language",
          "type": "language"
        },
        "date": {
          "name": "date",
          "qname": "Document:date",
          "label": "Date",
          "type": "date",
          "description": "If not otherwise specified"
        },
        "authoredAt": {
          "name": "authoredAt",
          "qname": "Document:authoredAt",
          "label": "Authored on",
          "type": "date"
        },
        "publishedAt": {
          "name": "publishedAt",
          "qname": "Document:publishedAt",
          "label": "Published on",
          "type": "date"
        },
        "parent": {
          "name": "parent",
          "qname": "Document:parent",
          "label": "Parent document",
          "type": "entity",
          "range": "Folder",
          "reverse": "children"
        },
        "ancestors": {
          "name": "ancestors",
          "qname": "Document:ancestors",
          "label": "Ancestors",
          "type": "entity",
          "hidden": true,
          "range": "Folder",
          "reverse": "descendants"
        },
        "namesMentioned": {
          "name": "namesMentioned",
          "qname": "Document:namesMentioned",
          "label": "Mentioned names",
          "type": "name",
          "hidden": true
        },
        "ibanMentioned": {
          "name": "ibanMentioned",
          "qname": "Document:ibanMentioned",
          "label": "IBANs",
          "type": "iban",
          "hidden": true
        },
        "ipMentioned": {
          "name": "ipMentioned",
          "qname": "Document:ipMentioned",
          "label": "IP addresses",
          "type": "ip",
          "hidden": true
        },
        "locationMentioned": {
          "name": "locationMentioned",
          "qname": "Document:locationMentioned",
          "label": "Locations",
          "type": "address",
          "hidden": true
        },
        "phoneMentioned": {
          "name": "phoneMentioned",
          "qname": "Document:phoneMentioned",
          "label": "Phone numbers",
          "type": "phone",
          "hidden": true
        },
        "emailMentioned": {
          "name": "emailMentioned",
          "qname": "Document:emailMentioned",
          "label": "E-Mail addresses",
          "type": "email",
          "hidden": true
        }
      }
    },
    "PlainText": {
      "label": "Text file",
      "plural": "Text files",
      "schemata": [
        "Document",
        "PlainText",
        "Thing"
      ],
      "extends": [
        "Document"
      ],
      "properties": {
        "bodyText": {
          "name": "bodyText",
          "qname": "PlainText:bodyText",
          "label": "Text",
          "type": "text",
          "hidden": true
        }
      }
    },
    "Pages": {
      "label": "Document",
      "plural": "Documents",
      "schemata": [
        "Thing",
        "Document",
        "Pages"
      ],
      "extends": [
        "Document"
      ],
      "properties": {
        "pdfHash": {
          "name": "pdfHash",
          "qname": "Pages:pdfHash",
          "label": "PDF alternative version checksum",
          "type": "checksum",
          "hidden": true
        },
        "pages": {
          "name": "pages",
          "qname": "Pages:pages",
          "label": "Pages",
          "type": "entity",
          "stub": true,
          "range": "Page",
          "reverse": "document"
        }
      }
    },
    "Folder": {
      "label": "Folder",
      "plural": "Folders",
      "schemata": [
        "Folder",
        "Document",
        "Thing"
      ],
      "extends": [
        "Document"
      ],
      "properties": {
        "children": {
          "name": "children",
          "qname": "Folder:children",
          "label": "Child documents",
          "type": "entity",
          "stub": true,
          "range": "Document",
          "reverse": "parent"
        },
        "descendants": {
          "name": "descendants",
          "qname": "Folder:descendants",
          "label": "Descendant documents",
          "type": "entity",
          "stub": true,
          "hidden": true,
          "range": "Document",
          "reverse": "ancestors"
        }
      }
    },
    "Package": {
      "label": "Package",
      "plural": "Packages",
      "schemata": [
        "Thing",
        "Folder",
        "Document",
        "Package"
      ],
      "extends": [
        "Folder"
      ],
      "properties": {}
    },
    "Workbook": {
      "label": "Workbook",
      "plural": "Workbooks",
      "schemata": [
        "Thing",
        "Folder",
        "Document",
        "Workbook"
      ],
      "extends": [
        "Folder"
      ],
      "properties": {}
    },
    "Image": {
      "label": "Image",
      "plural": "Images",
      "schemata": [
        "Document",
        "Image",
        "Thing"
      ],
      "extends": [
        "Document"
      ],
      "properties": {
        "bodyText": {
          "name": "bodyText",
          "qname": "Image:bodyText",
          "label": "Text",
          "type": "text",
          "hidden": true
        }
      }
    },
    "Video": {
      "label": "Video",
      "plural": "Videos",
      "schemata": [
        "Thing",
        "Document",
        "Video"
      ],
      "extends": [
        "Document"
      ],
      "properties": {}
    },
    "Audio": {
      "label": "Audio",
      "plural": "Audio files",
      "schemata": [
        "Document",
        "Audio",
        "Thing"
      ],
      "extends": [
        "Document"
      ],
      "properties": {}
    },
    "HyperText": {
      "label": "Web page",
      "plural": "Web pages",
      "schemata": [
        "HyperText",
        "Document",
        "Thing"
      ],
      "extends": [
        "Document"
      ],
      "properties": {
        "bodyText": {
          "name": "bodyText",
          "qname": "HyperText:bodyText",
          "label": "Text",
          "type": "text",
          "hidden": true
        },
        "bodyHtml": {
          "name": "bodyHtml",
          "qname": "HyperText:bodyHtml",
          "label": "HTML",
          "type": "text",
          "hidden": true
        }
      }
    },
    "Email": {
      "label": "E-Mail",
      "plural": "E-Mails",
      "schemata": [
        "Folder",
        "Thing",
        "HyperText",
        "PlainText",
        "Email",
        "Document"
      ],
      "extends": [
        "Folder",
        "PlainText",
        "HyperText"
      ],
      "properties": {
        "inReplyTo": {
          "name": "inReplyTo",
          "qname": "Email:inReplyTo",
          "label": "In Reply To",
          "type": "identifier",
          "description": "Message IDs of the preceding emails in the thread"
        },
        "headers": {
          "name": "headers",
          "qname": "Email:headers",
          "label": "Raw headers",
          "type": "raw",
          "hidden": true
        }
      }
    },
    "Table": {
      "label": "Table",
      "plural": "Tables",
      "schemata": [
        "Document",
        "Table",
        "Thing"
      ],
      "extends": [
        "Document"
      ],
      "properties": {
        "columns": {
          "name": "columns",
          "qname": "Table:columns",
          "label": "Column headings",
          "type": "raw",
          "hidden": true
        },
        "rows": {
          "name": "rows",
          "qname": "Table:rows",
          "label": "Rows",
          "type": "entity",
          "stub": true,
          "range": "Row",
          "reverse": "table"
        }
      }
    },
    "Asset": {
      "label": "Asset",
      "plural": "Assets",
      "schemata": [
        "Value",
        "Asset",
        "Thing"
      ],
      "extends": [
        "Value",
        "Thing"
      ],
      "properties": {
        "ownershipAsset": {
          "name": "ownershipAsset",
          "qname": "Asset:ownershipAsset",
          "label": "Owners",
          "type": "entity",
          "stub": true,
          "range": "Ownership",
          "reverse": "asset"
        }
      }
    },
    "Contract": {
      "label": "Contract",
      "plural": "Contracts",
      "schemata": [
        "Contract",
        "Value",
        "Asset",
        "Thing"
      ],
      "extends": [
        "Asset"
      ],
      "properties": {
        "authority": {
          "name": "authority",
          "qname": "Contract:authority",
          "label": "Contract authority",
          "type": "entity",
          "range": "LegalEntity",
          "reverse": "contractAuthority"
        },
        "type": {
          "name": "type",
          "qname": "Contract:type",
          "label": "Type",
          "type": "string",
          "description": "Type of contract. Potentially W (Works), U (Supplies), S (Services).\n"
        },
        "contractDate": {
          "name": "contractDate",
          "qname": "Contract:contractDate",
          "label": "Contract date",
          "type": "date"
        },
        "procedureNumber": {
          "name": "procedureNumber",
          "qname": "Contract:procedureNumber",
          "label": "Procedure number",
          "type": "string"
        },
        "noticeId": {
          "name": "noticeId",
          "qname": "Contract:noticeId",
          "label": "Contract Award Notice ID",
          "type": "string"
        },
        "numberAwards": {
          "name": "numberAwards",
          "qname": "Contract:numberAwards",
          "label": "Number of awards",
          "type": "string"
        },
        "cancelled": {
          "name": "cancelled",
          "qname": "Contract:cancelled",
          "label": "Cancelled?",
          "type": "string"
        },
        "awards": {
          "name": "awards",
          "qname": "Contract:awards",
          "label": "Lots awarded",
          "type": "entity",
          "stub": true,
          "range": "ContractAward",
          "reverse": "contract"
        },
        "economicActivityContract": {
          "name": "economicActivityContract",
          "qname": "Contract:economicActivityContract",
          "label": "Used in customs",
          "type": "entity",
          "stub": true,
          "range": "EconomicActivity",
          "reverse": "contract"
        }
      },
      "featured": [
        "name",
        "amount",
        "authority",
        "contractDate"
      ],
      "description": "An contract or contract lot issued by an authority. Multiple lots may be awarded to different suppliers (see ContractAward).\n"
    },
    "Airplane": {
      "label": "Airplane",
      "plural": "Airplanes",
      "schemata": [
        "Value",
        "Thing",
        "Vehicle",
        "Airplane",
        "Asset"
      ],
      "extends": [
        "Vehicle"
      ],
      "properties": {
        "serialNumber": {
          "name": "serialNumber",
          "qname": "Airplane:serialNumber",
          "label": "Serial Number",
          "type": "identifier"
        },
        "icaoCode": {
          "name": "icaoCode",
          "qname": "Airplane:icaoCode",
          "label": "ICAO aircraft type designator",
          "type": "string"
        },
        "manufacturer": {
          "name": "manufacturer",
          "qname": "Airplane:manufacturer",
          "label": "Manufacturer",
          "type": "string"
        }
      },
      "featured": [
        "type",
        "registrationNumber",
        "country",
        "operator",
        "owner"
      ],
      "matchable": true
    },
    "CourtCaseParty": {
      "label": "Party",
      "plural": "Party",
      "schemata": [
        "Interest",
        "CourtCaseParty",
        "Interval"
      ],
      "extends": [
        "Interest"
      ],
      "properties": {
        "party": {
          "name": "party",
          "qname": "CourtCaseParty:party",
          "label": "Party",
          "type": "entity",
          "range": "Thing",
          "reverse": "courtCase"
        },
        "case": {
          "name": "case",
          "qname": "CourtCaseParty:case",
          "label": "Case",
          "type": "entity",
          "range": "CourtCase",
          "reverse": "parties"
        }
      },
      "edge": {
        "source": "party",
        "target": "case"
      },
      "featured": [
        "party",
        "case",
        "role"
      ]
    },
    "UnknownLink": {
      "label": "Link",
      "plural": "Links",
      "schemata": [
        "Interest",
        "UnknownLink",
        "Interval"
      ],
      "extends": [
        "Interest"
      ],
      "properties": {
        "subject": {
          "name": "subject",
          "qname": "UnknownLink:subject",
          "label": "Subject",
          "type": "entity",
          "range": "Thing",
          "reverse": "unknownLinkTo"
        },
        "object": {
          "name": "object",
          "qname": "UnknownLink:object",
          "label": "Object",
          "type": "entity",
          "range": "Thing",
          "reverse": "unknownLinkFrom"
        }
      },
      "edge": {
        "source": "subject",
        "target": "object"
      },
      "featured": [
        "subject",
        "object",
        "role"
      ]
    },
    "Interval": {
      "label": "Interval",
      "plural": "Interval",
      "schemata": [
        "Interval"
      ],
      "extends": [],
      "properties": {
        "startDate": {
          "name": "startDate",
          "qname": "Interval:startDate",
          "label": "Start date",
          "type": "date"
        },
        "endDate": {
          "name": "endDate",
          "qname": "Interval:endDate",
          "label": "End date",
          "type": "date"
        },
        "date": {
          "name": "date",
          "qname": "Interval:date",
          "label": "Date",
          "type": "date"
        },
        "summary": {
          "name": "summary",
          "qname": "Interval:summary",
          "label": "Summary",
          "type": "text"
        },
        "recordId": {
          "name": "recordId",
          "qname": "Interval:recordId",
          "label": "Record ID",
          "type": "string"
        },
        "sourceUrl": {
          "name": "sourceUrl",
          "qname": "Interval:sourceUrl",
          "label": "Source URL",
          "type": "url"
        },
        "publisher": {
          "name": "publisher",
          "qname": "Interval:publisher",
          "label": "Publishing source",
          "type": "string"
        },
        "publisherUrl": {
          "name": "publisherUrl",
          "qname": "Interval:publisherUrl",
          "label": "Publishing source URL",
          "type": "url"
        },
        "alephUrl": {
          "name": "alephUrl",
          "qname": "Interval:alephUrl",
          "label": "Aleph URL",
          "type": "url"
        },
        "indexText": {
          "name": "indexText",
          "qname": "Interval:indexText",
          "label": "Index text",
          "type": "text",
          "hidden": true
        },
        "modifiedAt": {
          "name": "modifiedAt",
          "qname": "Interval:modifiedAt",
          "label": "Modified on",
          "type": "date"
        },
        "retrievedAt": {
          "name": "retrievedAt",
          "qname": "Interval:retrievedAt",
          "label": "Retrieved on",
          "type": "date"
        }
      },
      "featured": [
        "startDate",
        "endDate"
      ],
      "abstract": true
    },
    "RealEstate": {
      "label": "Real estate",
      "plural": "Real estates",
      "schemata": [
        "Value",
        "RealEstate",
        "Asset",
        "Thing"
      ],
      "extends": [
        "Asset"
      ],
      "properties": {
        "latitude": {
          "name": "latitude",
          "qname": "RealEstate:latitude",
          "label": "Latitude",
          "type": "number"
        },
        "longitude": {
          "name": "longitude",
          "qname": "RealEstate:longitude",
          "label": "Longitude",
          "type": "number"
        },
        "censusBlock": {
          "name": "censusBlock",
          "qname": "RealEstate:censusBlock",
          "label": "Census block",
          "type": "string"
        },
        "cadastralCode": {
          "name": "cadastralCode",
          "qname": "RealEstate:cadastralCode",
          "label": "Cadastral code",
          "type": "identifier"
        },
        "area": {
          "name": "area",
          "qname": "RealEstate:area",
          "label": "Area",
          "type": "number"
        },
        "registrationNumber": {
          "name": "registrationNumber",
          "qname": "RealEstate:registrationNumber",
          "label": "Registration number",
          "type": "identifier"
        },
        "titleNumber": {
          "name": "titleNumber",
          "qname": "RealEstate:titleNumber",
          "label": "Title number",
          "type": "identifier"
        },
        "tenure": {
          "name": "tenure",
          "qname": "RealEstate:tenure",
          "label": "Tenure",
          "type": "string"
        },
        "encumbrance": {
          "name": "encumbrance",
          "qname": "RealEstate:encumbrance",
          "label": "Encumbrance",
          "type": "string",
          "description": "An encumbrance is a right to, interest in, or legal liability on real property that does not prohibit passing title to the property but that diminishes its value.\n"
        },
        "propertyType": {
          "name": "propertyType",
          "qname": "RealEstate:propertyType",
          "label": "Property type",
          "type": "string"
        },
        "landType": {
          "name": "landType",
          "qname": "RealEstate:landType",
          "label": "Land type",
          "type": "string"
        },
        "createDate": {
          "name": "createDate",
          "qname": "RealEstate:createDate",
          "label": "Record date",
          "type": "date"
        }
      },
      "featured": [
        "registrationNumber",
        "address",
        "country"
      ],
      "description": "A piece of land or property."
    },
    "Land": {
      "label": "Land",
      "plural": "Lands",
      "schemata": [
        "Value",
        "Thing",
        "Land",
        "RealEstate",
        "Asset"
      ],
      "extends": [
        "RealEstate"
      ],
      "properties": {},
      "featured": [
        "registrationNumber"
      ]
    },
    "EconomicActivity": {
      "label": "Economic Activity",
      "plural": "Economic Activities",
      "schemata": [
        "EconomicActivity",
        "Interval"
      ],
      "extends": [
        "Interval"
      ],
      "properties": {
        "contract": {
          "name": "contract",
          "qname": "EconomicActivity:contract",
          "label": "Associated contract",
          "type": "entity",
          "range": "Contract",
          "reverse": "economicActivityContract"
        },
        "ccdNumber": {
          "name": "ccdNumber",
          "qname": "EconomicActivity:ccdNumber",
          "label": "Customs Cargo Declaration Number",
          "type": "identifier"
        },
        "ccdValue": {
          "name": "ccdValue",
          "qname": "EconomicActivity:ccdValue",
          "label": "CCD Value",
          "type": "string",
          "description": "Declaration Value"
        },
        "directionOfTransportation": {
          "name": "directionOfTransportation",
          "qname": "EconomicActivity:directionOfTransportation",
          "label": "Direction of transportation",
          "type": "string",
          "description": "Direction of transportation (import/export)"
        },
        "customsProcedure": {
          "name": "customsProcedure",
          "qname": "EconomicActivity:customsProcedure",
          "label": "Customs Procedure",
          "type": "string",
          "description": "Customs Procedure \u2014 type of customs clearance"
        },
        "vedCode": {
          "name": "vedCode",
          "qname": "EconomicActivity:vedCode",
          "label": "FEAC Code",
          "type": "identifier",
          "description": "(\u041a\u043e\u0434 \u0422\u041d \u0412\u042d\u0414) Foreign Economic Activity Commodity Code"
        },
        "vedCodeDescription": {
          "name": "vedCodeDescription",
          "qname": "EconomicActivity:vedCodeDescription",
          "label": "FEAC Code description",
          "type": "string",
          "description": "(\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u043a\u043e\u0434\u0430 \u0422\u041d \u0412\u042d\u0414) Foreign Economic Activity Commodity Code description"
        },
        "goodsDescription": {
          "name": "goodsDescription",
          "qname": "EconomicActivity:goodsDescription",
          "label": "Description",
          "type": "text",
          "description": "Description of goods"
        },
        "declarant": {
          "name": "declarant",
          "qname": "EconomicActivity:declarant",
          "label": "Declarant",
          "type": "entity",
          "description": "Customs declarant",
          "range": "LegalEntity",
          "reverse": "economicActivityDeclarant"
        },
        "sender": {
          "name": "sender",
          "qname": "EconomicActivity:sender",
          "label": "Sender",
          "type": "entity",
          "description": "Origin of the goods",
          "range": "LegalEntity",
          "reverse": "economicActivitySender"
        },
        "receiver": {
          "name": "receiver",
          "qname": "EconomicActivity:receiver",
          "label": "Receiver",
          "type": "entity",
          "description": "Destination of the goods",
          "range": "LegalEntity",
          "reverse": "economicActivityReceiver"
        },
        "contractHolder": {
          "name": "contractHolder",
          "qname": "EconomicActivity:contractHolder",
          "label": "Contract holder",
          "type": "entity",
          "description": "Customs formalities caretaker",
          "range": "LegalEntity",
          "reverse": "economicActivityHolder"
        },
        "invoiceAmount": {
          "name": "invoiceAmount",
          "qname": "EconomicActivity:invoiceAmount",
          "label": "Invoice Value Amount",
          "type": "string",
          "description": "Invoice Value of goods"
        },
        "customsAmount": {
          "name": "customsAmount",
          "qname": "EconomicActivity:customsAmount",
          "label": "Customs Value Amount",
          "type": "string",
          "description": "Customs Value of goods"
        },
        "dollarExchRate": {
          "name": "dollarExchRate",
          "qname": "EconomicActivity:dollarExchRate",
          "label": "USD Exchange Rate",
          "type": "string",
          "description": "USD Exchange Rate for the activity"
        },
        "tradingCountry": {
          "name": "tradingCountry",
          "qname": "EconomicActivity:tradingCountry",
          "label": "Trading Country",
          "type": "country",
          "description": "Trading Country of the company which transports the goods via Russian border"
        },
        "departureCountry": {
          "name": "departureCountry",
          "qname": "EconomicActivity:departureCountry",
          "label": "Country of departure",
          "type": "country",
          "description": "Country out of which the goods are transported"
        },
        "destinationCountry": {
          "name": "destinationCountry",
          "qname": "EconomicActivity:destinationCountry",
          "label": "Country of destination",
          "type": "country",
          "description": "Final destination for the goods"
        },
        "originCountry": {
          "name": "originCountry",
          "qname": "EconomicActivity:originCountry",
          "label": "Country of origin",
          "type": "country",
          "description": "Country of origin of goods"
        },
        "bankAccount": {
          "name": "bankAccount",
          "qname": "EconomicActivity:bankAccount",
          "label": "Bank Account",
          "type": "entity",
          "description": "Bank account of the contract",
          "range": "BankAccount"
        },
        "bankRub": {
          "name": "bankRub",
          "qname": "EconomicActivity:bankRub",
          "label": "Rouble bank",
          "type": "entity",
          "description": "Bank account for payments in roubles",
          "range": "BankAccount"
        },
        "bankForeign": {
          "name": "bankForeign",
          "qname": "EconomicActivity:bankForeign",
          "label": "Foreign currency bank",
          "type": "entity",
          "description": "Bank account for payments in foreign currency",
          "range": "BankAccount"
        },
        "transport": {
          "name": "transport",
          "qname": "EconomicActivity:transport",
          "label": "Transport",
          "type": "entity",
          "description": "Means of transportation",
          "range": "Vehicle"
        }
      },
      "featured": [
        "sender",
        "receiver",
        "contract",
        "goodsDescription",
        "startDate",
        "endDate"
      ],
      "description": "An economic activity"
    }
  },
  "types": {
    "address": {
      "label": "Address",
      "plural": "Addresses",
      "group": "addresses",
      "matchable": true
    },
    "checksum": {
      "label": "Checksum",
      "plural": "Checksums",
      "group": "checksums",
      "matchable": true
    },
    "country": {
      "label": "Country",
      "plural": "Countries",
      "group": "countries",
      "matchable": true
    },
    "date": {
      "label": "Date",
      "plural": "Dates",
      "group": "dates",
      "matchable": true
    },
    "domain": {
      "label": "Domain",
      "plural": "Domains",
      "matchable": true
    },
    "email": {
      "label": "E-Mail Address",
      "plural": "E-Mail Addresses",
      "group": "emails",
      "matchable": true
    },
    "entity": {
      "label": "Entity",
      "plural": "Entities",
      "group": "entities",
      "matchable": true
    },
    "iban": {
      "label": "IBAN",
      "plural": "IBANs",
      "group": "ibans",
      "matchable": true
    },
    "identifier": {
      "label": "Identifier",
      "plural": "Identifiers",
      "group": "identifiers",
      "matchable": true
    },
    "ip": {
      "label": "IP-Address",
      "plural": "IP-Addresses",
      "group": "ips",
      "matchable": true
    },
    "raw": {
      "label": "Nested data",
      "plural": null
    },
    "language": {
      "label": "Language",
      "plural": "Languages",
      "group": "languages"
    },
    "mimetype": {
      "label": "MIME-Type",
      "plural": "MIME-Types",
      "group": "mimetypes"
    },
    "name": {
      "label": "Name",
      "plural": "Names",
      "group": "names",
      "matchable": true
    },
    "number": {
      "label": "Number",
      "plural": "Numbers"
    },
    "phone": {
      "label": "Phone number",
      "plural": "Phone numbers",
      "group": "phones",
      "matchable": true
    },
    "string": {
      "label": "Label",
      "plural": "Labels"
    },
    "text": {
      "label": "Text",
      "plural": null
    },
    "url": {
      "label": "URL",
      "plural": "URLs",
      "group": "urls",
      "matchable": true
    }
  }
}
