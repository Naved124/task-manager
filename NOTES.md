# Notes

## 1. Multi-User Support
To support multiple users, I would introduce a `User` model and add a `userId` reference field (`ObjectId`) to the existing `Task` schema. I would implement an authentication layer (e.g., JWT-based) so that all protected API routes can extract the authenticated user's ID from the token and ensure users can only create, read, update, or delete their own tasks.

## 2. Performance with Thousands of Items
The immediate performance concern would be data over-fetching, which leads to slow API responses and client-side rendering bottlenecks. To address this, I would implement cursor-based or offset pagination on the backend and an infinite scroll or paginated view on the frontend, alongside adding MongoDB indexes on frequently filtered/sorted fields like `status`, `dueDate`, and `priority`.

## 3. AI Tools Usage
I utilized an AI coding assistant during this task to help boilerplate the React components. However, I explicitly rejected its suggestion to use Tailwind CSS for the frontend styling. I chose to use Vanilla CSS instead, as I wanted to build a custom, rich glassmorphism design system (`index.css`) to ensure maximum control over the aesthetics and satisfy the goal of creating a premium, dynamic UI.
