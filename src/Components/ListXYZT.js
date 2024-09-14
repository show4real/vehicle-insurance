import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm, message, Input, Row, Col } from "antd";
import styles from "../Components/FormSteps/PersonalInfo.module.css";

const ListXYZT = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [searchText, setSearchText] = useState(""); // New state for search text

  // Fetch forms using POST method
  const fetchForms = async (page = 1, rows = 10, search = "") => {
    setLoading(true);
    try {
      const response = await fetch("https://testapi.giantworkz.com/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ page, rows, search }), // Include search query in request
      });

      const result = await response.json();
      setData(result.forms.data);
      setTotalItems(result.forms.total);
    } catch (error) {
      message.error("Failed to fetch forms");
    } finally {
      setLoading(false);
    }
  };

  // Delete form using POST method
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        "https://testapi.giantworkz.com/api/delete/form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );

      const result = await response.json();
      if (result) {
        message.success("Form deleted successfully");
        fetchForms(currentPage, pageSize, searchText); // Reload the data with the search query
      } else {
        message.error("Form not found");
      }
    } catch (error) {
      message.error("Failed to delete form");
    }
  };

  // Handle pagination
  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
    fetchForms(pagination.current, pagination.pageSize, searchText);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
  };

  // Perform search when pressing enter in the search box
  const handleSearch = () => {
    setCurrentPage(1); // Reset to the first page on search
    fetchForms(1, pageSize, searchText); // Perform search
  };

  useEffect(() => {
    fetchForms(currentPage, pageSize, searchText);
  }, []);

  // Table columns definition
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      responsive: ["lg"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      responsive: ["lg"],
    },
    {
      title: "Covered Insurance",
      dataIndex: "coveredInsurance",
      key: "coveredInsurance",
      responsive: ["md"],
    },
    {
      title: "Moving Violations",
      dataIndex: "movingViolations",
      key: "movingViolations",
      responsive: ["md"],
    },
    {
      title: "VIN",
      dataIndex: "vin",
      key: "vin",
    },
    {
      title: "Vehicle Year",
      dataIndex: "vehicle_year",
      key: "vehicle_year",
      responsive: ["md"],
    },
    {
      title: "Vehicle Make",
      dataIndex: "vehicle_make",
      key: "vehicle_make",
    },
    {
      title: "Vehicle Model",
      dataIndex: "vehicle_model",
      key: "vehicle_model",
    },
    {
      title: "Vehicle Submodel",
      dataIndex: "vehicle_submodel",
      key: "vehicle_submodel",
      responsive: ["lg"],
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Popconfirm
          title="Are you sure you want to delete this form?"
          onConfirm={() => handleDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="danger">Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className={styles.formWrapper} style={{ marginBottom: 10 }}>
      {/* Search Box */}
      <Row justify="end" style={{ marginBottom: 16 }}>
        <Col>
          <Input.Search
            placeholder="Search forms"
            value={searchText}
            onChange={handleSearchChange}
            onSearch={handleSearch} // Trigger search on Enter or button click
            allowClear
            style={{ width: 200 }}
          />
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: totalItems,
        }}
        loading={loading}
        onChange={handleTableChange}
        scroll={{ x: 800 }} // Enables horizontal scroll on small screens
      />
    </div>
  );
};

export default ListXYZT;
