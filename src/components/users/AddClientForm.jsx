// src/components/users/AddClientForm.jsx
import { useDispatch } from "react-redux";
import { addClient } from "../../store/userManagementSlice";

export default function AddClientForm() {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addClient({
        userDto: {
          email: e.target.email.value,
          password: e.target.password.value,
          roles: ["ROLE_CLIENT"],
        },
        clientReq: {
          companyName: e.target.companyName.value,
        },
      })
    );
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-5 rounded shadow">
      <h3 className="font-semibold mb-4">Add Client</h3>
      <input name="companyName" className="input" placeholder="Company Name" />
      <input name="email" className="input" placeholder="Email" />
      <input name="password" className="input" placeholder="Password" />
      <button className="btn-primary mt-4">Create Client</button>
    </form>
  );
}
