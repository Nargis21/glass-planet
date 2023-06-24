import React, { useEffect, useState } from "react";
import "./style.css";
import OrderTable from "./OrderTable";
import ordersData from "../../data/orders.json";

const Orders = () => {
  const [selectedTab, setSelectedTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setOrders(ordersData);
      } catch (error) {
        console.error("Error loading orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
    setCurrentPage(1);
  };

  const filteredOrders =
    selectedTab === "All"
      ? orders
      : orders.filter((order) => order.deliveryType === selectedTab);

  return (
    <div>
      <h1>
        Orders of <span>Anti Blue Ray Glasses</span>
      </h1>
      <div className="tabs">
        <button
          className={selectedTab === "All" ? "active" : ""}
          onClick={() => handleTabClick("All")}
        >
          All Orders
        </button>
        <button
          className={selectedTab === "Regular" ? "active" : ""}
          onClick={() => handleTabClick("Regular")}
        >
          Regular Delivery
        </button>
        <button
          className={selectedTab === "Express" ? "active" : ""}
          onClick={() => handleTabClick("Express")}
        >
          Express Delivery
        </button>
      </div>
      <OrderTable
        orders={filteredOrders}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      ></OrderTable>
    </div>
  );
};

export default Orders;
