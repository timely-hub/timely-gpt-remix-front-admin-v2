import { QueryClient } from "@tanstack/query-core";
import { queryClientOption } from "./queryClientOptions";
const getQueryClient = new QueryClient(queryClientOption);
export default getQueryClient;
