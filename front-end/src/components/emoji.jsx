import { useRive, useStateMachineInput } from "@rive-app/react-canvas"

const STATE_MACHINE_NAME = "controller"
const ON_HOVER_INPUT_NAME = "isHover"

export const Emoji = ({ icon, className, onClick, ...props }) => {
  const { rive, RiveComponent } = useRive({
    src: "src/assets/rive/emojis.riv",
    stateMachines: STATE_MACHINE_NAME,
    artboard: icon,
    autoplay: true,
  })

  const onHoverInput = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    ON_HOVER_INPUT_NAME
  )

  const onMouseEnter = () => {
    onHoverInput.value = true
  }

  const onMouseLeave = () => {
    onHoverInput.value = false
  }

  return (
    <div className={className}>
      <RiveComponent
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        {...props}
      />
    </div>
  )
}
