import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import backendGlobalRoute from "../../config/config";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet's default icon paths using import (no require)
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Custom icon instance (outside component to avoid recreation)
const customIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const SingleProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const placeholderImage = "/placeholder.jpg"; // <-- Update with correct path

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${backendGlobalRoute}/api/products/${productId}`);
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

  // Leaflet expects [lat, lng] format, but some APIs give [lng, lat]
  const locationCoords = Array.isArray(product.location?.coordinates)
    ? [product.location.coordinates[1], product.location.coordinates[0]]
    : null;

  return (
    <section className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 space-y-8">
        <h1 className="text-4xl font-bold text-center">{product.product_name}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Images */}
          <div className="space-y-4">
            <div className="h-96 rounded-2xl overflow-hidden shadow">
              <img
                src={
                  product.product_image
                    ? `${backendGlobalRoute}/${product.product_image.replace(/\\/g, "/")}`
                    : placeholderImage
                }
                alt={product.product_name}
                className="w-full h-full object-cover"
              />
            </div>

            {product.all_product_images?.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-2">Additional Images</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {product.all_product_images.map((img, idx) => (
                    <div key={idx} className="h-32 rounded-lg overflow-hidden shadow-sm">
                      <img
                        src={`${backendGlobalRoute}/${img.replace(/\\/g, "/")}`}
                        alt={`extra-${idx}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-1">Description</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>

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
              {product.outlets?.length > 0 && (
                <div>
                  <span className="font-semibold">Outlets:</span>{" "}
                  {product.outlets.map((o) => o.outlet_name).join(", ")}
                </div>
              )}
            </div>

            <div className="space-x-4">
              <span className="text-xl font-bold">₹{product.selling_price.toFixed(2)}</span>
              {product.display_price && (
                <span className="text-lg line-through text-gray-500">
                  ₹{product.display_price.toFixed(2)}
                </span>
              )}
            </div>

            {product.properties && Object.entries(product.properties).length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-2">Additional Properties</h2>
                <ul className="space-y-1">
                  {Object.entries(product.properties).map(([key, val]) => (
                    <li key={key}>
                      <span className="font-medium capitalize">{key}</span>: {val}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <span className="font-semibold">Availability:</span>{" "}
              <span
                className={`font-medium ${
                  product.availability_status === "available" ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.availability_status}
              </span>
            </div>

            {/* Map */}
            {locationCoords && (
              <div>
                <h2 className="text-2xl font-semibold mb-2">Location</h2>
                <MapContainer
                  center={locationCoords}
                  zoom={20}
                  minZoom={4}
                  className="h-64 w-full rounded-lg shadow"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                  />
                  <Marker position={locationCoords} icon={customIcon}>
                    <Popup>{product.location.address || "Location"}</Popup>
                  </Marker>
                </MapContainer>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
