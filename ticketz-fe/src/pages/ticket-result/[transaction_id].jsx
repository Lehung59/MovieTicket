import Footer from "components/Footer";
import Navbar from "components/Navbar";
import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import branding from "assets/icons/tickitzyn.svg";
import QRCodeGenerator from "utils/qrCode";
import Title from "utils/wrapper/title";
import { getTransactionById } from "utils/https/movies";
import PrivateRoute from "utils/wrapper/privateRoute";
import { useRouter } from "next/router";
import Loader from "components/Loader";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

