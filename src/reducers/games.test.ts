// import {
//     OtherActionTypeValue,
//     SquareActionTypeValue
// } from '../actions/shape';

// import shape, {
//     initialShapeState,
//     SquareAction
// } from './shape';

// describe('Shape Reducer', () => {
//     it('returns initial state when supplied state is initial ShapeState', () => {
//         const result = shape(initialShapeState);
//         expect(result).toEqual(initialShapeState);
//     });

//     it('returns supplied state when supplied action is not handled', () => {
//         const result = shape(initialShapeState, { type: OtherActionTypeValue });

//         expect(result).toEqual(initialShapeState);
//     });

//     describe('Square Action', () => {
//         it('returns correct kind when supplied size is non-negative', () => {
//             const action: SquareAction = {
//                 type: SquareActionTypeValue,
//                 size: 2
//             };

//             const result = shape(initialShapeState, action);

//             expect(result.area).toEqual(4);
//         });
//     });
// });