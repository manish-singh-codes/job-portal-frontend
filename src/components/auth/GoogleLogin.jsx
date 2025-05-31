import { Button } from "@/components/ui/button"
import { useGoogleLogin } from "@react-oauth/google";

const Google = () => {
    const handleGoogleLogin =  useGoogleLogin({
    onSuccess: (credentialResponse) => {
      console.log("Google Login Success:", credentialResponse);
      },
    onError: (error) => {
      console.error("Google Login Error:", error);
    }
    })
  return (
    <div>
          <Button
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
                </Button> 
          {/* <GoogleLogin onSuccess={handleSuccess} onError={handleError} /> */}
    </div>

  )
}

export default Google