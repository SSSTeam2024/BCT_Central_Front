import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";

import LayoutReducer from "../slices/layouts/reducer";
// Authentication
import ForgetPasswordReducer from "../slices/auth/forgetpwd/reducer";
import ProfileReducer from "../slices/auth/profile/reducer";
import DashboardReducer from "../slices/dashboard/reducer";
import { vehicleTypeSlice } from "features/VehicleType/vehicleTypeSlice";
import { journeySlice } from "features/Journeys/journeySlice";
import { luggageSlice } from "features/luggage/luggageSlice";
import { quoteSlice } from "features/Quotes/quoteSlice";
import { driverSlice } from "features/Driver/driverSlice";
import { vehicleSlice } from "features/Vehicles/vehicleSlice";
import { extraSlice } from "features/VehicleExtraLuxury/extraSlice";
import { hourlyBandSlice } from "features/HourlyBand/hourlyBandSlice";
import { companySlice } from "features/Company/companySlice";
import { teamSlice } from "features/Team/teamSlice";
import { schoolSlice } from "features/Schools/schools";
import { visitorSlice } from "features/Visitor/visitorSlice";
import { mileageBandSlice } from "features/MileageBand/mileageSlice";
import { waitingBandSlice } from "features/WaitingBands/waitingSlice";
import { passengerAndLuggageSlice } from "features/PassengerAndLuggageLimits/passengerAndLuggageSlice";
import { sourcesSlice } from "features/Sources/sourcesSlice";
import { pricingCalendarSlice } from "features/PricingCalendar/pricingCalendar";
import { modePriceSlice } from "features/modePrice/modePriceSlice";
import { regionalPricingSlice } from "features/RegionalPricing/regionalPricingSlice";
import { locationSlice } from "features/Location/locationSlice";
import { pricingPostalCodeSlice } from "features/PricingPostalCode/pricingPostalCodeSlice";
import { forceSingleSlice } from "features/ForceSingle/forceSingleSlice";
import { programmSlice } from "features/Programs/programSlice";
import { contractSlice } from "features/contract/contractSlice";
import { checkTypesSlice } from "features/ChechTypes/checkTypesSlice";
import { accountSlice } from "features/Account/accountSlice";
import authSlice from "features/Account/authSlice";
import { affiliateSlice } from "features/Affiliate/affiliateSlice";
import { emailSlice } from "features/Emails/emailSlice";
import { attachmentSlice } from "features/Attachments/attachmentSlice";
import { emailSentSlice } from "features/emailSent/emailSentSlice";
import { shortCodeSlice } from "features/ShortCode/shortCodeSlice";
import { emailQueueSlice } from "features/EmailQueue/emailQueueSlice";
import { feedbackSlice } from "features/FeedBack/feedBackSlice";
import { defectSlice } from "features/Defects/defectSlice";
import { requestFeatureSlice } from "features/RequestFeature/requestFeature";
import { errorReportSlice } from "features/ErrorReport/errorReportSlice";
import { complainSlice } from "features/Complains/complainsSlice";
import { headerSlice } from "features/header/headerSlice";
import { menuSlice } from "features/menu/menuSlice";
import { footerListSlice } from "features/FooterList/footerListSlice";
import { pageSlice } from "features/pageCollection/pageSlice";
import { footerSocialSlice } from "features/FooterSocial/footerSocialSlice";
import { aboutUsSlice } from "features/AboutUsComponent/aboutUsSlice";
import { ourValuesSlice } from "features/OurValuesComponent/ourValuesSlice";
import { offreServiceSlice } from "features/OffreServicesComponent/offreServicesSlice";
import { iconSlice } from "features/Icons/iconSlice";
import { htmlPageSlice } from "features/htmlPage/htmlPageSlice";
import { ourMissionSlice } from "features/OurMissionsComponent/ourMissionsSlice";
import { bestOfferSlice } from "features/bestOfferComponent/bestOfferSlice";
import { block1Slice } from "features/block1Component/block1Slice";
import { vehicleGuideSlice } from "features/vehicleGuideComponent/vehicleGuideSlice";
import { vehicleClassSlice } from "features/VehicleClassComponent/vehicleClassSlice";
import { fleetSlice } from "features/FleetComponent/fleetSlice";
import { onTheRoadSlice } from "features/OnTheRoadComponent/onTheRoadSlice";
import { inThePressSlice } from "features/InThePressComponent/inThePressSlice";
import { notificationSlice } from "features/Notifications/notificationSlice";
import { termConditionSlice } from "features/TermsConditionsComponent/termsCoditionSlice";
import { generalSetSlice } from "features/generalSettings/generalSettingsSlice";
import { offerSlice } from "features/offers/offerSlice";
import { groupEmployeeSlice } from "features/employeeGroups/employeeGroupSlice";

