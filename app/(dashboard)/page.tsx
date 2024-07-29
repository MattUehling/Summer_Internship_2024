'use client';

import React from "react";
import Link from 'next/link';
import './homepage.css';

function HomePage() {
  return (
    <div className="container">
      <header className="header"></header>
      <main className="main">
        <h1 className="akuTime">AkuTime</h1>
        <p className="byDevObsessed">by DevObsessed</p>
        <Link href="/login">
          <button className="loginButton">Login</button>
        </Link>
      </main>
      <footer className="footer">Created by: Matt Uehling</footer>
    </div>
  );
}

export default HomePage;
