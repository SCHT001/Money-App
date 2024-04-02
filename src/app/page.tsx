import AllTransactions from "@/components/pageComponents/allTransactions";
import { QueryClient, QueryClientProvider } from "react-query";
const Home = (props: any) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <props.Component {...props.pageProps} />
      <AllTransactions></AllTransactions>
    </QueryClientProvider>
  );
};

export default Home;