export const store = configureStore({
  reducer: {
    [vehicleTypeSlice.reducerPath]: vehicleTypeSlice.reducer,
    [journeySlice.reducerPath]: journeySlice.reducer,
    [luggageSlice.reducerPath]: luggageSlice.reducer,
    [quoteSlice.reducerPath]: quoteSlice.reducer,
    [driverSlice.reducerPath]: driverSlice.reducer,
    [vehicleSlice.reducerPath]: vehicleSlice.reducer,
    [extraSlice.reducerPath]: extraSlice.reducer,
    [hourlyBandSlice.reducerPath]: hourlyBandSlice.reducer,
    [companySlice.reducerPath]: companySlice.reducer,
    [teamSlice.reducerPath]: teamSlice.reducer,
    [schoolSlice.reducerPath]: schoolSlice.reducer,
    [visitorSlice.reducerPath]: visitorSlice.reducer,
    [mileageBandSlice.reducerPath]: mileageBandSlice.reducer,
    [waitingBandSlice.reducerPath]: waitingBandSlice.reducer,
    [passengerAndLuggageSlice.reducerPath]: passengerAndLuggageSlice.reducer,
    [sourcesSlice.reducerPath]: sourcesSlice.reducer,
    [pricingCalendarSlice.reducerPath]: pricingCalendarSlice.reducer,
    [modePriceSlice.reducerPath]: modePriceSlice.reducer,
    [regionalPricingSlice.reducerPath]: regionalPricingSlice.reducer,
    [locationSlice.reducerPath]: locationSlice.reducer,
    [pricingPostalCodeSlice.reducerPath]: pricingPostalCodeSlice.reducer,
    [forceSingleSlice.reducerPath]: forceSingleSlice.reducer,
    [programmSlice.reducerPath]: programmSlice.reducer,
    [contractSlice.reducerPath]: contractSlice.reducer,
    [checkTypesSlice.reducerPath]: checkTypesSlice.reducer,
    [accountSlice.reducerPath]: accountSlice.reducer,
    [affiliateSlice.reducerPath]: affiliateSlice.reducer,
    [emailSlice.reducerPath]: emailSlice.reducer,
    [attachmentSlice.reducerPath]: attachmentSlice.reducer,
    [emailSentSlice.reducerPath]: emailSentSlice.reducer,
    [shortCodeSlice.reducerPath]: shortCodeSlice.reducer,
    [emailQueueSlice.reducerPath]: emailQueueSlice.reducer,
    [feedbackSlice.reducerPath]: feedbackSlice.reducer,
    [defectSlice.reducerPath]: defectSlice.reducer,
    [requestFeatureSlice.reducerPath]: requestFeatureSlice.reducer,
    [errorReportSlice.reducerPath]: errorReportSlice.reducer,
    [complainSlice.reducerPath]: complainSlice.reducer,
    [headerSlice.reducerPath]: headerSlice.reducer,
    [menuSlice.reducerPath]: menuSlice.reducer,
    [footerListSlice.reducerPath]: footerListSlice.reducer,
    [pageSlice.reducerPath]: pageSlice.reducer,
    [footerSocialSlice.reducerPath]: footerSocialSlice.reducer,
    [aboutUsSlice.reducerPath]: aboutUsSlice.reducer,
    [ourValuesSlice.reducerPath]: ourValuesSlice.reducer,
    [offreServiceSlice.reducerPath]: offreServiceSlice.reducer,
    [iconSlice.reducerPath]: iconSlice.reducer,
    [htmlPageSlice.reducerPath]: htmlPageSlice.reducer,
    [ourMissionSlice.reducerPath]: ourMissionSlice.reducer,
    [bestOfferSlice.reducerPath]: bestOfferSlice.reducer,
    [block1Slice.reducerPath]: block1Slice.reducer,
    [vehicleGuideSlice.reducerPath]: vehicleGuideSlice.reducer,
    [vehicleClassSlice.reducerPath]: vehicleClassSlice.reducer,
    [fleetSlice.reducerPath]: fleetSlice.reducer,
    [onTheRoadSlice.reducerPath]: onTheRoadSlice.reducer,
    [inThePressSlice.reducerPath]: inThePressSlice.reducer,
    [notificationSlice.reducerPath]: notificationSlice.reducer,
    [termConditionSlice.reducerPath]: termConditionSlice.reducer,
    [generalSetSlice.reducerPath]: generalSetSlice.reducer,
    [offerSlice.reducerPath]: offerSlice.reducer,
    [groupEmployeeSlice.reducerPath]: groupEmployeeSlice.reducer,
    auth: authSlice,
    Layout: LayoutReducer,
    ForgetPassword: ForgetPasswordReducer,
    Profile: ProfileReducer,
    Dashboard: DashboardReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([
      vehicleTypeSlice.middleware,
      journeySlice.middleware,
      luggageSlice.middleware,
      quoteSlice.middleware,
      driverSlice.middleware,
      vehicleSlice.middleware,
      extraSlice.middleware,
      schoolSlice.middleware,
      hourlyBandSlice.middleware,
      companySlice.middleware,
      teamSlice.middleware,
      visitorSlice.middleware,
      mileageBandSlice.middleware,
      waitingBandSlice.middleware,
      passengerAndLuggageSlice.middleware,
      sourcesSlice.middleware,
      pricingCalendarSlice.middleware,
      modePriceSlice.middleware,
      regionalPricingSlice.middleware,
      locationSlice.middleware,
      pricingPostalCodeSlice.middleware,
      forceSingleSlice.middleware,
      programmSlice.middleware,
      contractSlice.middleware,
      accountSlice.middleware,
      checkTypesSlice.middleware,
      affiliateSlice.middleware,
      emailSlice.middleware,
      attachmentSlice.middleware,
      emailSentSlice.middleware,
      shortCodeSlice.middleware,
      emailQueueSlice.middleware,
      feedbackSlice.middleware,
      defectSlice.middleware,
      requestFeatureSlice.middleware,
      errorReportSlice.middleware,
      complainSlice.middleware,
      headerSlice.middleware,
      menuSlice.middleware,
      footerListSlice.middleware,
      pageSlice.middleware,
      footerSocialSlice.middleware,
      aboutUsSlice.middleware,
      ourValuesSlice.middleware,
      offreServiceSlice.middleware,
      iconSlice.middleware,
      htmlPageSlice.middleware,
      ourMissionSlice.middleware,
      bestOfferSlice.middleware,
      block1Slice.middleware,
      vehicleGuideSlice.middleware,
      vehicleClassSlice.middleware,
      fleetSlice.middleware,
      onTheRoadSlice.middleware,
      inThePressSlice.middleware,
      notificationSlice.middleware,
      termConditionSlice.middleware,
      generalSetSlice.middleware,
      offerSlice.middleware,
      groupEmployeeSlice.middleware,
    ]);
  },
});

setupListeners(store.dispatch);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;