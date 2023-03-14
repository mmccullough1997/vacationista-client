/* eslint-disable react/require-default-props */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
import { Typography } from '@mui/material';
import React from 'react';
import { Accordion } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ExpenseTransportationModal from '../Expenses&Transportations/ExpenseTransportationModal';

export default function TripLegExpenses({
  tripId, legId, isTrip, expenses, transportations, budget, expenseTypes, transportationTypes, expenseTotal, transportationTotal, total, tripTravelTo,
}) {
  return (
    <>
      <Typography variant="h4">{ isTrip ? 'Trip Expenses' : 'Leg Expenses'}</Typography>
      <Typography variant="h4">{ isTrip ? 'Trip budget: ' : 'Leg budget: '}{budget} </Typography>

      <hr />

      <div className="AccordionAndAdd">
        <div>
          <Accordion>
            { expenseTypes.map((expenseType) => (
              <Accordion.Item eventKey={expenseType.id}>
                <Accordion.Header>{expenseType.label}</Accordion.Header>
                {expenses?.filter((expense) => expense.expense_type.id === expenseType.id).map((theExpense) => (
                  <div>
                    { isTrip ? (
                    // is user clicking on expense from trip directory?
                      <ExpenseTransportationModal isExpense tripId={Number(tripId)} legId={Number(theExpense.leg?.id)} tripTravelTo={theExpense.trip.travel_to} title={theExpense.title} type={Number(theExpense.expense_type.id)} amount={theExpense.amount} comment={theExpense.comment} id={Number(theExpense.id)} isTrip expenseTypes={expenseTypes} />
                    ) : (
                      // is user clicking on expense from leg page?
                      <ExpenseTransportationModal isExpense tripId={Number(tripId)} tripTravelTo={theExpense.trip.travel_to} legId={Number(legId)} title={theExpense.title} type={Number(theExpense.expense_type.id)} amount={theExpense.amount} comment={theExpense.comment} id={Number(theExpense.id)} expenseTypes={expenseTypes} />
                    )}
                  </div>
                ))}
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
        <div>
          { isTrip ? (
            // is user adding expense from trip page?
            <ExpenseTransportationModal isExpense tripId={Number(tripId)} tripTravelTo={tripTravelTo} isTrip expenseTypes={expenseTypes} />
          ) : (
            // is user adding expense from leg page?
            <ExpenseTransportationModal isExpense tripTravelTo={tripTravelTo} tripId={Number(tripId)} legId={Number(legId)} expenseTypes={expenseTypes} />
          )}
        </div>
      </div>
      <div className="subtotal">
        <Typography variant="p">Subtotal: ${expenseTotal}</Typography>
      </div>

      <hr />

      <div className="AccordionAndAdd">
        <div>
          <Accordion>
            { transportationTypes.map((transportationType) => (
              <Accordion.Item eventKey={transportationType.id}>
                <Accordion.Header>{transportationType.label}</Accordion.Header>
                {transportations?.filter((transportation) => transportation.transportation_type.id === transportationType.id).map((theTransportation) => (
                  <div>
                    { isTrip ? (
                    // is user clicking on transportation from trip page?
                      <ExpenseTransportationModal isTransportation tripId={Number(tripId)} tripTravelTo={theTransportation.trip.travel_to} legId={Number(theTransportation.leg?.id)} from={theTransportation.travel_from} to={theTransportation.travel_to} roundTrip={theTransportation.round_trip} type={Number(theTransportation.transportation_type.id)} amount={theTransportation.amount} comment={theTransportation.comment} id={Number(theTransportation.id)} isTrip transportationTypes={transportationTypes} />
                    ) : (
                    // is user clicking on transportation from leg page?
                      <ExpenseTransportationModal isTransportation tripId={Number(tripId)} tripTravelTo={theTransportation.trip.travel_to} legId={Number(legId)} from={theTransportation.travel_from} to={theTransportation.travel_to} roundTrip={theTransportation.round_trip} type={Number(theTransportation.transportation_type.id)} amount={theTransportation.amount} comment={theTransportation.comment} id={Number(theTransportation.id)} transportationTypes={transportationTypes} />
                    )}
                  </div>
                ))}
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
        <div>
          { isTrip ? (
            // is user adding transportation from trip page?
            <ExpenseTransportationModal isTransportation tripTravelTo={tripTravelTo} tripId={Number(tripId)} transportationTypes={transportationTypes} isTrip />
          ) : (
            // is user adding transportation from leg page?
            <ExpenseTransportationModal isTransportation tripId={Number(tripId)} tripTravelTo={tripTravelTo} legId={Number(legId)} transportationTypes={transportationTypes} />
          )}
        </div>
      </div>
      <div className="subtotal">
        <Typography variant="p">Subtotal: ${transportationTotal}</Typography>
      </div>

      <hr />

      <div className="AccordionAndAdd">
        <Typography variant="h6">{ isTrip ? 'Trip total: $' : 'Leg total: $'}{total}</Typography>
        <Typography variant="h6">Budget remaining: ${budget - total}</Typography>
      </div>
    </>
  );
}

TripLegExpenses.propTypes = {
  tripId: PropTypes.number,
  legId: PropTypes.number,
  isTrip: PropTypes.bool,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    comment: PropTypes.string,
    expense_type: PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    }),
    title: PropTypes.string,
    filter: PropTypes.func,
  })),
  transportations: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    comment: PropTypes.string,
    transportation_type: PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    }),
    travel_from: PropTypes.string,
    travel_to: PropTypes.string,
    filter: PropTypes.func,
  })),
  budget: PropTypes.string,
  expenseTypes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    map: PropTypes.func,
  })),
  transportationTypes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    map: PropTypes.func,
  })),
  expenseTotal: PropTypes.number,
  transportationTotal: PropTypes.number,
  total: PropTypes.number,
  tripTravelTo: PropTypes.string,
};
