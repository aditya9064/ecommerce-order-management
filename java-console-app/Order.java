import java.util.ArrayList;
public class Order {
    private String orderId;
    private Customer customer;
    private ArrayList<Product> items;
    private String status;

    public Order(String orderId, Customer customer) {
        this.orderId = orderId;
        this.customer = customer;
        this.items = new ArrayList<>();
        this.status = OrderStatus.PENDING;
    }
    
    public String getOrderId() {
        return orderId;
    }
    public Customer getCustomer() {
        return customer;
    }
    public String getStatus() {
        return status;
    }
    public void addProduct(Product product) {
        items.add(product);
    }

    public double calculateTotal() {
        double total = 0.0;
        for (Product product : items) {
            total += product.getPrice();
        }
        return total;
    }

    public double calculateShipping() {
        return 100.0;
    }

    public void updateStatus(String newStatus){
        this.status = newStatus;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("Order ID: ").append(orderId).append("\n");
        sb.append("Customer: ").append(customer.toString()).append("\n");
        sb.append("Items:\n");
        for (Product item : items) {
            sb.append(" - ").append(item.toString()).append("\n");
        }
        sb.append("Subtotal: ₹").append(String.format("%.2f", calculateTotal())).append("\n");
        sb.append("Shipping: ₹").append(String.format("%.2f", calculateShipping())).append("\n");
        sb.append("Total: ₹").append(String.format("%.2f", calculateTotal() + calculateShipping())).append("\n");
        sb.append("Status: ").append(status).append("\n");
        return sb.toString();
    }
}



