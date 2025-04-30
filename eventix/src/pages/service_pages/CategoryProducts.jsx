import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import backendGlobalRoute from "../../config/config";
import Sidebar from "../common_pages/Sidebar"; // Adjust path if needed
import "./CategoryProductpage.css";

const CategoryProducts = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  const placeholderImage = "/path-to-your-placeholder-image.jpg";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${backendGlobalRoute}/api/products/category/${categoryId}`);
        setProducts(res.data.products);
        setCategoryName(res.data.categoryName);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <section className="flex-1 py-12 bg-gray-50 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">{categoryName || "Products"}</h2>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 justify-items-center">
              {products.map((product) => (
                <Link
                  to={`/product/${product._id}`}
                  key={product._id}
                  className="card gap-8 justify-items-center"
                >
                  <div className="card__img-container">
                    <img
                      className="card__img"
                      src={
                        product.product_image
                          ? `${backendGlobalRoute}/${product.product_image.replace(/\\/g, "/")}`
                          : placeholderImage
                      }
                      alt={product.product_name}
                    />
                  </div>
                  <div className="card__content">
                    <div className="card__header">
                      <h3 className="card__title">{product.product_name}</h3>
                      <div className="space-x-4">
                      <span className="text-lg line-through ">
                            ₹{product.display_price.toFixed(0)}
                          </span>
                        
                        {product.display_price && (
                          <span className="text-xl font-bold">
                          ₹{product.selling_price.toFixed(0)}
                        </span>
                        )}
                      </div>
                    </div>
                    <p className="card__description">
                      {product.description
                        ? product.description.slice(0, 80) + "..."
                        : "No description available."}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No products available for this service.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default CategoryProducts;
