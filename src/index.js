module.exports = function solveSudoku(matrix) {

    function foundNextEmpty(matrix) {
        let emptyIndex = [];
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (matrix[row][col] === 0) {
                    emptyIndex.push(row, col)
                    return  emptyIndex;
                }
            }
        }
        return false;
    }

    function foundPossibilites(matrix, row, col) {
        let posValues = [];
        let rowPos = [];
        let colPos = [];
        let squarePos = [];
        let sqRow = row < 3 ? 0 : row < 6 ? 3 : 6;
        let sqCol = col < 3 ? 0 : col < 6 ? 3 : 6;

        
        for (let i = 0; i < 9; i++) {
            rowPos.push(matrix[i][col]);
        }
        for (let i = 0; i < 9; i++) {
            colPos.push(matrix[row][i])
        }
        for (let i = sqRow; i < sqRow + 3; i++) {
            for (let j = sqCol; j < sqCol + 3; j++) {
                squarePos.push(matrix[i][j]);
            }
        }

        for (let i = 1; i < 10; i++) {
            if (!rowPos.includes(i) && !colPos.includes(i) && !squarePos.includes(i)) {
                posValues.push(i);
            }
        }

        return posValues;
    }


    if (foundNextEmpty(matrix) == false) {
        return matrix;
    }
    let empty = foundNextEmpty(matrix);
    let emptyRow = empty[0];
    let emptyCol = empty[1];
    let values = foundPossibilites(matrix, emptyRow, emptyCol);
    for (let i = 0; i < values.length && foundNextEmpty(matrix) != false; i++) {
        matrix[emptyRow][emptyCol] = values[i];
        solveSudoku(matrix);
    }
    if (foundNextEmpty(matrix) != false) {  
        matrix[emptyRow][emptyCol] = 0;
    }
    return matrix;
}
