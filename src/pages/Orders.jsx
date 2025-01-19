import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon, CalendarIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders);
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <Link to={`/orders/${order.id}`} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <CalendarIcon className="h-5 w-5 text-gray-400" />
                <span>{order.date}</span>
                <ShoppingBagIcon className="h-5 w-5 text-gray-400" />
                <span>{order.items}</span>
              </div>
              <div className="flex items-center">
                <span className="font-bold">${order.total}</span>
                <ChevronRightIcon className="h-5 w-5 ml-2" />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Orders;