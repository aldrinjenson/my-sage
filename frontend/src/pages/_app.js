// import ProtectedRoute from "../components/protectedRoute";
import "@/components/styles/globals.css";
import ProtectedRoute from "../components/protectedRoute";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ProtectedRoute>
      <Component {...pageProps} />
    </ProtectedRoute>
  );
};

export default MyApp;
