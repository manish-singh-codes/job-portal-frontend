import { Button } from "@/components/ui/button"
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import axiosInstance from "../../utils/axios/axiosInstance";
import { useRef } from "react";


const Google = () => {
    const googleRef = useRef(null);
    const handleSuccess = async (credentialResponse) => {
          const id_token = credentialResponse.credential;
          console.log("ID Token:", id_token);
            try {
        const response = axiosInstance.post('/api/user/google/register', {
          id_token
        })
        console.log("response", response)
      } catch (error) {
       console.log(error) 
      }
    }
    const handleError = (error) => {
      console.error("Google Login Error:", error);
    }

    // const handleGoogleLogin = useGoogleLogin({
    //     onSuccess: async credentialResponse => {
    //         const {id_token} = credentialResponse.access_token;
    //         console.log("ID Token:", id_token);
    //         // try {
    //         //     const response = await axiosInstance.post('/api/user/google/register', {
    //         //         id_token
    //         //     });
    //         //     console.log("response", response);
    //         // } catch (error) {
    //         //     console.error("Error during Google login:", error);
    //         // }
    //     },
    //     onError: (error) => {
    //         console.error("Google Login Error:", error);
    //     },
    //     flow: "implicit"
    // });

  return (
    <div>
           {/* <Button
                  type="button"
                  variant="outline"
                  className="w-full border-slate-200 hover:bg-slate-50 text-slate-700 font-medium py-6 rounded-lg text-base"
                  onClick={handleGoogleLogin}
                >
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    className="h-5 w-5 mr-2 inline-block"/>
                  Continue with Google
                </Button>  */}
      
          <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
      
    </div>

  )
}

export default Google