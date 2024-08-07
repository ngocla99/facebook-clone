export const FriendsLayout = ({ children }) => {
  const [left, right] = children
  return (
    <div className="flex min-h-[calc(100vh-56px)]">
      <div className="relative w-[360px] bg-background">
        {left}
        <div
          className="pointer-events-none absolute -right-1.5 bottom-0 top-0 w-[7px] bg-[length:7px_1px] bg-repeat-y"
          style={{
            backgroundImage: `url(
              data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAACBAMAAACapPCZAAAAFVBMVEUAAAAAAAAAAAAAAAAAAAAAAAD29va1cB7UAAAAB3RSTlMCCwQHGBAaZf6MKAAAABJJREFUCNdjSHMVNFZiYGCA0gAUdgIjNiRPgQAAAABJRU5ErkJggg==
            )`,
          }}
        ></div>
      </div>
      <div className="flex-1">{right}</div>
    </div>
  )
}
