import { Fragment, MouseEvent, useState } from 'react';

interface Props {
  items: string[];
  heading: string
  onSelectItem: (attrs: string) => void
}

function ListGroup(props: Props) {
  const { items, heading, onSelectItem } = props
  // Hook
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const handleClick = (event: MouseEvent) => {
    console.log(event);
  };

  return (
    <>
      <h1>{heading}</h1>
      {items.length === 0 && <p>No items found</p>}
      <ul className="list-group ">
        {items.map((item, index) => (
          <li
            className={
              selectedIndex === index
                ? 'list-group-item active'
                : 'list-group-item class'
            }
            key={item}
            onClick={() => {
              setSelectedIndex(index)
              onSelectItem(item)
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
