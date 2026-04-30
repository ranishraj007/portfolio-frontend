import { QueryClient, QueryClientProvider } from "react-query";
import SEO from "./components/SEO";
import Home from "./pages/Home";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SEO />
      <Home />
    </QueryClientProvider>
  );
}

export default App;
