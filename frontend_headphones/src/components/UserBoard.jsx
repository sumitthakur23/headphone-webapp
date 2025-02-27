import React, { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import axios from 'axios';

const UserBoard = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/api/v1/users/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the user data!', error);
      });

    axios.get('http://localhost:5000/api/v1/payment/payments', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the orders!', error);
      });

    axios.get('http://localhost:5000/api/v1/payment/payments', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log(response.data);
        setPayments(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the payments!', error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <div className="container mx-auto py-10">
        {/* Header Section */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-black text-3xl">
              <FaUser />
            </div>
            <h1 className="text-4xl font-bold text-black ml-4">User Dashboard</h1>
          </div>
          <h1 className="text-xl font-bold text-black mt-4">Welcome, {user.firstName} {user.lastName}</h1>
          <p className="text-xl text-gray-600">Email Id : {user.email}</p>
          <p className="text-xl text-gray-600">Mobile Number : +91 {user.phone}</p>
        </header>

        {/* Order History Section */}
        <section className="bg-white p-6 rounded-lg shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-bold text-red-700 mb-4">Order History</h2>
          <table className="min-w-full bg-white border border-gray-300 shadow-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 border-b border-r text-center">Payment ID</th>
                <th className="py-2 px-4 border-b border-r text-center">Item Name</th>
                <th className="py-2 px-4 border-b border-r text-center">Item Image</th>
                <th className="py-2 px-4 border-b border-r text-center">Item Price</th>
                <th className="py-2 px-4 border-b border-r text-center">Status</th>
                <th className="py-2 px-4 border-b text-center">Review</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(payment => (
                payment.items.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <tr className="border-t">
                      <td className="py-2 px-4 border-b border-r text-center">{payment._id}</td>
                      <td className="py-2 px-4 border-b border-r text-center">{item.name}</td>
                      <td className="py-2 px-4 border-b border-r text-center">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mx-auto" />
                      </td>
                      <td className="py-2 px-4 border-b border-r text-center">{item.price}</td>
                      <td className="py-2 px-4 border-b border-r text-center">{payment.paymentStatus}</td>
                      <td className="py-2 px-4 border-b text-center">
                        <a href="/addreview" className="bg-yellow-800 text-white px-4 py-2 rounded">Add Review</a>
                      </td>
                    </tr>
                    {index < payment.items.length - 1 && (
                      <tr key={`separator-${item.id}`}>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default UserBoard;