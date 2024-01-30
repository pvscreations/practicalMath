import {transpose,multiply,inv,matrix,Matrix} from "mathjs";
export namespace PracticalMath{
export function findBestFitLine(coordinates: CoordinateSystem[]): number {
    // Extract x and y coordinates
    const xValues: number[] = coordinates.map(point => point.x);
    const yValues: number[] = coordinates.map(point => point.y);
    const onesColumn: number[] = Array(xValues.length).fill(1);
    const X: number[][] = transpose([onesColumn, xValues]);

    // Calculate the parameters (b, m) using the normal equation
    const XTranspose: Matrix = transpose(matrix(X));
    const XT_X: Matrix = multiply(XTranspose, matrix(X));
    const XT_X_inverse: Matrix = inv(XT_X);
    const XT_y: Matrix = multiply(XTranspose, matrix(yValues));
    const parameters: Matrix = multiply(XT_X_inverse, XT_y);

    // Retrieve bias, and slope
    const [b, m] = parameters.toArray() as number[];

    // Customize the slope value
    // Apply absolute transformation to make it feasible for further calculations
    return Math.abs(m);
  }

export function euclideanDistance({ point1, point2 }: { point1: CoordinateSystem, point2: CoordinateSystem }, otherConfig: { dim: "2D" | "3D" } = { dim: "2D" }): number {
    return (((point1.x - point2.x) ** 2) + ((point1.y - point2.y) ** 2) + ((((otherConfig.dim == "3D" && point1.z) ? point1.z : 0) - ((otherConfig.dim == "3D" && point2.z) ? point2.z : 0)) ** 2)) ** (1 / 2);

}

export function calculateCosineAngleABC({ A, B, C }: { A: CoordinateSystem, B: CoordinateSystem, C: CoordinateSystem }) {
    let num = ((B.x - A.x) * (C.x - B.x)) + ((B.y - A.y) * (C.y - B.y))
    let deno = euclideanDistance({ point1: A, point2: B }) * euclideanDistance({ point1: B, point2: C });
    return Math.acos(num / deno);
}

export function midPoint({ point1, point2 }: { point1: CoordinateSystem, point2: CoordinateSystem }, otherConfig: { dim: "2D" | "3D" } = { dim: "2D" }): CoordinateSystem {
    return({x:(point1.x+point2.x)/2,y:(point1.y+point2.y)/2,z:((otherConfig.dim=="3D" &&point1.z && point2.z)?(point1.z+point2.z)/2:0)})

}

export function distancePointToLine({point1,point2,unknownPoint}:{point1:CoordinateSystem,point2:CoordinateSystem,unknownPoint:CoordinateSystem}){
    const numerator = Math.abs(((point2.y - point1.y) * unknownPoint.x) - ((point2.x - point1.x) * unknownPoint.y) + (point2.x * point1.y) - (point2.y * point1.x))
    const distance = numerator / euclideanDistance({point1:point1,point2:point2})
    return distance
}

export interface CoordinateSystem {
    x: number,
    y: number,
    z?: number
}
}

