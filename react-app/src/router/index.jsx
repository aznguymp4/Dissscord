import { createBrowserRouter } from 'react-router-dom';
import Discovery from '../components/Discovery';
import Server from '../components/Server';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import ServerFormModal from '../components/ServerFormModal/ServerFormModal';
import SearchPage from '../components/Discovery/SearchPage'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Discovery/>,
      },
      {
        element: <Server/>,
        children: [
          { path: "/server/:serverId" },
          { path: "/server/:serverId/channel/:channelId" }
        ]
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path:'/add-server',
        element:<ServerFormModal/>
      },
      {
        path:'/discover-search',
        element:<SearchPage/>
      }
    ],
  },
]);
