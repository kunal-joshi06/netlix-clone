import React, { useEffect, useState } from "react";
import "./PlansBox.css";
import { selectUser } from "../../redux-store/slices/userSlice";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";

const PlansBox = () => {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null);

  const loadCheckout = async (id) => {
    const productRef = doc(
      collection(db, "customers", user.uid, "checkout_sessions")
    );

    await setDoc(productRef, {
      price: id,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });

    console.log(productRef);

    onSnapshot(
      productRef,
      async (doc) => {
        // console.log(doc.data());
        const { sessionId } = doc.data();
        const stripe = await loadStripe(
          `pk_test_51N6dOzSEI96kiV00ce2B9FRB4Nmjk9T4DSiNV327FD7wA899bMva8vdFJtxwqhfYIDVZc39yQbaOY2IIhvZCewNi00V8XtaSj3`
        );
        stripe.redirectToCheckout({ sessionId });
      },
      (error) => {
        alert(`An error occured: ${error.message}`);
      }
    );
  };

  useEffect(() => {
    const getPlans = async () => {
      const q = query(collection(db, "products"), where("active", "==", true));
      const querySnapshot = await getDocs(q);

      const plansObject = {};
      querySnapshot.forEach(async (doc) => {
        plansObject[doc.id] = doc.data();
        const priceRef = collection(db, "products", doc.id, "prices");
        const priceSnap = await getDocs(priceRef);

        priceSnap.forEach((price) => {
          plansObject[doc.id].prices = {
            priceId: price.id,
            priceData: price.data(),
          };
        });
        setProducts(plansObject);
      });
    };
    getPlans();
  }, []);

  useEffect(() => {
    const getSubscription = async () => {
      const subRef = collection(db, "customers", user.uid, "subscriptions");
      const querySnapshot = await getDocs(subRef);
      querySnapshot.forEach((subscription) => {
        setSubscription({
          role: subscription.data().role,
          current_period_end: subscription.data().current_period_end.seconds,
          current_period_start:
            subscription.data().current_period_start.seconds,
        });
      });
    };
    getSubscription();
  }, [user.uid]);

  return (
    <div className="plans-box">
      {subscription && (
        <p className="renewal-date">
          Renewal Date :{" "}
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentSub = productData.name
          ?.toLowerCase()
          .includes(subscription?.role);

        return (
          <div
            className={`${isCurrentSub && "plan-disabled"} plans-box-container`}
            key={productId}
          >
            <div className="plans-box-info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button
              onClick={() =>
                !isCurrentSub && loadCheckout(productData.prices.priceId)
              }
            >
              {isCurrentSub ? "Subscribed" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default PlansBox;
