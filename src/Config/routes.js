import DetailsPage from "../Pages/DetailsPage";
import LoginPage from "../Pages/LoginPage";
import PageNotFound from "../Pages/PageNotFound";
import RegisterPage from "../Pages/RegisterPage";
import ResultsPage from "../Pages/ResultsPage";
import UserPage from "../Pages/UserPage";
import VerifyPage from "../Pages/VerifyPage";
import StartPage from "../Pages/StartPage";
import ReviewPage from "../Pages/ReviewPage";

const routes = [
    {
        path: '/login',
        component: LoginPage,
        isPrivate: false
    },
    {
        path: '/verify',
        component: VerifyPage,
        isPrivate: false
    },
    {
        path: '/register',
        component: RegisterPage,
        isPrivate: false
    },
    {
        path: '/details/:id',
        component: DetailsPage,
        isPrivate: false
    },
    {
        path: '/review/:id',
        component: ReviewPage,
        isPrivate: true
    },
    {
        path: '/search',
        key: window.location.pathname,
        component: ResultsPage,
        isPrivate: false
    },
    {
        path: '/user',
        component: UserPage,
        isPrivate: true
    },
    {
        exact: true,
        path: '/',
        component: StartPage,
        isPrivate: false
    },
    {
        path: null,
        component: PageNotFound,
        isPrivate: false
    }
    
];

export default routes;