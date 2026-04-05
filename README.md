# Finance Dashboard

This project is a simple and interactive finance dashboard designed to help users understand and manage their financial activities. It provides a clear overview of income, expenses, and overall balance, along with tools to explore transactions and basic spending insights.

The goal of this project is not complexity, but clarity — focusing on clean UI, structured components, and meaningful user interaction.

---

## Key Features

* Overview cards showing total balance, income, and expenses
* Ability to add, edit, and delete transactions (Admin only)
* Filtering transactions by type (income/expense) and category
* Search and sorting functionality for better data exploration
* Role-based interface (Viewer and Admin modes)
* Admin access controlled through a password prompt (frontend simulation)
* Insights such as top spending category and savings rate
* Dark mode toggle for better user experience
* Local storage support to retain data between sessions
* Smooth animations for improved UI feel

---

## Admin Access (Demonstration Purpose)

To simulate role-based access control, the Admin mode requires a password.

* Click on the **Admin** button in the header
* Enter the password: `admin123`
* Once verified, you can manage transactions (add/edit/delete)

Note: This password system is implemented only on the frontend to demonstrate role-based behavior. In real applications, such logic is handled securely using backend authentication and authorization systems.

---

## Tech Stack

* React
* TypeScript
* Tailwind CSS
* Framer Motion

---

## How to Run Locally

1. Clone the repository

```bash
git clone https://github.com/Engamansinghtomar/finance-dashboard.git
```

2. Open the project directory

```bash
cd finance-dashboard
```

3. Install required packages

```bash
npm install
```

4. Start the development server

```bash
npm run dev
```

---

## Development Approach

The application is built with a focus on simplicity and structure. Components are kept modular and reusable, while the global state is handled using the Context API to keep things organized.

Some key considerations during development:

* Keeping the UI minimal and easy to understand
* Managing state in a predictable and scalable way
* Simulating real-world concepts like role-based access
* Ensuring smooth user interaction with subtle animations

---

## Possible Improvements

* Integration with a backend for secure authentication and data storage
* More advanced filtering and grouping options
* Exporting transaction data (CSV or JSON)
* Enhanced analytics and reporting features

---
## for the demo visit link : https://finance-dashboard-5dz5.vercel.app/

---
## Author

Aman Singh
