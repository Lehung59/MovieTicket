import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "components/Loader";

// Define a higher-order component (HOC) for handling private routes
const privateRoute = (WrappedComponent) => {
  // Create a new component called Auth, which will be returned by the HOC
  const Auth = (props) => {
    // Access user authentication data (token) from the Redux store
    const userToken = useSelector((state) => state.auth.data.token);

    // Access the Next.js router for navigation
    const router = useRouter();

    // Effect to check if the user is authenticated on mount
    useEffect(() => {
      // If the user is not authenticated, redirect to the login page
      if (!userToken) {
        router.push("/login");
      }
    }, [userToken, router]);

    // If the user is authenticated, render the original component
    if (userToken) {
      return <WrappedComponent {...props} />;
    }

    // If the user is not authenticated, display a loading indicator
    return <Loader />;
  };

  // Return the Auth component as the result of the HOC
  return Auth;
};

// Export the privateRoute HOC as the default export
export default privateRoute;
