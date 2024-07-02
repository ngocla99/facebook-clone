import React from "react"

import { ChangePassword } from "./change-password"
import { FindUser } from "./find-user"
import { ResetMethods } from "./reset-methods"
import { SecurityCode } from "./security-code"

export const ForgotPassword = () => {
  const [data, setData] = React.useState()
  const [currentStepIdx, setCurrentStepIdx] = React.useState(0)

  const goNext = (dataFromStep) => {
    setData({ ...data, ...dataFromStep })
    setCurrentStepIdx((prev) => prev + 1)
  }

  const goBack = () => {
    setCurrentStepIdx((prev) => prev - 1)
  }

  return (
    <div className="grid place-items-center bg-background-secondary px-10 pb-28 pt-[72px]">
      <ControlledSteps
        currentIdx={currentStepIdx}
        onNext={goNext}
        onBack={goBack}
      >
        <FindUser />
        <ResetMethods data={data} />
        <SecurityCode data={data} />
        <ChangePassword data={data} />
      </ControlledSteps>
    </div>
  )
}

const ControlledSteps = ({ children, currentIdx, onNext, onBack }) => {
  const currentChild = React.Children.toArray(children)[currentIdx]

  const goNext = (dataFromStep) => {
    onNext(dataFromStep)
  }

  const goBack = () => {
    onBack()
  }

  if (React.isValidElement(currentChild)) {
    return React.cloneElement(currentChild, { goNext, goBack })
  }

  return currentChild
}
