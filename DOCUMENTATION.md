# Project Documentation

This document provides instructions on how to use this Content Management System (CMS) for both administrators and customers.

## For Administrators (Content Creators)

As an administrator, you have full control over creating, managing, and publishing content.

### 1. Creating a Project

- Navigate to the "Create Project" page.
- Provide a title and an optional description for your project.
- You can either save the project as a draft or publish it immediately.

### 2. Managing Projects

- The "Projects" page lists all your projects.
- You can view, edit, or delete projects from this page.

### 3. Adding Content to a Project

- Open a project to view its details.
- In the project detail view, you can add new content.
- Each piece of content has a name and a set of key-value pairs.
- You can define the structure of your content by adding multiple key-value pairs.

### 4. Publishing Content

- When you create or update content, it is saved as a draft.
- You need to explicitly publish the content to make it accessible via the API.

### 5. API Key

- Each project has a unique API key.
- This key is used to authenticate and fetch content for the project.
- You can find the API key in the project details section.

## For Customers (Content Consumers)

As a customer, you can consume the content created by administrators using the provided API.

### 1. Fetching Content

- To fetch content, you need the project's API key and the content key.
- The API endpoint for fetching content is:
  ```
  /service/:contentKey
  ```
- You need to provide the API key in the request headers for authentication.

### Example API Request

```bash
curl -X GET \
  -H "Authorization: Bearer <YOUR_API_KEY>" \
  http://<your_domain>/service/<your_content_key>
```

This will return the content in JSON format.

```