import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";

const initialState = {   
    string: '',
    cities: [

        {
            _id: "5e087909095aea08fcf7f946",
            name: "Berlin",
            country: "Germany",
            img: "https://www.visitberlin.de/system/files/styles/visitberlin_teaser_full_width_visitberlin_mobile_1x/private/image/iStock_000074120341_Double_DL_PPT_0.jpg?h=a66ba266&itok=tD4ERppn"
        },

        {
            _id: "5e0884af9859e06150961046",
            name: "Buenos Aires",
            country: "Argentina",
            img: "https://conocedores.com/wp-content/uploads/2019/09/10-museos-gratis-buenos-aires-26092019.jpg"
        },

        {
            _id: "5e089b7a298fdb22883b7b27",
            name: "London",
            country: "UK",
            img: "https://www.visitbritain.com/sites/default/files/styles/consumer_campaigns_hero_mobile/public/paragraphs_bundles/hero/vb34166226_london_reiseziel.jpg?itok=IBro8r3S"
        }
    ]
}

const middleWare = [thunk]

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWare)));

export default store;
