# E-Commerce Order Management System

A comprehensive e-commerce order processing system built with Java console application and modern React frontend with Material-UI.

## 🚀 Project Overview

This project demonstrates a full-stack e-commerce order management system with two main components:
- **Java Console Application**: Core business logic and order processing
- **React Frontend**: Modern web interface with Material-UI design

## 📁 Project Structure

```
ecommerce-order-management/
├── java-console-app/           # Java backend with console interface
│   ├── OrderStatus.java        # Order status constants
│   ├── Product.java            # Product model with encapsulation
│   ├── Customer.java           # Customer model with validation
│   ├── Order.java              # Order model with business logic
│   ├── OrderService.java       # Service layer for order operations
│   ├── Main.java               # Console application entry point
│   └── tests/                  # Unit tests
│       ├── TestOrder.java
│       ├── TestProduct.java
│       └── TestOrderService.java
├── ecommerce-ui/               # React frontend application
│   ├── src/
│   │   ├── pages/              # Main application pages
│   │   │   ├── Dashboard.js    # Analytics and overview
│   │   │   ├── ProductCatalog.js  # Product management
│   │   │   ├── OrderManagement.js # Order processing
│   │   │   └── CustomerManagement.js # Customer management
│   │   ├── components/         # Reusable UI components
│   │   ├── App.js              # Main React component
│   │   └── index.js            # Application entry point
│   ├── public/
│   ├── package.json
│   └── README.md
└── README.md                   # This file
```

## 🛠️ Technologies Used

### Backend (Java Console App)
- **Java 11+**: Core programming language
- **Object-Oriented Programming**: Classes, encapsulation, inheritance
- **Collections Framework**: ArrayList for data management
- **Console I/O**: Scanner for user interaction

### Frontend (React Web App)
- **React 18**: Modern frontend framework
- **Material-UI (MUI)**: Professional UI component library
- **React Router**: Client-side routing
- **JavaScript ES6+**: Modern JavaScript features

## 🏃‍♂️ Getting Started

### Prerequisites
- Java JDK 11 or higher
- Node.js 16+ and npm
- Git

### Running the Java Console Application

1. Navigate to the Java console app directory:
   ```bash
   cd java-console-app
   ```

2. Compile the Java files:
   ```bash
   javac *.java
   ```

3. Run the main application:
   ```bash
   java Main
   ```

4. Run tests:
   ```bash
   cd tests
   javac *.java
   java TestProduct
   java TestOrder
   java TestOrderService
   ```

### Running the React Frontend

1. Navigate to the React app directory:
   ```bash
   cd ecommerce-ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and visit: `http://localhost:3000`

## 🎯 Features

### Java Console Application
- **Product Management**: Create and manage product catalog
- **Customer Management**: Handle customer information with validation
- **Order Processing**: Create orders, add products, update status
- **Order Tracking**: View order history and current status
- **Interactive Menu**: User-friendly console interface
- **Data Validation**: Input validation and error handling

### React Web Application
- **Modern Dashboard**: Overview of orders, products, and customers
- **Product Catalog**: Visual product management with add/edit functionality
- **Order Management**: Comprehensive order tracking and status updates
- **Customer Management**: Customer database with contact information
- **Responsive Design**: Works on desktop and mobile devices
- **Material-UI Components**: Professional and consistent UI/UX

## 📊 Business Logic

### Order Status Flow
1. **PENDING**: Initial order state
2. **PROCESSING**: Order is being prepared
3. **SHIPPED**: Order has been dispatched
4. **DELIVERED**: Order successfully delivered
5. **CANCELLED**: Order was cancelled

### Core Models
- **Product**: ID, name, description, price, stock quantity
- **Customer**: ID, name, email, phone with validation
- **Order**: ID, customer, products list, total amount, status, timestamps

## 🧪 Testing

The project includes comprehensive unit tests for:
- Product creation and validation
- Order processing and calculations
- Order service operations
- Customer data handling

## 🔮 Future Enhancements

- **Backend API**: Spring Boot REST API
- **Database Integration**: PostgreSQL or MySQL
- **Authentication**: User login and authorization
- **Payment Integration**: Stripe or PayPal
- **Real-time Updates**: WebSocket notifications
- **Deployment**: Docker containerization
- **Cloud Hosting**: AWS or Heroku deployment

## 👨‍💻 Development Journey

This project demonstrates:
- **Object-Oriented Programming**: Encapsulation, inheritance, polymorphism
- **Modern Frontend Development**: React hooks, state management, routing
- **UI/UX Design**: Material Design principles, responsive layouts
- **Code Organization**: Clean architecture, separation of concerns
- **Testing**: Unit testing and validation
- **Version Control**: Git workflow and documentation

## 📝 License

This project is for educational and demonstration purposes.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements!

---

**Built with ❤️ for learning full-stack development**
