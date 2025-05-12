interface Rectangle {
    width: number;
    height: number;
}
export function calculateRectangleArea(rectangle: Rectangle): number {
    return rectangle.width * rectangle.height;
}
export let rectangle: Rectangle = {
    width: 10,
    height: 20,
};
