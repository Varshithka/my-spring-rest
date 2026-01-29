import React, { useState, useEffect } from "react";
import axios from "axios";

export default function StudentForm() {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    age: ""
  });

  const [students, setStudents] = useState([]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/api/students", student);
    alert("Student saved");
    setStudent({ name: "", email: "", age: "" });
    fetchStudents();
  };

  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:8080/api/students");
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Student Form</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={student.name} onChange={handleChange} /><br />
        <input name="email" placeholder="Email" value={student.email} onChange={handleChange} /><br />
        <input name="age" placeholder="Age" value={student.age} onChange={handleChange} /><br />
        <button type="submit">Save</button>
      </form>

      <h3>Student List</h3>
      <ul>
        {students.map((s) => (
          <li key={s.id}>
            {s.name} - {s.email} - {s.age}
          </li>
        ))}
      </ul>
    </div>
  );
}
