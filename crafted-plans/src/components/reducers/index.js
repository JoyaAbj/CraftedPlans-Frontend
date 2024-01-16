import { combineReducers } from "redux";
import userReducer from "./user";
import productReducer from "./product";
import ordersReducer from "./order";
import reviewsReducer from "./review";
import plannerReducer from "./planner";
import templateReducer from "./template";

const allReducers = combineReducers({
  users : userReducer,
  planners: plannerReducer,
  products: productReducer,
  orders: ordersReducer,
  reviews: reviewsReducer,
  templates: templateReducer
 // cards : cardReducer
});

export default allReducers;