// src/components/users/AddAdminForm.jsx
import { useDispatch } from "react-redux";
import { addAdmin } from "../../store/userManagementSlice";

export default function AddAdminForm() {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addAdmin({
        email: e.target.email.value,
        password: e.target.password.value,
        roles: ["ROLE_ADMIN"],
      })
    );
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-5 rounded shadow">
      <h3 className="font-semibold mb-4">Add Admin</h3>
      <input name="email" className="input" placeholder="Email" required />
      <input
        name="password"
        className="input"
        placeholder="Password"
        required
      />
      <button className="btn-primary mt-4">Create Admin</button>
    </form>
  );
}
