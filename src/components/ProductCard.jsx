import { useCart } from '../context/CartContext';
import { PlusIcon } from '@heroicons/react/24/outline';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="relative group">
      <div className="relative w-full aspect-square overflow-hidden rounded-lg">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <button
          onClick={() => addToCart(product)}
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
        >
          <PlusIcon className="h-6 w-6 text-gray-800" />
        </button>
        <div className="absolute bottom-0 left-0 bg-white/80 px-2 text-sm rounded ml-2 mb-2">
          {product.category.name}
        </div>

      </div>
      <div className="mt-2 flex items-center justify-between">
        <h3 className="text-sm text-gray-700">{product.title}</h3>
        <p className="text-lg font-semibold text-gray-900">${product.price}</p>
      </div>

    </div>
  );
}

export default ProductCard;