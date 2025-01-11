import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";  // Import QueryClient and QueryClientProvider
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ToDoPage from "./pages/ToDoPage";
import WeatherPage from "./pages/WeatherPage";
import ProfilePage from "./pages/ProfilePage";

// Create a new QueryClient instance
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}> {/* Wrap your entire app with QueryClientProvider */}
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/todo" element={<ToDoPage />} />
            <Route path="/weather" element={<WeatherPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
