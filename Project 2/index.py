import math

class Shape:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __repr__(self):
        return f"<Shape x={self.x} y={self.y}>"

    def area(self):
        raise NotImplementedError("area() not implemented in Shape")

    def circumference(self):
        raise NotImplementedError("circumference() not implemented in Shape")

class Circle(Shape):
    def __init__(self, x, y, radius):
        super().__init__(x, y)
        self.radius = radius

    def __repr__(self):
        return f"<Circle x={self.x} y={self.y} radius={self.radius}>"

    def area(self):
        return math.pi * self.radius ** 2

    def circumference(self):
        return 2 * math.pi * self.radius

class Rectangle(Shape):
    def __init__(self, x, y, width, height):
        super().__init__(x, y)
        self.width = width
        self.height = height

    def __repr__(self):
        return (f"<Rectangle x={self.x} y={self.y} "
                f"width={self.width} height={self.height}>")

    def area(self):
        return self.width * self.height

    def circumference(self):
        return 2 * (self.width + self.height)

class RightTriangle(Shape):
    def __init__(self, x, y, height, length):
        super().__init__(x, y)
        self.height = height
        self.length = length

    def __repr__(self):
        return (f"<RightTriangle x={self.x} y={self.y} "
                f"height={self.height} length={self.length}>")

    def area(self):
        return (self.height * self.length) / 2

    def circumference(self):
        hyp = math.sqrt(self.height**2 + self.length**2)
        return self.height + self.length + hyp

class Square(Rectangle):
    def __init__(self, x, y, side):
        super().__init__(x, y, side, side)

    def __repr__(self):
        return f"<Square x={self.x} y={self.y} side={self.width}>"

if __name__ == "__main__":
    circle = Circle(1, 1, 10)
    rect = Rectangle(5, 5, 20, 10)
    tri = RightTriangle(0, 0, 6, 8)
    square = Square(3, 3, 12)

    shapes = [circle, rect, tri, square]

    for shape in shapes:
        print(shape)
        print("  area =", shape.area())
        print("  circumference =", shape.circumference())
        print()

    print("Polymorphism demo:")
    for s in shapes:
        print(f"{s.__class__.__name__}: area → {s.area()}")
