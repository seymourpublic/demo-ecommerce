### ECOMMERCE DASHBOARD

Project Description:
This project is an Ecommerce Dashboard that allows users to manage products, billboards, categories, product sizes, and view orders. It also provides an overview of orders over time and supports multiple store dashboards. The dashboard is built using components from Shadcn and utilizes CSS, TypeScript, and JavaScript. The backend database is powered by PlanetScale, Prisma, and MySQL, and user authentication is handled through Clerk.
### Table of Contents

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

### INTRODUCTION

[Provide a more detailed introduction to the project. Explain the purpose of the dashboard, its intended users, and the benefits it offers.]
Features

    Product Management: Users can add, modify, and delete products that they want to display on the Ecommerce website. They can set product details, images, prices, and availability.

    Billboard Management: Admins can control billboards to highlight specific products or promotions on the website's homepage.

    Category Management: Admins can create and manage categories to organize products effectively.

    Product Size: Support for different product sizes, such as small, medium, and large, is available.

    Order Overview: The dashboard provides an overview of orders over time, allowing Admins to track sales performance.

    Multiple Store Dashboards: If applicable, Admins can switch between different store dashboards, each with its own product catalog and order history.

#### Getting Started
Prerequisites

    [List the prerequisites, such as Node.js, npm, and any specific versions required for the project.]

Installation

    [Provide step-by-step instructions on how to clone the repository and install the project dependencies.]

    [Explain how to set up the database using Prisma and MySQL, including any required configuration.]
#### USAGE
The following examples demonstrate how to use functions from the "actions" folder.
getGraphRevenue

The getGraphRevenue function fetches revenue data from the database and converts it into a format suitable for a graph.
<getGraphRevenue>
```typescript

    import { getGraphRevenue } from "@/actions/revenue-utils";

    const storeId = "your-store-id";
    const graphData = await getGraphRevenue(storeId);
    console.log(graphData);

```
<getGraphRevenue/>

getSalesCount

The getSalesCount function retrieves the total sales count for a specific store from the database.
<getSalesCount>
```typescript

    import { getSalesCount } from "@/actions/sales-utils";

    const storeId = "your-store-id";
    const salesCount = await getSalesCount(storeId);
    console.log("Total Sales Count:", salesCount);

```
<getSalesCount/>
getStockCount

The getStockCount function fetches the total stock count of active products for a specific store from the database.
<getStockCount>
```typescript

    import { getStockCount } from "@/actions/stock-utils";

    const storeId = "your-store-id";
    const stockCount = await getStockCount(storeId);
    console.log("Total Stock Count:", stockCount);

```
<getStockCount/>
### API DOCUMENTATION

#### API Endpoints Documentation

This API module contains three endpoints to perform CRUD (Create, Read, Update, Delete) operations on billboards. The endpoints are used to interact with the prismadb database to fetch, create, update, and delete billboard data.
Table of Contents

    GET /api/billboard/:billboardId
    DELETE /api/billboard/:billboardId/:storeId
