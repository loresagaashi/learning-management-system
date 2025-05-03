import React, { useEffect, useState } from 'react';

export default function AdminGroupView() {
  const [groups, setGroups] = useState([]);
  const [generations, setGenerations] = useState([]);
  const [form, setForm] = useState({ name: '', capacity: '', generationId: '' });

  useEffect(() => {
    fetch('/student-groups')
      .then(res => res.json())
      .then(data => setGroups(data));
  }, []);

  useEffect(() => {
    fetch('/generations')
      .then(res => res.json())
      .then(data => setGenerations(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      capacity: parseInt(form.capacity),
      generation: { id: parseInt(form.generationId) },
    };

    await fetch('/student-groups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    
    fetch('/student-groups')
      .then(res => res.json())
      .then(data => setGroups(data));

    setForm({ name: '', capacity: '', generationId: '' });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📘 Admin - Student Groups</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Group Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Capacity"
          value={form.capacity}
          onChange={e => setForm({ ...form, capacity: e.target.value })}
          required
        />
        <select
          value={form.generationId}
          onChange={e => setForm({ ...form, generationId: e.target.value })}
          required
        >
          <option value="">Select Generation</option>
          {generations.map(g => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>
        <button type="submit">➕ Add Group</button>
      </form>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Capacity</th>
            <th>Generation</th>
            <th>Available Spots</th>
          </tr>
        </thead>
        <tbody>
          {groups.map(group => (
            <GroupRow key={group.id} group={group} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GroupRow({ group }) {
  const [available, setAvailable] = useState('-');

  useEffect(() => {
    fetch(`/student-groups/group/${group.id}/available-spots`)
      .then(res => res.json())
      .then(data => setAvailable(data));
  }, [group.id]);

  return (
    <tr>
      <td>{group.id}</td>
      <td>{group.name}</td>
      <td>{group.capacity}</td>
      <td>{group.generation?.name || 'N/A'}</td>
      <td>{available}</td>
    </tr>
  );
}
