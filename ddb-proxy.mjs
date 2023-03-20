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

export const addUpdateCustomer = async (item) => {
    try {
        const params = {
            TableName: 'Customer',
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
            TableName: 'Customer',
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
            TableName: 'Customer',
            Key: { "customerId" : customerId}
        };
        await ddbClient.send(new DeleteCommand(params))
        return "ok"
    }
    catch(err) {
        console.log(err.stack)
    }
}

