class Car {
  public name: string;
  public year: number;

  constructor(attrs: Partial<Car>) {
    Object.assign(this, attrs);
  }

  async drive(): Promise<string> {
    throw new Error("test error");

    return Promise.resolve("driving");
  }
}

describe("a basic class testing.", () => {
  let car: Car;

  beforeEach(() => {
    car = new Car({ name: "mustang", year: 2018 });
  });

  it("should have name of 'mustang'", () => {
    expect(car.name).toEqual("mustang");
  });

  it("should have year of 2018", () => {
    expect(car.year).toEqual(2018);
  });

  it("should be able to drived", async () => {
    try {
      const result = await car.drive();
      expect(result).toEqual("driving");
    } catch (error) {
      expect(false);
    }
  });
});
