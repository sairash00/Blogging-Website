import axios from 'axios';

const isLoggedIn = async (navigate) => {
  try {
    const response = await axios.get(import.meta.env.VITE_ISLOGGEDIN);
    const info = response.data;
    if (!info.loggedIn) {
     navigate("/login");
    }
    return info;
  } catch (error) {
    if(axios.isAxiosError(error)){
        navigate("/login")
        return error.response.data
    }else{
        navigate("/login")
        return "An unexpected error occurred"
    }
  }
};

export default isLoggedIn;
