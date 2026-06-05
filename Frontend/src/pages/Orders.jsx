import React, { useEffect, useMemo, useState } from "react";
import {
  ShoppingBag,
  Home,
  PackageCheck,
  Truck,
  CheckCircle2,
  Clock3,
  CreditCard,
  CalendarClock,
  Hash,
  ChevronDown,
  ChevronUp,
  ReceiptText,
  ShieldCheck,
  MapPin,
  Sparkles,
  Box,
  Sun,
  Moon,
} from "lucide-react";
import { formatPrice } from "../utils/formatters";

const Orders = ({ bgToggle, setBgToggle }) => {
  const [orderedProduct, setOrderedProduct] = useState([]);
  const [openOrderKey, setOpenOrderKey] = useState(null);

  const [localTheme, setLocalTheme] = useState(() => {
    const savedTheme = localStorage.getItem("ordersTheme");

    if (savedTheme === "dark") return true;
    if (savedTheme === "light") return false;

    return Boolean(bgToggle);
  });

  const isDark = typeof bgToggle === "boolean" ? bgToggle : localTheme;

  useEffect(() => {
    const orderProduct =
      JSON.parse(localStorage.getItem("orderedProducts")) || [];

    const reversedOrders = [...orderProduct].reverse();
    setOrderedProduct(reversedOrders);
  }, []);

  const handleThemeToggle = () => {
    const nextTheme = !isDark;

    setLocalTheme(nextTheme);
    localStorage.setItem("ordersTheme", nextTheme ? "dark" : "light");

    if (typeof setBgToggle === "function") {
      setBgToggle(nextTheme);
    }
  };

  const toggleDetails = (orderKey) => {
    setOpenOrderKey((prev) => (prev === orderKey ? null : orderKey));
  };

  if (orderedProduct.length === 0) {
    return (
      <div
        className={`min-h-screen px-3 py-6 transition-colors duration-500 ${
          isDark
            ? "bg-[#050816] text-white"
            : "bg-gradient-to-br from-slate-100 via-white to-orange-50 text-slate-950"
        }`}
      >
        <div className="mx-auto flex min-h-[75vh] max-w-5xl items-center justify-center">
          <div
            className={`w-full max-w-md rounded-[2rem] border p-7 text-center shadow-xl transition-colors duration-500 ${
              isDark
                ? "border-white/10 bg-white/[0.06]"
                : "border-white bg-white"
            }`}
          >
            <div
              className={`mx-auto flex h-20 w-20 items-center justify-center rounded-[1.7rem] ${
                isDark
                  ? "bg-orange-500/15 text-orange-300"
                  : "bg-orange-100 text-orange-600"
              }`}
            >
              <ShoppingBag size={38} />
            </div>

            <h2 className="mt-5 text-2xl font-black">No Orders Yet</h2>

            <p
              className={`mt-2 text-sm font-medium leading-relaxed ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Your completed orders will appear here with tracking and invoice
              details.
            </p>

            <div className="flex items-center justify-center gap-2 mt-6">
              <button
                onClick={() => (window.location.href = "/")}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-black text-white transition bg-orange-500 shadow-lg rounded-2xl shadow-orange-500/25 hover:bg-orange-600 active:scale-95"
              >
                <Home size={16} />
                Continue Shopping
              </button>

              <button
                onClick={handleThemeToggle}
                className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border transition active:scale-95 ${
                  isDark
                    ? "border-white/10 bg-white/10 text-yellow-300"
                    : "border-slate-200 bg-slate-50 text-slate-700"
                }`}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main
      className={`min-h-screen px-3 py-4 transition-colors duration-500 sm:px-5 lg:px-8 ${
        isDark
          ? "bg-[#050816] text-white"
          : "bg-gradient-to-br from-slate-100 via-white to-orange-50 text-slate-950"
      }`}
    >
      <div className="mx-auto max-w-7xl">
        <OrderHeader
          orderCount={orderedProduct.length}
          bgToggle={isDark}
          onThemeToggle={handleThemeToggle}
        />

        <div className="grid items-start grid-cols-1 gap-3 auto-rows-min md:grid-cols-2 xl:gap-5">
          {orderedProduct.map((order, index) => {
            const orderKey = order?.orderId || order?.date || `order-${index}`;

            return (
              <AdvancedOrderCard
                key={orderKey}
                order={order}
                orderNo={orderedProduct.length - index}
                isVisible={openOrderKey === orderKey}
                onToggle={() => toggleDetails(orderKey)}
                bgToggle={isDark}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};

const OrderHeader = ({ orderCount, bgToggle, onThemeToggle }) => {
  return (
    <section
      className={`mb-4 overflow-hidden rounded-[2rem] border p-4 shadow-xl transition-colors duration-500 sm:mb-6 sm:p-6 ${
        bgToggle
          ? "border-white/10 bg-white/[0.06] shadow-black/20"
          : "border-white bg-white/90 shadow-slate-200/80"
      }`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">
            <Sparkles size={13} />
            Advanced Order View
          </div>

          <h1 className="mt-3 text-2xl font-black tracking-tight sm:text-4xl">
            My Orders
          </h1>

          <p
            className={`mt-1 text-xs font-semibold sm:text-sm ${
              bgToggle ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Track your purchase, payment, delivery status and order summary.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div
            className={`grid grid-cols-2 gap-2 rounded-3xl border p-2 sm:min-w-[250px] ${
              bgToggle
                ? "border-white/10 bg-black/20"
                : "border-slate-200 bg-slate-50"
            }`}
          >
            <HeaderStat
              label="Total Orders"
              value={orderCount}
              bgToggle={bgToggle}
            />
            <HeaderStat label="Status" value="Active" bgToggle={bgToggle} />
          </div>

          <button
            onClick={onThemeToggle}
            className={`group flex h-14 w-14 shrink-0 items-center justify-center rounded-3xl border shadow-sm transition duration-300 active:scale-95 ${
              bgToggle
                ? "border-white/10 bg-white/10 text-yellow-300 hover:bg-white/15"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
            title="Toggle theme"
          >
            <span className="transition duration-300 group-hover:rotate-12">
              {bgToggle ? <Sun size={20} /> : <Moon size={20} />}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

const HeaderStat = ({ label, value, bgToggle }) => {
  return (
    <div
      className={`rounded-2xl px-3 py-3 text-center ${
        bgToggle ? "bg-white/[0.06]" : "bg-white"
      }`}
    >
      <p
        className={`text-[9px] font-black uppercase tracking-wider ${
          bgToggle ? "text-slate-400" : "text-slate-500"
        }`}
      >
        {label}
      </p>
      <p className="mt-1 text-lg font-black leading-none text-orange-500 sm:text-xl">
        {value}
      </p>
    </div>
  );
};

const AdvancedOrderCard = ({
  order,
  orderNo,
  isVisible,
  onToggle,
  bgToggle,
}) => {
  const productsArray = Array.isArray(order?.product)
    ? order.product
    : order?.product
      ? [order.product]
      : [];

  const mainProduct = productsArray[0] || {};

  const itemCount = productsArray.reduce(
    (total, item) => total + Number(item?.qty || 1),
    0
  );

  const formattedOrderTime = useMemo(() => {
    if (!order?.date) return "Recently Placed";

    const date = new Date(order.date);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return `${date.getDate().toString().padStart(2, "0")} ${
      months[date.getMonth()]
    } ${date.getFullYear()}`;
  }, [order?.date]);

  const [refNumber] = useState(
    () => order?.refNumber || Math.floor(1e12 + Math.random() * 9e12)
  );

  return (
    <article
      className={`self-start overflow-hidden rounded-[1.7rem] border shadow-xl transition duration-300 hover:-translate-y-1 ${
        bgToggle
          ? "border-white/10 bg-white/[0.06] shadow-black/20"
          : "border-white bg-white shadow-slate-200/80"
      }`}
    >
      <div className="grid grid-cols-[92px_1fr] gap-3 p-3 sm:grid-cols-[130px_1fr] sm:gap-4 sm:p-4">
        <div
          className={`relative flex h-[112px] items-center justify-center overflow-hidden rounded-3xl border sm:h-[150px] ${
            bgToggle
              ? "border-white/10 bg-black/20"
              : "border-slate-100 bg-gradient-to-br from-slate-50 to-white"
          }`}
        >
          {mainProduct?.image ? (
            <img
              src={mainProduct.image}
              alt={mainProduct?.name || "Product"}
              className="h-full max-h-[86px] w-full object-contain p-2 transition duration-500 hover:scale-110 sm:max-h-[120px]"
            />
          ) : (
            <Box size={38} className="text-orange-500" />
          )}

          <div className="absolute left-2 top-2 rounded-full bg-emerald-500 px-2 py-0.5 text-[8px] font-black uppercase text-white shadow">
            Paid
          </div>
        </div>

        <div className="min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-orange-500">
                Order #{orderNo}
              </p>

              <h2
                className="mt-1 text-sm font-black leading-tight truncate sm:text-lg"
                title={mainProduct?.name || "Product Item"}
              >
                {mainProduct?.name || "Product Item"}
              </h2>

              {productsArray.length > 1 && (
                <p
                  className={`mt-1 text-[10px] font-bold sm:text-xs ${
                    bgToggle ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  +{productsArray.length - 1} more product
                  {productsArray.length > 2 ? "s" : ""}
                </p>
              )}
            </div>

            <div
              className={`shrink-0 rounded-2xl p-2 ${
                bgToggle ? "bg-emerald-500/15" : "bg-emerald-50"
              }`}
            >
              <PackageCheck
                size={18}
                className={bgToggle ? "text-emerald-300" : "text-emerald-600"}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-3">
            <MiniInfo
              label="Amount"
              value={order?.total || formatPrice(mainProduct?.price || 0)}
              highlight
              bgToggle={bgToggle}
            />
            <MiniInfo label="Items" value={itemCount} bgToggle={bgToggle} />
          </div>

          <div className="mt-3">
            <OrderProgress bgToggle={bgToggle} />
          </div>
        </div>
      </div>

      <div
        className={`grid grid-cols-3 border-y px-3 py-2 sm:px-4 ${
          bgToggle
            ? "border-white/10 bg-black/20"
            : "border-slate-100 bg-slate-50"
        }`}
      >
        <QuickMeta
          icon={<CalendarClock size={13} />}
          label="Date"
          value={formattedOrderTime}
          bgToggle={bgToggle}
        />
        <QuickMeta
          icon={<CreditCard size={13} />}
          label="Mode"
          value={order?.paymentMethod?.toUpperCase() || "CARD"}
          bgToggle={bgToggle}
        />
        <QuickMeta
          icon={<ShieldCheck size={13} />}
          label="Secure"
          value="Verified"
          bgToggle={bgToggle}
        />
      </div>

      <button
        onClick={onToggle}
        className={`flex w-full items-center justify-between px-3 py-3 text-left transition duration-300 sm:px-4 ${
          bgToggle ? "hover:bg-white/10" : "hover:bg-orange-50"
        } ${isVisible ? "bg-orange-500/10" : ""}`}
      >
        <div className="flex items-center gap-2">
          <ReceiptText size={16} className="text-orange-500" />
          <span className="text-xs font-black sm:text-sm">
            View Order Details
          </span>
        </div>

        <span
          className={`text-orange-500 transition-transform duration-300 ${
            isVisible ? "rotate-180" : "rotate-0"
          }`}
        >
          <ChevronDown size={18} />
        </span>
      </button>

      <SmoothCollapse isOpen={isVisible}>
        <div className="px-3 pb-4 space-y-3 sm:px-4">
          <div
            className={`rounded-3xl border p-3 ${
              bgToggle
                ? "border-white/10 bg-black/20"
                : "border-slate-100 bg-slate-50/80"
            }`}
          >
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <DetailRow
                icon={<Hash size={13} />}
                label="Order ID"
                value={`#${order?.orderId || refNumber}`}
                bgToggle={bgToggle}
              />
              <DetailRow
                icon={<Clock3 size={13} />}
                label="Order Date"
                value={formattedOrderTime}
                bgToggle={bgToggle}
              />
              <DetailRow
                icon={<CreditCard size={13} />}
                label="Payment"
                value={order?.paymentMethod?.toUpperCase() || "CARD"}
                bgToggle={bgToggle}
              />
              <DetailRow
                icon={<MapPin size={13} />}
                label="Delivery"
                value="In Progress"
                bgToggle={bgToggle}
              />
            </div>
          </div>

          <div
            className={`rounded-3xl border p-3 ${
              bgToggle
                ? "border-white/10 bg-black/20"
                : "border-slate-100 bg-white"
            }`}
          >
            <p className="mb-2 text-xs font-black tracking-wider text-orange-500 uppercase">
              Product Bill
            </p>

            <div className="space-y-2">
              {productsArray.map((item, idx) => (
                <BillItem key={idx} item={item} bgToggle={bgToggle} />
              ))}
            </div>

            <div
              className={`mt-3 flex items-center justify-between rounded-2xl px-3 py-3 ${
                bgToggle ? "bg-orange-500/15" : "bg-orange-50"
              }`}
            >
              <p className="text-sm font-black">Grand Total</p>
              <p className="text-base font-black text-orange-500">
                {order?.total || formatPrice(mainProduct?.price || 0)}
              </p>
            </div>
          </div>
        </div>
      </SmoothCollapse>
    </article>
  );
};

const SmoothCollapse = ({ isOpen, children }) => {
  return (
    <div
      className={`grid transition-all duration-500 ease-in-out ${
        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      }`}
    >
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-2 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

const MiniInfo = ({ label, value, highlight = false, bgToggle }) => {
  return (
    <div
      className={`rounded-2xl px-3 py-2 ${
        bgToggle ? "bg-black/20" : "bg-slate-50"
      }`}
    >
      <p
        className={`text-[9px] font-black uppercase ${
          bgToggle ? "text-slate-400" : "text-slate-500"
        }`}
      >
        {label}
      </p>
      <p
        className={`mt-0.5 truncate text-sm font-black sm:text-base ${
          highlight ? "text-emerald-500" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
};

const QuickMeta = ({ icon, label, value, bgToggle }) => {
  return (
    <div className="min-w-0 px-2 border-r border-slate-200/40 last:border-r-0">
      <div
        className={`mb-0.5 flex items-center gap-1 ${
          bgToggle ? "text-slate-400" : "text-slate-500"
        }`}
      >
        {icon}
        <span className="text-[8px] font-black uppercase sm:text-[9px]">
          {label}
        </span>
      </div>
      <p className="truncate text-[10px] font-black sm:text-xs">{value}</p>
    </div>
  );
};

const OrderProgress = ({ bgToggle }) => {
  return (
    <div
      className={`rounded-2xl border px-2 py-2 ${
        bgToggle
          ? "border-white/10 bg-black/20"
          : "border-slate-100 bg-slate-50"
      }`}
    >
      <div className="relative flex items-start justify-between">
        <div
          className={`absolute left-7 right-7 top-3 h-0.5 ${
            bgToggle ? "bg-white/10" : "bg-slate-300"
          }`}
        />

        <ProgressStep
          icon={<CheckCircle2 size={12} />}
          label="Placed"
          status="done"
        />
        <ProgressStep icon={<Truck size={12} />} label="Shipped" status="live" />
        <ProgressStep icon="✓" label="Delivered" status="pending" />
      </div>
    </div>
  );
};

const ProgressStep = ({ icon, label, status }) => {
  const boxClass =
    status === "done"
      ? "bg-emerald-500 text-white"
      : status === "live"
        ? "bg-orange-500 text-white animate-pulse"
        : "bg-slate-300 text-slate-600";

  const labelClass =
    status === "done"
      ? "text-emerald-500"
      : status === "live"
        ? "text-orange-500"
        : "text-slate-400";

  return (
    <div className="relative z-10 flex flex-col items-center">
      <div
        className={`flex h-6 w-6 items-center justify-center rounded-full shadow ${boxClass}`}
      >
        {icon}
      </div>
      <span className={`mt-1 text-[8px] font-black ${labelClass}`}>
        {label}
      </span>
    </div>
  );
};

const DetailRow = ({ icon, label, value, bgToggle }) => {
  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-2xl px-3 py-2 ${
        bgToggle ? "bg-white/[0.05]" : "bg-white"
      }`}
    >
      <div className="flex items-center min-w-0 gap-2">
        <span className={bgToggle ? "text-slate-400" : "text-slate-500"}>
          {icon}
        </span>
        <p
          className={`text-[10px] font-bold ${
            bgToggle ? "text-slate-400" : "text-slate-500"
          }`}
        >
          {label}
        </p>
      </div>

      <p className="max-w-[130px] truncate text-right text-[11px] font-black">
        {value}
      </p>
    </div>
  );
};

const BillItem = ({ item, bgToggle }) => {
  const qty = Number(item?.qty || 1);
  const price = Number(item?.price || 0);
  const total = price * qty;

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="text-xs font-black truncate">
          {item?.name || "Product Item"}
        </p>
        <p
          className={`text-[10px] font-semibold ${
            bgToggle ? "text-slate-400" : "text-slate-500"
          }`}
        >
          Qty {qty} × {formatPrice(price)}
        </p>
      </div>

      <p className="text-xs font-black shrink-0">{formatPrice(total)}</p>
    </div>
  );
};

export default Orders;