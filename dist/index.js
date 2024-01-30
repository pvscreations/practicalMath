"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PracticalMath = void 0;
const mathjs_1 = require("mathjs");
var PracticalMath;
(function (PracticalMath) {
    function findBestFitLine(coordinates) {
        // Extract x and y coordinates
        const xValues = coordinates.map(point => point.x);
        const yValues = coordinates.map(point => point.y);
        const onesColumn = Array(xValues.length).fill(1);
        const X = (0, mathjs_1.transpose)([onesColumn, xValues]);
        // Calculate the parameters (b, m) using the normal equation
        const XTranspose = (0, mathjs_1.transpose)((0, mathjs_1.matrix)(X));
        const XT_X = (0, mathjs_1.multiply)(XTranspose, (0, mathjs_1.matrix)(X));
        const XT_X_inverse = (0, mathjs_1.inv)(XT_X);
        const XT_y = (0, mathjs_1.multiply)(XTranspose, (0, mathjs_1.matrix)(yValues));
        const parameters = (0, mathjs_1.multiply)(XT_X_inverse, XT_y);
        // Retrieve bias, and slope
        const [b, m] = parameters.toArray();
        // Customize the slope value
        // Apply absolute transformation to make it feasible for further calculations
        return Math.abs(m);
    }
    PracticalMath.findBestFitLine = findBestFitLine;
    function euclideanDistance({ point1, point2 }, otherConfig = { dim: "2D" }) {
        return (((point1.x - point2.x) ** 2) + ((point1.y - point2.y) ** 2) + ((((otherConfig.dim == "3D" && point1.z) ? point1.z : 0) - ((otherConfig.dim == "3D" && point2.z) ? point2.z : 0)) ** 2)) ** (1 / 2);
    }
    PracticalMath.euclideanDistance = euclideanDistance;
    function calculateCosineAngleABC({ A, B, C }) {
        let num = ((B.x - A.x) * (C.x - B.x)) + ((B.y - A.y) * (C.y - B.y));
        let deno = euclideanDistance({ point1: A, point2: B }) * euclideanDistance({ point1: B, point2: C });
        return Math.acos(num / deno);
    }
    PracticalMath.calculateCosineAngleABC = calculateCosineAngleABC;
    function midPoint({ point1, point2 }, otherConfig = { dim: "2D" }) {
        return ({ x: (point1.x + point2.x) / 2, y: (point1.y + point2.y) / 2, z: ((otherConfig.dim == "3D" && point1.z && point2.z) ? (point1.z + point2.z) / 2 : 0) });
    }
    PracticalMath.midPoint = midPoint;
    function distancePointToLine({ point1, point2, unknownPoint }) {
        const numerator = Math.abs(((point2.y - point1.y) * unknownPoint.x) - ((point2.x - point1.x) * unknownPoint.y) + (point2.x * point1.y) - (point2.y * point1.x));
        const distance = numerator / euclideanDistance({ point1: point1, point2: point2 });
        return distance;
    }
    PracticalMath.distancePointToLine = distancePointToLine;
})(PracticalMath || (exports.PracticalMath = PracticalMath = {}));
