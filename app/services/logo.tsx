import {
  AlignLineLogo,
  BoxIcon,
  CartLogo,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ClipBoardIcon,
  CrossIcon,
  DollarSign,
  EditIcon,
  EyeCloseIcon,
  EyeOpenIcon,
  FacebookLogo,
  GirlsFrock,
  GirlsInner,
  GirlsNightSuit,
  GoogleLogo,
  GridIcon,
  HashLogo,
  HeartLogo,
  LifeBuoyLogo,
  LogoutIcon,
  OutingWomenWear,
  PackageLogo,
  Pant1,
  Pant2,
  PieChartIcon,
  PlusIcon,
  ReturnArrowIcon,
  RightArrow,
  SearchIcon,
  SettingIcon,
  Shirt1,
  Shirt2,
  ShortsBoys,
  SlackLogo,
  StarIcon,
  SwippingGirlsWear,
  ThreeLineIcon,
  TrashIcon,
  UploadIcon,
  UsersIcon,
} from "./icons"

export interface ILogo {
  name:
    | "google"
    | "facebook"
    | "hash"
    | "eye-open"
    | "eye-close"
    | "grid"
    | "heart"
    | "clipboard"
    | "box"
    | "pie-chart"
    | "users"
    | "setting"
    | "logout"
    | "cart"
    | "edit"
    | "plus-sign"
    | "three-line"
    | "upload"
    | "trash"
    | "cross"
    | "chevron-down"
    | "tick"
    | "star"
    | "chevron-right"
    | "right-arrow"
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
    | "lines"
    | "slack-logo"
    | "package-box"
    | "dollar-sign"
    | "life-buoy-sign"
    | "return-arrow"
    | "search-icon"
}

export default function Logo({ name }: ILogo) {
  switch (name) {
    case "google":
      return <GoogleLogo />
    case "facebook":
      return <FacebookLogo />
    case "hash":
      return <HashLogo />
    case "eye-open":
      return <EyeOpenIcon />
    case "grid":
      return <GridIcon />
    case "heart":
      return <HeartLogo />
    case "clipboard":
      return <ClipBoardIcon />
    case "box":
      return <BoxIcon />
    case "pie-chart":
      return <PieChartIcon />
    case "users":
      return <UsersIcon />
    case "setting":
      return <SettingIcon />
    case "logout":
      return <LogoutIcon />
    case "edit":
      return <EditIcon />
    case "plus-sign":
      return <PlusIcon />
    case "three-line":
      return <ThreeLineIcon />
    case "upload":
      return <UploadIcon />
    case "trash":
      return <TrashIcon />
    case "cross":
      return <CrossIcon />
    case "chevron-down":
      return <ChevronDownIcon />
    case "tick":
      return <CheckIcon />
    case "star":
      return <StarIcon />
    case "chevron-right":
      return <ChevronRightIcon />
    case "right-arrow":
      return <RightArrow />
    case "shirt-w-pocket":
      return <Shirt1 />
    case "long-sleeve-shirt":
      return <Shirt2 />
    case "long-pant":
      return <Pant1 />
    case "outing-women":
      return <OutingWomenWear />
    case "shorts-boys":
      return <ShortsBoys />
    case "girls-inner":
      return <GirlsInner />
    case "girls-frock":
      return <GirlsFrock />
    case "geans":
      return <Pant2 />
    case "summer-wears":
      return <SwippingGirlsWear />
    case "girls-nightsuit":
      return <GirlsNightSuit />
    case "cart":
      return <CartLogo />
    case "lines":
      return <AlignLineLogo />
    case "package-box":
      return <PackageLogo />
    case "dollar-sign":
      return <DollarSign />
    case "slack-logo":
      return <SlackLogo />
    case "life-buoy-sign":
      return <LifeBuoyLogo />
    case "return-arrow":
      return <ReturnArrowIcon />
    case "search-icon":
      return <SearchIcon />
    default:
      return <EyeCloseIcon />
  }
}
