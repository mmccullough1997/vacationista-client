import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import TripLegExpenses from '../../../components/Trips&Legs/TripLegExpenses';
import { useAuth } from '../../../utils/context/authContext';
import getAllExpenseTypes from '../../../utils/data/expenseTypeData';
import { getSingleUserLeg } from '../../../utils/data/legData';
import getAllTransportationTypes from '../../../utils/data/transportationTypeData';

export default function LegExpensesAndTransportations() {
  const router = useRouter();
  const { legExpensesAndTransportations } = router.query;
  const { user } = useAuth();
  const [expenseTypes, setExpenseTypes] = useState([]);
  const [transportationTypes, setTransportationTypes] = useState([]);
  const [userLeg, setUserLeg] = useState({});

  useEffect(() => {
    getAllExpenseTypes().then(setExpenseTypes);
    getAllTransportationTypes().then(setTransportationTypes);
    getSingleUserLeg(legExpensesAndTransportations, user.id).then(setUserLeg);
  }, [legExpensesAndTransportations, user]);

  return (
    <div>
      <TripLegExpenses legId={Number(legExpensesAndTransportations)} tripId={Number(userLeg.trip?.id)} tripTravelTo={userLeg.trip?.travel_to} expenses={userLeg.expenses} transportations={userLeg.transportations} budget={userLeg.budget} expenseTypes={expenseTypes} transportationTypes={transportationTypes} expenseTotal={userLeg.expenseTotal} transportationTotal={userLeg.transportationTotal} total={userLeg.total} />
    </div>
  );
}
