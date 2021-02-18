import { useEffect, useMemo, useState } from 'react';
import { db } from 'services/firebase';

function useOrders() {
  const [orders, setOrders] = useState(null);

  const status = useMemo(() => ({
      pending: 'pending',
      inProgress: 'inProgress',
      outForDelivery: 'outForDelivery',
      delivered: 'delivered'
    }), []);

  useEffect(() => {
    db.collection('orders').get().then((querySnapshot) => {
      const docs = [];

      querySnapshot.forEach((doc) => {
        docs.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      const initialStatus = Object.keys(status).reduce((acc, status) => {
        acc[status] = [];
        return acc;
      }, {});

      setOrders(
        docs.reduce((acc, doc) => {
          const mainStatus = doc.status || status.pending;

          return {
            ...acc,
            [mainStatus]: acc[mainStatus].concat(doc)
          }
        }, initialStatus)
      );
    });
  }, []);

  return {
    orders,
    status
  };
}

export default useOrders;
