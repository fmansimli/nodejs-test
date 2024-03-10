class Car {
  public name: string;
  public year: number;

  constructor(attrs: Partial<Car>) {
    Object.assign(this, attrs);
  }

  drive(): Promise<string> {
    return Promise.resolve("driving");
  }

  stop(): Promise<string> {
    return Promise.reject("an error");
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
    const result = await car.drive();
    expect(result).toEqual("driving");
  });
});
