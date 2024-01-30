export declare namespace PracticalMath {
    function findBestFitLine(coordinates: CoordinateSystem[]): number;
    function euclideanDistance({ point1, point2 }: {
        point1: CoordinateSystem;
        point2: CoordinateSystem;
    }, otherConfig?: {
        dim: "2D" | "3D";
    }): number;
    function calculateCosineAngleABC({ A, B, C }: {
        A: CoordinateSystem;
        B: CoordinateSystem;
        C: CoordinateSystem;
    }): number;
    function midPoint({ point1, point2 }: {
        point1: CoordinateSystem;
        point2: CoordinateSystem;
    }, otherConfig?: {
        dim: "2D" | "3D";
    }): CoordinateSystem;
    function distancePointToLine({ point1, point2, unknownPoint }: {
        point1: CoordinateSystem;
        point2: CoordinateSystem;
        unknownPoint: CoordinateSystem;
    }): number;
    interface CoordinateSystem {
        x: number;
        y: number;
        z?: number;
    }
}
