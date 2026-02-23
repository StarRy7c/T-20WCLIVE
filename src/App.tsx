/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Watch from './pages/Watch';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch/:channelId" element={<Watch />} />
      </Routes>
    </BrowserRouter>
  );
}
