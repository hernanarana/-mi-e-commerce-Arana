export default function ItemDetail({ item }) {
  return (
    <div style={{ padding: '1rem' }}>
      <h2>{item.nombre}</h2>
      <img src={item.imagen} alt={item.nombre} width="300" />
      <p>{item.descripcion}</p>
      <p><strong>Precio:</strong> ${item.precio}</p>
      <p><strong>Categoría:</strong> {item.category}</p>
    </div>
  );
}
