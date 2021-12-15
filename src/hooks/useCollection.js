import { useEffect, useState } from "react";
import { collection, onSnapshot, doc, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const useCollection = (c, id = null) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id === null) {
      setIsPending(true);
      const collectionRef = collection(db, c);
      const unsubCollection = onSnapshot(collectionRef, snapshot => {
        if (snapshot.empty) {
          setIsPending(false);
          setError("No data found!!!");
        } else {
          let newArr = [];
          snapshot.docs.forEach(doc => {
            newArr.push({ ...doc.data(), id: doc.id });
          });
          setIsPending(false);
          setData(newArr);
        }
      });
      return () => unsubCollection();
    }

    if (id) {
      setIsPending(true);
      const docRef = doc(db, c, id);
      const unsubDoc = onSnapshot(docRef, doc => {
        if (doc.exists) {
          setIsPending(false);
          setData({ ...doc.data(), id: doc.id });
        } else {
          setIsPending(false);
          setError("No data found!!!");
        }
      });
      return () => unsubDoc();
    }
  }, [c, id]);
  return { data, isPending, error };
};
