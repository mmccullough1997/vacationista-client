import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import TripLegExpenses from '../../../components/Trips&Legs/TripLegExpenses';
import { useAuth } from '../../../utils/context/authContext';
import getAllExpenseTypes from '../../../utils/data/expenseTypeData';
import getAllTransportationTypes from '../../../utils/data/transportationTypeData';
import { getSingleUserTrip } from '../../../utils/data/tripData';

export default function TripExpensesAndTransportations() {
  const router = useRouter();
  const { tripExpensesAndTransportations } = router.query;
  const { user } = useAuth();
  const [expenseTypes, setExpenseTypes] = useState([]);
  const [transportationTypes, setTransportationTypes] = useState([]);
  const [userTrip, setUserTrip] = useState({});

  useEffect(() => {
    getAllExpenseTypes().then(setExpenseTypes);
    getAllTransportationTypes().then(setTransportationTypes);
    getSingleUserTrip(tripExpensesAndTransportations, user.id).then(setUserTrip);
  }, [tripExpensesAndTransportations, user, router]);

  if (user) {
    return (
      <div>
        <TripLegExpenses tripId={Number(tripExpensesAndTransportations)} isTrip expenses={userTrip.expenses} tripTravelTo={userTrip.travelTo} transportations={userTrip.transportations} budget={userTrip.budget} expenseTypes={expenseTypes} transportationTypes={transportationTypes} expenseTotal={userTrip.expenseTotal} transportationTotal={userTrip.transportationTotal} total={userTrip.total} />
      </div>
    );
  }
  return (
    <div>Must be signed in to view page.</div>
  );
}
