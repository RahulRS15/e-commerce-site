import { Link, useLocation } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';

function Navbar() {
  const { cart } = useCart();
  const location = useLocation();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const searchParams = new URLSearchParams(location.search);
  const currentCategory = searchParams.get('category') || 'all';

  const isActiveLink = (category) => {
    if (category === 'all') {
      return location.pathname === '/' && !searchParams.get('category');
    }
    return currentCategory === category;
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold text-gray-800">
              Shopi
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link
                to="/"
                className={`text-gray-600 hover:text-gray-900 pb-1 border-b-2 transition-colors ${isActiveLink('all') ? 'border-black' : 'border-transparent'
                  }`}
              >
                All
              </Link>
              <Link
                to="/?category=clothes"
                className={`text-gray-600 hover:text-gray-900 pb-1 border-b-2 transition-colors ${isActiveLink('clothes') ? 'border-black' : 'border-transparent'
                  }`}
              >
                Clothes
              </Link>
              <Link
                to="/?category=electronics"
                className={`text-gray-600 hover:text-gray-900 pb-1 border-b-2 transition-colors ${isActiveLink('electronics') ? 'border-black' : 'border-transparent'
                  }`}
              >
                Electronics
              </Link>
              <Link
                to="/?category=furniture"
                className={`text-gray-600 hover:text-gray-900 pb-1 border-b-2 transition-colors ${isActiveLink('furniture') ? 'border-black' : 'border-transparent'
                  }`}
              >
                Furnitures
              </Link>
              <Link
                to="/?category=toys"
                className={`text-gray-600 hover:text-gray-900 pb-1 border-b-2 transition-colors ${isActiveLink('toys') ? 'border-black' : 'border-transparent'
                  }`}
              >
                Toys
              </Link>
            </div>
          </div>

          <div className="flex items-center md:space-x-4">
            <span className="hidden sm:block text-gray-600">userintheapp@test.com</span>
            <Link to="/orders" className="text-gray-600 hover:text-gray-900 mr-4 md:mr-0">My Orders</Link>
            <Link to="/account" className="text-gray-600 hover:text-gray-900 mr-2 md:mr-0">My Account</Link>
            <Link to="/cart" className="relative">
              <ShoppingCartIcon className="h-6 w-6 text-gray-600 mr-2 md:mr-0" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;