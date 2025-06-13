public class TestProduct {
    public static void main(String[] args) {
        Product laptop = new Product("P001", "Laptop", 75000.00);
        System.out.println("Product: " + laptop.toString());
        System.out.println("ID: " + laptop.getId());
        System.out.println("Name: " + laptop.getName());
        System.out.println("Price: " + laptop.getPrice());

        laptop.setPrice(65000.00);
        System.out.println("After discount: " + laptop.toString());
        System.out.println("Default order status: " + OrderStatus.PENDING);
    }
}
