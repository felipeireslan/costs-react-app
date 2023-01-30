import React from 'react'
import { ServiceCard } from "./../../components";

function ServiceList({ services, handleRemove }) {
  return (
    <>
      {services.length > 0 ? (
        services.map(({ id, name, cost, description }) => (
          <ServiceCard
            id={id}
            name={name}
            cost={cost}
            description={description}
            key={id}
            handleRemove={handleRemove}
          />
        ))
      ) : (
        <p>Não há serviços cadastrados</p>
      )}
    </>
  );
}

export default ServiceList;
