// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";
import MainContent from "./MainContent";
import StartPage from "./StartPage";

export default function Home() {
  const { user, canProceed } = useAuth();

  return (
    <div className="fle flex-co min-h-scree">
      {/* Header section */}

      {/* Navigation (optional, uncomment if needed) */}

      {/* Content */}
      {/* <main className="max-w-3x  x-auto flex items-center justify-center flex-col"> */}
      <main className="">
        {canProceed  && <MainContent />}
        {(!canProceed && !user) && <StartPage />}
      </main>
    </div>
  );
}
