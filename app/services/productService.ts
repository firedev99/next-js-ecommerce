import { ProductProps } from "../../typings/interfaces/mains"
import ProductType from "../../typings/types/product"

function productAPI(productInfo: ProductType, token: string) {
  return fetch("/api/admin/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productInfo),
  })
}

function fetchProductData(turn?: string) {
  return turn ? fetch(`/api/products?turn=${turn}`) : fetch(`/api/products`) //turn number
}

function fetchAllFeaturingProducts(limit?: number) {
  return limit
    ? fetch(`/api/products/featuring?limit=${limit}`)
    : fetch("/api/products/featuring")
}

function fetchProductByID(productID: string) {
  return fetch(`/api/products/${productID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
}

function fetchProductByCategory(category: string, limit?: number) {
  return limit
    ? fetch(`/api/products/category?type=${category}&limit=${limit}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
    : fetch(`/api/products/category?type=${category}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
}

function deleteProductByID(productID: string, token: string) {
  return fetch(`/api/admin/products/${productID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
}

function deleteProductByIDs(productIDs: string, token: string) {
  return fetch(`/api/admin/products/${productIDs}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
}

function updateProductByID(
  productInfo: ProductProps,
  productID: string,
  token: string
) {
  return fetch(`/api/admin/products/${productID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productInfo),
  })
}

const productService = {
  productAPI,
  fetchProductData,
  fetchAllFeaturingProducts,
  fetchProductByID,
  fetchProductByCategory,
  updateProductByID,
  deleteProductByID,
  deleteProductByIDs,
}

export default productService
