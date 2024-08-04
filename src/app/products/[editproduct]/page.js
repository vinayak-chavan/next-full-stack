"use client";
import { useEffect, useState } from "react";
import "../../style.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page(props) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [company, setCompany] = useState("");
  const [color, setColor] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    const productId = props.params.editproduct;
    let productData = await fetch(
      "http://localhost:3000/api/products/" + productId
    );
    productData = await productData.json();

    if (productData.success) {
      let result = productData.result;
      setName(result.name);
      setPrice(result.price);
      setCompany(result.company);
      setColor(result.color);
      setCategory(result.category);
    }
  };

  const updateProduct = async () => {
    const productId = props.params.editproduct;
    let data = await fetch("http://localhost:3000/api/products/" + productId, {
      method: "PUT",
      body: JSON.stringify({ name, price, company, color, category }),
    });
    data = await data.json();
    if (data.success) {
      alert("Product updated");
      router.push("/products");
    }
  };

  return (
    <div>
      <h2>Add Product Here</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Enter Product Name"
        className="input"
      />
      <input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        type="text"
        placeholder="Enter Product Price"
        className="input"
      />
      <input
        type="text"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Enter Product Company"
        className="input"
      />
      <input
        type="text"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        placeholder="Enter Product Color"
        className="input"
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Enter Product Category"
        className="input"
      />
      <button className="btn" onClick={updateProduct}>
        Update Product
      </button>
      <Link className="btn" href="/">
        Back to Home
      </Link>
    </div>
  );
}
