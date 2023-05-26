import Customer from "./Customer"

const CustomerFeed = ({ customerList }) => {
  return (
    <>
        {customerList.map(customer => (
            <Customer key={customer.id} customer={customer}/>
        ))}
    </>
  )
}

export default CustomerFeed