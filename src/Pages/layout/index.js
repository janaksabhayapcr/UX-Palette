import React, { Suspense } from 'react';
import Navbar from './Navbar';
import Spinner from 'react-spinkit';
import Header from './Header';
import { Container } from 'react-bootstrap';
import '../../assets/css/Layout/Header.css';
import '../../assets/css/Layout/Navbar.css';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <Navbar />
      <Container fluid>
        <Suspense fallback={<Spinner id="view-spinner" name="line-scale-pulse-out-rapid" color="#315B7B" />}>{children}</Suspense>
      </Container>
    </>
  );
}
