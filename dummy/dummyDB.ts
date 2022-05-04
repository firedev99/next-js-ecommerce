export interface CategoryNavProps {
  name: string
  logo:
    | "shirt-w-pocket"
    | "long-pant"
    | "long-sleeve-shirt"
    | "outing-women"
    | "shorts-boys"
    | "girls-inner"
    | "girls-frock"
    | "geans"
    | "summer-wears"
    | "girls-nightsuit"
}
export type FashionLogoProp =
  | "shirt-w-pocket"
  | "long-pant"
  | "long-sleeve-shirt"
  | "outing-women"
  | "shorts-boys"
  | "girls-inner"
  | "girls-frock"
  | "geans"
  | "summer-wears"
  | "girls-nightsuit"

export const bgColors = [
  "to right, #ff0099, #493240",
  "to right, #1f4037, #99f2c8",
  "to right, #f953c6, #b91d73",
  "to left, #0f2027, #203a43, #2c5364",
  "to top, #373b44, #4286f4",
  "to bottom, #ff7e5f, #feb47b",
  "to right, #4ecdc4, #556270",
  "to left, #808080, #3fada8",
  "to top, #f85032, #e73827",
  "to right, #ffafbd, #ffc3a0",
  "to left, #56ab2f, #a8e063",
  "to left, #42275a, #734b6d",
] as string[]

// export const modelAssetList = [
//   "https://res.cloudinary.com/firey/image/upload/v1642246284/rainbow-products/models/product2-3_balw0n.jpg",
//   "https://res.cloudinary.com/firey/image/upload/v1642246500/rainbow-products/models/long-sweatshirt-female_slm9xh.jpg",
//   "https://res.cloudinary.com/firey/image/upload/v1642246284/rainbow-products/models/product2-2_sh8mps.jpg",
//   "https://res.cloudinary.com/firey/image/upload/v1642246500/rainbow-products/models/white-tee-female3_kykmsk.jpg",
//   "https://res.cloudinary.com/firey/image/upload/v1642246500/rainbow-products/models/black-tee-female2_ryisj7.jpg",
//   "https://res.cloudinary.com/firey/image/upload/v1642246283/rainbow-products/models/product2-1_xvthlu.jpg",
//   "https://res.cloudinary.com/firey/image/upload/v1642246500/rainbow-products/models/white-tee-female4_hhmxci.jpg",
//   "https://res.cloudinary.com/firey/image/upload/v1642246284/rainbow-products/models/camo-print-jacket-female_yv4vyx.jpg",
//   "https://res.cloudinary.com/firey/image/upload/v1642246283/rainbow-products/models/product1-1_msx4f4.jpg",
//   "https://res.cloudinary.com/firey/image/upload/v1642246283/rainbow-products/models/yellow-tee-female_z2gpff.jpg",
//   "https://res.cloudinary.com/firey/image/upload/v1642246284/rainbow-products/models/yellow-jacket-female_dwqp7o.jpg",
//   "https://res.cloudinary.com/firey/image/upload/v1642246283/rainbow-products/models/white-tee-male_nejtr7.jpg",
//   "https://res.cloudinary.com/firey/image/upload/v1642246283/rainbow-products/models/white-tee-female2_j6smp6.jpg",
//   "https://res.cloudinary.com/firey/image/upload/v1642246283/rainbow-products/models/white-tee-female_zhcqp3.jpg",
//   "https://res.cloudinary.com/firey/image/upload/v1642246284/rainbow-products/models/white-jacket-female_zaxdke.jpg",
//   "https://res.cloudinary.com/firey/image/upload/v1642246283/rainbow-products/models/black-toptank-female_zouhpk.jpg",
//   "https://res.cloudinary.com/firey/image/upload/v1642246283/rainbow-products/models/pink-tops-female_sypn2d.jpg",
//   "https://res.cloudinary.com/firey/image/upload/v1642246284/rainbow-products/models/product2_vqolzh.jpg",
//   "https://res.cloudinary.com/firey/image/upload/v1642246283/rainbow-products/models/black-tee-female_gpqpkc.jpg",
//   "https://res.cloudinary.com/firey/image/upload/v1642246282/rainbow-products/models/white-tops-female_iqipyg.jpg",
// ] as string[]

export const categoriesNavData = [
  {
    name: "New-in",
    logo: "shirt-w-pocket",
  },
  {
    name: "Hot Trending",
    logo: "long-pant",
  },
  {
    name: "Men Wears",
    logo: "long-sleeve-shirt",
  },
  {
    name: "Women Wears",
    logo: "outing-women",
  },
  {
    name: "Boys",
    logo: "shorts-boys",
  },
  {
    name: "Girls",
    logo: "girls-inner",
  },
  {
    name: "Children",
    logo: "girls-frock",
  },
  {
    name: "Geans",
    logo: "geans",
  },
  { name: "Summer Wears", logo: "summer-wears" },
  { name: "Night Suits", logo: "girls-nightsuit" },
] as CategoryNavProps[]

export const fashionLogos = [
  "shirt-w-pocket",
  "long-pant",
  "long-sleeve-shirt",
  "outing-women",
  "shorts-boys",
  "girls-inner",
  "girls-frock",
  "geans",
  "summer-wears",
  "girls-nightsuit",
] as FashionLogoProp[]
