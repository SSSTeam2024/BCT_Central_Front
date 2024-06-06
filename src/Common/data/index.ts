import {
  recentOrders,
  stockReport,
  productDelivery,
  newcustomers,
  allRevenueChartData,
  monthRevenueChartData,
  halfYearRevenueChartData,
  yearRevenueChartData,
} from "./dashboard";
import { productList, categoryListData, subCategoryListData } from "./products";
import { ordersList } from "./orders";
import { sellerList, sellerGrid } from "./sellers"
import { currencyRate, transaction } from "./localization";
import { couponsList } from "./coupons";
import { numbersList } from "./numbers";
import { shipments } from "./shipping";
import { driverList } from "./driverlist";
import { profile, account, accountTransaction } from "./recentorders";
import { calenderDefaultCategories, events, defaultevent } from "./calendar";
import { ListView } from "./invoiceListView";
import { teamList } from "./teamlist";

export {
  ListView,
  profile,
  account,
  accountTransaction,
  recentOrders,
  stockReport,
  productDelivery,
  newcustomers,
  productList,
  categoryListData,
  subCategoryListData,
  ordersList,
  numbersList,
  sellerGrid,
  sellerList,
  currencyRate,
  transaction,
  couponsList,
  shipments,
  driverList,
  teamList,
  calenderDefaultCategories,
  events,
  defaultevent,
  allRevenueChartData,
  monthRevenueChartData,
  halfYearRevenueChartData,
  yearRevenueChartData,
};
