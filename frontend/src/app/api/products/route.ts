import { NextResponse } from "next/server";
import { Product } from "../../types/product";

type ProductResponse = Product[] | { error: string };

export async function GET(
  req: Request
): Promise<NextResponse<ProductResponse>> {
  try {
    // Parse the request URL to get the query parameters
    const url = new URL(req.url);
    const limit = url.searchParams.get("limit") || "18";

    // Fetch data from the API with the limit parameter
    const response = await fetch(
      `https://fakestoreapi.com/products?limit=${limit}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data: Product[] = await response.json();

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("API fetch error:", error.message); // For debugging
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
