export const List = ({ items, propName, className, Item }) => {
  return (
    <div className={className}>
      {items.map((item, i) => (
        <Item key={i} {...{ [propName]: item }} />
      ))}
    </div>
  )
}
