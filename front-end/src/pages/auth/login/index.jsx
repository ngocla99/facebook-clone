import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useSignUpModal } from "@/components/modal/signup-modal"

import { LoginForm } from "./login-form"

const Login = () => {
  const { setShowSignUpModal, SignUpModal } = useSignUpModal()

  return (
    <>
      <div className="bg-background-secondary px-10 pb-28 pt-[72px]">
        <div className="mx-10 flex w-auto flex-col items-center justify-between gap-8 py-5 lg:mx-auto lg:w-[980px] lg:flex-row lg:items-start">
          <div className="text-center lg:text-left">
            <div className="flex justify-center p-0 pb-5 lg:block lg:pb-4 lg:pt-28">
              <img
                src="../../icons/facebook.svg"
                className="m-[-28px] h-[106px]"
                alt="Facebook"
              />
            </div>
            <h2 className="w-[400px] text-2xl leading-7 lg:w-[500px] lg:text-[28px]">
              Facebook helps you connect and share with the people in your life.
            </h2>
          </div>
          <div className="">
            <Card className="mt-10 w-[396px] border-none shadow-xl">
              <CardContent className="p-4 pb-0">
                <LoginForm />
                <div className="mt-4 text-center">
                  <Link
                    className="text-sm font-medium text-primary hover:underline hover:underline-offset-2"
                    to="/forgot-password"
                  >
                    Forgotten password?
                  </Link>
                </div>
                <Separator className="mb-4 mt-5" />
              </CardContent>
              <CardFooter className="flex justify-center px-0 pt-[6px]">
                <Button
                  size="lg"
                  className="bg-[#42b72a] text-[17px] font-bold hover:bg-[#36a420]"
                  onClick={() => setShowSignUpModal(true)}
                >
                  Create new account
                </Button>
              </CardFooter>
            </Card>
            <div className="mt-7 text-center text-sm">
              <Link
                className="font-semibold hover:underline hover:underline-offset-1"
                to=""
              >
                Create a Page
              </Link>{" "}
              for a celebrity, brand or business.
            </div>
          </div>
        </div>
      </div>

      <SignUpModal />
    </>
  )
}

export default Login
