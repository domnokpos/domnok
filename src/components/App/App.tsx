import {
  createNavigator,
  useBackButtonIntegration,
  useNavigatorIntegration,
} from '@tma.js/react-router-integration';
import { useBackButton } from '@tma.js/sdk-react';
import type { FC } from 'react';
import { useMemo } from 'react';
import {
  Navigate,
  Route,
  Router,
  Routes,
} from 'react-router-dom';

import { routes } from '../../navigation/routes.ts';
import '@xelene/tgui/dist/styles.css';
import { MiniApp } from '@tma.js/sdk';

const Inner: FC = () => {
  return (
    <Routes>
      {routes.map((route) => <Route key={route.path} {...route} />)}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export const App: FC = () => {
  
  const tmaNavigator = useMemo(createNavigator, []);
  const [location, navigator] = useNavigatorIntegration(tmaNavigator);
  const backButton = useBackButton();
  useBackButtonIntegration(tmaNavigator, backButton);

  const miniApp = new MiniApp({
    headerColor: 'bg_color',
    backgroundColor: '#ffffff',
    version: '6.4',
    botInline: false,
    postEvent,
  });
  
  // miniApp.setBackgroundColor('#ffffff');
  miniApp.requestPhoneAccess()
    .then(async (res) => {
      return await localStorage.setItem("UserContact", JSON.stringify(res));
    })
    .finally(() => {
      alert("success");
    });

  return (
      <Router location={location} navigator={navigator}>
          <Inner />
      </Router>
  );
};
