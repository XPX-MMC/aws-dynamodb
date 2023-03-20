//
// File: ddb-proxy.mjs
// Auth: Martin Burolla
// Date: 3/17/2023
// Desc: A wrapper for a DynamoDB table:
//       Customer partition key: customerId (Number)
//                sort key: none
//

import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { PutCommand, GetCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb"
const ddbClient = new DynamoDBClient({ region: "us-east-1" })
//
import { ExecuteStatementCommand, DynamoDBDocumentClient} from "@aws-sdk/lib-dynamodb"
const marshallOptions = {
    convertEmptyValues: false, 
    removeUndefinedValues: false, 
    convertClassInstanceToMap: false
}
const unmarshallOptions = {
    wrapNumbers: false
}
const translateConfig = { marshallOptions, unmarshallOptions }
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient, translateConfig)
//

const TABLE_NAME = 'Customer'

//
// JavaScript statements
//

export const addUpdateCustomer = async (item) => {
    try {
        const params = {
            TableName: TABLE_NAME,
            Item: item
        }
        const data = await ddbClient.send(new PutCommand(params));
        console.log("Success: Item added or updated:", data.$metadata.httpStatusCode)
    }
    catch(err) {
        console.log(err.stack);
    }
}

export const getCustomer = async (customerId) => {
    try {
        const params = {
            TableName: TABLE_NAME,
            Key: { "customerId" : customerId}
        }
        const data = await ddbClient.send(new GetCommand(params))
        return data.Item
    }
    catch(err) {
        console.log(err.stack)
    }
}

export const deleteCustomer = async (customerId) => {
    try {
        const params = {
            TableName: TABLE_NAME,
            Key: { "customerId" : customerId}
        };
        await ddbClient.send(new DeleteCommand(params))
        return "ok"
    }
    catch(err) {
        console.log(err.stack)
    }
}

//
// PartiQL
// 

export const getCustomersForAge = async (age) => {
    try {
        const params = {
            Statement: `select * from Customer where age = ${age}`
        }
        const data = await ddbDocClient.send(new ExecuteStatementCommand(params))
        return data.Items
    }
    catch(err) {
        console.log(err.stack)
    }
}
