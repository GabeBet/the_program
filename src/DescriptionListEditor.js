import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { FaPlus } from "react-icons/fa";

const DescriptionListEditor = ({ projDescriptionList, setProjDescriptionList, sqftDescriptionList, setSqftDescriptionList, estInvDescriptionList, setEstInvDescriptionList }) => {

    const [projDesc, setProjDesc] = useState('');
    const [sqftDesc, setSqftDesc] = useState('');
    const [estInvDesc, setEstInvDesc] = useState('');

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
                description: projDesc
            })
            };
            const res = await fetch('http://localhost:4000/projDescription', req);
            const data = await res.json();
            setProjDescriptionList((prevList) => [...prevList,data])
            setProjDesc('');
        } catch (err) {
            errorNotify(err);
        }
    }
    const deleteProjDescription = async (id) => {
        try {
            await fetch(`http://localhost:4000/projDescription/${id}`, {method: 'DELETE'});
            const filteredList = projDescriptionList.filter(desc => desc._id !== id);
            setProjDescriptionList(filteredList);
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
                description: sqftDesc
            })
            };
            const res = await fetch('http://localhost:4000/sqftDescription', req);
            const data = await res.json();
            setSqftDescriptionList((prevList) => [...prevList,data])
            setSqftDesc('');
        } catch (err) {
            errorNotify(err);
        }
    }
    const deleteSqFtDescription = async (id) => {
        try {
            await fetch(`http://localhost:4000/sqftDescription/${id}`, {method: 'DELETE'});
            const filteredList = sqftDescriptionList.filter(desc => desc._id !== id);
            setSqftDescriptionList(filteredList);
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
                description: estInvDesc
            })
            };
            const res = await fetch('http://localhost:4000/estInvDescription', req);
            const data = await res.json();
            setEstInvDescriptionList((prevList) => [...prevList,data])
            setEstInvDesc('')
        } catch (err) {
            errorNotify(err);
        }
    }
    const deleteEstInvDescription = async (id) => {
        try {
            await fetch(`http://localhost:4000/estInvDescription/${id}`, {method: 'DELETE'});
            const filteredList = estInvDescriptionList.filter(desc => desc._id !== id);
            setEstInvDescriptionList(filteredList);
        } catch (err) {
            errorNotify(err);
        }
    }

    return (
        <main className="DescriptionListEditor">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 20 }}>
                <div>
                    <b>Project Description List </b><br></br>
                    {projDescriptionList.map(desc => (
                        <ul key={desc._id} onClick={() => deleteProjDescription(desc._id)}> {desc.description} </ul>
                    ))}
                    <input
                        name='projDesc'
                        type="text"
                        placeholder="New Project Description"
                        value={projDesc}
                        onChange={(e) => setProjDesc(e.target.value)}
                    />
                    <button className="addButton" onClick={sumbitProjDescription}><FaPlus /></button>
                </div>

                <div>
                    <b>Square Foot Description List</b>
                    {sqftDescriptionList.map(desc => (
                        <ul key={desc._id} onClick={() => deleteSqFtDescription(desc._id)}> {desc.description} </ul>
                    ))}
                    <input
                        name='sqftDesc'
                        type="text"
                        placeholder="New Square Foot Description"
                        value={sqftDesc}
                        onChange={(e) => setSqftDesc(e.target.value)}
                    />
                    <button className="addButton" onClick={sumbitSqFtDescription}><FaPlus /></button>
                </div>

                <div>
                    <b>Estimate/Invoice Description List</b>
                    {estInvDescriptionList.map(desc => (
                        <ul key={desc._id} onClick={() => deleteEstInvDescription(desc._id)}> {desc.description} </ul>
                    ))}
                    <input
                        name='estInvDesc'
                        type="text"
                        placeholder="New Estimate/Invoice Description"
                        value={estInvDesc}
                        onChange={(e) => setEstInvDesc(e.target.value)}
                    />
                    <button className="addButton" onClick={sumbitEstInvDescription}><FaPlus /></button>
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