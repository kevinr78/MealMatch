import { RouterProvider } from "react-router-dom";
import { router } from "./router/routes";
import { ToastContainer, Slide } from "react-toastify";
import { UserAuthProvider } from "./pages/store/authContext";
function App() {
  return (
    <>
      <UserAuthProvider>
        <RouterProvider router={router} />
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Slide}
        />
      </UserAuthProvider>
    </>
  );
}

export default App;
