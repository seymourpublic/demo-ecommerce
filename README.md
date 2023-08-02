Ecommerce Dashboard

Project Description:
This project is an Ecommerce Dashboard that allows users to manage products, billboards, categories, product sizes, and view orders. It also provides an overview of orders over time and supports multiple store dashboards. The dashboard is built using components from Shadcn and utilizes CSS, TypeScript, and JavaScript. The backend database is powered by PlanetScale, Prisma, and MySQL, and user authentication is handled through Clerk.
Table of Contents

    Introduction
    Features
    Getting Started
        Prerequisites
        Installation
    Usage
    Database
    Authentication
    Contributing
    License
    Contact
    Acknowledgments

Introduction

[Provide a more detailed introduction to the project. Explain the purpose of the dashboard, its intended users, and the benefits it offers.]
Features

    Product Management: Users can add, modify, and delete products that they want to display on the Ecommerce website. They can set product details, images, prices, and availability.

    Billboard Management: Admins can control billboards to highlight specific products or promotions on the website's homepage.

    Category Management: Admins can create and manage categories to organize products effectively.

    Product Size: Support for different product sizes, such as small, medium, and large, is available.

    Order Overview: The dashboard provides an overview of orders over time, allowing Admins to track sales performance.

    Multiple Store Dashboards: If applicable, Admins can switch between different store dashboards, each with its own product catalog and order history.

Getting Started
Prerequisites

    [List the prerequisites, such as Node.js, npm, and any specific versions required for the project.]

Installation

    [Provide step-by-step instructions on how to clone the repository and install the project dependencies.]

    [Explain how to set up the database using Prisma and MySQL, including any required configuration.]

Usage

The following examples demonstrate how to use functions from the "actions" folder.
getGraphRevenue

The getGraphRevenue function fetches revenue data from the database and converts it into a format suitable for a graph.

    typescript

    import { getGraphRevenue } from "@/actions/revenue-utils";

    const storeId = "your-store-id";
    const graphData = await getGraphRevenue(storeId);
    console.log(graphData);

getSalesCount

The getSalesCount function retrieves the total sales count for a specific store from the database.

    typescript

    import { getSalesCount } from "@/actions/sales-utils";

    const storeId = "your-store-id";
    const salesCount = await getSalesCount(storeId);
    console.log("Total Sales Count:", salesCount);

getStockCount

The getStockCount function fetches the total stock count of active products for a specific store from the database.

    typescript

    import { getStockCount } from "@/actions/stock-utils";

    const storeId = "your-store-id";
    const stockCount = await getStockCount(storeId);
    console.log("Total Stock Count:", stockCount);



[Describe how to run the application and access the dashboard. Provide any relevant login credentials or initial setup steps.]
Database

[Explain the structure of the database, including the various tables and relationships used to store product data, order details, etc.]
Authentication

[Provide information about how user authentication is handled through Clerk. Explain the registration and login processes.]
Contributing

[Include guidelines for other developers who wish to contribute to the project. Specify the process for submitting pull requests, reporting issues, and discussing new features.]
License

[Specify the license under which the project is released. For example, MIT, Apache, GPL, etc.]
Contact

[Provide contact information for the project maintainer or team, such as an email address or a link to a public communication channel.]
Acknowledgments

[List any individuals, organizations, or resources that have been helpful during the development of the project.]
