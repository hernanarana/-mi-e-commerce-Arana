import { collection, getDocs, getDoc, doc, addDoc, query, where, writeBatch } from 'firebase/firestore';
import { db } from '../firebaseConfig';


export async function getProducts() {
  const col = collection(db, 'productos');
  const snap = await getDocs(col);
  const rows = snap.docs.map(d => {
    const data = d.data();
    return {
      id: data.id ?? d.id,    
      docId: d.id,            
      ...data
    };
  });
  console.log('[api.getProducts] rows:', rows); 
  return rows;                                   
}


export async function getProducto(id) {
  const q = query(collection(db, 'productos'), where('id', '==', Number(id)));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  const data = d.data();
  return { id: data.id ?? d.id, docId: d.id, ...data };
}

 
export async function createOrder(order) {
  const ref = await addDoc(collection(db, 'orders'), order);
  return ref.id;
}


export async function createOrderAndDecrement(order) {
  const batch = writeBatch(db);
  for (const it of order.items) {
    let ref = it.docId
      ? doc(collection(db, 'productos'), it.docId)
      : null;

    if (!ref && it.id != null) {
      const q = query(collection(db, 'productos'), where('id', '==', Number(it.id)));
      const s = await getDocs(q);
      if (!s.empty) ref = doc(collection(db, 'productos'), s.docs[0].id);
    }
    if (!ref) continue;

    const snap = await getDoc(ref);
    if (!snap.exists()) continue;

    const current = Number(snap.data().stock ?? 0);
    const qty = Number(it.quantity ?? 1);
    const next = Math.max(current - qty, 0);
    batch.update(ref, { stock: next });
  }
  const orderRef = doc(collection(db, 'orders'));
  batch.set(orderRef, order);
  await batch.commit();
  return orderRef.id;
}
