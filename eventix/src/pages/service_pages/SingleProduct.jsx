import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import backendGlobalRoute from "../../config/config";

const SingleProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const placeholderImage = "/path-to-your-placeholder-image.jpg";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${backendGlobalRoute}/api/products/${productId}`
        );
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading…
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Product not found
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 space-y-8">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center">
          {product.product_name}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="h-96 rounded-2xl overflow-hidden shadow">
              <img
                src={
                  product.product_image
                    ? `${backendGlobalRoute}/${product.product_image.replace(
                        /\\/g,
                        "/"
                      )}`
                    : placeholderImage
                }
                alt={product.product_name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Additional Images */}
            {product.all_product_images &&
              product.all_product_images.length > 0 && (
                <div>
                  <h2 className="text-2xl font-semibold mb-2">
                    Additional Images
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {product.all_product_images.map((img, idx) => (
                      <div
                        key={idx}
                        className="h-32 rounded-lg overflow-hidden shadow-sm"
                      >
                        <img
                          src={`${backendGlobalRoute}/${img.replace(
                            /\\/g,
                            "/"
                          )}`}
                          alt={`extra-${idx}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>

          {/* Right: Details */}
          <div className="space-y-6">
            {/* Description */}
            <div>
              <h2 className="text-2xl font-semibold mb-1">Description</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>

            {/* Relational Fields */}
            <div className="space-y-2">
              <div>
                <span className="font-semibold">Category:</span>{" "}
                {product.category?.category_name || "N/A"}
              </div>
              {product.vendor && (
                <div>
                  <span className="font-semibold">Vendor:</span>{" "}
                  {product.vendor.vendor_name}
                </div>
              )}
              {product.outlets && product.outlets.length > 0 && (
                <div>
                  <span className="font-semibold">Outlets:</span>{" "}
                  {product.outlets.map((o) => o.outlet_name).join(", ")}
                </div>
              )}
            </div>

            {/* Pricing */}
            <div className="space-x-4">
              <span className="text-xl font-bold">
                ₹{product.selling_price.toFixed(2)}
              </span>
              {product.display_price && (
                <span className="text-lg line-through text-gray-500">
                  ₹{product.display_price.toFixed(2)}
                </span>
              )}
            </div>

            {/* Dynamic Properties */}
            {product.properties &&
              Object.entries(product.properties).length > 0 && (
                <div>
                  <h2 className="text-2xl font-semibold mb-2">
                    Additional Properties
                  </h2>
                  <ul className="space-y-1">
                    {Object.entries(product.properties).map(
                      ([key, val]) => (
                        <li key={key}>
                          <span className="font-medium capitalize">
                            {key}
                          </span>
                          : {val}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}

            {/* Availability */}
            <div>
              <span className="font-semibold">Availability:</span>{" "}
              <span
                className={`font-medium ${
                  product.availability_status === "available"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {product.availability_status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
