import DetailsPage from "../Pages/DetailsPage";
import LoginPage from "../Pages/LoginPage";
import PageNotFound from "../Pages/PageNotFound";
import RegisterPage from "../Pages/RegisterPage";
import ResultsPage from "../Pages/ResultsPage";
import VerifyPage from "../Pages/VerifyPage";

const routes = [
    {
        path: '/login',
        component: LoginPage
    },
    {
        path: '/verify',
        component: VerifyPage
    },
    {
        path: '/register',
        component: RegisterPage
    },
    {
        path: '/details/:id',
        component: DetailsPage
    },
    {
        path: '/search',
        component: ResultsPage
    },
    {
        exact: true,
        path: '/',
        component: ResultsPage
    },
    {
        path: null,
        component: PageNotFound
    }
    
];

export default routes;