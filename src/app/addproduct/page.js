"use client";
import { useState } from "react";
import ".././style.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [company, setCompany] = useState("");
  const [color, setColor] = useState("");
  const [category, setCategory] = useState("");

  const addProduct = async () => {
    console.log(name, price, company, color, category);
    let result = await fetch("http://localhost:3000/api/products", {
      method: "POST",
      body: JSON.stringify({ name, price, company, color, category }),
    });
    result = await result.json();
    if (result.success) {
      alert("New product added");
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
      <button className="btn" onClick={addProduct}>
        Add Product
      </button>
      <Link className="btn" href="/">
        Back to Home
      </Link>
    </div>
  );
}
