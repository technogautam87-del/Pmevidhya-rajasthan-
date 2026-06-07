/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { AccessibilityProvider } from "./components/AccessibilityCtx";
import { ChannelProvider } from "./components/ChannelCtx";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ISLSection } from "./components/ISLSection";
import { ChannelGrid } from "./components/ChannelGrid";
import { Pillars } from "./components/Pillars";
import { PlatformAvailability } from "./components/PlatformAvailability";
import { Footer } from "./components/Footer";
import { AdminPanel } from "./components/AdminPanel";

export default function App() {
  return (
    <AccessibilityProvider>
      <ChannelProvider>
        <div className="flex flex-col min-h-screen">
          {/* Navigation Accessible Bar */}
          <Navbar />

          {/* Home hero with Sign Banner */}
          <main className="flex-grow">
            {/* Hero segment */}
            <Hero />

            {/* Interactive Indian Sign Language / Divyang Section (Crucial Highlight requested at the top) */}
            <ISLSection />

            {/* Interactive Channels showcase grid (RJ148 to RJ152) */}
            <ChannelGrid />

            {/* 5 Core Pillars: Abhigamyata, Samta, Gunvatta, Vahniyata, Javabdehi */}
            <Pillars />

            {/* Multiple platforms availability: DD Free Dish, Dish TV, Jio TV, Waves OTT, Mobile App */}
            <PlatformAvailability />
          </main>

          {/* Global Footer and online CWSN Helpdesk咨询 */}
          <Footer />

          {/* Dynamic Admin Activation Control Panel */}
          <AdminPanel />
        </div>
      </ChannelProvider>
    </AccessibilityProvider>
  );
}
