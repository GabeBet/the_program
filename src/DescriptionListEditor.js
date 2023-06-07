import { toast, ToastContainer } from 'react-toastify';

const DescriptionListEditor = ({ projDescriptionList, setProjDescriptionList, sqftDescriptionList, setSqftDescriptionList, estInvDescriptionList, setEstInvDescriptionList }) => {

    const errorNotify = (message) => toast.error(`Project Not Saved: ${message}`, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });

    const sumbitProjDescription = async (e) => {
        e.preventDefault();
        try {
            const req = { 
            method: 'POST',
            headers:{ 'Content-Type': 'application/json' },
            body: JSON.stringify({
                description: ""
            })
            };
            const res = await fetch('http://localhost:4000/projDescription', req);
            const data = await res.json();
            setProjDescriptionList((prevList) => [...prevList,data])
        } catch (err) {
            errorNotify(err);
        }
    }
    const sumbitSqFtDescription = async (e) => {
        e.preventDefault();
        try {
            const req = { 
            method: 'POST',
            headers:{ 'Content-Type': 'application/json' },
            body: JSON.stringify({
                description: ""
            })
            };
            const res = await fetch('http://localhost:4000/sqftDescription', req);
            const data = await res.json();
            setSqftDescriptionList((prevList) => [...prevList,data])
        } catch (err) {
            errorNotify(err);
        }
    }
    const sumbitEstInvDescription = async (e) => {
        e.preventDefault();
        try {
            const req = { 
            method: 'POST',
            headers:{ 'Content-Type': 'application/json' },
            body: JSON.stringify({
                description: ""
            })
            };
            const res = await fetch('http://localhost:4000/estInvDescription', req);
            const data = await res.json();
            setEstInvDescriptionList((prevList) => [...prevList,data])
        } catch (err) {
            errorNotify(err);
        }
    }
    return (
        <main className="DescriptionListEditor">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 20 }}>
                <div>
                    <b>Project Description List</b>
                    {projDescriptionList.map(desc => (
                        <ul> {desc.description} </ul>
                    ))}
                </div>

                <div>
                    <b>Square Foot Description List</b>
                    {sqftDescriptionList.map(desc => (
                        <ul> {desc.description} </ul>
                    ))}
                </div>

                <div>
                    <b>Estimate/Invoice Description List</b>
                    {estInvDescriptionList.map(desc => (
                        <ul> {desc.description} </ul>
                    ))}
                </div>
            </div>

            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </main>
    )
}

export default DescriptionListEditor