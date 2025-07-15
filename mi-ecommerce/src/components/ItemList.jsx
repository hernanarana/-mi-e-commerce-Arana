import Item from './Item';

export default function ItemList({ items }) {
  return (
    <div className="item-list">
      {items.map(prod => (
        <Item key={prod.id} item={prod} />
      ))}
    </div>
  );
}
