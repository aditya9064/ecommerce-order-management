import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {
    private static OrderService orderService = new OrderService();
    private static ArrayList<Product> productCatalog = new ArrayList<>();
    private static Scanner scanner = new Scanner(System.in);
    
    public static void main(String[] args) {
        // Preload product catalog
        loadProductCatalog();
        
        System.out.println("🛒 Welcome to E-Commerce Order Processing System! 🛒");
        System.out.println("=".repeat(50));
        
        // Main menu loop
        boolean running = true;
        while (running) {
            showMenu();
            int choice = getIntInput("Enter your choice: ");
            
            switch (choice) {
                case 1:
                    createNewOrder();
                    break;
                case 2:
                    addProductToOrder();
                    break;
                case 3:
                    viewOrderDetails();
                    break;
                case 4:
                    updateOrderStatus();
                    break;
                case 5:
                    listAllOrders();
                    break;
                case 6:
                    listOrdersByStatus();
                    break;
                case 7:
                    running = false;
                    System.out.println("\n🎉 Thank you for using our system!");
                    System.out.println("Total orders processed: " + OrderService.getTotalOrdersProcessed());
                    break;
                default:
                    System.out.println("❌ Invalid choice! Please try again.");
            }
            
            if (running) {
                System.out.println("\nPress Enter to continue...");
                scanner.nextLine();
            }
        }
        
        scanner.close();
    }
    
    private static void showMenu() {
        System.out.println("\n" + "=".repeat(50));
        System.out.println("📋 MAIN MENU");
        System.out.println("=".repeat(50));
        System.out.println("1. 🆕 Create new order");
        System.out.println("2. ➕ Add product to order");
        System.out.println("3. 👀 View order details");
        System.out.println("4. 📦 Update order status");
        System.out.println("5. 📊 List all orders");
        System.out.println("6. 🔍 List orders by status");
        System.out.println("7. 🚪 Exit");
        System.out.println("=".repeat(50));
    }
    
    private static void loadProductCatalog() {
        productCatalog.add(new Product("P001", "Gaming Laptop", 75000.00));
        productCatalog.add(new Product("P002", "Wireless Mouse", 2500.00));
        productCatalog.add(new Product("P003", "Mechanical Keyboard", 4500.00));
        productCatalog.add(new Product("P004", "Gaming Headphones", 8500.00));
        productCatalog.add(new Product("P005", "4K Monitor", 25000.00));
        productCatalog.add(new Product("P006", "Webcam", 3500.00));
        productCatalog.add(new Product("P007", "USB Drive 64GB", 1200.00));
        productCatalog.add(new Product("P008", "Phone Case", 800.00));
    }
    
    private static void createNewOrder() {
        System.out.println("\n🆕 CREATE NEW ORDER");
        System.out.println("-".repeat(30));
        
        String orderId = getStringInput("Enter Order ID (e.g., ORD001): ");
        
        // Check if order ID already exists
        if (orderService.findOrderById(orderId) != null) {
            System.out.println("❌ Order ID already exists! Please use a different ID.");
            return;
        }
        
        System.out.println("\n📝 Enter Customer Details:");
        String customerId = getStringInput("Customer ID (e.g., C001): ");
        String customerName = getStringInput("Customer Name: ");
        String customerAddress = getStringInput("Customer Address: ");
        
        Customer customer = new Customer(customerId, customerName, customerAddress);
        Order order = orderService.createOrder(orderId, customer);
        
        System.out.println("✅ Order created successfully!");
        System.out.println("Order: " + order.getOrderId() + " for " + customer.getName());
    }
    
    private static void addProductToOrder() {
        System.out.println("\n➕ ADD PRODUCT TO ORDER");
        System.out.println("-".repeat(30));
        
        String orderId = getStringInput("Enter Order ID: ");
        Order order = orderService.findOrderById(orderId);
        
        if (order == null) {
            System.out.println("❌ Order not found!");
            return;
        }
        
        // Show available products
        System.out.println("\n🛍️ Available Products:");
        System.out.println("-".repeat(40));
        for (Product product : productCatalog) {
            System.out.println(product.toString());
        }
        
        String productId = getStringInput("\nEnter Product ID: ");
        Product selectedProduct = findProductById(productId);
        
        if (selectedProduct == null) {
            System.out.println("❌ Product not found!");
            return;
        }
        
        order.addProduct(selectedProduct);
        System.out.println("✅ Product added to order!");
        System.out.println("Added: " + selectedProduct.toString());
    }
    
    private static void viewOrderDetails() {
        System.out.println("\n👀 VIEW ORDER DETAILS");
        System.out.println("-".repeat(30));
        
        String orderId = getStringInput("Enter Order ID: ");
        Order order = orderService.findOrderById(orderId);
        
        if (order == null) {
            System.out.println("❌ Order not found!");
            return;
        }
        
        System.out.println("\n📋 Order Details:");
        System.out.println("=".repeat(50));
        System.out.println(order.toString());
    }
    
    private static void updateOrderStatus() {
        System.out.println("\n📦 UPDATE ORDER STATUS");
        System.out.println("-".repeat(30));
        
        String orderId = getStringInput("Enter Order ID: ");
        Order order = orderService.findOrderById(orderId);
        
        if (order == null) {
            System.out.println("❌ Order not found!");
            return;
        }
        
        System.out.println("Current status: " + order.getStatus());
        System.out.println("\nAvailable statuses:");
        System.out.println("1. " + OrderStatus.PENDING);
        System.out.println("2. " + OrderStatus.SHIPPED);
        System.out.println("3. " + OrderStatus.DELIVERED);
        
        int choice = getIntInput("Choose new status (1-3): ");
        String newStatus;
        
        switch (choice) {
            case 1:
                newStatus = OrderStatus.PENDING;
                break;
            case 2:
                newStatus = OrderStatus.SHIPPED;
                break;
            case 3:
                newStatus = OrderStatus.DELIVERED;
                break;
            default:
                System.out.println("❌ Invalid choice!");
                return;
        }
        
        order.updateStatus(newStatus);
        System.out.println("✅ Order status updated to: " + newStatus);
    }
    
    private static void listAllOrders() {
        System.out.println("\n📊 ALL ORDERS");
        System.out.println("-".repeat(30));
        
        List<Order> orders = orderService.listAllOrders();
        
        if (orders.isEmpty()) {
            System.out.println("📭 No orders found!");
            return;
        }
        
        for (Order order : orders) {
            System.out.println("Order: " + order.getOrderId() + 
                             " | Customer: " + order.getCustomer().getName() + 
                             " | Status: " + order.getStatus() +
                             " | Total: ₹" + String.format("%.2f", order.calculateTotal() + order.calculateShipping()));
        }
        
        System.out.println("\nTotal orders: " + orders.size());
    }
    
    private static void listOrdersByStatus() {
        System.out.println("\n🔍 FILTER ORDERS BY STATUS");
        System.out.println("-".repeat(30));
        
        System.out.println("Choose status to filter:");
        System.out.println("1. " + OrderStatus.PENDING);
        System.out.println("2. " + OrderStatus.SHIPPED);
        System.out.println("3. " + OrderStatus.DELIVERED);
        
        int choice = getIntInput("Enter choice (1-3): ");
        String status;
        
        switch (choice) {
            case 1:
                status = OrderStatus.PENDING;
                break;
            case 2:
                status = OrderStatus.SHIPPED;
                break;
            case 3:
                status = OrderStatus.DELIVERED;
                break;
            default:
                System.out.println("❌ Invalid choice!");
                return;
        }
        
        List<Order> filteredOrders = orderService.listByStatus(status);
        
        if (filteredOrders.isEmpty()) {
            System.out.println("📭 No orders found with status: " + status);
            return;
        }
        
        System.out.println("\n📋 Orders with status: " + status);
        System.out.println("-".repeat(40));
        for (Order order : filteredOrders) {
            System.out.println("Order: " + order.getOrderId() + 
                             " | Customer: " + order.getCustomer().getName() +
                             " | Total: ₹" + String.format("%.2f", order.calculateTotal() + order.calculateShipping()));
        }
    }
    
    // Helper methods
    private static String getStringInput(String prompt) {
        System.out.print(prompt);
        return scanner.nextLine().trim();
    }
    
    private static int getIntInput(String prompt) {
        while (true) {
            try {
                System.out.print(prompt);
                int result = Integer.parseInt(scanner.nextLine().trim());
                return result;
            } catch (NumberFormatException e) {
                System.out.println("❌ Please enter a valid number!");
            }
        }
    }
    
    private static Product findProductById(String productId) {
        for (Product product : productCatalog) {
            if (product.getId().equals(productId)) {
                return product;
            }
        }
        return null;
    }
}
