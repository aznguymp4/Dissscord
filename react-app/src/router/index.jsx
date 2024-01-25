import { createBrowserRouter } from 'react-router-dom';
import Discovery from '../components/Discovery';
import Server from '../components/Server';
import Layout from './Layout';

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
      }
    ],
  },
]);