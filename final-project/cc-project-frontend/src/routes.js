import BrowsePage from "@/pages/BrowsePage";
import MyItineraryPage from "@/pages/MyItineraryPage";
import HistoryPage from "@/pages/HistoryPage";
import CheckoutPage from "@/pages/CheckoutPage";
import LoginPage  from "@/pages/LoginPage";

export default [
    {
        name: 'browse',
        path: '/',
        component: BrowsePage
    },
    {
        name: 'itinerary',
        path: '/itinerary',
        component: MyItineraryPage
    },
    {
        name: 'checkout',
        path: '/checkout',
        component: CheckoutPage
    },
    {
        name: 'history',
        path: '/history',
        component: HistoryPage
    },
    {
        name: 'login',
        path: '/login',
        component: LoginPage
    },
    {
        name: 'logout',
        path: '/logout',
        component: LoginPage
    }
];
