
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    date: "",
    message: "",
    repeat: "",
    notifyWhatsApp: false,
    notifyWeChat: false,
  });

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + "/api/events")
      .then((res) => setEvents(res.data));
  }, []);

  const submit = () => {
    axios.post(process.env.REACT_APP_API_URL + "/api/events", form)
      .then((res) => {
        setEvents([...events, res.data]);
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Calendario Automatizado</h1>
      <input placeholder="Título" onChange={e => setForm({ ...form, title: e.target.value })} className="border p-2 mr-2" />
      <input type="datetime-local" onChange={e => setForm({ ...form, date: e.target.value })} className="border p-2 mr-2" />
      <input placeholder="Mensaje" onChange={e => setForm({ ...form, message: e.target.value })} className="border p-2 mr-2" />
      <select onChange={e => setForm({ ...form, repeat: e.target.value })} className="border p-2 mr-2">
        <option value="">Una vez</option>
        <option value="daily">Diario</option>
        <option value="weekly">Semanal</option>
      </select>
      <label className="mr-2">
        <input type="checkbox" onChange={e => setForm({ ...form, notifyWhatsApp: e.target.checked })} /> WhatsApp
      </label>
      <label className="mr-2">
        <input type="checkbox" onChange={e => setForm({ ...form, notifyWeChat: e.target.checked })} /> WeChat
      </label>
      <button onClick={submit} className="bg-blue-500 text-white p-2">Agregar Evento</button>

      <ul className="mt-4">
        {events.map(ev => (
          <li key={ev._id} className="border p-2 mb-2">
            <strong>{ev.title}</strong> - {new Date(ev.date).toLocaleString()} <br />
            {ev.message} | Repetir: {ev.repeat || "No"}
          </li>
        ))}
      </ul>
    </div>
  );
}
