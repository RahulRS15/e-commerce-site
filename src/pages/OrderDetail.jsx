import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

function OrderDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  
  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const foundOrder = orders.find(o => o.id === parseInt(id));
    setOrder(foundOrder);
  }, [id]);

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div>Order not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/orders')}
        className="flex items-center text-gray-600 mb-6"
      >
        <ChevronLeftIcon className="h-5 w-5 mr-1" />
        Back
      </button>
      
      <h1 className="text-2xl font-bold mb-6">My Order</h1>
      
      <div className="space-y-4">
        {order.products.map(product => (
          <div key={product.id} className="border rounded-lg p-4">
            <div className="flex items-center space-x-4">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h3 className="font-medium">{product.title}</h3>
                <p className="text-gray-600">${product.price}</p>
                <div className="mt-2 inline-block px-3 py-1 bg-gray-100 rounded">
                  {product.quantity}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
export default OrderDetail;