import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { queryClientOption } from "./queryClientOptions";

interface Props {
  children?: React.ReactNode;
}
export default function ReactQueryClient({ children }: Props) {
  const queryClient = new QueryClient(queryClientOption);
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
