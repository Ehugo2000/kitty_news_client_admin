import JtockAuth from "j-tockauth";

const auth = new JtockAuth({
  host: "http://localhost:3000",
  prefixUrl: "/api",
});

const performAuthentication = async (event, dispatch) => {
  try {
    debugger
    event.preventDefault();
    let response = await auth.signIn(
      event.target.email.value,
      event.target.password.value
    );
    if (response.data.role === "journalist") {
      dispatch({
        type: "SET_CURRENT_USER",
        payload: response.data,
      });
    } else {
      dispatch({
        type: "SET_ERROR_MESSAGE",
        payload: "You are not authorized to be here",
      });
      localStorage.removeItem("J-tockAuth-Storage");
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: "SET_ERROR_MESSAGE",
      payload: error.response.data.errors[0],
    });
  }
};
export { performAuthentication };
