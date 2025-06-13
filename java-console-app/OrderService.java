import java.util.ArrayList;
import java.util.List;

public class OrderService {
    private ArrayList<Order> orders;
    private static int totalOrdersProcessed = 0;  // Static counter
    
    // Constructor
    public OrderService() {
        this.orders = new ArrayList<>();
    }
    
    // Create a new order and add it to our "database"
    public Order createOrder(String orderId, Customer customer) {
        Order newOrder = new Order(orderId, customer);
        orders.add(newOrder);
        totalOrdersProcessed++;  // Increment static counter
        return newOrder;
    }
    
    // Get all orders
    public List<Order> listAllOrders() {
        return new ArrayList<>(orders);  // Return a copy for safety
    }
    
    // Filter orders by status
    public List<Order> listByStatus(String status) {
        List<Order> filtered = new ArrayList<>();
        for (Order order : orders) {
            if (order.getStatus().equals(status)) {
                filtered.add(order);
            }
        }
        return filtered;
    }
    
    // Find a specific order by ID
    public Order findOrderById(String orderId) {
        for (Order order : orders) {
            if (order.getOrderId().equals(orderId)) {
                return order;
            }
        }
        return null;  // Not found
    }
    
    // Static method to get total orders processed across ALL OrderService instances
    public static int getTotalOrdersProcessed() {
        return totalOrdersProcessed;
    }
}