import { connectionStr } from "@/utils/db";
import { Product } from "@/utils/model/product";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET() {
  try{
    await mongoose.connect(connectionStr);
    const data = await Product.find();
    return NextResponse.json({ result:data, success: true });
  } catch (e) {
    return NextResponse.json({ result:"error", success: false });
  }
}

export async function POST(request) {
  try {
    await mongoose.connect(connectionStr);
    const payload = await request.json();
    let product = new Product(payload);
    const result = await product.save();
    return NextResponse.json({ result, success: true });
  } catch (e) {
    return NextResponse.json({ success: false });
  }
}
