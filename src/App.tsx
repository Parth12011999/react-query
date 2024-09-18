import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import DataFetcherUsingReactQuery from "./components/DataFetcherUsingReactQuery";
import MutationExample from "./components/MutationExample";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Disable refetching on window focus
      refetchOnMount: false, // Disable refetching on mount
      refetchOnReconnect: false, // Disable refetching on reconnect
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1>Data Fetching with React Query</h1>
        <MutationExample />
        <DataFetcherUsingReactQuery />
      </div>
    </QueryClientProvider>
  );
};

export default App;
