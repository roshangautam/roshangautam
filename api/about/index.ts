import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import data = require("./data.json")
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.res = {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        },
        body: data
    };
};

export default httpTrigger;
