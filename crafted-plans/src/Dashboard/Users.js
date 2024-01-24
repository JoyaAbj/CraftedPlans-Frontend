import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/dashboard.css';
import { toast } from 'react-hot-toast';

const UserTable = () => {
  const [users, setUsers] = useState([]);

  const getAllUsers = () => {
    axios.get(`http://localhost:5000/users/getAll`)
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  const handleRemoveUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios.delete(`http://localhost:5000/users/deleteById/${id}`)
        .then((response) => {
          setUsers(users.filter(user => user._id !== id));
          toast.success("User deleted successfully");
        })
        .catch((error) => {
          console.error(error);
          toast.error("Error deleting user");
        });
    }
  };
  return (
    <div className="products-D1">
      <div className='cart-product1'>
      <h2>User Table</h2>
      <table>
        <thead>
          <tr>
            <th className='white-tr-td'>Full Name</th>
            <th className='white-tr-td'>Email</th>
            <th className='white-tr-td'>Phone Number</th>
            <th className='white-tr-td'>Role</th>
            <th className='white-tr-td'>Remove</th>

          </tr>
        </thead>
        <tbody>
        {users
              .filter(user => user.role === 'customer') // Filter users with role 'customer'
              .map((user) => (
                <tr key={user._id}>
                  <td className='white-tr'>{user.fullName}</td>
                  <td className='white-tr'>{user.email}</td>
                  <td className='white-tr'>{user.phoneNumber}</td>
                  <td className='white-tr'>{user.role}</td>
                  <td className='white-tr-icon' onClick={() => handleRemoveUser(user._id)}>x</td>
                </tr>
              ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default UserTable;
