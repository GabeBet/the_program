import Customer from "./Customer"

const CustomerFeed = ( {customerList }) => {
  return (
    <>
        {customerList.map(customer => (
            <p>
                <Customer key={customer.name} customer={customer}/>
            </p>
        ))}
    </>
  )
}

export default CustomerFeed