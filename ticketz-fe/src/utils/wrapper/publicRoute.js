import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "components/Loader";

// Define a higher-order component (HOC) for handling public routes
const publicRoute = (WrappedComponent) => {

  // Create a new component called Auth, which will be returned by the HOC
  const Auth = (props) => {
    // Access user authentication data from the Redux store
    const authData = useSelector((state) => state.auth.data);

    // Access the Next.js router for navigation
    const router = useRouter();

    // Check if the user is authenticated
    useEffect(() => {
      // If the user is authenticated, redirect to the home page
      if (authData.token) {
        router.push("/");
      }
    }, [authData.token, router]);

    // If the user is not authenticated, render the original component
    if (!authData.token) {
      return <WrappedComponent {...props} />;
    }

    // If the user is authenticated, display a loading indicator
    return <Loader />;
  };

  // Return the Auth component as the result of the HOC
  return Auth;
};

// Export the publicRoute HOC as the default export
export default publicRoute;
