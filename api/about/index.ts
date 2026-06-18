import { AzureFunction, Context, HttpRequest } from "@azure/functions"
// Note: this function runs from `dist/` (see function.json), so load JSON from the source folder.
import data = require("../../about/data.json")
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