-[PATCH /api/billboard/:billboardId/](:storeId)
- [GET /api/category/:categoryId](#get-apicategorycategoryid)
- [DELETE /api/category/:categoryId/:storeId](#delete-apicategorycategoryidstoreid)
- [PATCH /api/category/:categoryId/:storeId](#patch-apicategorycategoryidstoreid)
- [POST /api/categories/:storeId](#post-apicategoriesstoreid)
- [GET /api/categories/:storeId](#get-apicategoriesstoreid)

GET /api/billboard/:billboardId

This endpoint fetches billboard data by its billboardId from the database.
Request Parameters

    billboardId (required): The ID of the billboard to retrieve from the database.

Response

    If the billboardId is not provided in the request parameters, the endpoint will return a 400 Bad Request response with the message "Billboard id is required."
    If the requested billboard is found in the database, the endpoint will return a 200 OK response with the billboard data in JSON format.
    If the requested billboard is not found in the database, the endpoint will return a 404 Not Found response.

DELETE /api/billboard/:billboardId/:storeId

This endpoint deletes a billboard from the database based on its billboardId. Only an authenticated user who owns the storeId associated with the billboard can perform the deletion.
Request Parameters

    billboardId (required): The ID of the billboard to delete from the database.
    storeId (required): The ID of the store associated with the billboard.

Request Headers

    The endpoint expects the Authorization header with a valid JWT token for authentication.

Response

    If the user is not authenticated, the endpoint will return a 403 Forbidden response with the message "Unauthenticated."
    If the billboardId or storeId is not provided in the request parameters, the endpoint will return a 400 Bad Request response with the appropriate error message.
    If the user is not the owner of the store associated with the billboard, the endpoint will return a 405 Method Not Allowed response with the message "Unauthorized."
    If the billboard is successfully deleted from the database, the endpoint will return a 200 OK response with the deleted billboard data in JSON format.
    If the requested billboard is not found in the database, the endpoint will return a 404 Not Found response.

PATCH /api/billboard/:billboardId/:storeId

This endpoint updates a billboard's data in the database based on its billboardId. Only an authenticated user who owns the storeId associated with the billboard can perform the update.
Request Parameters

    billboardId (required): The ID of the billboard to update in the database.
    storeId (required): The ID of the store associated with the billboard.

Request Headers

    The endpoint expects the Authorization header with a valid JWT token for authentication.

Request Body

The request body must contain a JSON object with the following properties:

    label (required): The updated label of the billboard.
    imageUrl (required): The updated URL of the billboard's image.

Response

    If the user is not authenticated, the endpoint will return a 403 Forbidden response with the message "Unauthenticated."
    If the label, imageUrl, billboardId, or storeId is missing or invalid in the request, the endpoint will return a 400 Bad Request response with the appropriate error message.
    If the user is not the owner of the store associated with the billboard, the endpoint will return a 405 Method Not Allowed response with the message "Unauthorized."
    If the billboard is successfully updated in the database, the endpoint will return a 200 OK response with the updated billboard data in JSON format.
    If the requested billboard is not found in the database, the endpoint will return a 404 Not Found response.


## `GET /api/category/:categoryId`

This endpoint fetches category data by its `categoryId` from the database.

### Request Parameters

- `categoryId` (required): The ID of the category to retrieve from the database.

### Response

- If the `categoryId` is not provided in the request parameters, the endpoint will return a 400 Bad Request response with the message "Category id is required."
- If the requested category is found in the database, the endpoint will return a 200 OK response with the category data in JSON format, including the associated billboard data.
- If the requested category is not found in the database, the endpoint will return a 404 Not Found response.

## `DELETE /api/category/:categoryId/:storeId`

This endpoint deletes a category from the database based on its `categoryId`. Only an authenticated user who owns the `storeId` associated with the category can perform the deletion.

### Request Parameters

- `categoryId` (required): The ID of the category to delete from the database.
- `storeId` (required): The ID of the store associated with the category.

### Request Headers

- The endpoint expects the `Authorization` header with a valid JWT token for authentication.

### Response

- If the user is not authenticated, the endpoint will return a 403 Forbidden response with the message "Unauthenticated."
- If the `categoryId` or `storeId` is not provided in the request parameters, the endpoint will return a 400 Bad Request response with the appropriate error message.
- If the user is not the owner of the store associated with the category, the endpoint will return a 405 Method Not Allowed response with the message "Unauthorized."
- If the category is successfully deleted from the database, the endpoint will return a 200 OK response with the deleted category data in JSON format.
- If the requested category is not found in the database, the endpoint will return a 404 Not Found response.

## `PATCH /api/category/:categoryId/:storeId`

This endpoint updates a category's data in the database based on its `categoryId`. Only an authenticated user who owns the `storeId` associated with the category can perform the update.

### Request Parameters

- `categoryId` (required): The ID of the category to update in the database.
- `storeId` (required): The ID of the store associated with the category.

### Request Headers

- The endpoint expects the `Authorization` header with a valid JWT token for authentication.

### Request Body

The request body must contain a JSON object with the following properties:

- `name` (required): The updated name of the category.
- `billboardId` (required): The updated ID of the associated billboard.

### Response

- If the user is not authenticated, the endpoint will return a 403 Forbidden response with the message "Unauthenticated."
- If the `name`, `billboardId`, `categoryId`, or `storeId` is missing or invalid in the request, the endpoint will return a 400 Bad Request response with the appropriate error message.
- If the user is not the owner of the store associated with the category, the endpoint will return a 405 Method Not Allowed response with the message "Unauthorized."
- If the category is successfully updated in the database, the endpoint will return a 200 OK response with the updated category data in JSON format.
- If the requested category is not found in the database, the endpoint will return a 404 Not Found response.

---

## `POST /api/categories/:storeId`

This endpoint allows creating a new category for a specific store.

### Request Parameters

- `storeId` (required): The ID of the store to which the category will be added.

### Request Headers

- The endpoint expects the `Authorization` header with a valid JWT token for authentication.

### Request Body

The request body must contain a JSON object with the following properties:

- `name` (required): The name of the new category.
- `billboardId` (required): The ID of the associated billboard for the new category.

### Response

- If the user is not authenticated, the endpoint will return a 403 Forbidden response with the message "Unauthenticated."
- If the `name`, `billboardId`, or `storeId` is missing or invalid in the request, the endpoint will return a 400 Bad Request response with the appropriate error message.
- If the user is not the owner of the store associated with the category, the endpoint will return a 405 Method Not Allowed response with the message "Unauthorized."
- If the category is successfully created and added to the database, the endpoint will return a 200 OK response with the created category data in JSON format.

## `GET /api/categories/:storeId`

This endpoint fetches all categories associated with a specific store.

### Request Parameters

- `storeId` (required): The ID of the store for which to retrieve categories.

### Response

- If the `storeId` is not provided in the request parameters, the endpoint will return a 400 Bad Request response with the message "Store id is required."
- If categories are found for the specified store, the endpoint will return a 200 OK response with the categories data in JSON format.
- If no categories are found for the specified store, the endpoint will return an empty JSON array [].

---

