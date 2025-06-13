# Java Console E-Commerce Application

A complete order management system built with Java, demonstrating object-oriented programming principles and console-based user interaction.

## 🎯 Features

- **Interactive Console Menu**: User-friendly command-line interface
- **Product Management**: Add and manage products with pricing
- **Customer Management**: Handle customer information with validation
- **Order Processing**: Create orders, add multiple products, calculate totals
- **Order Tracking**: Update order status and view order history
- **Data Validation**: Input validation and error handling

## ��️ Architecture

### Core Classes

#### `Product.java`
- Encapsulates product information (ID, name, description, price, stock)
- Includes getters, setters, and toString method
- Demonstrates encapsulation and data validation

#### `Customer.java`
- Manages customer data (ID, name, email, phone)
- Includes email and phone validation
- Shows proper constructor usage and data encapsulation

#### `Order.java`
- Represents an order with customer, products, and status
- Calculates total amounts automatically
- Manages order timestamps and status updates

#### `OrderService.java`
- Service layer for business logic
- Manages collections of orders, products, and customers
- Provides methods for CRUD operations

#### `OrderStatus.java`
- Defines order status constants
- Ensures consistent status values throughout the application

#### `Main.java`
- Console application entry point
- Implements interactive menu system
- Handles user input and displays results

## 🚀 How to Run

1. **Compile all Java files:**
   ```bash
   javac *.java
   ```

2. **Run the main application:**
   ```bash
   java Main
   ```

3. **Follow the interactive menu** to:
   - Create customers and products
   - Place new orders
   - Add products to orders
   - Update order status
   - View order history

## 🧪 Testing

The `tests/` directory contains unit tests for each major component:

### Run Tests
```bash
cd tests
javac *.java
java TestProduct
java TestOrder
java TestOrderService
```

### Test Coverage
- **TestProduct.java**: Product creation, validation, and methods
- **TestOrder.java**: Order processing, calculations, and status updates
- **TestOrderService.java**: Service layer operations and data management

## 📚 Learning Objectives

This project demonstrates:

### Object-Oriented Programming
- **Encapsulation**: Private fields with public getters/setters
- **Constructors**: Proper object initialization
- **Methods**: Business logic implementation
- **Static vs Instance**: Understanding class vs object members

### Java Fundamentals
- **Collections**: ArrayList for dynamic data storage
- **Input/Output**: Scanner for console interaction
- **String Handling**: Validation and formatting
- **Exception Handling**: Basic error management

### Software Design
- **Separation of Concerns**: Model, Service, and UI layers
- **Data Validation**: Input checking and error prevention
- **Code Organization**: Logical class structure
- **Testing**: Unit testing practices

## 🎮 Sample Usage

```
=== E-Commerce Order Management System ===
1. Create Customer
2. Create Product
3. Create Order
4. Add Product to Order
5. Update Order Status
6. List All Orders
7. Exit

Choose an option: 1
Enter customer name: John Doe
Enter customer email: john@example.com
Enter customer phone: 555-1234
Customer created successfully!
```

## 🔄 Order Status Flow

1. **PENDING** - Initial order state
2. **PROCESSING** - Order is being prepared
3. **SHIPPED** - Order has been dispatched
4. **DELIVERED** - Order successfully delivered
5. **CANCELLED** - Order was cancelled

## 💡 Key Concepts Learned

- **Encapsulation**: Data hiding with private fields
- **Constructors**: Object initialization patterns
- **Static vs Instance**: Class-level vs object-level members
- **Collections**: Dynamic arrays with ArrayList
- **Input Validation**: Data integrity and error handling
- **Console I/O**: User interaction patterns
- **Code Organization**: Clean, maintainable structure

---

This console application serves as the foundation for the full-stack e-commerce system, demonstrating core Java concepts in a practical, real-world scenario.
