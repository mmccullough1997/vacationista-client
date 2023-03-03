/* eslint-disable import/no-extraneous-dependencies */
import { Typography } from '@mui/material';
import React from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Accordion } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function TripLegExpenses({
  id, isTrip, expenses, transportations, budget, expenseTypes, transportationTypes, expenseTotal, transportationTotal, total,
}) {
  console.warn(id);
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
                    <Accordion.Body>{theExpense.title} - {theExpense.amount}</Accordion.Body>
                  </div>
                ))}
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
        <div>
          <AddCircleOutlineIcon />
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
                    <Accordion.Body>{theTransportation.transportation_type.label} - {theTransportation.amount}</Accordion.Body>
                  </div>
                ))}
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
        <div>
          <AddCircleOutlineIcon />
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
  id: PropTypes.number.isRequired,
  isTrip: PropTypes.bool.isRequired,
  expenses: PropTypes.shape({
    id: PropTypes.number,
    comment: PropTypes.string,
    expense_type: PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    }).isRequired,
    title: PropTypes.string,
    filter: PropTypes.func.isRequired,
  }).isRequired,
  transportations: PropTypes.shape({
    id: PropTypes.number,
    comment: PropTypes.string,
    transportation_type: PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    }).isRequired,
    travel_from: PropTypes.string,
    travel_to: PropTypes.string,
    filter: PropTypes.func.isRequired,
  }).isRequired,
  budget: PropTypes.number.isRequired,
  expenseTypes: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    map: PropTypes.func.isRequired,
  }).isRequired,
  transportationTypes: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    map: PropTypes.func.isRequired,
  }).isRequired,
  expenseTotal: PropTypes.number.isRequired,
  transportationTotal: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};
