import java.util.List;

public class TestOrderService {
    public static void main(String[] args) {
        // Create OrderService
        OrderService orderService = new OrderService();
        
        // Create some products
        Product laptop = new Product("P001", "Gaming Laptop", 75000.00);
        Product mouse = new Product("P002", "Wireless Mouse", 2500.00);
        Product headphones = new Product("P003", "Gaming Headphones", 8500.00);
        
        // Create customers
        Customer customer1 = new Customer("C001", "Aditya Miriyala", "123 Tech Street, Bangalore");
        Customer customer2 = new Customer("C002", "Priya Sharma", "456 Mall Road, Delhi");
        
        // Create orders using OrderService
        Order order1 = orderService.createOrder("ORD001", customer1);
        order1.addProduct(laptop);
        order1.addProduct(mouse);
        
        Order order2 = orderService.createOrder("ORD002", customer2);
        order2.addProduct(headphones);
        order2.updateStatus(OrderStatus.SHIPPED);
        
        Order order3 = orderService.createOrder("ORD003", customer1);
        order3.addProduct(laptop);
        order3.addProduct(headphones);
        order3.updateStatus(OrderStatus.DELIVERED);
        
        // Test: List all orders
        System.out.println("=== ALL ORDERS ===");
        List<Order> allOrders = orderService.listAllOrders();
        for (Order order : allOrders) {
            System.out.println("Order: " + order.getOrderId() + " - Status: " + order.getStatus());
        }
        
        // Test: Filter by status
        System.out.println("\n=== PENDING ORDERS ===");
        List<Order> pendingOrders = orderService.listByStatus(OrderStatus.PENDING);
        for (Order order : pendingOrders) {
            System.out.println(order.toString());
        }
        
        // Test: Find specific order
        System.out.println("\n=== FIND ORDER ORD002 ===");
        Order foundOrder = orderService.findOrderById("ORD002");
        if (foundOrder != null) {
            System.out.println(foundOrder.toString());
        } else {
            System.out.println("Order not found!");
        }
        
        // Test: Static counter
        System.out.println("\n=== TOTAL ORDERS PROCESSED ===");
        System.out.println("Total orders processed: " + OrderService.getTotalOrdersProcessed());
    }
}