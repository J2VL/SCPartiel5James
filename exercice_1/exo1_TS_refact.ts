interface DiscountStrategy {
  applyDiscount(price: number): number;
}

class VIPDiscount implements DiscountStrategy {
  applyDiscount(price: number): number {
    return price * 0.8;
  }
}

class BusinessDiscount implements DiscountStrategy {
  applyDiscount(price: number): number {
    return price * 0.9;
  }
}

class NoDiscount implements DiscountStrategy {
  applyDiscount(price: number): number {
    return price;
  }
}

class Package {
  constructor(public weight: number, public distance: number) {
    if (weight < 0) {
      throw new Error("Invalid weight!");
    }
  }
}

class DeliveryPriceCalculator {
  constructor(private discountStrategy: DiscountStrategy) {}

  calculatePrice(packages: Package[], urgent: boolean): number {
    let total = 0;

    for (const pkg of packages) {
      let base = pkg.distance * 0.1;
      if (pkg.weight > 10) {
        base += 5;
      } else if (pkg.weight > 5) {
        base += 3;
      }

      if (urgent) {
        base *= 1.5;
      }

      total += base;
    }

    if (packages.length > 3) {
      total *= 0.95;
    }

    return this.discountStrategy.applyDiscount(total);
  }
}

class InvoicePrinter {
  printInvoice(totalPrice: number): void {
    console.log(`Total: ${totalPrice}`);
    if (totalPrice > 100) {
      console.log("Apply special discount next time!");
    }
  }
}
