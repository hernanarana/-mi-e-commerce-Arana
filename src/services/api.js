
const productos = [
  {
    id: 1,
    nombre: 'Muñeca Annabelle',
    descripcion: 'Réplica de la muñeca',
    precio: 1800,
    category: 'terror',
    imagen: '/img/muneca-annabelle.jpg'    
  },
  {
    id: 2,
    nombre: 'Muñeco de Fredi',
    descripcion: 'Figura escalofriante de Fredi',
    precio: 1500,
    category: 'terror',
    imagen: '/img/muneco-de-fredi.jpg'     
  },
  // …
];



export function getProducts() {
  return new Promise(resolve =>
    setTimeout(() => resolve(productos), 300)
  );
}

export function getProductsByCategory(cat) {
  return new Promise(resolve =>
    setTimeout(() =>
      resolve(productos.filter(p => p.category === cat)), 300
    )
  );
}

export function getProductById(id) {
  return new Promise(resolve =>
    setTimeout(() =>
      resolve(productos.find(p => p.id === Number(id))), 300
    )
  );
}


export async function getProductos() {
  const resp = await fetch('/productos.json'); 
  if (!resp.ok) throw new Error('Error al cargar productos');
  const productos = await resp.json();
  return productos;
}


export async function getProductosPorCategoria(categoriaId) {
  const productos = await getProductos();


  return productos;
} 


export async function getProducto(id) {
  const productos = await getProductos();
  const pid = typeof id === 'string' ? parseInt(id, 10) : id;
  const prod = productos.find(p => p.id === pid);
  if (!prod) throw new Error(`Producto con id ${id} no encontrado`);
  return prod;
}

