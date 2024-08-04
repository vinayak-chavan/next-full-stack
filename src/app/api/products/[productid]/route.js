import { connectionStr } from "@/utils/db";
import { Product } from "@/utils/model/product";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PUT(request, content) {
  const productId = content.params.productid;
  const payload = await request.json();
  await mongoose.connect(connectionStr);
  const result = await Product.findOneAndUpdate({ _id: productId }, payload);
  return NextResponse.json({ result, success: true });
}

export async function GET(request, content) {
  const productId = content.params.productid;
  const record = { _id: productId };
  await mongoose.connect(connectionStr);
  const result = await Product.findById(record);
  return NextResponse.json({ result, success: true });
}

export async function DELETE(request, content) {
  const productId = content.params.productid;
  const record = { _id: productId };
  await mongoose.connect(connectionStr);
  const result = await Product.deleteOne(record);
  return NextResponse.json({ result, success: true });
}
