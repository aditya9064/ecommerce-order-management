public class TestOrder {
    public static void main(String[] args) {
        // Create some products
        Product laptop = new Product("P001", "Gaming Laptop", 75000.00);
        Product mouse = new Product("P002", "Wireless Mouse", 2500.00);
        Product keyboard = new Product("P003", "Mechanical Keyboard", 4500.00);
        
        // Create a customer
        Customer customer = new Customer("C001", "Aditya Miriyala", "123 Tech Street, Bangalore");
        
        // Create an order
        Order order = new Order("ORD001", customer);
        
        // Add products to the order
        order.addProduct(laptop);
        order.addProduct(mouse);
        order.addProduct(keyboard);
        
        // Display the complete order
        System.out.println("=== COMPLETE ORDER DETAILS ===");
        System.out.println(order.toString());
        
        // Test updating status
        order.updateStatus(OrderStatus.SHIPPED);
        System.out.println("=== AFTER STATUS UPDATE ===");
        System.out.println("Order Status: " + order.getStatus());
        
        // Test individual calculations
        System.out.println("=== INDIVIDUAL CALCULATIONS ===");
        System.out.println("Subtotal: ₹" + order.calculateTotal());
        System.out.println("Shipping: ₹" + order.calculateShipping());
        System.out.println("Grand Total: ₹" + (order.calculateTotal() + order.calculateShipping()));
    }
}