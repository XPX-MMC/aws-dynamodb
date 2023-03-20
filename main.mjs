import { addUpdateCustomer, getCustomer, deleteCustomer, getCustomersForAge } from "./ddb-proxy.mjs";

const main = async () => {
    
    const customer = {
        customerId: 1,
        firstName: "Alice", 
        lastName: "Jones",
        age: 17, 
        zip: 14580
    }

    try {
        // ADD/UPDATE
        //await addUpdateCustomer(customer)
        
        // GET
        // const res = await getCustomer(1) // JS
        // console.log(res)

        const res = await getCustomersForAge(17) // PartiQL
        console.log(res)

        // DELETE
        // const res = await deleteCustomer(2)
        // console.log(res)
    } 
    catch (err) {
        console.log("Error", err.stack);
    }
}

main()
