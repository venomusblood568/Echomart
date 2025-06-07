import { useEffect, useState } from "react";
import ChatBot from "../component/chatBot";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<number[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Chat messages and input state
  const [messages, setMessages] = useState<string[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      const stripped = data.map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        price: item.price,
        image: item.image,
      }));
      setProducts(stripped);
    };

    fetchProducts();
  }, []);

  const handleToggleCart = (productId: number) => {
    setCart((prevCart) =>
      prevCart.includes(productId)
        ? prevCart.filter((id) => id !== productId)
        : [...prevCart, productId]
    );
  };

  const handleBuyNow = (product: Product) => {
    alert(`You are buying: ${product.title} for ₹${product.price}`);
  };

  // Chat handlers
  const handleSendMessage = () => {
    if (currentMessage.trim() !== "") {
      setMessages((prev) => [...prev, currentMessage]);
      setCurrentMessage("");
    }
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-500 text-gray-800">
      {/* Header */}
      <header className=" px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4  top-0 z-10">
        <h1 className="text-2xl font-bold text-blue-600">EchoMart</h1>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="relative">
            <button className="text-xl">🛒</button>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Product Grid */}
      <main className="p-6">
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-600">No products found.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition flex flex-col"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-40 object-contain mb-4 rounded"
                />
                <h2 className="text-lg font-semibold mb-1 truncate">
                  {product.title}
                </h2>
                <p className="text-gray-500 text-sm mb-3 line-clamp-3">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-blue-600 font-bold text-base">
                    ₹{product.price}
                  </span>
                  <button
                    onClick={() => handleBuyNow(product)}
                    className="bg-green-500 text-white px-3 py-1 text-sm rounded hover:bg-green-600"
                  >
                    Buy Now
                  </button>
                </div>
                <button
                  onClick={() => handleToggleCart(product.id)}
                  className={`w-full px-3 py-2 rounded text-sm font-medium mt-auto ${
                    cart.includes(product.id)
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  {cart.includes(product.id)
                    ? "Remove from Cart"
                    : "Add to Cart"}
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Chatbot Bubble */}
      {!isChatOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setIsChatOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl"
          >
            💬
          </button>
        </div>
      )}

      {/* Chat Sidebar with props */}
      <ChatBot
        isChatOpen={isChatOpen}
        setIsChatOpen={setIsChatOpen}
        messages={messages}
        currentMessage={currentMessage}
        setCurrentMessage={setCurrentMessage}
        handleSendMessage={handleSendMessage}
        handleClearChat={handleClearChat}
      />
    </div>
  );
}
